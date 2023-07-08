import getCurrentUser from "@/actions/getCurrentUser";
import getMatchById from "@/actions/getMatchById";
import getPlayersByMatchId from "@/actions/getPlayersByMatchId";
import MatchDetail from "@/components/MatchDetail";
import { Match } from "@prisma/client";
import { notFound } from "next/navigation";

const MatchPage = async ({ params }: { params: { matchId: string } }) => {
    const currentUser = await getCurrentUser();

    const match: Match | null = await getMatchById(params.matchId);
    const players = await getPlayersByMatchId(params.matchId);

    if (!match) {
        return notFound();
    }

    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <MatchDetail match={match} players={players} currentUser={currentUser!} />
        </main>
    )
}

export default MatchPage;