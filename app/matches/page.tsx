import getAllMatches from "@/actions/getAllMatches";
import { Match } from "@prisma/client"
import getCurrentUser from "@/actions/getCurrentUser";
import UpcomingMatches from "@/components/UpcomingMatches";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MatchesPage = async () => {
    const currentUser = await getCurrentUser();
    const matches: Match[] = await getAllMatches(2);

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-sans font-bold text-2xl text-primary-foreground">
                    Your Matches
                </h1>
                <p className="font-sans text-base text-muted-foreground">
                    Match day is the best day.
                </p>
            </div>

            <div className="flex flex-col space-y-4">
                <UpcomingMatches matches={matches} />
                
                <Link href="/matches/all" className={cn("mx-4", buttonVariants({ variant: "secondary" }))}>
                    <div className="flex items-center justify-between space-x-4">
                        <p className="font-sans">
                            View all matches
                        </p>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </Link>
            </div>
        </main>
    )
}

export default MatchesPage;