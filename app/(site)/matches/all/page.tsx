import { Match } from "@prisma/client";

import getAllMatches from "@/actions/getAllMatches";
import AllMatches from "@/components/AllMatches";

const AllMatchesPage = async () => {
    const matches: Match[] = await getAllMatches();

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-bold text-2xl text-primary-foreground">
                    All Matches
                </h1>
                <p className="text-base text-muted-foreground">
                    Do you have your calendar ready?
                </p>
            </div>

            <AllMatches matches={matches} />
        </main>
    )
}

export default AllMatchesPage;