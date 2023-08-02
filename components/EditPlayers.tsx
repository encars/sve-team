"use client";

import { User } from "@prisma/client";

interface EditPlayersProps {
    players: User[];
};

const EditPlayers: React.FC<EditPlayersProps> = ({
    players
}) => {
    return (
        <div className="bg-sveYellowDarker">
            {players.map((player) => (
                <div key={player.id} className="">
                    <p>
                        {player.displayName}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default EditPlayers;