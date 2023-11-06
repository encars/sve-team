import getAllMatches from "@/actions/getAllMatches";
import { Match } from "@prisma/client"
import UpcomingMatches from "@/components/UpcomingMatches";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MatchesPage = async () => {
    const matches: Match[] = await getAllMatches(2);

    return (
        <main className="pt-14 h-screen bg-primary overflow-y-auto flex flex-col">
            <div className="flex flex-col space-y-2 p-4 text-center">
                <h1 className="font-bold text-2xl text-primary-foreground">
                    Upcoming Matches
                </h1>
                <p className="text-base text-muted-foreground">
                    Are you ready to dominate the competition?
                </p>
            </div>

            <div className="flex flex-col space-y-4">
                <UpcomingMatches matches={matches} />
                
                <Link href="/matches/all" className={cn("mx-4", buttonVariants({ variant: "secondary" }))}>
                    <div className="flex items-center justify-between space-x-4">
                        <p>
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