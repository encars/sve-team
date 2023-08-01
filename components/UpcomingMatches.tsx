import { Match as MatchType } from "@prisma/client";
import Match from "./Match";

interface UpcomingMatchesProps {
    matches: MatchType[];
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({
    matches
}) => {
    return (
        <section className="flex flex-col space-y-3 p-4 text-primary bg-sveYellowDarker">
            {matches.map((match) => (
                <Match key={match.id} match={match} />
            ))}
        </section>
    );
};

export default UpcomingMatches;