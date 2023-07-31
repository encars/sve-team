import getAllMatches from "@/actions/getAllMatches";
import { Match } from "@prisma/client"
import getCurrentUser from "@/actions/getCurrentUser";
import UpcomingMatches from "@/components/UpcomingMatches";

const MatchesPage = async () => {
    const currentUser = await getCurrentUser();
    const matches: Match[] = await getAllMatches(2);

    return (
        <main className="pt-16 h-screen bg-primary p-2 overflow-y-auto">
            <UpcomingMatches matches={matches} />
        </main>
    )
}

export default MatchesPage;