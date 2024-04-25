import React from "react";

const ChartMock = ({ data }: { data: any }) => (
  <div data-testid="mock-chart">{JSON.stringify(data)}</div>
);

export { ChartMock as Chart };
