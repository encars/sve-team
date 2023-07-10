"use client";

import { User } from "@prisma/client";
import { FaBullseye } from "react-icons/fa";
import { GiCheckedShield, GiGoalKeeper, GiStrikingBalls } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

interface PositionOverviewProps {
    players: User[];
};

const PositionOverview: React.FC<PositionOverviewProps> = ({
    players
}) => {
    return (
        <div className="flex items-center justify-between gap-2 px-4 py-2 mb-2">
            <small className="flex items-center gap-2 text-primary-foreground">
                <IoIosPeople size={24} />
                {players.length}
            </small>
            <small className="flex items-center gap-2 text-primary-foreground">
                <GiGoalKeeper size={24} />
                {players.filter((player: User) => player.position === 'GOLIE').length}
            </small>
            <small className="flex items-center gap-2 text-primary-foreground">
                <FaBullseye size={24} />
                {players.filter((player: User) => player.position === 'CENTER').length}
            </small>
            <small className="flex items-center gap-2 text-primary-foreground">
                <GiStrikingBalls size={24} />
                {players.filter((player: User) => player.position === 'FORWARD').length}
            </small>
            <small className="flex items-center gap-2 text-primary-foreground">
                <GiCheckedShield size={24} />
                {players.filter((player: User) => player.position === 'DEFENDER').length}
            </small>
        </div>
    );
};

export default PositionOverview;