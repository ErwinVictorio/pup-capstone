import React, { useState } from "react";
import { Check, ClipboardList, Search, X } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../../components/Motion";
import AdminModal from "../../components/admin/AdminModal";
import AdminLayout from "../../components/layouts/AdminLayout";

export default function AccreditationAssignment() {
    const [modal, setModal] = useState(null);
    const rows = [
        ["Sta. Mesa, Manila", "CCIS", "Bachelor of Science in Information Technology", "IV", "Pending"],
        ["Sta. Mesa, Manila", "CAF", "Bachelor of Science in Accountancy", "III", "Accepted"],
        ["Quezon City", "COED", "Bachelor of Elementary Education", "II", "For Review"],
    ];

    function openModal(type, assignment) {
        setModal({ type, assignment });
    }

    function closeModal() {
        setModal(null);
    }

    return (
        <AdminLayout title="Accreditation Assignment">
            <Reveal className="mx-auto max-w-7xl rounded-[18px] bg-white p-5 shadow-sm sm:p-8">
                <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div>
                        <h1 className="text-3xl font-black">Accreditation Assignment</h1>
                        <p className="mt-2 text-[#707070]">Review, accept, or reject program accreditation assignments.</p>
                    </div>
                    <div className="flex h-12 w-full items-center gap-3 rounded-[8px] border border-[#d5d5d5] px-4 sm:max-w-sm">
                        <Search className="size-5 shrink-0 text-[#980000]" />
                        <input className="min-w-0 flex-1 cursor-text outline-none" placeholder="Search assignment" />
                    </div>
                </div>

                <div className="hidden overflow-x-auto rounded-[8px] border border-[#ddd] lg:block">
                    <table className="w-full min-w-[900px] text-left">
                        <thead className="bg-[#ebebeb] text-[#777]">
                            <tr>
                                {["Campus", "College", "Program", "Level", "Status", "Action"].map((heading) => (
                                    <th key={heading} className="px-6 py-5 text-base font-black">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.join("-")} className="border-t border-[#eee]">
                                    {row.map((cell) => (
                                        <td key={cell} className="px-6 py-5">
                                            {cell}
                                        </td>
                                    ))}
                                    <td className="px-6 py-5">
                                        <ActionButtons onAccept={() => openModal("accept", row)} onReject={() => openModal("reject", row)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Stagger className="grid gap-4 lg:hidden">
                    {rows.map(([campus, college, program, level, status]) => (
                        <StaggerItem key={`${college}-${program}`} className="rounded-[8px] border border-[#ddd] p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="font-black text-[#980000]">{program}</div>
                                    <div className="mt-1 text-sm text-[#707070]">{campus} · {college}</div>
                                </div>
                                <span className="rounded-full bg-[#fff0f0] px-3 py-1 text-xs font-black text-[#980000]">{status}</span>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="font-semibold">Level {level}</span>
                                <ActionButtons onAccept={() => openModal("accept", [campus, college, program, level, status])} onReject={() => openModal("reject", [campus, college, program, level, status])} />
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>

                <div className="mt-8 rounded-[8px] border border-dashed border-[#c8c8c8] p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="grid size-12 shrink-0 place-items-center rounded-[8px] bg-[#980000] text-white">
                            <ClipboardList className="size-6" />
                        </div>
                        <div>
                            <div className="font-black">Assignment note workflow</div>
                            <div className="text-sm text-[#707070]">Accept and reject note dialogs are now wired as modal forms.</div>
                        </div>
                    </div>
                </div>
            </Reveal>

            <AdminModal
                open={Boolean(modal)}
                title={modal?.type === "reject" ? "Reject Assignment" : "Accept Assignment"}
                description={modal?.assignment?.[2]}
                onClose={closeModal}
                footer={
                    <>
                        <button type="button" onClick={closeModal} className="h-11 rounded-[8px] border border-[#980000] px-6 font-black text-[#980000]">
                            Cancel
                        </button>
                        <button type="button" onClick={closeModal} className="h-11 rounded-[8px] bg-[#980000] px-6 font-black text-white">
                            {modal?.type === "reject" ? "Reject Assignment" : "Accept Assignment"}
                        </button>
                    </>
                }
            >
                <label className="grid gap-2">
                    <span className="font-black text-[#333]">Note</span>
                    <textarea
                        className="min-h-32 resize-y rounded-[8px] border border-[#d5d5d5] p-4 outline-none focus:border-[#980000]"
                        placeholder={modal?.type === "reject" ? "Explain why this assignment is rejected" : "Add optional acceptance note"}
                    />
                </label>
            </AdminModal>
        </AdminLayout>
    );
}

function ActionButtons({ onAccept, onReject }) {
    return (
        <div className="flex gap-3">
            <button type="button" onClick={onAccept} className="grid size-9 place-items-center rounded-full bg-[#f0f7e8] text-[#3f8f00]">
                <Check className="size-5" />
            </button>
            <button type="button" onClick={onReject} className="grid size-9 place-items-center rounded-full bg-[#fff0f0] text-[#980000]">
                <X className="size-5" />
            </button>
        </div>
    );
}
