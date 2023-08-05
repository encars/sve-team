import { Text } from "react-konva"

interface PlayerProps {
    x: number;
    y: number;
    type: "offense" | "defense";
}

const Player: React.FC<PlayerProps> = ({
    x,
    y,
    type
}) => {
    return (
        <Text x={x} y={y} text={type === "offense" ? "X" : "O"} fontSize={20} fill="black" />
    );
};

export default Player;