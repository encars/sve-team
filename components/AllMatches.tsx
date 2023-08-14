import { Match as MatchType } from "@prisma/client";
import Match from "./Match";

interface AllMatchesProps {
    matches: MatchType[];
}

const AllMatches: React.FC<AllMatchesProps> = ({
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

export default AllMatches;