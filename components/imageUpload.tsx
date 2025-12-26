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

export default function ImageUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Optional: show loading toast
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

      // Depending on your version, result may include url/filePath/etc
      // @ts-ignore
      const url = result?.url ?? "";
      setUploadedUrl(url);

      toast.success("Image uploaded successfully", {
        id: toastId, // updates the loading toast
        description: file.name,
      });
    } catch (err: any) {
      console.error(err);

      toast.error("Upload failed", {
        id: toastId, // updates the loading toast
        description: err?.message ?? "Something went wrong",
      });
    } finally {
      setIsUploading(false);

      // Optional: allow uploading the same file again
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
      {uploadedUrl && (
        <div style={{ marginTop: 12 }}>
          <img
            src={uploadedUrl}
            alt="Uploaded"
            style={{
              width: 220,
              height: 220,
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        </div>
      )}

      {uploadedUrl && <p className="break-all text-sm">{uploadedUrl}</p>}
    </ImageKitProvider>
  );
}
