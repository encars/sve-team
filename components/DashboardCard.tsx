import { Book, Calendar, Dumbbell, Users2 } from "lucide-react";
import Link from "next/link";

interface DashboardCardProps {
    type: "match" | "practice" | "roster" | "playbook";
};

const DashboardCard: React.FC<DashboardCardProps> = ({
    type
}) => {
    const cardTitles = {
        match: "Upcoming Matches",
        practice: "Practice Schedule",
        roster: "Roster & Info",
        playbook: "Playbook",
    }

    const cardDescriptions = {
        match: "Be ready to dominate",
        practice: "Refine your skills",
        roster: "Know your teammates",
        playbook: "Know your plays",
    }

    const cardLinks = {
        match: "/matches",
        practice: "/practices",
        roster: "/roster",
        playbook: "/playbook",
    }

    const cardIcons = {
        match: <Calendar className="h-16 w-16" />,
        practice: <Dumbbell className="h-16 w-16" />,
        roster: <Users2 className="h-16 w-16" />,
        playbook: <Book className="h-16 w-16" />,
    }

    return (
        <Link href={cardLinks[type]} className="flex flex-col space-y-2 rounded-xl w-full bg-sveYellowDarker p-4">
            <div className="h-[200px] flex items-center justify-center rounded-xl p-4 bg-sveYellow">
                {cardIcons[type]}
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