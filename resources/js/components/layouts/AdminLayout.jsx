import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "motion/react";
import {
    Bell,
    CalendarDays,
    ClipboardList,
    LayoutDashboard,
    LogOut,
    Menu,
    PenLine,
    UserCog,
    UserRound,
    X,
} from "lucide-react";
import QacLogo from "../QacLogo";

const navItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Accreditation Assignment", href: "/admin/accreditation-assignment", icon: ClipboardList },
    { title: "Document Evaluation", href: "/admin/document-evaluation", icon: PenLine },
    { title: "Events", href: "/admin/events", icon: CalendarDays },
    { title: "Profile", href: "/admin/profile", icon: UserCog },
];

function isActive(href) {
    if (typeof window === "undefined") return false;

    return window.location.pathname === href || (href === "/dashboard" && window.location.pathname === "/");
}

function NavLinks({ onNavigate }) {
    return (
        <nav className="flex flex-1 flex-col gap-3 px-7 py-8">
            {navItems.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={`relative flex min-h-12 items-center gap-4 rounded-[8px] px-3 text-[16px] font-medium leading-tight text-[#980000] transition ${
                            active ? "bg-white font-black" : "hover:bg-[#fff7f7]"
                        }`}
                    >
                        {active && <span className="absolute -left-7 h-10 w-1 bg-[#980000]" />}
                        <Icon className="size-6 shrink-0 stroke-[1.7]" />
                        <span>{item.title}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

export default function AdminLayout({ children, title = "QAC Dashboard" }) {
    const [open, setOpen] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-[#f5f5f5] text-[#171717]">
            <Head title={title} />

            <header className="fixed inset-x-0 top-0 z-30 flex h-[59px] items-center justify-between bg-[#980000] px-4 text-white shadow-sm sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        aria-label="Open menu"
                        onClick={() => setOpen(true)}
                        className="grid size-10 place-items-center rounded-[8px] border border-white/30 md:hidden"
                    >
                        <Menu className="size-6" />
                    </button>
                    <QacLogo light />
                </div>

                <div className="flex items-center gap-3 sm:gap-5">
                    <button type="button" className="relative grid size-9 place-items-center rounded-full bg-white text-[#980000]">
                        <Bell className="size-5" />
                        <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                            1
                        </span>
                    </button>
                    <Link href="/admin/profile" className="hidden text-right leading-tight sm:block">
                        <div className="max-w-52 truncate font-bold">{user?.name ?? "Profile"}</div>
                        <div className="capitalize">{user?.role ?? "User"}</div>
                    </Link>
                    <Link href="/admin/profile" className="grid size-10 place-items-center overflow-hidden rounded-full border-2 border-white bg-white text-[#980000] sm:size-11">
                        {user?.avatar_url ? (
                            <img src={user.avatar_url} alt={user.name ?? "User avatar"} className="h-full w-full object-cover" />
                        ) : (
                            <UserRound className="size-6 sm:size-7" />
                        )}
                    </Link>
                </div>
            </header>

            <aside className="fixed bottom-0 left-0 top-[59px] z-20 hidden w-[250px] flex-col border-r border-[#e4e4e4] bg-white md:flex">
                <NavLinks />
                <Link href="/logout" method="post" as="button" className="mb-12 ml-8 flex items-center gap-5 text-[17px] text-[#980000]">
                    <LogOut className="size-8 stroke-[1.6]" />
                    <span>Log Out</span>
                </Link>
            </aside>

            <AnimatePresence>
                {open && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="Close menu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-40 bg-black/35 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="fixed bottom-0 left-0 top-0 z-50 flex w-[min(86vw,320px)] flex-col bg-white shadow-2xl md:hidden"
                        >
                            <div className="flex h-[59px] items-center justify-between bg-[#980000] px-4 text-white">
                                <QacLogo compact light />
                                <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-[8px] border border-white/30">
                                    <X className="size-6" />
                                </button>
                            </div>
                            <NavLinks onNavigate={() => setOpen(false)} />
                            <Link href="/logout" method="post" as="button" className="mb-8 ml-8 flex items-center gap-5 text-[17px] text-[#980000]">
                                <LogOut className="size-8 stroke-[1.6]" />
                                <span>Log Out</span>
                            </Link>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <main className="min-h-screen pt-[59px] md:pl-[250px]">
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
