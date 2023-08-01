import { User } from "@prisma/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
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
                <AccordionTrigger className="font-sans">
                    {heading}
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col space-y-1 max-h-[290px] overflow-y-auto overflow-x-hidden bg-sveYellowDarker p-2 rounded-md">
                        <PositionOverview players={players} />
                        {!players.length ? (
                            <div className="px-4 py-2">
                                Looks like no one has signed up yet
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