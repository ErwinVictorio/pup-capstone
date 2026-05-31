    import React from "react";

    import { Head } from "@inertiajs/react";
    import AuthenticatedLayout from "../../components/layouts/AuthenticatedLayout";

    export default function Dashboard() {
        return (
            <AuthenticatedLayout>
                <Head title="Dashboard" />

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
                    <p className="text-gray-600">Welcome to your dashboard!</p>
                </div>
            </AuthenticatedLayout>
        );
    }