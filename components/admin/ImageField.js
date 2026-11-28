"use client";
import { useRef, useState } from "react";
import { uploadImageAction } from "@/app/admin/_actions/content";
import { useAdmin } from "@/components/admin/AdminContext";

// Shrinks big photos in the browser (max 1600px, WebP) so uploads stay small and fast.
async function shrink(file, maxSide = 1600) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((r) => canvas.toBlob(r, "image/webp", 0.82));
  return blob && blob.size < file.size ? new File([blob], file.name.replace(/\.\w+$/, ".webp"), { type: "image/webp" }) : file;
}

export default function ImageField({ label = "Image", value, onChange, hint, large }) {
  const { library = [] } = useAdmin();
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const upload = async (file) => {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      const small = await shrink(file);
      const fd = new FormData();
      fd.append("file", small);
      fd.append("name", file.name);
      const res = await uploadImageAction(fd);
      if (res?.error) setError(res.error);
      else onChange(res.url);
    } catch (e) {
      setError(e?.message || "Upload failed.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <div className="adm-field">
      {label && <span className="adm-label">{label}</span>}
      <div className="adm-image">
        <div className={`adm-thumb${large ? " lg" : ""}`}>
          {value ? <img src={value} alt="" /> : <i className="fas fa-image" aria-hidden="true" />}
        </div>
        <div className="adm-image-side">
          <div className="adm-row">
            <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => input.current?.click()} disabled={busy}>
              <i className="fas fa-upload" /> {busy ? "Uploading…" : "Upload"}
            </button>
            <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setOpen(true)}>
              <i className="fas fa-images" /> Library
            </button>
            {value && (
              <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => onChange("")}>
                Remove
              </button>
            )}
          </div>
          {error ? <div className="adm-hint" style={{ color: "var(--red)" }}>{error}</div> : hint && <div className="adm-hint">{hint}</div>}
        </div>
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => upload(e.target.files?.[0])} />

      {open && (
        <div className="adm-modal-back" onClick={() => setOpen(false)}>
          <div className="adm-modal adm-card" role="dialog" aria-modal="true" aria-label="Choose an image" onClick={(e) => e.stopPropagation()}>
            <div className="adm-card-head">
              <div>
                <h2>Choose an image</h2>
                <p>Photos already on the website, plus anything you&apos;ve uploaded.</p>
              </div>
              <button type="button" className="adm-btn adm-btn-ghost adm-icon-btn" aria-label="Close" onClick={() => setOpen(false)}>
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="adm-card-pad">
              <div className="adm-library">
                {library.map((src) => (
                  <button
                    key={src}
                    type="button"
                    className={src === value ? "on" : ""}
                    onClick={() => {
                      onChange(src);
                      setOpen(false);
                    }}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
