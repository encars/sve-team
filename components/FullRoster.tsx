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
    const formattedRoster = roster.sort((a: User, b: User) => {
        const order = ['GOLIE', 'CENTER', 'FORWARD', 'DEFENDER', null];
        return order.indexOf(a.position) - order.indexOf(b.position);
    });

    return (
        <section className="flex flex-col space-y-2 p-2 text-primary bg-sveYellowDarker">
            <PositionOverview players={roster} />

            <div className="flex flex-col space-y-3 p-2 md:grid md:grid-cols-3 lg:grid-cols-4 md:space-y-0 md:gap-2">
                {formattedRoster.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                ))}
            </div>
        </section>
    );
};

export default FullRoster;