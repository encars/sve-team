"use client";

import { Match } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDays, ChevronLeft, MapPin, Timer } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { GiWhistle } from "react-icons/gi";
import { Button } from "./ui/button";
import PlayerList from "./PlayerList";
import { useState } from "react";
import axios from "axios";
import { toast } from "./ui/use-toast";

interface MatchDetailProps {
    match: Match;
}

const MatchDetail: React.FC<MatchDetailProps> = ({
    match
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (!match) {
        return notFound();
    }

    const handleAccept = async () => {
        setIsLoading(true);

        axios.post("/api/matches/accept", {
            matchId: match.id
        })
        .then(() => {
            toast({
                title: "Match accepted",
                description: "You have accepted the match",
                variant: "default"
            });
        })
        .catch((error) => {
            if (error.response.status === 409) {
                toast({
                    title: "Match already accepted",
                    description: "You have already accepted the match",
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Something went wrong",
                    description: "We could not accept the match",
                    variant: "destructive"
                });
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const handleDecline = () => {
        setIsLoading(true);

        axios.post("/api/matches/decline", {
            matchId: match.id
        })
        .then(() => {
            toast({
                title: "Match declined",
                description: "You have declined the match",
                variant: "default"
            });
        })
        .catch((error) => {
            if (error.response.status === 409) {
                toast({
                    title: "Match already declined",
                    description: "You have already declined the match",
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Something went wrong",
                    description: "We could not decline the match",
                    variant: "destructive"
                });
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
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

            <div className="bg-primary rounded-md mb-2">
                <PlayerList match={match} />
            </div>

            <div className="flex space-x-1 w-full h-20">
                <Button onClick={handleAccept} disabled={isLoading} className="h-full w-full bg-green-600">
                    I&apos;m in!
                </Button>
                <Button onClick={handleDecline} disabled={isLoading} className="h-full w-full bg-red-600">
                    I&apos;m out!
                </Button>
            </div>
        </div>
    );
};

export default MatchDetail;