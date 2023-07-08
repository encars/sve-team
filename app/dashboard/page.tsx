import getCurrentUser from "@/actions/getCurrentUser";
import getNextPractice from "@/actions/getNextPractice";
import getUpcomingMatches from "@/actions/getUpcomingMatches";
import NextPractice from "@/components/NextPractice";
import UpcomingMatches from "@/components/UpcomingMatches";
import { Match, Practice } from "@prisma/client";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/");
    }
    
    const matches: Match[] = await getUpcomingMatches();
    const nextPractice: Practice | null = await getNextPractice();

    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <UpcomingMatches matches={matches} />
            <NextPractice practice={nextPractice} />
        </main>
    )
}

export default DashboardPage;