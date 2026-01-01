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

type ImageUploadProps = {
  value?: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({
  value = "",
  onChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const { token, expire, signature } = await getAuth();

      const result = await upload({
        file,
        fileName: file.name,
        token,
        expire,
        signature,
        publicKey,
      });

      // @ts-ignore (depends on typings)
      const url = result?.url ?? "";

      if (!url) throw new Error("Upload succeeded but no URL returned.");

      onChange(url);

      toast.success("Image uploaded successfully", {
        id: toastId,
        description: file.name,
      });
    } catch (err: any) {
      toast.error("Upload failed", {
        id: toastId,
        description: err?.message ?? "Something went wrong",
      });
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />

      <button type="button" onClick={openPicker} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Choose image"}
      </button>

      {value && (
        <div style={{ marginTop: 12 }}>
          <img
            src={value}
            alt="Uploaded"
            style={{
              width: 320,
              height: 180,
              objectFit: "contain",
              borderRadius: 12,
              background: "rgba(0,0,0,0.2)",
            }}
          />
          <p className="break-all text-sm mt-2">{value}</p>
        </div>
      )}
    </ImageKitProvider>
  );
}
