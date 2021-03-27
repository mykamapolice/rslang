import React from 'react';
import {
  VictoryChart,
  VictoryArea,
  VictoryStack,
  VictoryLine,
  createContainer,
} from 'victory';

const LongTermStatistics = () => {
  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  const data = [
    {
      x: 1,
      y: 2,
    },
    {
      x: 2,
      y: 3,
    },
    {
      x: 3,
      y: 5,
    },
    {
      x: 4,
      y: 4,
    },
    {
      x: 5,
      y: 7,
    },
  ];

  return (
        <div style={{ width: '75%', margin: '0 auto' }}>
            <VictoryChart
              domainPadding={{ y: 10 }}
              containerComponent={(
                    <VictoryZoomVoronoiContainer
                        // @ts-ignore
                      labels={({ datum }: number) => datum.y}
                    />
                  )}
            >
                <VictoryLine
                  style={{
                    data: { stroke: '#c43a31' },
                    parent: { border: '1px solid #ccc' },
                  }}
                  data={data}
                />
            </VictoryChart>

            <div>
                <VictoryChart
                  containerComponent={(
                        <VictoryZoomVoronoiContainer
                            // @ts-ignore
                          labels={({ datum }: number) => datum.y}
                        />
                      )}
                >
                    <VictoryLine data={data} />
                </VictoryChart>
            </div>

            <VictoryChart>
                <VictoryStack>
                    <VictoryArea
                      data={[
                        {
                          x: 2,
                          y: 2,
                        },
                        {
                          x: 3,
                          y: 3,
                        },
                        {
                          x: 5,
                          y: 5,
                        },
                      ]}
                    />
                    <VictoryArea
                      data={[
                        {
                          x: 1,
                          y: 2,
                        },
                        {
                          x: 3,
                          y: 4,
                        },
                        {
                          x: 5,
                          y: 9,
                        },
                      ]}
                    />
                </VictoryStack>
            </VictoryChart>
        </div>
  );
};
export default LongTermStatistics;
