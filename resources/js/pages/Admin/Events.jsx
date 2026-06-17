import React, { useState } from "react";
import { CalendarDays, MapPin, Plus } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../../components/Motion";
import AdminModal from "../../components/admin/AdminModal";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function Events() {
    const [open, setOpen] = useState(false);
    const events = [
        ["Accreditation Visit Evaluation", "PUP Sta. Mesa, Manila", "July 18, 2026"],
        ["Compliance Document Review", "Online Conference", "July 25, 2026"],
        ["QAC Orientation", "Main Campus", "August 02, 2026"],
    ];

    return (
        <AdminLayout title="Events">
            <Reveal className="mx-auto max-w-7xl rounded-[18px] bg-white p-5 shadow-sm sm:p-8">
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-black">Events</h1>
                        <p className="mt-2 text-[#707070]">Schedule and monitor QAC accreditation activities.</p>
                    </div>
                    <button type="button" onClick={() => setOpen(true)} className="flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#980000] px-6 font-bold text-white">
                        <Plus className="size-5" /> Add Event
                    </button>
                </div>
                <Stagger className="grid gap-5 lg:grid-cols-3">
                    {events.map(([title, venue, date]) => (
                        <StaggerItem as="article" key={title} className="rounded-[8px] border border-[#dedede] p-6 transition hover:-translate-y-1 hover:shadow-md">
                            <CalendarDays className="size-10 text-[#980000]" />
                            <h2 className="mt-5 text-xl font-black">{title}</h2>
                            <div className="mt-4 flex items-center gap-2 text-[#707070]">
                                <MapPin className="size-4" /> {venue}
                            </div>
                            <div className="mt-4 font-black text-[#980000]">{date}</div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </Reveal>

            <AdminModal
                open={open}
                title="Add Event"
                description="Create a QAC event schedule for accreditation activities."
                onClose={() => setOpen(false)}
                footer={
                    <>
                        <button type="button" onClick={() => setOpen(false)} className="h-11 rounded-[8px] border border-[#980000] px-6 font-black text-[#980000]">
                            Cancel
                        </button>
                        <button type="button" onClick={() => setOpen(false)} className="h-11 rounded-[8px] bg-[#980000] px-6 font-black text-white">
                            Save Event
                        </button>
                    </>
                }
            >
                <div className="grid gap-5">
                    <Field label="Title">
                        <input className="h-11 cursor-text rounded-[8px] border border-[#d5d5d5] px-4 outline-none focus:border-[#980000]" placeholder="Event title" />
                    </Field>
                    <Field label="Venue">
                        <input className="h-11 cursor-text rounded-[8px] border border-[#d5d5d5] px-4 outline-none focus:border-[#980000]" placeholder="Venue or online link" />
                    </Field>
                    <Field label="Event Date">
                        <input type="datetime-local" className="h-11 cursor-text rounded-[8px] border border-[#d5d5d5] px-4 outline-none focus:border-[#980000]" />
                    </Field>
                    <Field label="Description">
                        <textarea className="min-h-28 cursor-text resize-y rounded-[8px] border border-[#d5d5d5] p-4 outline-none focus:border-[#980000]" placeholder="Event details" />
                    </Field>
                </div>
            </AdminModal>
        </AdminLayout>
    );
}

function Field({ label, children }) {
    return (
        <label className="grid gap-2">
            <span className="font-black">{label}</span>
            {children}
        </label>
    );
}
