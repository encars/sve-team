"use client";

import { Match, User } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDays, Check, MapPin, Timer, X } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { GiWhistle } from "react-icons/gi";
import { Button } from "./ui/button";
import PlayerList from "./PlayerList";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import axios from "axios";
import Notes from "./Notes";

export const revalidate = 0;

interface MatchDetailProps {
    match: Match;
    players: User[];
    currentUser: User;
};

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
        <div className="flex flex-col space-y-2 pt-4 text-center">
            <div className="flex flex-col items-center mx-4 mb-5 text-primary-foreground">
                <h1 className="font-bold text-2xl">
                    {match.homeTeam}
                </h1>
                vs
                <h2 className="font-bold text-2xl">
                    {match.awayTeam}
                </h2>
            </div>

            <section className="flex flex-col space-y-4 p-4 text-primary bg-sveYellowDarker">
                    <div className="flex items-center justify-center space-x-8">
                        <h3 className="flex items-center gap-2 font-semibold">
                            <CalendarDays className="w-8 h-8" />
                            {format(new Date(match.date), 'dd.MM.yy')}
                        </h3>
                        <h3 className="flex items-center gap-2 font-semibold">
                            {match.time}
                            <Timer className="w-8 h-8" />
                        </h3>
                    </div>

                    <div className="flex flex-col items-center space-y-6">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(match.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-semibold truncate">
                            <MapPin className="w-8 h-8" />
                            {match.location}
                        </a>
                        {match.needRef && (
                            <div className="flex items-center gap-2">
                                <GiWhistle className="w-8 h-8" />
                                <p className="font-semibold">
                                    Refs needed!
                                </p>
                            </div>
                        )}
                    </div>

                    <PlayerList players={players} heading="View Lineup" />

                    <Notes notes={match.notes} />

                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                        <Button onClick={handleAccept} disabled={isLoading} className="w-full shadow-md bg-green-600 hover:bg-green-700">
                            <Check className="w-6 h-6 mr-2" />
                            Accept
                        </Button>
                        <Button onClick={handleDecline} disabled={isLoading} className="w-full shadow-md bg-red-600 hover:bg-red-700">
                            <X className="w-6 h-6 mr-2" />
                            Decline
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MatchDetail;