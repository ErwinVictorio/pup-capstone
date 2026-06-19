import React, { useState } from "react";
import { Check, Download, Eye, Upload, X } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../../components/Motion";
import AdminModal from "../../components/admin/AdminModal";
import UploadDropzone from "../../components/admin/UploadDropzone";
import AdminLayout from "../../components/layouts/AdminLayout";

const narrative = ["Extension", "Faculty Development", "Instructions", "Linkages & Consortia"];
const areas = Array.from({ length: 10 }, (_, index) => `Area ${index + 1}`);

function FileScoreRow({ label, file, scored = false, onPreview, onScore }) {
    return (
        <div className="grid gap-2 rounded-[8px] border border-[#eee] p-3 text-sm sm:grid-cols-[150px_1fr_auto] sm:items-center sm:border-0 sm:p-0">
            <span>{label}</span>
            <button type="button" onClick={onPreview} className="min-h-7 rounded-[6px] bg-[#dedede] px-3 py-1 text-left text-xs font-black text-[#2d93ff] sm:text-center">
                {file}
            </button>
            <div className="flex items-center gap-3">
                {scored ? (
                    <>
                        <button type="button" onClick={onScore} className="text-[#e2aa00]">
                            <Check className="size-4" />
                        </button>
                        <button type="button" onClick={onScore} className="text-[#980000]">
                            <X className="size-4" />
                        </button>
                    </>
                ) : (
                    <button type="button" onClick={onScore} className="h-7 rounded-[6px] border border-[#777] px-4 text-xs text-[#777]">
                        Score
                    </button>
                )}
            </div>
        </div>
    );
}

