import { Circle, Layer, Line, Rect, Stage } from "react-konva";

const FullField = () => {
    const padding = 60;
    const cornerRadius = 120;

    const width = window.innerWidth - 2 * padding;
    const height = (window.innerHeight - 3 * padding);

    const goalAreaWidth = 150;
    const goalAreaHeight = 180;
    const goalieAreaWidth = 40;
    const goalieAreaHeight = 100;

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                {/* Outer Field */}
                <Rect x={padding} y={padding} width={width} height={height} stroke="black" cornerRadius={cornerRadius} />

                {/* Center Line */}
                <Line points={[width / 2 + padding, padding, width / 2 + padding, height + padding]} stroke="black" />

                {/* Center Circle */}
                <Circle x={width / 2 + padding} y={height / 2 + padding} radius={130 - (padding / 2)} stroke="black" />

                {/* Bully points */}
                <Circle x={padding + cornerRadius} y={padding + cornerRadius} radius={1} stroke="black" />
                <Circle x={width + padding - cornerRadius} y={padding + cornerRadius} radius={1} stroke="black" />
                <Circle x={width + padding - cornerRadius} y={height + padding - cornerRadius} radius={1} stroke="black" />
                <Circle x={padding + cornerRadius} y={height + padding - cornerRadius} radius={1} stroke="black" />

                {/* Goal Areas */}
                <Rect x={padding + cornerRadius} y={height / 2 + padding - goalAreaHeight / 2} width={goalAreaWidth} height={goalAreaHeight} stroke="black" />
                <Rect x={width + padding - cornerRadius - goalAreaWidth} y={height / 2 + padding - goalAreaHeight / 2} width={goalAreaWidth} height={goalAreaHeight} stroke="black" />

                {/* Goalie Areas */}
                <Rect x={padding + cornerRadius + 20} y={height / 2 + padding - goalieAreaHeight / 2} width={goalieAreaWidth} height={goalieAreaHeight} stroke="black" />
                <Rect x={width + padding - cornerRadius - goalieAreaWidth - 20} y={height / 2 + padding - goalieAreaHeight / 2} width={goalieAreaWidth} height={goalieAreaHeight} stroke="black" />
            </Layer>
        </Stage>
    );
};

export default FullField;