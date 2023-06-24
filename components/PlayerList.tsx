"use client";

import { Match, User } from "@prisma/client";
import { FaBullseye, FaQuestion } from "react-icons/fa";
import { GiCheckedShield, GiGoalKeeper, GiStrikingBalls } from "react-icons/gi";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import getPlayersByMatchId from "@/actions/getPlayersByMatchId";
import UserAvatar from "./UserAvatar";
import { IoIosPeople } from "react-icons/io";

interface PlayerListProps {
    match: Match;
}

const PlayerList: React.FC<PlayerListProps> = async ({
    match
}) => {
    const data = await getPlayersByMatchId(match.id);
    const players = data.users;

    return (
        <Accordion type="single" collapsible className="w-full px-3">
            <AccordionItem value="playerlist">
                <AccordionTrigger>
                    Match Lineup
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col space-y-1 max-h-[290px] overflow-y-auto">
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
                        {!players.length ? (
                            <div className="px-4 py-2">
                                <p className="text-muted-foreground">
                                    Looks like no one has signed up yet
                                </p>
                            </div>
                        ) : (
                            players.sort((a: User, b: User) => {
                                const order = ['GOLIE', 'CENTER', 'FORWARD', 'DEFENDER', null];
                                return order.indexOf(a.position) - order.indexOf(b.position);
                            })
                            .map((player: User) => (
                                <div key={player.id} className="flex items-center justify-around gap-2 px-4 py-2 capitalize bg-blue-950 rounded-md">
                                    <UserAvatar user={player} />
                                    <p className="flex-grow text-primary-foreground">
                                        {player.name}
                                    </p>
                                    <p className="text-primary-foreground">
                                        {player.position === "GOLIE" && <GiGoalKeeper size={24} />}
                                        {player.position === "CENTER" && <FaBullseye size={24} />}
                                        {player.position === "FORWARD" && <GiStrikingBalls size={24} />}
                                        {player.position === "DEFENDER" && <GiCheckedShield size={24} />}
                                        {player.position === null && <FaQuestion size={24} />}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default PlayerList;