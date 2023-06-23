"use client";

import { Match } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDays, ExternalLink, MapPin, Minus, Timer } from "lucide-react";

interface MatchProps {
    match: Match;
}

const Match: React.FC<MatchProps> = ({
    match
}) => {
    return (
        <div className="flex flex-col py-2 text-primary-foreground bg-blue-950 rounded-md">
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
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(match.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                >
                    <small className="flex items-center gap-2 text-primary-foreground font-mono">
                        <ExternalLink size={18} />
                        View on Maps
                    </small>
                </a>
            </div>
        </div>
    );
};

export default Match;