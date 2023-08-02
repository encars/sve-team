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
        <div className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-sveYellow rounded-md text-primary">
            <small className="flex items-center gap-2">
                <IoIosPeople size={24} />
                {players.length}
            </small>
            <small className="flex items-center gap-2">
                <GiGoalKeeper size={24} />
                {players.filter((player: User) => player.position === 'GOLIE').length}
            </small>
            <small className="flex items-center gap-2">
                <FaBullseye size={24} />
                {players.filter((player: User) => player.position === 'CENTER').length}
            </small>
            <small className="flex items-center gap-2">
                <GiStrikingBalls size={24} />
                {players.filter((player: User) => player.position === 'FORWARD').length}
            </small>
            <small className="flex items-center gap-2">
                <GiCheckedShield size={24} />
                {players.filter((player: User) => player.position === 'DEFENDER').length}
            </small>
        </div>
    );
};

export default PositionOverview;