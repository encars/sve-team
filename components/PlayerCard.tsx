"use client";

import { User } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import { GiCheckedShield, GiGoalKeeper, GiStrikingBalls } from "react-icons/gi";
import { FaBullseye, FaQuestion } from "react-icons/fa";

interface PlayerCardProps {
    player: User;
};

const PlayerCard: React.FC<PlayerCardProps> = ({
    player
}) => {
    return (
        <div key={player.id} className="flex items-center justify-around gap-2 px-4 py-2 capitalize bg-primary rounded-md">
            <UserAvatar user={player} />
            <p className="flex-grow text-primary-foreground">
                {player.displayName}
            </p>
            <p className="text-primary-foreground">
                {player.position === "GOLIE" && <GiGoalKeeper size={24} />}
                {player.position === "CENTER" && <FaBullseye size={24} />}
                {player.position === "FORWARD" && <GiStrikingBalls size={24} />}
                {player.position === "DEFENDER" && <GiCheckedShield size={24} />}
                {player.position === null && <FaQuestion size={24} />}
            </p>
        </div>
    );
};

export default PlayerCard;