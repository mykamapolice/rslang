import React from 'react';
import {
  VictoryBar, VictoryGroup, VictoryChart, VictoryArea, VictoryStack,
} from 'victory';

const LongTermStatistics = () => (
    <div>
      <VictoryStack>
        <VictoryArea
          data={[{ x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 5 }]}
        />
        <VictoryArea
          data={[{ x: 1, y: 1 }, { x: 2, y: 4 }, { x: 2, y: 5 }]}
        />
      </VictoryStack>
    </div>
);

export default LongTermStatistics;
