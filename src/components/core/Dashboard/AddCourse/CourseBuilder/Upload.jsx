import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(viewData || editData || "");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    previewFile(file);
    setSelectedFile(file);
    setValue(name, file, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: video
      ? { "video/mp4": [".mp4"] }
      : { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  // Register field correctly
  useEffect(() => {
    register(name, {
      required: !viewData && !editData,
    });
  }, [register, name, viewData, editData]);

  // Sync preview when edit/view data changes
  useEffect(() => {
    if (viewData || editData) {
      setPreviewSource(viewData || editData);
    }
  }, [viewData, editData]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-[#F1F2FF]" htmlFor={name}>
        {label} {!viewData && !editData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-[#424854]" : "bg-[#2C333F]"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-[#585D69]`}
      >
        {/* IMPORTANT: merge RHF register + dropzone input */}
        <input {...getInputProps()} />

        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <video
                src={previewSource}
                controls
                className="h-full w-full rounded-md object-cover"
              />
            )}

            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null, { shouldValidate: true });
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-[#999DAA]">
              Drag & drop an {!video ? "image" : "video"}, or click{" "}
              <span className="font-semibold text-yellow-500">Browse</span>
            </p>
          </div>
        )}
      </div>

      {errors?.[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
