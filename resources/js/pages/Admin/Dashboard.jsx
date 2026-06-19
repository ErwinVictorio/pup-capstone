import React from "react";
import { ClipboardList, FileCheck2, GraduationCap, UsersRound } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../../components/Motion";
import AdminLayout from "../../components/layouts/AdminLayout";
import SummaryCard from "../../components/layouts/SummaryCard";

export default function Dashboard() {
    return (
        <AdminLayout title="QAC Dashboard">
            <div className="mx-auto max-w-[1084px] space-y-6 sm:space-y-8 lg:mt-6">
                <Reveal as="section" className="rounded-[20px] bg-white p-5 shadow-sm sm:p-8">
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-normal text-[#980000]">Quality Assurance Center</p>
                            <h1 className="mt-2 text-3xl font-black sm:text-4xl">Dashboard</h1>
                            <p className="mt-3 max-w-2xl text-[#686868]">
                                Manage accreditation assignments, document submissions, evaluation scores, and scheduled QAC events.
                            </p>
                        </div>
                        <button type="button" className="h-12 w-full rounded-[8px] bg-[#980000] px-6 font-bold text-white sm:w-auto">
                            Generate Report
                        </button>
                    </div>
                </Reveal>

                <Stagger as="section" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    <StaggerItem>
                        <SummaryCard icon={GraduationCap} value="191" label="Accredited Programs" trend="+12 this year" footer="All campuses" />
                    </StaggerItem>
                    <StaggerItem>
                        <SummaryCard icon={ClipboardList} value="24" label="Pending Assignments" tone="gold" trend="8 urgent" footer="Needs review" />
                    </StaggerItem>
                    <StaggerItem>
                        <SummaryCard icon={FileCheck2} value="89%" label="Document Completion" trend="+6%" footer="Current cycle" />
                    </StaggerItem>
                    <StaggerItem>
                        <SummaryCard icon={UsersRound} value="18" label="Active Accreditors" tone="white" trend="+3" footer="Available" />
                    </StaggerItem>
                </Stagger>

                <section className="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
                    <Reveal className="rounded-[20px] bg-white p-5 shadow-sm sm:p-7">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-2xl font-black">Program Accreditation Status</h2>
                            <span className="text-sm font-semibold text-[#980000]">As of March 2026</span>
                        </div>
                        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
                            {[
                                ["47", "Level IV"],
                                ["29", "Level III"],
                                ["41", "Level II"],
                                ["54", "Level I"],
                                ["20", "Candidate"],
                            ].map(([value, label]) => (
                                <StaggerItem key={label} className="rounded-[8px] border border-[#ddd] bg-[#fafafa] p-5 text-center">
                                    <div className="text-4xl font-black text-[#980000] sm:text-5xl">{value}</div>
                                    <div className="mt-4 text-lg font-black">{label}</div>
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </Reveal>

                    <Reveal className="rounded-[20px] bg-white p-5 shadow-sm sm:p-7">
                        <h2 className="text-2xl font-black">Upcoming Events</h2>
                        <div className="mt-6 space-y-4">
                            {[
                                ["Accreditation Visit Evaluation", "Sta. Mesa, Manila", "Jul 18"],
                                ["Document Compliance Review", "Online", "Jul 25"],
                                ["QAC Program Orientation", "Main Campus", "Aug 02"],
                            ].map(([title, venue, date]) => (
                                <div key={title} className="flex items-center gap-4 rounded-[8px] border border-[#e5e5e5] p-4">
                                    <div className="grid size-14 shrink-0 place-items-center rounded-[8px] bg-[#980000] text-center text-sm font-black text-white">
                                        {date}
                                    </div>
                                    <div>
                                        <div className="font-black">{title}</div>
                                        <div className="text-sm text-[#777]">{venue}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </section>
            </div>
        </AdminLayout>
    );
}
