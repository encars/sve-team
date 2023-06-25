import getMatchById from "@/actions/getMatchById";
import MatchDetail from "@/components/MatchDetail";
import { Match } from "@prisma/client";
import { notFound } from "next/navigation";

interface MatchProps {
    params: {
        matchId: string;
    }
}

export default async function Match({ params }: MatchProps) {
    const match: Match | null = await getMatchById(params.matchId);

    if (!match) {
        return notFound();
    }

    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <MatchDetail match={match} />
        </main>
    )
}