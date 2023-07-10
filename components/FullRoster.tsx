"use client";

import { User } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import PlayerCard from "./PlayerCard";
import PositionOverview from "./PositionOverview";

interface FullRosterProps {
    roster: User[];
};

const FullRoster: React.FC<FullRosterProps> = ({
    roster
}) => {
    return (
        <section className="flex flex-col space-y-2 p-2 text-primary-foreground bg-blue-950 rounded-md">
            <div className="flex items-center justify-between mx-1">
                <Link href="/dashboard" className={buttonVariants({ variant: "secondary" })}>
                    <ArrowLeft size={18} />
                </Link>

                <h1 className="grow text-center text-primary-foreground text-2xl">
                    Team Roster
                </h1>

                <div className="w-12" />
            </div>

            <PositionOverview players={roster} />

            <div className="flex flex-col bg-blue-950 space-y-2 p-1 md:grid md:grid-cols-3 lg:grid-cols-4 md:space-y-0 md:gap-2">
                {roster.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                ))}
            </div>
        </section>
    );
};

export default FullRoster;