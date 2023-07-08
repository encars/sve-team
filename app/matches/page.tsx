import AllMatches from "@/components/AllMatches";
import getAllMatches from "@/actions/getAllMatches";
import { Match } from "@prisma/client"
import getCurrentUser from "@/actions/getCurrentUser";

const MatchesPage = async () => {
    const currentUser = await getCurrentUser();
    const matches: Match[] = await getAllMatches();

    return (
        <main className="pt-16 h-screen bg-primary p-2 overflow-y-auto">
            <AllMatches matches={matches} />
        </main>
    )
}

export default MatchesPage;