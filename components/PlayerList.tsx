import { User } from "@prisma/client";
import { FaBullseye, FaQuestion } from "react-icons/fa";
import { GiCheckedShield, GiGoalKeeper, GiStrikingBalls } from "react-icons/gi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import UserAvatar from "./UserAvatar";
import { IoIosPeople } from "react-icons/io";
import PlayerCard from "./PlayerCard";
import PositionOverview from "./PositionOverview";

interface PlayerListProps {
    players: User[];
    heading: string;
}

const PlayerList: React.FC<PlayerListProps> = ({
    players,
    heading
}) => {
    return (
        <Accordion type="single" collapsible className="w-full px-3">
            <AccordionItem value="playerlist">
                <AccordionTrigger className="text-white">
                    {heading}
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col space-y-1 max-h-[290px] overflow-y-auto">
                        <PositionOverview players={players} />
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
                                <PlayerCard key={player.id} player={player} />
                            ))
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default PlayerList;