export default function DocumentEvaluation() {
    const [modal, setModal] = useState(null);

    function closeModal() {
        setModal(null);
    }

    function openScore(label, file) {
        setModal({ type: "score", label, file });
    }

    function openPreview(label, file) {
        setModal({ type: "preview", label, file });
    }

    return (
        <AdminLayout title="Document Evaluation">
            <Reveal className="mx-auto max-w-[1084px] rounded-[20px] bg-white p-5 shadow-sm sm:p-8 lg:mt-6">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <h1 className="text-2xl font-black">Document Evaluation</h1>
                    <button type="button" className="flex items-center gap-2 text-left text-sm font-semibold text-[#980000]">
                        <Download className="size-4 shrink-0" />
                        Download Accreditation Visit Evaluation Form
                    </button>
                </div>

                <div className="hidden overflow-x-auto rounded-[8px] border border-[#ddd] lg:block">
                    <table className="w-full min-w-[900px] text-center">
                        <thead className="bg-[#e9e9e9] text-[#777]">
                            <tr>
                                {["Campus", "College", "Program", "Level", "Accreditor Assigned", "Score"].map((heading) => (
                                    <th key={heading} className="px-5 py-5 text-base font-black">
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-5 py-5">Sta. Mesa, Manila</td>
                                <td className="px-5 py-5">CCIS</td>
                                <td className="px-5 py-5">Bachelor of Science in Information Technology</td>
                                <td className="px-5 py-5">IV</td>
                                <td className="px-5 py-5">Dela Cruz, Pedro Juan B.</td>
                                <td className="px-5 py-5 italic text-[#b5b5b5]">Not yet released</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="rounded-[8px] border border-[#ddd] p-4 lg:hidden">
                    <div className="font-black text-[#980000]">Bachelor of Science in Information Technology</div>
                    <div className="mt-2 grid gap-1 text-sm text-[#666]">
                        <span>Sta. Mesa, Manila - CCIS</span>
                        <span>Level IV</span>
                        <span>Accreditor: Dela Cruz, Pedro Juan B.</span>
                        <span className="italic text-[#b5b5b5]">Score not yet released</span>
                    </div>
                </div>

                <Stagger className="mt-10 grid gap-10 xl:grid-cols-2">
                    <StaggerItem as="section">
                        <h2 className="mb-5 text-xl font-black">NARRATIVE REPORT</h2>
                        <div className="space-y-4">
                            {narrative.map((item, index) => {
                                const file = `${item.toUpperCase()} (NARRATIVE REPORT).pdf`;
                                return <FileScoreRow key={item} label={item} file={file} scored={index > 0} onPreview={() => openPreview(item, file)} onScore={() => openScore(item, file)} />;
                            })}
                        </div>
                    </StaggerItem>

                    <StaggerItem as="section">
                        <h2 className="mb-5 text-xl font-black">COMPLIANCE REPORT</h2>
                        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-2">
                            {areas.map((item, index) => {
                                const file = `AREA ${index + 1}.pdf`;
                                return <FileScoreRow key={item} label={item} file={file} scored={index % 2 === 0} onPreview={() => openPreview(item, file)} onScore={() => openScore(item, file)} />;
                            })}
                        </div>
                    </StaggerItem>

                    <StaggerItem as="section">
                        <h2 className="mb-5 text-xl font-black">BEST PRACTICE</h2>
                        <div className="space-y-4">
                            {narrative.map((item, index) => {
                                const file = `${item.toUpperCase()} (BEST PRACTICE).pdf`;
                                return <FileScoreRow key={item} label={item} file={file} scored={index > 0} onPreview={() => openPreview(item, file)} onScore={() => openScore(item, file)} />;
                            })}
                        </div>
                    </StaggerItem>

                    <StaggerItem as="section">
                        <h2 className="mb-5 text-xl font-black">WEBSITE</h2>
                        <div className="flex flex-wrap items-center gap-4">
                            <input className="h-12 w-full min-w-0 cursor-text rounded-[8px] border-2 border-[#980000] px-5 sm:max-w-md" value="https://www.wixsite.com/CCIS-BSIT" readOnly />
                            <button type="button" onClick={() => openScore("Website", "Program Website")} className="text-[#e2aa00]">
                                <Check className="size-5" />
                            </button>
                            <button type="button" onClick={() => openScore("Website", "Program Website")} className="text-[#980000]">
                                <X className="size-5" />
                            </button>
                        </div>
                    </StaggerItem>
                </Stagger>

                <div className="mt-12 flex justify-end">
                    <button type="button" onClick={() => setModal({ type: "upload" })} className="flex h-12 w-full items-center justify-center gap-3 rounded-[8px] bg-[#980000] px-8 font-black text-white sm:w-auto">
                        <Upload className="size-5" />
                        Upload Evaluation Form
                    </button>
                </div>
            </Reveal>

            <AdminModal
                open={modal?.type === "upload"}
                title="Upload Evaluation Form"
                description="Attach the completed accreditation visit evaluation form."
                onClose={closeModal}
                footer={<ModalFooter primary="Submit" onClose={closeModal} />}
            >
                <UploadDropzone accept=".pdf,.doc,.docx" />
            </AdminModal>

            <AdminModal
                open={modal?.type === "score"}
                title="Score Document"
                description={modal?.file}
                onClose={closeModal}
                footer={<ModalFooter primary="Save Score" onClose={closeModal} />}
            >
                <div className="grid gap-5">
                    <label className="grid gap-2">
                        <span className="font-black">Score</span>
                        <input type="number" min="0" max="100" className="h-11 cursor-text rounded-[8px] border border-[#d5d5d5] px-4 outline-none focus:border-[#980000]" placeholder="0-100" />
                    </label>
                    <label className="grid gap-2">
                        <span className="font-black">Remarks</span>
                        <textarea className="min-h-28 cursor-text resize-y rounded-[8px] border border-[#d5d5d5] p-4 outline-none focus:border-[#980000]" placeholder="Evaluation remarks" />
                    </label>
                </div>
            </AdminModal>

            <AdminModal
                open={modal?.type === "preview"}
                title="Document Preview"
                description={modal?.file}
                onClose={closeModal}
                footer={<ModalFooter primary="Close" onClose={closeModal} />}
            >
                <div className="grid min-h-56 place-items-center rounded-[8px] border border-dashed border-[#d5d5d5] bg-[#fafafa] text-center">
                    <div>
                        <Eye className="mx-auto size-10 text-[#980000]" />
                        <p className="mt-3 font-black">{modal?.label}</p>
                        <p className="mt-1 text-sm text-[#777]">File preview placeholder</p>
                    </div>
                </div>
            </AdminModal>
        </AdminLayout>
    );
}

function ModalFooter({ primary, onClose }) {
    return (
        <>
            <button type="button" onClick={onClose} className="h-11 rounded-[8px] border border-[#980000] px-6 font-black text-[#980000]">
                Cancel
            </button>
            <button type="button" onClick={onClose} className="h-11 rounded-[8px] bg-[#980000] px-6 font-black text-white">
                {primary}
            </button>
        </>
    );
}
