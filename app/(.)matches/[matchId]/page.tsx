import getMatchById from "@/actions/getMatchById";
import MatchDetail from "@/components/MatchDetail";
import { Match } from "@prisma/client";

interface MatchProps {
    params: {
        matchId: string;
    }
}

export default async function Match({ params }: MatchProps) {
    const match: Match | null = await getMatchById(params.matchId);

    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <MatchDetail match={match} />
        </main>
    )
}