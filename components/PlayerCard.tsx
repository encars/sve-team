"use client";

import { User } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import { GiCheckedShield, GiGoalKeeper, GiStrikingBalls } from "react-icons/gi";
import { FaBullseye, FaQuestion } from "react-icons/fa";
import { User2 } from "lucide-react";

interface PlayerCardProps {
    player: User;
};

const PlayerCard: React.FC<PlayerCardProps> = ({
    player
}) => {
    return (
        <div key={player.id} className="flex items-center justify-between gap-2 px-4 py-2 capitalize bg-sveYellow rounded-md shadow-md text-primary cursor-pointer transition duration-300 hover:scale-105">
            <User2 className="w-8 h-8" />
            <p className="flex-grow font-sans font-semibold">
                {player.displayName}
            </p>

            {player.position === "GOLIE" && <GiGoalKeeper size={24} />}
            {player.position === "CENTER" && <FaBullseye size={24} />}
            {player.position === "FORWARD" && <GiStrikingBalls size={24} />}
            {player.position === "DEFENDER" && <GiCheckedShield size={24} />}
            {player.position === null && <FaQuestion size={24} />}
        </div>
    );
};

export default PlayerCard;