"use client";

import { User } from "@prisma/client";
import CreatePlayer from "./CreatePlayer";
import { GiCheckedShield, GiGoalKeeper, GiStrikingBalls } from "react-icons/gi";
import { FaBullseye, FaQuestion } from "react-icons/fa";
import UpdatePlayer from "./UpdatePlayer";

interface EditPlayersProps {
    players: User[];
};

const EditPlayers: React.FC<EditPlayersProps> = ({
    players
}) => {
    return (
        <div className="flex flex-col bg-sveYellowDarker font-sans font-bold">
            <div className="flex items-center justify-between bg-sveYellow rounded-t-md p-2">
                <p className="text-2xl">
                    Current Roster
                </p>
                <CreatePlayer />
            </div>
            <div className="flex flex-col space-y-2 p-2 bg-sveYellow rounded-b-md">
                {players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between w-full p-2 rounded-md shadow-md bg-sveYellowDarker">
                        <p>
                            {player.position === "GOLIE" && <GiGoalKeeper size={24} />}
                            {player.position === "CENTER" && <FaBullseye size={24} />}
                            {player.position === "FORWARD" && <GiStrikingBalls size={24} />}
                            {player.position === "DEFENDER" && <GiCheckedShield size={24} />}
                            {player.position === null && <FaQuestion size={24} />}
                        </p>
                        <p className="font-normal">
                            {player.displayName}
                        </p>
                        <p className="font-semibold font-mono text-lg">
                            12
                        </p>
                        <UpdatePlayer player={player} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditPlayers;