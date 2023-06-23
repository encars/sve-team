interface MatchProps {
    params: {
        matchId: string;
    }
}

export default async function Match({ params }: MatchProps) {
    console.log(params)
    return (
        <main className="pt-16 h-screen bg-primary p-2">
            <h1 className="text-white">
                Match {params.matchId}
            </h1>
        </main>
    )
}