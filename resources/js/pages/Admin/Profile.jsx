import React, { useMemo, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Camera, KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";
import { Reveal } from "../../components/Motion";
import UploadDropzone from "../../components/admin/UploadDropzone";
import AdminLayout from "../../components/layouts/AdminLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function Profile({ profile }) {
    const { errors } = usePage().props;
    const [preview, setPreview] = useState(profile.avatar_url);

    const avatarForm = useForm({
        avatar: null,
    });

    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const initials = useMemo(() => {
        return (profile.name ?? profile.email ?? "U")
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }, [profile.name, profile.email]);

    function handleAvatar(file) {
        avatarForm.setData("avatar", file);
        setPreview(URL.createObjectURL(file));
    }

    function submitAvatar(event) {
        event.preventDefault();
        avatarForm.post("/admin/profile/avatar", {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    function submitPassword(event) {
        event.preventDefault();
        passwordForm.put("/admin/profile/password", {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    }

    return (
        <AdminLayout title="Profile">
            <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-[.8fr_1.2fr]">
                <Reveal>
                    <Card className="rounded-[12px]">
                        <CardHeader>
                            <CardTitle className="text-3xl font-black">My Profile</CardTitle>
                            <CardDescription>Manage your account photo and security settings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center text-center">
                                <div className="grid size-36 place-items-center overflow-hidden rounded-full border-4 border-[#980000] bg-[#fff0f0] text-4xl font-black text-[#980000]">
                                    {preview ? <img src={preview} alt="Profile avatar preview" className="h-full w-full object-cover" /> : initials}
                                </div>
                                <h1 className="mt-5 text-2xl font-black">{profile.name}</h1>
                                <div className="mt-2 flex items-center gap-2 text-[#707070]">
                                    <Mail className="size-4" />
                                    <span className="break-all">{profile.email}</span>
                                </div>
                                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#fff0f0] px-4 py-2 text-sm font-black capitalize text-[#980000]">
                                    <ShieldCheck className="size-4" />
                                    {profile.role}
                                </div>
                            </div>

                            <div className="mt-8 grid gap-3 rounded-[8px] border border-[#eeeeee] p-4 text-sm">
                                <Info label="Username" value={profile.username} />
                                <Info label="Status" value={profile.status} />
                            </div>
                        </CardContent>
                    </Card>
                </Reveal>

                <div className="grid gap-6">
                    <Reveal>
                        <Card className="rounded-[12px]">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="grid size-11 place-items-center rounded-[8px] bg-[#980000] text-white">
                                        <Camera className="size-5" />
                                    </div>
                                    <div>
                                        <CardTitle>Upload Avatar</CardTitle>
                                        <CardDescription>Use JPG, PNG, or WebP. Maximum size is 2MB.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submitAvatar} className="grid gap-5">
                                    <UploadDropzone accept="image/jpeg,image/png,image/webp" onFileChange={handleAvatar} />
                                    {errors.avatar && <p className="text-sm font-semibold text-[#980000]">{errors.avatar}</p>}
                                    <Button disabled={!avatarForm.data.avatar || avatarForm.processing} className="h-11 rounded-[8px] bg-[#980000] text-white hover:bg-[#7b0000]">
                                        Save Avatar
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Reveal>

                    <Reveal>
                        <Card className="rounded-[12px]">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="grid size-11 place-items-center rounded-[8px] bg-[#ffd21f] text-[#2a1600]">
                                        <KeyRound className="size-5" />
                                    </div>
                                    <div>
                                        <CardTitle>Update Password</CardTitle>
                                        <CardDescription>Enter your current password before setting a new one.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submitPassword} className="grid gap-5">
                                    <Field label="Current Password" error={errors.current_password}>
                                        <Input type="password" className="h-11 rounded-[8px]" value={passwordForm.data.current_password} onChange={(event) => passwordForm.setData("current_password", event.target.value)} />
                                    </Field>
                                    <Field label="New Password" error={errors.password}>
                                        <Input type="password" className="h-11 rounded-[8px]" value={passwordForm.data.password} onChange={(event) => passwordForm.setData("password", event.target.value)} />
                                    </Field>
                                    <Field label="Confirm New Password" error={errors.password_confirmation}>
                                        <Input type="password" className="h-11 rounded-[8px]" value={passwordForm.data.password_confirmation} onChange={(event) => passwordForm.setData("password_confirmation", event.target.value)} />
                                    </Field>
                                    <Button disabled={passwordForm.processing} className="h-11 rounded-[8px] bg-[#980000] text-white hover:bg-[#7b0000]">
                                        Update Password
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Reveal>
                </div>
            </div>
        </AdminLayout>
    );
}

function Info({ label, value }) {
    return (
        <div className="flex flex-col justify-between gap-1 sm:flex-row">
            <span className="font-black text-[#707070]">{label}</span>
            <span className="break-all font-semibold">{value}</span>
        </div>
    );
}

function Field({ label, error, children }) {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            {children}
            {error && <p className="text-sm font-semibold text-[#980000]">{error}</p>}
        </div>
    );
}
