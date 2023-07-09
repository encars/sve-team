"use client";

import { formatDateAndTime } from "@/lib/dateUtils";
import { Practice, User } from "@prisma/client";
import { CalendarDays, ChevronLeft, MapPin, Timer } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import PlayerList from "./PlayerList";
import { toast } from "./ui/use-toast";
import axios from "axios";

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

    const date = new Date(practice.date);
    const { formattedDate, time } = formatDateAndTime(date);

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
        <div className="relative flex flex-col p-4 text-primary-foreground bg-blue-950 rounded-md">
            <div onClick={() => router.back()} className="absolute top-5 left-8">
                <ChevronLeft size={36} />
            </div>
            <h1 className="font-mono text-2xl text-primary-foreground text-center mt-1 mb-10">
                Practice
            </h1>

            <div className="flex flex-col space-y-8 mb-8">
                <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-primary-foreground font-mono">
                        <CalendarDays size={36} />
                        {formattedDate}
                    </h3>
                    <h3 className="flex items-center gap-2 text-primary-foreground font-mono">
                        {time}
                        <Timer size={36} />
                    </h3>
                </div>

                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(practice.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-primary-foreground font-mono">
                    <MapPin size={36} />
                    {practice.location}
                </a>
            </div>

            <div className="flex flex-col space-y-2 mb-2">
                <h3 className="text-primary-foreground ml-2">
                    Notes:
                </h3>
                <small className="bg-primary p-4 rounded-md">
                    {practice.notes}
                </small>
            </div>

            <div className="bg-primary rounded-md mb-2">
                <PlayerList players={players} heading="View Lineup:" />
            </div>

            <div className="flex space-x-1 w-full h-20">
                <Button onClick={handleAccept} disabled={isLoading} className="h-full w-full bg-green-600">
                    Join practice
                </Button>
                <Button onClick={handleDecline} disabled={isLoading} className="h-full w-full bg-red-600">
                    Decline practice
                </Button>
            </div>
        </div>
    );
};

export default PracticeDetail;