"use client";

import { User } from "@prisma/client";
import CreatePlayer from "./CreatePlayer";
import PlayerCard from "./PlayerCard";

interface EditPlayersProps {
    players: User[];
};

const EditPlayers: React.FC<EditPlayersProps> = ({
    players
}) => {
    const sortedPlayers = players.sort((a: User, b: User) => {
        const order = ['GOLIE', 'CENTER', 'FORWARD', 'DEFENDER', null];
        return order.indexOf(a.position) - order.indexOf(b.position);
    });

    return (
        <div className="flex flex-col bg-sveYellowDarker font-sans font-bold">
            <div className="flex items-center justify-between bg-sveYellow rounded-t-md p-2 px-4">
                <p className="text-2xl">
                    Current Roster
                </p>
                <CreatePlayer />
            </div>
            <div className="flex flex-col space-y-2 p-2 bg-sveYellow rounded-b-md">
                {sortedPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} editable />
                ))}
            </div>
        </div>
    );
};

export default EditPlayers;