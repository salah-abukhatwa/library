"use client";

import React, { useRef, useState } from "react";
import config from "@/lib/config";
import { ImageKitProvider, upload } from "@imagekit/next";
import { toast } from "sonner";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

type AuthResponse = { token: string; expire: number; signature: string };

async function getAuth(): Promise<AuthResponse> {
  const res = await fetch("/api/auth/imagekit");
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

type Props = {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant?: "dark" | "light";
  value?: string;
  onFileChange: (fileUrl: string) => void;
};

export default function FileUpload({
  type,
  accept,
  placeholder,
  folder,
  variant = "dark",
  value,
  onFileChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null); // null = unknown/indeterminate
  const [fileName, setFileName] = useState<string>("");

  const openPicker = () => inputRef.current?.click();

  const onValidate = (file: File) => {
    if (type === "image" && file.size > 20 * 1024 * 1024) {
      toast.error("File size too large", {
        description: "Please upload an image less than 20MB.",
      });
      return false;
    }

    if (type === "video" && file.size > 50 * 1024 * 1024) {
      toast.error("File size too large", {
        description: "Please upload a video less than 50MB.",
      });
      return false;
    }

    return true;
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!onValidate(file)) {
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    setFileName(file.name);
    setProgress(null);

    const toastId = toast.loading(`Uploading ${type}...`);

    try {
      const { token, expire, signature } = await getAuth();

      // Some versions may support progress callbacks; we try safely.
      const result = await upload({
        file,
        fileName: file.name,
        token,
        expire,
        signature,
        publicKey,
        folder,

        // If your version supports it, uncomment and it should work.
        // @ts-expect-error - progress typings differ by version
        // onUploadProgress: ({ loaded, total }: { loaded: number; total: number }) => {
        //   const percent = Math.round((loaded / total) * 100);
        //   setProgress(percent);
        // },
      } as any);

      const url = (result as any)?.url as string | undefined;
      if (!url) throw new Error("Upload succeeded but no URL returned.");

      onFileChange(url);

      toast.success(`${type === "image" ? "Image" : "Video"} uploaded`, {
        id: toastId,
        description: file.name,
      });

      // If progress was unknown, mark as complete at the end
      setProgress(100);
    } catch (err: any) {
      toast.error(`${type} upload failed`, {
        id: toastId,
        description: err?.message ?? "Something went wrong",
      });
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
      // optional: reset progress after a short time
      setTimeout(() => setProgress(null), 800);
    }
  };

  const containerClass =
    variant === "dark"
      ? "rounded-xl border border-white/10 bg-white/5 p-4"
      : "rounded-xl border border-black/10 bg-black/5 p-4";

  const buttonClass =
    variant === "dark"
      ? "rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15 disabled:opacity-60"
      : "rounded-lg bg-black/10 px-4 py-2 text-sm text-black hover:bg-black/15 disabled:opacity-60";

  const textMuted = variant === "dark" ? "text-white/70" : "text-black/70";

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <div className={containerClass}>
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept={accept}
          onChange={handleChange}
        />

        <div className="flex items-center justify-between gap-3">
          <p className={`text-sm ${textMuted}`}>{placeholder}</p>

          <button
            type="button"
            onClick={openPicker}
            disabled={isUploading}
            className={buttonClass}
          >
            {isUploading ? "Uploading..." : `Choose ${type}`}
          </button>
        </div>

        {/* File name (optional) */}
        {fileName ? (
          <p className={`mt-2 break-all text-xs ${textMuted}`}>{fileName}</p>
        ) : null}

        {/* Progress bar (optional) */}
        {isUploading ? (
          <div className="mt-3 w-full rounded-full bg-black/10">
            <div
              className="h-2 rounded-full bg-green-200 transition-all"
              style={{
                width: `${progress ?? 35}%`, // fallback if progress unsupported
              }}
            />
          </div>
        ) : null}

        {value ? (
          <div className="mt-4">
            {type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Uploaded"
                className="h-44 w-full rounded-lg object-contain"
              />
            ) : (
              <video
                src={value}
                controls
                className="h-44 w-full rounded-lg object-contain"
              />
            )}

            <p className={`mt-2 break-all text-xs ${textMuted}`}>{value}</p>
          </div>
        ) : null}
      </div>
    </ImageKitProvider>
  );
}
