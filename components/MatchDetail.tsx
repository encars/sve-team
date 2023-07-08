"use client";

import { Match, User } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDays, ChevronLeft, MapPin, Timer } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { GiWhistle } from "react-icons/gi";
import { Button } from "./ui/button";
import PlayerList from "./PlayerList";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import axios from "axios";

export const revalidate = 0;

interface MatchDetailProps {
    match: Match;
    players: User[];
    currentUser: User;
}

const MatchDetail: React.FC<MatchDetailProps> = ({
    match,
    players,
    currentUser
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (!match) {
        return notFound();
    }

    const handleAccept = async () => {
        try {
            setIsLoading(true);

            if (currentUser.matchIds.includes(match.id)) {
                toast({
                    title: "Match already accepted",
                    description: "You have already accepted the match",
                    variant: "destructive"
                });
            } else {
                let matches = [...(currentUser.matchIds || [])];
                matches.push(match.id);

                await axios.post("/api/matches/accept", {
                    matchId: match.id,
                    matches: matches,
                    userId: currentUser.id
                });

                toast({
                    title: "Match accepted",
                    description: "You have successfully accepted the match",
                    variant: "success"
                });
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Something went wrong",
                description: "We could not accept the match",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);

            router.refresh();
        }
    }

    const handleDecline = async () => {
        try {
            setIsLoading(true);

            if (!currentUser.matchIds.includes(match.id)) {
                toast({
                    title: "Match already declined",
                    description: "You have already declined the match",
                    variant: "destructive"
                });
            } else {
                let matches = [...(currentUser.matchIds || [])];
                matches = matches.filter((matchId: string) => matchId !== match.id);

                await axios.post("/api/matches/decline", {
                    matchId: match.id,
                    matches: matches,
                    userId: currentUser.id
                });

                toast({
                    title: "Match declined",
                    description: "You have successfully declined the match",
                    variant: "success"
                });
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Something went wrong",
                description: "We could not decline the match",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);

            router.refresh();
        }
    }

    return (
        <div className="relative flex flex-col p-4 text-primary-foreground bg-blue-950 rounded-md">
            <div onClick={() => router.back()} className="absolute top-10 left-8 cursor-pointer">
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
                        {format(new Date(match.date), 'HH:mm')}
                        <Timer size={36} />
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
                <PlayerList players={players} />
            </div>

            <div className="flex space-x-1 w-full h-20">
                <Button onClick={handleAccept} disabled={isLoading} className="h-full w-full bg-green-600 hover:bg-green-700">
                    I&apos;m in!
                </Button>
                <Button onClick={handleDecline} disabled={isLoading} className="h-full w-full bg-red-600 hover:bg-red-700">
                    I&apos;m out!
                </Button>
            </div>
        </div>
    );
};

export default MatchDetail;