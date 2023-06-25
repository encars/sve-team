import getMatches from "@/actions/getMatches";
import UpcomingMatches from "@/components/UpcomingMatches";
import { Match } from "@prisma/client";

export default async function Dashboard() {
    const matches: Match[] = await getMatches();

    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <UpcomingMatches matches={matches} />
            {/* <NextPractice practice={practice} /> */}
        </main>
    )
}