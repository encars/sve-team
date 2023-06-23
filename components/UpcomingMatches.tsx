"use client";

import { Match as MatchType } from "@prisma/client";
import Match from "./Match";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import clsx from "clsx";

interface UpcomingMatchesProps {
    matches: MatchType[];
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({
    matches
}) => {
    return (
        <section className="flex flex-col space-y-2 p-2">
            <div className="flex items-center justify-between mx-1">
                <h1 className="text-primary-foreground text-xl">
                    Upcoming Matches:
                </h1>

                <Link href="/matches" className={clsx("gap-2", buttonVariants({ variant: "secondary" }))}>
                    View all
                    <ArrowRight size={18} />
                </Link>
            </div>
            
            <div className="flex flex-col space-y-2 p-1">
                {matches.map((match) => (
                    <Match key={match.id} match={match} />
                ))}
            </div>
        </section>
    );
};

export default UpcomingMatches;