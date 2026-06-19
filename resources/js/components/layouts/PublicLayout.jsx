import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Mail, Menu, Phone, UserCircle, X } from "lucide-react";
import { Reveal } from "../Motion";
import QacLogo from "../QacLogo";

const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about", dropdown: true },
    { label: "Gov. Recognitions", href: "/government-recognitions" },
    { label: "Accreditations", href: "/accreditations" },
];

function active(href) {
    if (typeof window === "undefined") return false;

    return window.location.pathname === href;
}

export default function PublicLayout({ children, title = "PUP QAC" }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white text-[#111]">
            <Head title={title} />
            <header className="sticky top-0 z-30 flex h-[58px] items-center justify-between bg-white px-4 shadow-sm sm:px-6 lg:px-8">
                <Link href="/">
                    <QacLogo />
                </Link>

                <nav className="hidden h-full items-center gap-4 text-[15px] text-[#9a3838] xl:gap-7 lg:flex">
                    {links.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex min-w-24 items-center justify-center gap-2 rounded-[5px] px-4 py-2.5 transition ${
                                active(item.href) ? "bg-[#980000] font-bold text-white" : "hover:bg-[#fff3f3] hover:text-[#980000]"
                            }`}
                        >
                            {item.label}
                            {item.dropdown && <ChevronDown className="size-4" />}
                        </Link>
                    ))}
                    <Link href="/login" className="text-black transition hover:text-[#980000]">
                        <UserCircle className="size-9 stroke-[2.2]" />
                    </Link>
                </nav>

                <button
                    type="button"
                    aria-label="Toggle navigation"
                    onClick={() => setOpen((value) => !value)}
                    className="grid size-10 place-items-center rounded-[8px] border border-[#e5e5e5] text-[#980000] lg:hidden"
                >
                    {open ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2 }}
                        className="sticky top-[58px] z-20 border-b border-[#e8e8e8] bg-white px-4 py-4 shadow-sm lg:hidden"
                    >
                        <div className="grid gap-2">
                            {links.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center justify-between rounded-[8px] px-4 py-3 font-semibold ${
                                        active(item.href) ? "bg-[#980000] text-white" : "text-[#980000] hover:bg-[#fff3f3]"
                                    }`}
                                >
                                    {item.label}
                                    {item.dropdown && <ChevronDown className="size-4" />}
                                </Link>
                            ))}
                            <Link href="/login" onClick={() => setOpen(false)} className="rounded-[8px] px-4 py-3 font-semibold text-[#980000] hover:bg-[#fff3f3]">
                                Login
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {children}

            <footer className="bg-[#980000] px-6 py-12 text-white sm:px-8">
                <Reveal className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1fr_1fr]">
                    <div>
                        <Seal label="PH" />
                        <h3 className="font-serif text-xl font-bold">Republic of the Philippines</h3>
                        <p className="mt-3 max-w-xs text-sm text-white/80">All content is in the public domain unless otherwise stated.</p>
                    </div>
                    <div>
                        <h3 className="font-serif text-xl font-bold">About GOVPH</h3>
                        <p className="mt-3 max-w-sm text-sm text-white/80">
                            Learn more about the Philippine government, its structure, how government works and the people behind it.
                        </p>
                        <div className="mt-8 space-y-3 text-sm font-bold">
                            <div>Official Gazette</div>
                            <div>Open Data Portal</div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-serif text-xl font-bold">Government Links</h3>
                        <div className="mt-5 space-y-3 text-sm font-bold">
                            <div>Office of the President</div>
                            <div>Office of the Vice President</div>
                            <div>Senate of the Philippines</div>
                            <div>House of Representatives</div>
                            <div>Supreme Court</div>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <Seal label="PUP" compact />
                        <div>
                            <div className="flex items-center gap-3 font-black text-[#ffd21f]">
                                <Mail className="size-5 text-white" /> EMAIL
                            </div>
                            <div className="mt-2 break-all text-sm font-bold underline">qac@pup.edu.ph</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 font-black text-[#ffd21f]">
                                <Phone className="size-5 text-white" /> CONTACT US
                            </div>
                            <div className="mt-2 text-sm font-bold underline">(+632) 335-1787 or 335-1777 local 242</div>
                        </div>
                    </div>
                </Reveal>
                <div className="mt-10 text-center text-sm font-semibold text-white/80">
                    Copyright 2024 Polytechnic University of the Philippines
                </div>
            </footer>
        </div>
    );
}

export function HeroBanner({ title, image = "/qac-assets/hero_image.jpeg" }) {
    return (
        <section
            className="relative grid min-h-[330px] place-items-center overflow-hidden bg-[#111] px-4 text-center text-white sm:min-h-[395px]"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45)), url("${image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
            }}
        >
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
                <div className="font-serif text-xl uppercase tracking-normal drop-shadow sm:text-3xl">Polytechnic University of the Philippines</div>
                <h1 className="mt-1 text-5xl font-black uppercase tracking-normal drop-shadow-lg sm:text-7xl md:text-8xl">{title}</h1>
            </motion.div>
        </section>
    );
}

function Seal({ label, compact = false }) {
    return (
        <div className={`mb-5 grid place-items-center rounded-full bg-white text-[#980000] shadow-inner ${compact ? "size-24" : "size-32 sm:size-36"}`}>
            <div className="grid size-[78%] place-items-center rounded-full border-4 border-[#ffd21f] bg-white">
                <div className="grid size-[68%] place-items-center rounded-full bg-[#980000] text-center text-sm font-black text-[#ffd21f]">
                    {label}
                </div>
            </div>
        </div>
    );
}
