import React, { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

export default function UploadDropzone({ accept = ".pdf,.doc,.docx", onFileChange }) {
    const inputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    function setFile(file) {
        if (!file) return;

        setFileName(file.name);
        onFileChange?.(file);
    }

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
                event.preventDefault();
                setFile(event.dataTransfer.files?.[0]);
            }}
            className="grid min-h-44 cursor-pointer place-items-center rounded-[12px] border-2 border-dashed border-[#b84b4b] bg-[#f8e6e6] p-6 text-center transition hover:bg-[#f5dddd]"
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(event) => setFile(event.target.files?.[0])}
            />
            <div>
                <UploadCloud className="mx-auto size-10 text-[#980000]" />
                <p className="mt-4 text-sm text-[#777]">
                    Drag and drop your file or <span className="font-black text-[#980000] underline">Browse</span>
                </p>
                {fileName && <p className="mt-3 rounded-full bg-white px-4 py-2 text-sm font-black text-[#980000]">{fileName}</p>}
            </div>
        </div>
    );
}
