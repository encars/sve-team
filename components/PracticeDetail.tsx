"use client";

import { formatDateAndTime } from "@/lib/dateUtils";
import { Practice } from "@prisma/client";
import { CalendarDays, ChevronLeft, MapPin, Timer } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import PracticeList from "./PracticeList";

interface PracticeDetailProps {
    practice: Practice;
}

const PracticeDetail: React.FC<PracticeDetailProps> = ({
    practice
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (!practice) {
        return notFound();
    }

    const date = new Date(practice.date);
    const { formattedDate, time } = formatDateAndTime(date);

    const handleAccept = async () => {
        // TODO: Implement
    }

    const handleDecline = async () => {
        // TODO: Implement
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

            <PracticeList practice={practice} />

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