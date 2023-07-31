"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DashboardCardProps {
    type: "match" | "practice" | "roster";
};

const DashboardCard: React.FC<DashboardCardProps> = ({
    type
}) => {
    const router = useRouter();

    const cardTitles = {
        match: "Upcoming Matches",
        practice: "Practice Schedule",
        roster: "Roster & Info",
    }

    const cardDescriptions = {
        match: "Be ready to dominate",
        practice: "Refine your skills",
        roster: "Know your teammates",
    }

    return (
        <Link href={``} className="flex flex-col space-y-2 rounded-xl w-full bg-[#FDC427] p-4">
            <div className="h-[200px] flex items-center justify-center rounded-xl p-4 bg-sveYellow">
                <Calendar className="h-16 w-16" />
            </div>
            <div className="flex flex-col">
                <h2 className="font-sans text-lg font-bold">
                    {cardTitles[type]}
                </h2>
                <p className="font-mono">
                    {cardDescriptions[type]}
                </p>
            </div>
        </Link>
    );
};

export default DashboardCard;