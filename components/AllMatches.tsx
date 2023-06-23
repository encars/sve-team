"use client";

import { Match as MatchType } from "@prisma/client";
import Match from "./Match";
import { buttonVariants } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AllMatchesProps {
    matches: MatchType[];
}

const AllMatches: React.FC<AllMatchesProps> = ({
    matches
}) => {
    return (
        <section className="flex flex-col space-y-2 p-2">
            <div className="flex items-center justify-between mx-1">
                <Link href="/dashboard" className={buttonVariants({ variant: "secondary" })}>
                    <ArrowLeft size={18} />
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

export default AllMatches;