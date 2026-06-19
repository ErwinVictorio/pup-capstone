import React from "react";
import { Reveal, Stagger, StaggerItem } from "../../components/Motion";
import PublicLayout, { HeroBanner } from "../../components/layouts/PublicLayout";

export default function Accreditations() {
    const stats = [
        ["47", "Level IV"],
        ["29", "Level III"],
        ["41", "Level II"],
        ["54", "Level I"],
        ["20", "Candidate"],
    ];

    return (
        <PublicLayout title="Accreditations">
            <HeroBanner title="Accreditation" />

            <section className="mx-auto max-w-6xl px-6 py-14 text-center sm:px-8 sm:py-16">
                <Reveal>
                    <h1 className="text-3xl font-black text-[#980000] sm:text-4xl">
                        Institutionalizing Quality: A Strategic Overview of PUP-QAC
                    </h1>
                    <p className="mx-auto mt-8 max-w-5xl leading-8">
                        The Polytechnic University of the Philippines positions Quality Assurance as a cornerstone of academic operations, integrating external
                        accreditation into long-term institutional development.
                    </p>
                    <div className="mx-auto mt-14 h-1 max-w-5xl bg-[#980000]" />
                </Reveal>

                <Reveal delay={0.08}>
                    <h2 className="mt-16 font-serif text-3xl font-black text-[#980000] sm:text-5xl">PROGRAM ACCREDITATION STATUS</h2>
                    <p className="mt-3 text-sm tracking-[.25em] text-[#980000] sm:text-base">As of March 2026</p>
                </Reveal>

                <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
                    {stats.map(([value, label]) => (
                        <StaggerItem as="article" key={label}>
                            <div className="grid aspect-square place-items-center border border-[#222] bg-[#f5f5f5]">
                                <span className="text-6xl font-black text-[#980000] drop-shadow sm:text-7xl">{value}</span>
                            </div>
                            <h3 className="mt-7 text-2xl font-black">{label}</h3>
                        </StaggerItem>
                    ))}
                </Stagger>
            </section>
        </PublicLayout>
    );
}
