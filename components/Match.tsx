"use client";

import { Match } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDays, MapPin, Minus, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import { IoIosPeople } from "react-icons/io";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { GiWhistle } from "react-icons/gi";

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
        <div onClick={() => showMatch(match.id)} className="relative flex flex-col py-2 text-primary bg-sveYellow rounded-md cursor-pointer transition duration-300 hover:scale-105">
            {match.needRef && (
                <div className="absolute -top-2 -right-2 shadow-md rounded-full">
                    <Avatar>
                        <AvatarFallback>
                            <GiWhistle className="h-6 w-6" />
                        </AvatarFallback>
                    </Avatar>
                </div>
            )}
            <div className="flex justify-between items-center mx-4 mb-1">
                <div className="w-full flex items-center space-x-2">
                    <h1 className="font-bold text-lg pr-2 truncate">
                        {match.homeTeam}
                    </h1>
                    <Minus size={24} />
                    <h1 className="font-bold text-lg pl-2 truncate">
                        {match.awayTeam}
                    </h1>
                </div>
            </div>

            <div className="flex justify-between items-center mx-4 mb-2">
                <small className="flex items-center gap-2  font-mono">
                    <CalendarDays size={18} />
                    {format(new Date(match.date), 'dd.MM.yy')}
                </small>
                <small className="flex items-center gap-2  font-mono">
                    {match.time}
                    <Timer size={18} />
                </small>
            </div>

            <div className="flex justify-between items-center mx-4">
                <small className="flex items-center gap-2 font-mono truncate">
                    <MapPin size={18} />
                    {match.location}
                </small>

                <small className="flex items-center gap-2 font-mono">
                    {match.userIds.length}
                    <IoIosPeople size={18} />
                </small>
            </div>
        </div>
    );
};

export default Match;