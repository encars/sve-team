import { redirect } from "next/navigation";

import getCurrentUser from "@/actions/getCurrentUser";
import DashboardCard from "@/components/DashboardCard";
import Welcome from "@/components/Welcome";
import Footer from "@/components/Footer";

const DashboardPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/");
    }
    
    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto">
            <Welcome />
            <div className="flex flex-col md:flex-row space-y-2 bg-sveYellow p-4">
                <DashboardCard type="match" />
                <DashboardCard type="practice" />
                <DashboardCard type="roster" />
                <DashboardCard type="playbook" />
            </div>
            <Footer />
        </main>
    )
}

export default DashboardPage;