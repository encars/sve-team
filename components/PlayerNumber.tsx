import { Avatar, AvatarFallback } from "./ui/avatar";

interface PlayerNumberProps {
    number: string;
};

const PlayerNumber: React.FC<PlayerNumberProps> = ({
    number
}) => {
    return (
        <Avatar>
            <AvatarFallback>
                {number}
            </AvatarFallback>
        </Avatar>
    );
};

export default PlayerNumber;