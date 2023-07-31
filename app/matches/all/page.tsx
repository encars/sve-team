import { Match } from "@prisma/client";

import getAllMatches from "@/actions/getAllMatches";
import getCurrentUser from "@/actions/getCurrentUser"
import AllMatches from "@/components/AllMatches";

const AllMatchesPage = async () => {
    const currentUser = await getCurrentUser();
    const matches: Match[] = await getAllMatches();

    return (
        <main className="pt-16 h-screen bg-primary p-2 overflow-y-auto">
            <AllMatches matches={matches} />
        </main>
    )
}

export default AllMatchesPage;