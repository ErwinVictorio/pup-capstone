import React from "react";
import { Link } from "@inertiajs/react";
import { Award, Building2, GraduationCap, Landmark, UsersRound } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../../components/Motion";
import PublicLayout, { HeroBanner } from "../../components/layouts/PublicLayout";

const features = [
    { label: "Campuses", icon: Building2, href: "/about" },
    { label: "Degree Programs", icon: GraduationCap, href: "/about" },
    { label: "Government Recognition", icon: Landmark, href: "/government-recognitions" },
    { label: "Accreditation", icon: Award, href: "/accreditations" },
    { label: "Personnels", icon: UsersRound, href: "/about" },
];

export default function Home() {
    return (
        <PublicLayout title="PUP Quality Assurance Center">
            <HeroBanner title="Quality Assurance Center" />

            <Stagger as="section" className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-2 sm:px-8 sm:py-20 lg:grid-cols-5">
                {features.map((item) => {
                    const Icon = item.icon;

                    return (
                        <StaggerItem key={item.label} className="h-full">
                            <Link href={item.href} className="group block h-full rounded-[8px] p-4 text-center transition hover:bg-[#fff7f7]">
                                <div className="mx-auto grid size-24 place-items-center text-[#980000] transition group-hover:-translate-y-1">
                                    <Icon className="size-20 stroke-[1.5]" />
                                </div>
                                <h2 className="mt-5 text-xl font-black text-[#980000] sm:text-2xl">{item.label}</h2>
                            </Link>
                        </StaggerItem>
                    );
                })}
            </Stagger>

            <Reveal as="section" className="px-6 pb-16 text-center sm:px-8 sm:pb-20">
                <h2 className="mb-9 text-2xl font-black text-[#980000]">"PUP Ako, Tagumpay Ako!"</h2>
                <div className="mx-auto grid aspect-video max-w-4xl place-items-center overflow-hidden bg-[#111] shadow-xl">
                    <img src="/qac-assets/landing-page.png" alt="PUP QAC media" className="h-full w-full object-cover object-center opacity-80" />
                </div>
            </Reveal>
        </PublicLayout>
    );
}
