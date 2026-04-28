"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  Download,
  Loader2,
  ScanSearch,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import type { Tool } from "@/lib/tools-data";
import { cn, downloadBlob, formatBytes } from "@/lib/utils";
import { buildDropzoneAccept, formatAcceptedFormats } from "./file-accept";
import { handleImageTool } from "./processors/file-image";
import type { FileProcessResult } from "./processors/types";

const TRANSFORM_COPY = {
  "compress-image": {
    eyebrow: "Editorial image delivery",
    title: "Compress Image",
    summary: "Reduce file size without making the preview feel cheap or soft.",
    badges: ["Faster uploads", "Balanced quality", "Instant export"],
    actionLabel: "Compress image",
    emptyTitle: "Compression preview appears here",
  },
  "resize-image": {
    eyebrow: "Architectural sizing studio",
    title: "Resize Image",
    summary:
      "Resize visuals with cleaner dimensions, better framing, and web-ready output.",
    badges: ["Custom dimensions", "Smart fit", "Output preview"],
    actionLabel: "Resize image",
    emptyTitle: "Resized result appears here",
  },
  "convert-image": {
    eyebrow: "Format conversion queue",
    title: "Convert Image",
    summary: "Switch formats cleanly for web, product, or document workflows.",
    badges: ["WEBP / JPG / PNG / AVIF", "Batch-ready look", "Sharper exports"],
    actionLabel: "Convert image",
    emptyTitle: "Converted asset appears here",
  },
  "crop-image": {
    eyebrow: "Precision crop workflow",
    title: "Crop Image",
    summary:
      "Trim the frame around the subject with studio-style aspect presets.",
    badges: ["Centered crop", "Preset ratios", "Live canvas"],
    actionLabel: "Crop image",
    emptyTitle: "Cropped preview appears here",
  },
  "remove-background": {
    eyebrow: "Cutout editor",
    title: "Remove Background",
    summary:
      "Create clean transparent cutouts for products, profiles, and creative comps.",
    badges: ["Transparent PNG", "Portrait-ready", "Quick turnaround"],
    actionLabel: "Remove background",
    emptyTitle: "Transparent cutout appears here",
  },
  "blur-background": {
    eyebrow: "Portrait focus studio",
    title: "Blur Background",
    summary:
      "Keep the subject sharp and build a softer premium portrait backdrop.",
    badges: ["Portrait style", "Blur depth", "Tint control"],
    actionLabel: "Blur background",
    emptyTitle: "Portrait preview appears here",
  },
  "passport-photo-maker": {
    eyebrow: "Official photo layout",
    title: "Passport Photo Maker",
    summary:
      "Generate a clean white-background passport layout for print-ready use.",
    badges: ["White background", "Centered framing", "Clean export"],
    actionLabel: "Create passport photo",
    emptyTitle: "Passport sheet preview appears here",
  },
  "image-to-text": {
    eyebrow: "OCR extraction studio",
    title: "Image to Text",
    summary:
      "Extract readable text from screenshots, scans, receipts, and design mockups.",
    badges: ["OCR language switch", "Readable output", "Quick copy"],
    actionLabel: "Extract text",
    emptyTitle: "Recognized text appears here",
  },
  "image-upscaler": {
    eyebrow: "Resolution recovery",
    title: "Image Upscaler",
    summary:
      "Upscale image resolution with cleaner edges and more presentation-ready detail.",
    badges: ["2x and 4x", "Sharper output", "Compare quickly"],
    actionLabel: "Upscale image",
    emptyTitle: "Upscaled result appears here",
  },
  "favicon-generator": {
    eyebrow: "Web branding",
    title: "Favicon Generator",
    summary:
      "Upload an image and generate a multi-size favicon package for your website.",
    badges: ["ICO format", "Multiple sizes", "Web ready"],
    actionLabel: "Generate favicon",
    emptyTitle: "Favicon package appears here",
  },
  "instagram-grid-maker": {
    eyebrow: "Social layout",
    title: "Instagram Grid Maker",
    summary:
      "Split your image into a perfect 3×3 grid for a stunning Instagram profile layout.",
    badges: ["3×3 grid", "Perfect split", "Download all"],
    actionLabel: "Split into grid",
    emptyTitle: "Grid tiles appear here",
  },
  "svg-to-png": {
    eyebrow: "Vector converter",
    title: "SVG to PNG Converter",
    summary:
      "Convert SVG vector files into high-resolution PNG images for any use case.",
    badges: ["Vector input", "Hi-res PNG", "Custom size"],
    actionLabel: "Convert to PNG",
    emptyTitle: "PNG result appears here",
  },
  "meme-generator": {
    eyebrow: "Creative editor",
    title: "Meme Generator",
    summary:
      "Upload an image and add bold top/bottom text to create shareable memes instantly.",
    badges: ["Custom text", "Impact font", "Quick share"],
    actionLabel: "Create meme",
    emptyTitle: "Meme preview appears here",
  },
} as const;

