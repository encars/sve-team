import getCurrentUser from "@/actions/getCurrentUser";
import getNextPractice from "@/actions/getNextPractice";
import getUpcomingMatches from "@/actions/getUpcomingMatches";
import NextPractice from "@/components/NextPractice";
import UpcomingMatches from "@/components/UpcomingMatches";
import { Match, Practice } from "@prisma/client";
import { redirect } from "next/navigation";
import DashboardCard from "@/components/DashboardCard";
import Welcome from "@/components/Welcome";

const DashboardPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/");
    }
    
    const matches: Match[] = await getUpcomingMatches();
    const nextPractice: Practice | null = await getNextPractice();

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto">
            {/* <UpcomingMatches matches={matches} />
            <NextPractice practice={nextPractice} /> */}
            <Welcome />
            <div className="flex flex-col space-y-2 bg-sveYellow p-4">
                <DashboardCard type="match" />
                <DashboardCard type="practice" />
                <DashboardCard type="roster" />
            </div>
        </main>
    )
}

export default DashboardPage;