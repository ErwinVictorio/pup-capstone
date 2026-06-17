import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

export default function AdminModal({ open, title, description, children, footer, onClose }) {
    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[80] grid place-items-center px-4 py-6">
                    <motion.button
                        type="button"
                        aria-label="Close modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/55"
                    />
                    <motion.section
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[14px] bg-white shadow-2xl"
                    >
                        <header className="flex items-start justify-between gap-4 border-b border-[#eeeeee] p-6">
                            <div>
                                <h2 className="text-2xl font-black">{title}</h2>
                                {description && <p className="mt-2 text-sm leading-6 text-[#707070]">{description}</p>}
                            </div>
                            <button type="button" onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-full text-[#980000] hover:bg-[#fff0f0]">
                                <X className="size-5" />
                            </button>
                        </header>
                        <div className="p-6">{children}</div>
                        {footer && <footer className="flex flex-col-reverse gap-3 border-t border-[#eeeeee] p-6 sm:flex-row sm:justify-end">{footer}</footer>}
                    </motion.section>
                </div>
            )}
        </AnimatePresence>
    );
}
