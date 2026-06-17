import React from "react";

export default function QacLogo({ compact = false, light = false }) {
    return (
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className={`grid size-10 shrink-0 place-items-center rounded-full border-2 sm:size-12 ${light ? "border-white bg-white" : "border-[#980000] bg-white"}`}>
                <div className="grid size-7 place-items-center rounded-full bg-[#980000] text-[10px] font-black text-[#ffd21f] sm:size-8 sm:text-xs">
                    PUP
                </div>
            </div>
            {!compact && (
                <div className={`min-w-0 ${light ? "text-white" : "text-[#880000]"}`}>
                    <div className="truncate font-serif text-[10px] font-bold uppercase leading-none sm:text-xs">
                        Polytechnic University of the Philippines
                    </div>
                    <div className="truncate text-sm font-black uppercase leading-tight tracking-normal sm:text-xl">
                        Quality Assurance Center
                    </div>
                </div>
            )}
        </div>
    );
}
