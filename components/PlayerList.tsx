"use client";

import { Match, User } from "@prisma/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import getPlayersByMatchId from "@/actions/getPlayersByMatchId";
import UserAvatar from "./UserAvatar";

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
                    Who&apos;s coming?
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col space-y-1">
                        {players.map((player: User) => (
                            <div key={player.id} className="flex items-center justify-around gap-2 p-2 capitalize bg-primary rounded-md">
                                <UserAvatar user={player} />
                                <p className="text-primary-foreground">
                                    {player.name}
                                </p>
                                <p className="text-primary-foreground">
                                    {player.position}
                                </p>
                            </div>
                        ))}   
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default PlayerList;