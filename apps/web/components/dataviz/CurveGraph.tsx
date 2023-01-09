import {DateValue} from '@visx/mock-data/lib/generators/genDateValue';

import * as allCurves from '@visx/curve';
import {Group} from '@visx/group';
import {LinePath} from '@visx/shape';
import {scaleLinear, scaleTime} from "@visx/scale";
import {extent, max} from 'd3-array';
import {useState} from "react";

type CurveGraphDataPoint = DateValue & { color?: string };

type CurveGraphProps = {
    data: CurveGraphDataPoint[] [];
    // height: number;
    // width: number;
    // xLabel: string;
    // yLabel: string;
};


const getX = (d: DateValue) => d.date;
const getY = (d: DateValue) => d.value;

type CurveType = keyof typeof allCurves;

const setXScale = (data: DateValue[]) => scaleTime<number>({
    domain: extent(data, getX) as [Date, Date],
});
const setYScale = (data: DateValue[]) => scaleLinear<number>({
    domain: [0, max(data, getY) as number],
});

const width = 500;
const height = 500;


// Todo: Should overlap
export default function CurveGraph({

                                       data
                                   }: CurveGraphProps) {

    if (!data) {
        return <div>No data</div>;
    }

    const xScale = setXScale(data.reduce((rec, d) => rec.concat(d), []));
    const yScale = setYScale(data.reduce((rec, d) => rec.concat(d), []));


    const [showPoints, setShowPoints] = useState(true);
    const [curveType, setCurveType] = useState<CurveType>('curveLinear');
    const [showControls, setShowControls] = useState(true);

    const lineCount = data.length;

    const svgHeight = showControls ? height - 40 : height;
    const lineHeight = svgHeight / lineCount;

    xScale.range([0, width - 50]);
    yScale.range([lineHeight - 2, 0]);


    return (
        <svg width={width} height={svgHeight}>
            <rect width={width} height={svgHeight} fill="#efefef" rx={14} ry={14}/>
            {width > 8 &&
                data.map((lineData, i) => {
                    const even = i % 2 === 0;
                    let markerStart = even ? 'url(#marker-cross)' : 'url(#marker-x)';
                    if (i === 1) markerStart = 'url(#marker-line)';
                    const markerEnd = even ? 'url(#marker-arrow)' : 'url(#marker-arrow-odd)';
                    return (
                        <Group key={`lines-${i}`} top={i * lineHeight} left={13}>
                            {showPoints &&
                                lineData.map((d, j) => (
                                    <circle
                                        key={i + j}
                                        r={3}
                                        cx={xScale(getX(d))}
                                        cy={yScale(getY(d))}
                                        stroke={d.color ?? "rgba(33,33,33,0.5)"}
                                        fill="transparent"
                                    />
                                ))}
                            <LinePath<DateValue>
                                curve={allCurves[curveType]}
                                data={lineData}
                                x={(d) => xScale(getX(d)) ?? 0}
                                y={(d) => yScale(getY(d)) ?? 0}
                                stroke="#333"
                                strokeWidth={even ? 2 : 1}
                                strokeOpacity={even ? 0.6 : 1}
                                shapeRendering="geometricPrecision"
                                markerMid="url(#marker-circle)"
                                markerStart={markerStart}
                                markerEnd={markerEnd}
                            />
                        </Group>
                    );
                })}
        </svg>
    )


}
