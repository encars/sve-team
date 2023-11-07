"use client";

import { Practice, User } from "@prisma/client";
import { CalendarDays, Check, Timer, X } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import PlayerList from "./PlayerList";
import { toast } from "./ui/use-toast";
import axios from "axios";
import { format } from "date-fns";
import Notes from "./Notes";
import { TbMapPinShare } from "react-icons/tb";

interface PracticeDetailProps {
    practice: Practice;
    players: User[];
    currentUser: User;
};

const PracticeDetail: React.FC<PracticeDetailProps> = ({
    practice,
    players,
    currentUser
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (!practice) {
        return notFound();
    }

    const handleAccept = async () => {
        try {
            setIsLoading(true);

            if (currentUser.practiceIds.includes(practice.id)) {
                toast({
                    title: "Practice already accepted",
                    description: "You have already accepted the practice",
                    variant: "destructive"
                });
            } else {
                let practices = [...(currentUser.practiceIds || [])];
                practices.push(practice.id);

                await axios.post("/api/practices/accept", {
                    practiceId: practice.id,
                    practices: practices,
                    userId: currentUser.id
                });

                toast({
                    title: "Practice accepted",
                    description: "You have successfully accepted the practice",
                    variant: "success"
                });
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Error",
                description: "Something went wrong",
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

            if (!currentUser.practiceIds.includes(practice.id)) {
                toast({
                    title: "Practice already declined",
                    description: "You have already declined the practice",
                    variant: "destructive"
                });
            } else {
                let practices = [...(currentUser.practiceIds || [])];
                practices = practices.filter(practiceId => practiceId !== practice.id);

                await axios.post("/api/practices/decline", {
                    practiceId: practice.id,
                    practices: practices,
                    userId: currentUser.id
                });

                toast({
                    title: "Practice declined",
                    description: "You have successfully declined the practice",
                    variant: "success"
                });
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);

            router.refresh();
        }
    }

    return (
        <div className="flex flex-col text-center">
            <div className="flex flex-col items-center py-4 text-primary-foreground">
                <h1 className="font-bold text-2xl">
                    Practice Details
                </h1>
                <h2 className="text-muted-foreground text-lg">
                    {practice.time === "19:15" ? (
                        "Extended"
                    ) : (
                        "Regular"
                    )}
                </h2>
            </div>

            <section className="flex flex-col space-y-4 p-4 text-primary bg-sveYellowDarker">
                <div className="flex items-center justify-center space-x-8 my-4">
                    <h3 className="flex items-center gap-2 font-semibold">
                        <CalendarDays className="w-8 h-8" />
                        {format(new Date(practice.date), 'EEE, dd.MM.yy')}
                    </h3>
                    <h3 className="flex items-center gap-2 font-semibold">
                        {practice.time}
                        <Timer className="w-8 h-8" />
                    </h3>
                </div>

                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(practice.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center font-semibold truncate underline">
                    <TbMapPinShare className="w-8 h-8 mr-2" />
                    {practice.location}
                </a>

                <PlayerList players={players} heading="View Lineup" />

                <Notes notes={practice.notes} />

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

export default PracticeDetail;