const OCR_LANGUAGES = [
  ["eng", "English"],
  ["hin", "Hindi"],
  ["tam", "Tamil"],
  ["spa", "Spanish"],
  ["fra", "French"],
] as const;

function metricValue(result: FileProcessResult | null, label: string) {
  return (
    result?.metrics?.find((item) => item.label === label)?.value || "Pending"
  );
}

function makeTextBlob(text: string, filename: string) {
  return downloadBlob(
    new Blob([text], { type: "text/plain;charset=utf-8" }),
    filename,
  );
}

export default function ImageTransformStudio({ tool }: { tool: Tool }) {
  const copy = TRANSFORM_COPY[tool.slug as keyof typeof TRANSFORM_COPY] ?? {
    eyebrow: "Tool setup",
    title: tool.name,
    summary: "This image workflow is being set up. Check back soon.",
    badges: ["Coming soon", "Image workflow", "mtverse"],
    actionLabel: "Process image",
    emptyTitle: "Result appears here",
  };

  const acceptedFormats = useMemo(
    () =>
      tool.acceptedFormats?.length
        ? tool.acceptedFormats
        : [".jpg", ".jpeg", ".png", ".webp"],
    [tool.acceptedFormats],
  );
  const accept = useMemo(
    () => buildDropzoneAccept(acceptedFormats),
    [acceptedFormats],
  );
  const acceptLabel = useMemo(
    () => formatAcceptedFormats(acceptedFormats),
    [acceptedFormats],
  );

  const sourcePreviewRef = useRef<string | null>(null);
  const resultPreviewRef = useRef<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<FileProcessResult | null>(null);
  const [imgQuality, setImgQuality] = useState("82");
  const [convertTo, setConvertTo] = useState("webp");
  const [resizeWidth, setResizeWidth] = useState("1600");
  const [resizeHeight, setResizeHeight] = useState("");
  const [resizeFit, setResizeFit] = useState("inside");
  const [cropAspect, setCropAspect] = useState("square");
  const [blurStrength, setBlurStrength] = useState("22");
  const [blurTint, setBlurTint] = useState("#E8EEFF");
  const [ocrLang, setOcrLang] = useState("eng");
  const [upscaleFactor, setUpscaleFactor] = useState("2");

  function clearSourcePreview() {
    if (sourcePreviewRef.current) {
      URL.revokeObjectURL(sourcePreviewRef.current);
      sourcePreviewRef.current = null;
    }
  }

  function clearResultPreview() {
    if (resultPreviewRef.current) {
      URL.revokeObjectURL(resultPreviewRef.current);
      resultPreviewRef.current = null;
    }
  }

  useEffect(
    () => () => {
      clearSourcePreview();
      clearResultPreview();
    },
    [],
  );

  function resetResultState() {
    setResult((current) => {
      if (current?.previewIsObjectUrl && current.previewUrl) {
        URL.revokeObjectURL(current.previewUrl);
      }
      return null;
    });
    clearResultPreview();
    setError("");
  }

  function updateFile(nextFile: File | null) {
    clearSourcePreview();
    resetResultState();
    setFile(nextFile);

    if (!nextFile) {
      setSourcePreview("");
      return;
    }

    const nextPreview = URL.createObjectURL(nextFile);
    sourcePreviewRef.current = nextPreview;
    setSourcePreview(nextPreview);
  }

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept,
    multiple: false,
    noClick: true,
    maxSize: 20 * 1024 * 1024,
    onDropAccepted: (files) => updateFile(files[0] || null),
    onDropRejected: (rejectedFiles) => {
      const tooBig = rejectedFiles.some((f) =>
        f.errors.some((e) => e.code === "file-too-large"),
      );
      if (tooBig) toast.error("File too large. Maximum size is 20 MB.");
      else toast.error("Invalid file type. Please upload a supported image.");
    },
  });

  async function handleProcess() {
    if (!file || loading) return;

    setLoading(true);
    resetResultState();

    try {
      const processed = await handleImageTool({
        slug: tool.slug,
        file,
        textInput: tool.slug === "crop-image" ? cropAspect : "",
        ocrLang,
        imgQuality,
        imgConvertTo: convertTo,
        resizeWidth,
        resizeHeight,
        resizeFit,
        blurStrength,
        blurTint,
        upscaleFactor,
      });

      if (processed.apiError) {
        setError(processed.apiError);
        return;
      }

      if (processed.previewIsObjectUrl && processed.previewUrl) {
        resultPreviewRef.current = processed.previewUrl;
      }

      setResult(processed);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    updateFile(null);
    setImgQuality("82");
    setConvertTo("webp");
    setResizeWidth("1600");
    setResizeHeight("");
    setResizeFit("inside");
    setCropAspect("square");
    setBlurStrength("22");
    setBlurTint("#E8EEFF");
    setOcrLang("eng");
    setUpscaleFactor("2");
    setError("");
  }

  function handleDownload() {
    if (result?.outputBlob && result.outputFilename) {
      downloadBlob(result.outputBlob, result.outputFilename);
      return;
    }

    if (result?.output) {
      makeTextBlob(result.output, `${tool.slug}.txt`);
    }
  }

  function renderOptions() {
    if (tool.slug === "compress-image") {
      return (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Preset
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                ["55", "Smallest"],
                ["82", "Balanced"],
                ["94", "Maximum"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setImgQuality(value)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors",
                    imgQuality === value
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Compression quality</span>
              <span>{imgQuality}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={imgQuality}
              onChange={(event) => setImgQuality(event.target.value)}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      );
    }

    if (tool.slug === "resize-image") {
      return (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span>Width</span>
              <input
                value={resizeWidth}
                onChange={(event) =>
                  setResizeWidth(event.target.value.replace(/[^\d]/g, ""))
                }
                className="w-full rounded-2xl bg-white px-4 py-3 text-sm text-slate-900 outline-none"
              />
            </label>
            <label className="space-y-2 text-sm font-semibold text-slate-700">
              <span>Height</span>
              <input
                value={resizeHeight}
                onChange={(event) =>
                  setResizeHeight(event.target.value.replace(/[^\d]/g, ""))
                }
                placeholder="Auto"
                className="w-full rounded-2xl bg-white px-4 py-3 text-sm text-slate-900 outline-none"
              />
            </label>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Fit mode
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                ["inside", "Inside"],
                ["cover", "Cover"],
                ["contain", "Contain"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setResizeFit(value)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors",
                    resizeFit === value
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (tool.slug === "convert-image") {
      return (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Output format
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-4">
              {["webp", "jpeg", "png", "avif"].map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setConvertTo(format)}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-center text-sm font-semibold uppercase transition-colors",
                    convertTo === format
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100",
                  )}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Export quality</span>
              <span>{imgQuality}%</span>
            </div>
            <input
              type="range"
              min="45"
              max="100"
              value={imgQuality}
              onChange={(event) => setImgQuality(event.target.value)}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      );
    }

    if (tool.slug === "crop-image") {
      return (
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Aspect ratio
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["square", "Square"],
              ["portrait", "4:5 Portrait"],
              ["story", "9:16 Story"],
              ["landscape", "16:9 Wide"],
              ["original", "Original"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setCropAspect(value)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors",
                  cropAspect === value
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (tool.slug === "blur-background") {
      return (
        <div className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Blur depth</span>
              <span>{blurStrength}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="48"
              value={blurStrength}
              onChange={(event) => setBlurStrength(event.target.value)}
              className="w-full accent-indigo-600"
            />
          </div>
          <label className="block space-y-2 text-sm font-semibold text-slate-700">
            <span>Background tint</span>
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
              <input
                type="color"
                value={blurTint}
                onChange={(event) => setBlurTint(event.target.value)}
                className="h-10 w-12 rounded-xl border-0 bg-transparent"
              />
              <span className="font-mono text-sm text-slate-600">
                {blurTint}
              </span>
            </div>
          </label>
        </div>
      );
    }

    if (tool.slug === "image-to-text") {
      return (
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            OCR language
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {OCR_LANGUAGES.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setOcrLang(value)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors",
                  ocrLang === value
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (tool.slug === "image-upscaler") {
      return (
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Upscale factor
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["2", "2x Upscale"],
              ["4", "4x Upscale"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setUpscaleFactor(value)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors",
                  upscaleFactor === value
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600">
        This workflow is tuned automatically. Upload the image and run the
        action.
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5" data-tool-shell="true">
      <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr] sm:gap-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap gap-1.5">
              {copy.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700 shadow-sm sm:px-4 sm:py-1.5 sm:text-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-indigo-600 sm:text-xs">
                {copy.eyebrow}
              </p>
              <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:mt-3 sm:text-4xl md:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-8">
                {copy.summary}
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.22)] sm:rounded-[2rem] sm:p-6">
            <div
              {...getRootProps()}
              className={cn(
                "rounded-[1.15rem] border border-dashed px-4 py-5 transition-colors sm:rounded-[1.75rem] sm:border-2 sm:px-6 sm:py-8",
                isDragActive
                  ? "border-indigo-500 bg-indigo-50/60"
                  : "border-slate-200 bg-slate-50/70",
              )}
            >
              <input {...getInputProps()} />
              {!file ? (
                <div className="flex min-h-[150px] flex-col items-center justify-center text-center sm:min-h-[320px]">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 sm:mb-5 sm:h-16 sm:w-16 sm:rounded-3xl">
                    <UploadCloud className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <h2 className="font-display text-base font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Drop your image here
                  </h2>
                  <p className="mt-2 max-w-md text-xs leading-5 text-slate-500 sm:mt-3 sm:text-sm sm:leading-6">
                    {acceptLabel
                      ? `Supports ${acceptLabel}.`
                      : "Upload a supported image file."}
                  </p>
                  <button
                    type="button"
                    onClick={open}
                    className="mt-4 rounded-xl bg-indigo-600 px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-indigo-700 sm:mt-6 sm:rounded-2xl sm:px-4 sm:py-2 sm:text-xs sm:px-6 sm:py-3 sm:text-sm"
                  >
                    Choose image
                  </button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative h-[240px] overflow-hidden rounded-[1.25rem] bg-white sm:h-[320px] sm:rounded-[1.5rem]">
                    <Image
                      src={sourcePreview}
                      alt={file.name}
                      fill
                      unoptimized
                      sizes="(max-width: 1280px) 100vw, 720px"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 sm:gap-4 sm:rounded-[1.4rem] sm:px-5 sm:py-4">
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-bold tracking-tight text-slate-950 sm:text-base">
                        {file.name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={open}
                      className="rounded-xl bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition-colors hover:bg-slate-200 sm:rounded-2xl sm:px-4 sm:py-2 sm:text-sm"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {file && (
            <div className="flex gap-2 sm:hidden">
              <button
                type="button"
                onClick={handleProcess}
                disabled={loading}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {copy.actionLabel}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-100 px-3 text-slate-700 transition active:scale-[0.98]"
                aria-label="Reset workspace"
              >
                Reset
              </button>
            </div>
          )}

          <div className="grid gap-3 lg:grid-cols-[1.12fr_0.88fr] sm:gap-4">
            <section className="rounded-xl bg-slate-100/90 p-4 sm:rounded-[1.8rem] sm:p-5">
              <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 sm:h-11 sm:w-11 sm:rounded-2xl">
                  <Settings2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:text-xs">
                    Controls
                  </p>
                  <h2 className="font-display text-sm font-bold tracking-tight text-slate-950 sm:text-lg">
                    Workflow settings
                  </h2>
                </div>
              </div>
              {renderOptions()}
            </section>

            <section className="rounded-xl bg-indigo-50/70 p-4 sm:rounded-[1.8rem] sm:p-5">
              <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-indigo-600 sm:h-11 sm:w-11 sm:rounded-2xl">
                  <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:text-xs">
                    Live stats
                  </p>
                  <h2 className="font-display text-sm font-bold tracking-tight text-slate-950 sm:text-lg">
                    Active output
                  </h2>
                </div>
              </div>

              <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-3 sm:rounded-2xl sm:p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:text-xs">
                    Source size
                  </p>
                  <p className="mt-1.5 font-display text-base font-bold tracking-tight text-slate-950 sm:mt-2 sm:text-xl">
                    {file ? formatBytes(file.size) : "No file"}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-3 sm:rounded-2xl sm:p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:text-xs">
                    Result size
                  </p>
                  <p className="mt-1.5 font-display text-base font-bold tracking-tight text-slate-950 sm:mt-2 sm:text-xl">
                    {metricValue(result, "Size")}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-3 sm:rounded-2xl sm:p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:text-xs">
                    Format
                  </p>
                  <p className="mt-1.5 font-display text-base font-bold tracking-tight text-slate-950 sm:mt-2 sm:text-xl">
                    {metricValue(result, "Format")}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-3 sm:rounded-2xl sm:p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 sm:text-xs">
                    Dimensions
                  </p>
                  <p className="mt-1.5 font-display text-base font-bold tracking-tight text-slate-950 sm:mt-2 sm:text-xl">
                    {metricValue(result, "Dimensions")}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <section className="rounded-xl bg-white p-4 shadow-[0_20px_44px_-32px_rgba(15,23,42,0.2)] sm:rounded-[1.8rem] sm:p-5">
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <h2 className="font-display text-base font-bold tracking-tight text-slate-950 sm:text-xl">
                Live Process
              </h2>
              <span className="text-xs font-semibold text-indigo-600 sm:text-sm">
                {loading ? "Running" : result ? "Ready" : "Idle"}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100 sm:h-3">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                style={{ width: loading ? "76%" : result ? "100%" : "18%" }}
              />
            </div>
            <div className="mt-3 rounded-xl bg-slate-50 p-3 sm:mt-4 sm:rounded-2xl sm:p-4">
              <p className="font-display text-sm font-bold tracking-tight text-slate-950 sm:text-base">
                {loading
                  ? "Processing image..."
                  : result
                    ? "Output ready"
                    : "Waiting for source"}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600 sm:mt-1 sm:text-sm sm:leading-6">
                {loading
                  ? "Analyzing the source and preparing the next export."
                  : result
                    ? "Preview, compare, and download the final export."
                    : "Upload an image and tune the settings to start the workflow."}
              </p>
            </div>
          </section>

          <section className="rounded-[1.5rem] bg-slate-950 p-4 text-white sm:rounded-[2rem] sm:p-6">
            <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 sm:h-12 sm:w-12 sm:rounded-2xl">
                {tool.slug === "image-to-text" ? (
                  <ScanSearch className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-400 sm:text-xs">
                  Result
                </p>
                <h2 className="font-display text-lg font-extrabold tracking-tight sm:text-2xl">
                  {result ? "Your export is ready" : copy.emptyTitle}
                </h2>
              </div>
            </div>

            {error ? (
              <div className="rounded-xl bg-rose-500/12 p-3 text-xs leading-5 text-rose-200 sm:rounded-2xl sm:p-4 sm:text-sm sm:leading-6">
                {error}
              </div>
            ) : result?.previewUrl ? (
              <div className="space-y-3 sm:space-y-4">
                <div className="relative h-[240px] overflow-hidden rounded-[1.25rem] bg-white sm:h-[320px] sm:rounded-[1.7rem]">
                  <Image
                    src={result.previewUrl}
                    alt={`${tool.name} result`}
                    fill
                    unoptimized
                    sizes="(max-width: 1280px) 100vw, 560px"
                    className="object-contain"
                  />
                </div>
                <div className="grid gap-2 sm:gap-2 sm:grid-cols-2">
                  {result.metrics?.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl bg-white/8 px-3 py-2.5 sm:rounded-2xl sm:px-4 sm:py-3"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400 sm:text-[11px]">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-white sm:mt-1 sm:text-sm">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : result?.output ? (
              <div className="space-y-3 sm:space-y-4">
                <pre className="max-h-[240px] overflow-auto rounded-[1.25rem] bg-white/6 p-3 text-xs leading-5 text-slate-200 whitespace-pre-wrap sm:max-h-[320px] sm:rounded-[1.6rem] sm:p-4 sm:text-sm sm:leading-6">
                  {result.output}
                </pre>
              </div>
            ) : (
              <div className="rounded-[1.25rem] bg-white/6 p-4 sm:rounded-[1.7rem] sm:p-6">
                <p className="text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6">
                  Upload the source file, tune the settings, and run the
                  workflow to see the final export here.
                </p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
              <button
                type="button"
                onClick={handleProcess}
                disabled={!file || loading}
                className={cn("inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm", !file && "hidden sm:inline-flex")}
              >
                {loading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin sm:h-4 sm:w-4" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                )}
                {copy.actionLabel}
              </button>
              {(result?.outputBlob || result?.output) && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[11px] font-semibold text-slate-950 transition-colors hover:bg-slate-100 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
                >
                  <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Download result
                </button>
              )}
              {file && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-white/5 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
                >
                  Reset
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
