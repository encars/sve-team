"use client";

import { User } from "@prisma/client";

import { GiCheckedShield, GiGoalKeeper, GiStrikingBalls } from "react-icons/gi";
import { FaBullseye, FaQuestion } from "react-icons/fa";
import PlayerNumber from "./PlayerNumber";
import UpdatePlayer from "./UpdatePlayer";

interface PlayerCardProps {
    player: User;
    editable?: boolean;
};

const PlayerCard: React.FC<PlayerCardProps> = ({
    player,
    editable
}) => {
    return (
        <div className="flex items-center justify-between space-x-4 w-full p-2 rounded-md shadow-md bg-sveYellowDarker">
            <div className="flex items-center space-x-2">
                <p className="ml-2">
                    {player.position === "GOLIE" && <GiGoalKeeper size={24} />}
                    {player.position === "CENTER" && <FaBullseye size={24} />}
                    {player.position === "FORWARD" && <GiStrikingBalls size={24} />}
                    {player.position === "DEFENDER" && <GiCheckedShield size={24} />}
                    {player.position === null && <FaQuestion size={24} />}
                </p>
                <p className="font-normal">
                    {player.displayName}
                </p>
            </div>
            <div className="flex items-center space-x-4 font-semibold">
                <p className="font-mono text-lg">
                    {player.stick || "?"}
                </p>
                <PlayerNumber number={player.number ?? "?"} />
                {editable && (
                    <UpdatePlayer player={player} />
                )}
            </div>
        </div>
    );
};

export default PlayerCard;