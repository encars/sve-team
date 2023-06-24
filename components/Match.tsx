"use client";

import { Match } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDays, MapPin, Minus, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import { GiWhistle } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

interface MatchProps {
    match: Match;
}

const Match: React.FC<MatchProps> = ({
    match
}) => {
    const router = useRouter();

    const showMatch = (matchId: string) => {
        router.push(`/matches/${matchId}`);
    }

    return (
        <div onClick={() => showMatch(match.id)} className="relative flex flex-col py-2 text-primary-foreground bg-blue-950 rounded-md cursor-pointer">
            <div className="absolute top-2 left-3">
                {match.needRef && (
                    <GiWhistle size={24} />
                )}
            </div>
            <div className="flex justify-between items-center mx-4 mb-1">
                <h1 className="font-mono text-lg flex-grow text-right pr-2">
                    {match.homeTeam}
                </h1>
                <Minus className="text-primary-foreground" size={24} />
                <h1 className="font-mono text-lg flex-grow text-left pl-2">
                    {match.awayTeam}
                </h1>
            </div>

            <div className="flex justify-between items-center mx-4 mb-2">
                <small className="flex items-center gap-2 text-primary-foreground font-mono">
                    <CalendarDays size={18} />
                    {format(new Date(match.date), 'dd.MM.yy')}
                </small>
                <small className="flex items-center gap-2 text-primary-foreground font-mono">
                    <Timer size={18} />
                    {format(new Date(match.date), 'HH:mm')}
                </small>
            </div>

            <div className="flex justify-between items-center mx-4">
                <small className="flex items-center gap-2 text-primary-foreground font-mono">
                    <MapPin size={18} />
                    {match.location}
                </small>

                <small className="flex items-center gap-2 text-primary-foreground font-mono">
                    {match.userIds.length}
                    <IoIosPeople size={18} />
                </small>
            </div>
        </div>
    );
};

export default Match;