import getMatchById from "@/actions/getMatchById";
import getPlayersByMatchId from "@/actions/getPlayersByMatchId";
import getUser from "@/actions/getUser";
import MatchDetail from "@/components/MatchDetail";
import { Match } from "@prisma/client";
import { notFound } from "next/navigation";

const MatchPage = async ({ params }: { params: { matchId: string } }) => {
    const user = await getUser();

    const match: Match | null = await getMatchById(params.matchId);
    const players = await getPlayersByMatchId(params.matchId);

    if (!match) {
        return notFound();
    }

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <MatchDetail match={match} players={players} currentUser={user!} />
        </main>
    )
}

export default MatchPage;