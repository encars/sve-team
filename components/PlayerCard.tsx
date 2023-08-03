"use client";

import { User } from "@prisma/client";

import { GiCheckedShield, GiGoalKeeper, GiStrikingBalls } from "react-icons/gi";
import { FaBullseye, FaQuestion } from "react-icons/fa";
import PlayerNumber from "./PlayerNumber";

interface PlayerCardProps {
    player: User;
};

const PlayerCard: React.FC<PlayerCardProps> = ({
    player
}) => {
    return (
        <div key={player.id} className="flex items-center justify-between w-full p-2 rounded-md shadow-md bg-sveYellowDarker">
                        <p className="ml-2">
                            {player.position === "GOLIE" && <GiGoalKeeper size={24} />}
                            {player.position === "CENTER" && <FaBullseye size={24} />}
                            {player.position === "FORWARD" && <GiStrikingBalls size={24} />}
                            {player.position === "DEFENDER" && <GiCheckedShield size={24} />}
                            {player.position === null && <FaQuestion size={24} />}
                        </p>
                        <div className="flex items-center justify-between w-full mx-4">
                            <p className="font-normal">
                                {player.displayName}
                            </p>
                            <PlayerNumber number={player.number ?? "?"} />
                        </div>
                    </div>
    );
};

export default PlayerCard;