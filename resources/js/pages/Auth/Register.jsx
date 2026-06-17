import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "motion/react";
import { UserPlus } from "lucide-react";
import QacLogo from "../../components/QacLogo";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        role: "faculty",
        phone_number: "",
        academic_program: "",
        specialization: "",
        password: "",
        password_confirmation: "",
    });

    function submit(event) {
        event.preventDefault();
        post("/register");
    }

    return (
        <main className="min-h-screen bg-[#f6f6f6] px-4 py-8 sm:px-6 sm:py-10">
            <Head title="Register" />
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mx-auto mb-8 max-w-3xl">
                <QacLogo />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
            <Card className="mx-auto w-full max-w-3xl rounded-[8px]">
                <CardHeader>
                    <CardTitle className="text-3xl font-black">Create QAC Account</CardTitle>
                    <CardDescription>Register as faculty, QAC personnel, or accreditor.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
                        <Field label="Full Name" error={errors.name}>
                            <Input className="h-11 rounded-[8px]" value={data.name} onChange={(event) => setData("name", event.target.value)} />
                        </Field>

                        <Field label="Email" error={errors.email}>
                            <Input type="email" className="h-11 rounded-[8px]" value={data.email} onChange={(event) => setData("email", event.target.value)} />
                            {!errors.email && <p className="text-xs text-[#777]">Allowed domains: pup.edu.ph, iskolarngbayan.pup.edu.ph</p>}
                        </Field>

                        <Field label="Role" error={errors.role}>
                            <select
                                className="h-11 w-full rounded-[8px] border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                value={data.role}
                                onChange={(event) => setData("role", event.target.value)}
                            >
                                <option value="faculty">Faculty</option>
                                <option value="qac">QAC Personnel</option>
                                <option value="accreditor">Accreditor</option>
                            </select>
                        </Field>

                        <Field label="Phone Number" error={errors.phone_number}>
                            <Input className="h-11 rounded-[8px]" value={data.phone_number} onChange={(event) => setData("phone_number", event.target.value)} />
                        </Field>

                        {data.role === "accreditor" ? (
                            <Field label="Specialization" error={errors.specialization}>
                                <Input className="h-11 rounded-[8px]" value={data.specialization} onChange={(event) => setData("specialization", event.target.value)} />
                            </Field>
                        ) : (
                            <Field label="Academic Program" error={errors.academic_program}>
                                <Input className="h-11 rounded-[8px]" value={data.academic_program} onChange={(event) => setData("academic_program", event.target.value)} />
                            </Field>
                        )}

                        <Field label="Password" error={errors.password}>
                            <Input type="password" className="h-11 rounded-[8px]" value={data.password} onChange={(event) => setData("password", event.target.value)} />
                        </Field>

                        <Field label="Confirm Password" error={errors.password_confirmation}>
                            <Input type="password" className="h-11 rounded-[8px]" value={data.password_confirmation} onChange={(event) => setData("password_confirmation", event.target.value)} />
                        </Field>

                        <div className="md:col-span-2">
                            <Button disabled={processing} className="h-11 w-full rounded-[8px] bg-[#980000] text-white hover:bg-[#7b0000]">
                                <UserPlus className="size-4" />
                                Create account
                            </Button>
                            <p className="mt-5 text-center text-sm text-[#666]">
                                Already registered?{" "}
                                <Link href="/login" className="font-bold text-[#980000] underline-offset-4 hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
            </motion.div>
        </main>
    );
}

function Field({ label, error, children }) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            {children}
            {error && <p className="text-sm font-medium text-[#980000]">{error}</p>}
        </div>
    );
}
