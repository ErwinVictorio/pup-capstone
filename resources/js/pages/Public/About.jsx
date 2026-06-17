import React from "react";
import { Reveal, Stagger, StaggerItem } from "../../components/Motion";
import PublicLayout, { HeroBanner } from "../../components/layouts/PublicLayout";

const staff = [
    ["SANJAY P. CLAUDIO MNSA, CESE", "Director"],
    ["PERLA D. CARPIO, MAF", "Assistant Director for Program Quality Assurance"],
    ["REBECCA P. PALMA, MBE", "Assistant Director for Institutional and International Quality Assurance"],
    ["MARY JOY A. CASTILLO, MAF", "Chief, Quality Assurance for Main Campus"],
    ["CHRIST MICHAEL G. INTENZA, MP", "Chief, Accreditation Services"],
    ["MARY GRACE Y. VISRA", "Chief, Document Management"],
];

export default function About() {
    return (
        <PublicLayout title="About PUP QAC">
            <HeroBanner title="About" image="/qac-assets/about-page.png" />

            <Reveal as="section" className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16">
                <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
                    <div className="mx-auto aspect-[4/5] w-full max-w-[280px] bg-[#f1f1f1] lg:mx-0">
                        <img src="/qac-assets/about-page.png" alt="QAC Director" className="h-full w-full object-cover object-top" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-[#980000] sm:text-3xl">Message from the QAC Director</h1>
                        <p className="mt-5 leading-8 text-[#333]">
                            The QAC advances institutional quality through accreditation, government recognition, and continuous improvement of academic programs.
                            This system supports the preparation, monitoring, submission, and evaluation of documents needed for quality assurance work.
                        </p>
                        <p className="mt-6 font-black">Sanjay P. Claudio, DPA</p>
                    </div>
                </div>
            </Reveal>

            <section className="bg-[#fff6d8] px-6 py-14 sm:px-8 sm:py-16">
                <h2 className="text-center text-2xl font-black text-[#980000]">OFFICIALS AND STAFF</h2>
                <Stagger className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {staff.map(([name, position]) => (
                        <StaggerItem as="article" key={name} className="rounded-[8px] p-4 text-center transition hover:bg-white/55">
                            <div className="mx-auto grid size-28 place-items-center bg-white text-[#980000] shadow">
                                <span className="text-3xl font-black">PUP</span>
                            </div>
                            <h3 className="mt-4 text-sm font-black text-[#980000]">{name}</h3>
                            <p className="text-xs font-semibold text-[#8a5a5a]">{position}</p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </section>

            <Stagger as="section" className="mx-auto max-w-6xl space-y-8 px-6 py-14 sm:px-8 sm:py-16">
                {[
                    ["Mission", "Advance an inclusive, equitable, and globally relevant polytechnic education towards national development."],
                    ["Vision", "Provide quality education through instruction, research and extension services."],
                    ["Core Functions", "Assist the academic sector in accreditation, government recognition, quality monitoring, and continuous improvement."],
                    ["Goals", "Establish systems for institutional and program quality assurance."],
                    ["History", "PUP QAC supports academic units in meeting standards for program accreditation and quality recognition."],
                ].map(([heading, body]) => (
                    <StaggerItem key={heading}>
                        <h2 className="text-xl font-black text-[#980000]">{heading}</h2>
                        <p className="mt-3 leading-7 text-[#333]">{body}</p>
                    </StaggerItem>
                ))}
            </Stagger>
        </PublicLayout>
    );
}
