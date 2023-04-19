import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useQuery } from "@tanstack/react-query";
import { getIdeasByDepartment } from "../../services/StatisticsService";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import ErrorIndicator from "../Indicator/ErrorIndicator";

const BarChart = ({ key }) => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["stats_dept_ideas"],
        queryFn: getIdeasByDepartment,
        staleTime: 10,
    });

    return (
        <>
            {isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator message={error.message} />
            ) : (
                <ResponsiveBar
                    data={data.data}
                    keys={["members", "ideas"]}
                    indexBy="name"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    groupMode="grouped"
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors={{ scheme: "greens" }}
                    defs={[
                        {
                            id: "dots",
                            type: "patternDots",
                            background: "inherit",
                            color: "#38bcb2",
                            size: 4,
                            padding: 1,
                            stagger: true,
                        },
                        {
                            id: "lines",
                            type: "patternLines",
                            background: "inherit",
                            color: "#eed312",
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        },
                    ]}
                    borderColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Department",
                        legendPosition: "middle",
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 10,
                        tickRotation: 0,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                    }}
                    legends={[
                        {
                            dataFrom: "keys",
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: "left-to-right",
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={function (e) {
                        return (
                            e.id +
                            ": " +
                            e.formattedValue +
                            " in country: " +
                            e.indexValue
                        );
                    }}
                />
            )}
        </>
    );
};

export default BarChart;
