import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "motion/react";
import { LogIn } from "lucide-react";
import QacLogo from "../../components/QacLogo";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    function submit(event) {
        event.preventDefault();
        post("/login");
    }

    return (
        <main className="grid min-h-screen bg-[#f6f6f6] lg:grid-cols-[1.05fr_.95fr]">
            <Head title="Login" />

            <section
                className="relative hidden items-center justify-center overflow-hidden bg-[#980000] p-12 text-white lg:flex"
                style={{
                    backgroundImage: 'linear-gradient(rgba(152,0,0,.82), rgba(70,0,0,.88)), url("/qac-assets/landing-page.png")',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="max-w-xl">
                    <QacLogo light />
                    <h1 className="mt-16 text-6xl font-black uppercase leading-tight tracking-normal">
                        Quality Assurance Center
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-white/85">
                        Access accreditation assignments, document submissions, evaluation reports, and QAC event monitoring.
                    </p>
                </motion.div>
            </section>

            <section className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className="w-full max-w-md">
                <Card className="w-full rounded-[8px]">
                    <CardHeader className="space-y-3">
                        <div className="lg:hidden">
                            <QacLogo />
                        </div>
                        <CardTitle className="text-3xl font-black">Login</CardTitle>
                        <CardDescription>Use your approved PUP email account to continue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="username">PUP Email</Label>
                                <Input
                                    id="username"
                                    type="email"
                                    className="h-11 rounded-[8px]"
                                    value={data.username}
                                    onChange={(event) => setData("username", event.target.value)}
                                    autoComplete="email"
                                    autoFocus
                                />
                                {errors.username && <p className="text-sm font-medium text-[#980000]">{errors.username}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="h-11 rounded-[8px]"
                                    value={data.password}
                                    onChange={(event) => setData("password", event.target.value)}
                                    autoComplete="current-password"
                                />
                                {errors.password && <p className="text-sm font-medium text-[#980000]">{errors.password}</p>}
                            </div>

                            <label className="flex items-center gap-3 text-sm text-[#555]">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(event) => setData("remember", event.target.checked)}
                                    className="size-4 accent-[#980000]"
                                />
                                Remember me
                            </label>

                            <Button disabled={processing} className="h-11 w-full rounded-[8px] bg-[#980000] text-white hover:bg-[#7b0000]">
                                <LogIn className="size-4" />
                                Sign in
                            </Button>

                            <p className="text-center text-sm text-[#666]">
                                No account yet?{" "}
                                <Link href="/register" className="font-bold text-[#980000] underline-offset-4 hover:underline">
                                    Create one
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
                </motion.div>
            </section>
        </main>
    );
}
