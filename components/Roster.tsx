"use client";

import { User } from "@prisma/client";
import PlayerList from "./PlayerList";

interface RosterProps {
    players: User[];
};

const Roster: React.FC<RosterProps> = ({
    players
}) => {
    return (
        <section className="flex flex-col space-y-2 p-2">
            <div className="flex items-center justify-between mx-1">
                <h1 className="text-primary-foreground text-xl">
                    Roster:
                </h1>
            </div>

            <div className="bg-primary rounded-md mb-2">
                <PlayerList players={players} heading="View Roster:" />
            </div>
        </section>
    );
};

export default Roster;