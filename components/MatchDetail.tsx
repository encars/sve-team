"use client";

import { Match } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDays, ChevronLeft, MapPin, Timer } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { GiWhistle } from "react-icons/gi";
import { Button } from "./ui/button";
import PlayerList from "./PlayerList";

interface MatchDetailProps {
    match: Match | null;
}

const MatchDetail: React.FC<MatchDetailProps> = ({
    match
}) => {
    const router = useRouter();

    if (!match) {
        return notFound();
    }

    return (
        <div className="relative flex flex-col p-4 text-primary-foreground bg-blue-950 rounded-md">
            <div onClick={() => router.back()} className="absolute top-10 left-8">
                <ChevronLeft size={36} />
            </div>
            <div className="absolute top-10 right-8">
                {match.needRef && (
                    <GiWhistle size={36} />
                )}
            </div>
            <div className="flex flex-col items-center mx-4 mb-5">
                <h1 className="font-mono text-2xl">
                    {match.homeTeam}
                </h1>
                vs
                <h1 className="font-mono text-2xl">
                    {match.awayTeam}
                </h1>
            </div>

            <div className="flex flex-col space-y-8 mb-8">
                <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-primary-foreground font-mono">
                        <CalendarDays size={36} />
                        {format(new Date(match.date), 'dd.MM.yy')}
                    </h3>
                    <h3 className="flex items-center gap-2 text-primary-foreground font-mono">
                        <Timer size={36} />
                        {format(new Date(match.date), 'HH:mm')}
                    </h3>
                </div>

                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(match.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-primary-foreground font-mono">
                    <MapPin size={36} />
                    {match.location}
                </a>
            </div>

            <PlayerList match={match} />

            <div className="flex space-x-1 w-full h-20">
                <Button onClick={() => {}} className="h-full w-full bg-green-600">
                    I&apos;m in!
                </Button>
                <Button onClick={() => {}} className="h-full w-full bg-red-600">
                    I&apos;m out!
                </Button>
            </div>
        </div>
    );
};

export default MatchDetail;