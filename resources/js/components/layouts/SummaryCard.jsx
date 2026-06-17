import React from "react";
import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, FileCheck2 } from "lucide-react";

const tones = {
    maroon: {
        icon: "bg-[#980000] text-white",
        value: "text-[#980000]",
        accent: "text-[#980000]",
    },
    gold: {
        icon: "bg-[#ffd21f] text-[#2a1600]",
        value: "text-[#980000]",
        accent: "text-[#8a6700]",
    },
    green: {
        icon: "bg-[#eff8e8] text-[#3f8f00]",
        value: "text-[#2f7300]",
        accent: "text-[#3f8f00]",
    },
    blue: {
        icon: "bg-[#edf5ff] text-[#2563eb]",
        value: "text-[#1d4ed8]",
        accent: "text-[#2563eb]",
    },
    white: {
        icon: "bg-white text-[#980000] ring-1 ring-[#e5e5e5]",
        value: "text-[#980000]",
        accent: "text-[#980000]",
    },
};

export default function SummaryCard({
    icon: Icon = FileCheck2,
    label,
    value,
    tone = "maroon",
    trend,
    trendDirection = "up",
    description,
    footer,
    className = "",
}) {
    const palette = tones[tone] ?? tones.maroon;
    const TrendIcon = trendDirection === "down" ? ArrowDownRight : ArrowUpRight;

    return (
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className={`rounded-[8px] border border-[#e5e5e5] bg-white p-5 shadow-sm sm:p-6 ${className}`}
        >
            <div className="flex items-start justify-between gap-5">
                <div className="min-w-0">
                    <div className={`text-3xl font-black sm:text-4xl ${palette.value}`}>{value}</div>
                    <div className="mt-2 text-sm font-semibold text-[#6f6f6f]">{label}</div>
                    {description && <p className="mt-3 text-sm leading-6 text-[#777]">{description}</p>}
                </div>
                <div className={`grid size-12 shrink-0 place-items-center rounded-[8px] sm:size-14 ${palette.icon}`}>
                    <Icon className="size-6 sm:size-7" />
                </div>
            </div>

            {(trend || footer) && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#eeeeee] pt-4 text-sm">
                    {trend && (
                        <div className={`flex items-center gap-1 font-black ${trendDirection === "down" ? "text-[#b42318]" : palette.accent}`}>
                            <TrendIcon className="size-4" />
                            <span>{trend}</span>
                        </div>
                    )}
                    {footer && <div className="font-semibold text-[#777]">{footer}</div>}
                </div>
            )}
        </motion.article>
    );
}
