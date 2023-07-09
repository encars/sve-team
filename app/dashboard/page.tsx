import getCurrentUser from "@/actions/getCurrentUser";
import getNextPractice from "@/actions/getNextPractice";
import getRoster from "@/actions/getRoster";
import getUpcomingMatches from "@/actions/getUpcomingMatches";
import NextPractice from "@/components/NextPractice";
import Roster from "@/components/Roster";
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
    const roster = await getRoster();

    return (
        <main className="pt-16 h-screen bg-primary p-2 overflow-y-auto">
            <UpcomingMatches matches={matches} />
            <NextPractice practice={nextPractice} />
            <Roster players={roster} />
        </main>
    )
}

export default DashboardPage;