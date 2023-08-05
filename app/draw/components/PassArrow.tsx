import { Arrow } from "react-konva";

interface PassArrowProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

const PassArrow: React.FC<PassArrowProps> = ({
    x1,
    y1,
    x2,
    y2
}) => {
    return (
        <Arrow points={[x1, y1, x2, y2]} pointerLength={10} pointerWidth={10} fill="red" stroke="red" />
    );
};

export default PassArrow;