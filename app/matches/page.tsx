import getCurrentUser from "@/actions/getCurrentUser";
import getMatches from "@/actions/getMatches"
import AllMatches from "@/components/AllMatches";
import { Match } from "@prisma/client"

export default async function Matches() {
    const currentUser = await getCurrentUser();
    const matches: Match[] = await getMatches();

    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <AllMatches matches={matches} />
        </main>
    )
}