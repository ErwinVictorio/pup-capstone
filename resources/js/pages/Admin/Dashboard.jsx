    import React from "react";

    import { Head } from "@inertiajs/react";
    import DashboardLayout from "../../components/layouts/DashboardLayout";

    export default function Dashboard() {
        return (
            <DashboardLayout>
                <Head title="QUALITY ASSURANCE CENTER " />

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h1 className="text-2xl font-bold mb-2">Welcome to the QAC Dashboard!</h1>
                    <p className="text-gray-600">Here, you can manage, submit, and monitor accreditation documents with ease.</p>
                </div>

            </DashboardLayout>
        );
    }