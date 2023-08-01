"use client";

import { User } from "@prisma/client";
import PlayerCard from "./PlayerCard";
import PositionOverview from "./PositionOverview";

interface FullRosterProps {
    roster: User[];
};

const FullRoster: React.FC<FullRosterProps> = ({
    roster
}) => {
    return (
        <section className="flex flex-col space-y-2 p-2 text-primary bg-sveYellowDarker">
            <PositionOverview players={roster} />

            <div className="flex flex-col space-y-3 p-2 md:grid md:grid-cols-3 lg:grid-cols-4 md:space-y-0 md:gap-2">
                {roster.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                ))}
            </div>
        </section>
    );
};

export default FullRoster;