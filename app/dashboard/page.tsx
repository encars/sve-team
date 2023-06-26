import getMatches from "@/actions/getUpcomingMatches";
import getNextPractice from "@/actions/getNextPractice";
import NextPractice from "@/components/NextPractice";
import UpcomingMatches from "@/components/UpcomingMatches";
import { Match, Practice } from "@prisma/client";

export default async function Dashboard() {
    const matches: Match[] = await getMatches();
    const nextPractice: Practice = await getNextPractice();

    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <UpcomingMatches matches={matches} />
            <NextPractice practice={nextPractice} />
        </main>
    )
}