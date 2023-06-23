import getMatches from "@/actions/getMatches";
import UpcomingEvents from "@/components/UpcomingEvents";
import { Match } from "@prisma/client";

export default async function Dashboard() {
    const matches: Match[] = await getMatches();

    console.log(matches)

    return (
        <main className="h-screen bg-primary p-2">
            <UpcomingEvents matches={matches} />
        </main>
    )
}