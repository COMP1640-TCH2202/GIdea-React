import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { getMostUsedCategories } from "../../services/StatisticsService";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import ErrorIndicator from "../Indicator/ErrorIndicator";

const PieChart = ({ key }) => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["stats_categories"],
        queryFn: getMostUsedCategories,
        staleTime: 10,
    });

    return (
        <>
            {isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator message={error.message} />
            ) : (
                <ResponsivePie
                    data={data.data}
                    margin={{ top: 40, right: 140, bottom: 80, left: 20 }}
                    innerRadius={0.5}
                    padAngle={2}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    colors={{ scheme: "greens" }}
                    borderWidth={1}
                    borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                    }}
                    enableArcLinkLabels={false}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: "color",
                        modifiers: [["darker", 2]],
                    }}
                    defs={[
                        {
                            id: "dots",
                            type: "patternDots",
                            background: "inherit",
                            color: "rgba(255, 255, 255, 0.3)",
                            size: 4,
                            padding: 1,
                            stagger: true,
                        },
                        {
                            id: "lines",
                            type: "patternLines",
                            background: "inherit",
                            color: "rgba(255, 255, 255, 0.3)",
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        },
                    ]}
                    legends={[
                        {
                            anchor: "right",
                            direction: "column",
                            justify: false,
                            translateX: 120,
                            translateY: 40,
                            itemsSpacing: 10,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: "#999",
                            itemDirection: "left-to-right",
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: "circle",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemTextColor: "#000",
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

export default PieChart;
