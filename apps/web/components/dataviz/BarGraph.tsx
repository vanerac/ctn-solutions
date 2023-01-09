import {Bar} from "@visx/shape";
import {scaleBand, scaleLinear} from "@visx/scale";
import {Group} from "@visx/group";

import letterFrequency, {LetterFrequency} from '@visx/mock-data/lib/mocks/letterFrequency';

const sampleData = letterFrequency.slice(5).map((d) => ({
    value: d.frequency,
    label: d.letter
}));
const verticalMargin = 120;

// accessors
const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

interface BarGraphData {
    label: string;
    value: number;
}

interface BarGraphProps {
    data?: BarGraphData[];
}

export function BarGraph({
                             data = sampleData,
                         }: BarGraphProps) {
    const width = 500;
    const height = 500;
    const margin = {top: 20, right: 20, bottom: 20, left: 20};
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map((d) => d.label),
        padding: 0.4,
    });

    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map((d) => d.value))],
    });


    return (
        <svg width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill="#f0f0f0"/>
            <Group top={margin.top} left={margin.left}>
                {data.map((d, i) => {
                    const barHeight = yMax - (yScale(d.value) ?? 0);
                    return (
                        <Bar
                            key={`bar-${i}`}
                            x={xScale(d.label)}
                            y={yMax - barHeight}
                            height={barHeight}
                            width={xScale.bandwidth()}
                            fill="#1b998b"
                        />
                    );
                })}
            </Group>
        </svg>
    );


}
