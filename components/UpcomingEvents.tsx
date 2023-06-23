"use client";

import { Match as MatchType } from "@prisma/client";
import Match from "./Match";

interface UpcomingEventsProps {
    matches: MatchType[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
    matches
}) => {
    return (
        <section className="flex flex-col space-y-2 p-2">
            <h1 className="text-primary-foreground">
                Upcoming Events
            </h1>
            <div className="flex flex-col space-y-2 p-1">
                {matches.map((match) => (
                    <Match key={match.id} match={match} />
                ))}
            </div>
        </section>
    );
};

export default UpcomingEvents;