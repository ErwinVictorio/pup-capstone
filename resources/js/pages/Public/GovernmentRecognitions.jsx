import React from "react";
import { Reveal, Stagger, StaggerItem } from "../../components/Motion";
import PublicLayout, { HeroBanner } from "../../components/layouts/PublicLayout";

export default function GovernmentRecognitions() {
    const recognitions = ["CAF", "CCIS", "COC", "COED", "CE", "CSSD", "CTHTM", "ITECH"];

    return (
        <PublicLayout title="Government Recognitions">
            <HeroBanner title="Government Recognition" />
            <section className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16">
                <Reveal>
                    <h1 className="text-center text-3xl font-black text-[#980000] sm:text-4xl">Government Recognitions</h1>
                    <p className="mx-auto mt-5 max-w-4xl text-center leading-8">
                        Records of program recognition and authority documents maintained for compliance monitoring and public reference.
                    </p>
                </Reveal>
                <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {recognitions.map((item, index) => (
                        <StaggerItem as="article" key={item} className="rounded-[8px] border border-[#ddd] p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                            <div className="text-5xl font-black text-[#980000]">{index + 12}</div>
                            <h2 className="mt-4 text-xl font-black">{item}</h2>
                            <p className="mt-2 text-sm text-[#777]">Recognized programs</p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </section>
        </PublicLayout>
    );
}
