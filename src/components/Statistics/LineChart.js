import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getIdeasByDays } from "../../services/StatisticsService";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import ErrorIndicator from "../Indicator/ErrorIndicator";
import { ResponsiveLine } from "@nivo/line";

const LineChart = ({ key }) => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["stats_ideas_days"],
        queryFn: getIdeasByDays,
        staleTime: 10,
    });

    return (
        <>
            {isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator message={error.message} />
            ) : (
                <ResponsiveLine
                    data={data.data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: true,
                        reverse: false,
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 10,
                        tickRotation: 0,
                        legend: "Date",
                        legendOffset: 36,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickSize: 5,
                        tickPadding: 10,
                        tickRotation: 0,
                        legend: "Total ideas",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    enableGridX={false}
                    // colors={{ scheme: "greens" }}
                    colors={["green"]}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    enableArea={true}
                    areaOpacity={0.3}
                    useMesh={true}
                    legends={[
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                />
            )}
        </>
    );
};

export default LineChart;
