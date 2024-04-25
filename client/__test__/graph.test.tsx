import { Chart } from "@/__mocks__/react-google-charts";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

let pogPageId: string = "";

describe("Pog Graphs", () => {
  it("should render the graph with data", async () => {
    const mockData = [
      ["Time", "Stock Value"],
      ["12:00:00", 100],
      ["13:00:00", 150],
      ["13:10:00", 150],
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    render(<Chart data={mockData} />);

    await waitFor(() => {
      const chartElement = screen.getByTestId("mock-chart");
      expect(chartElement).toBeInTheDocument();
      expect(chartElement).toHaveTextContent(JSON.stringify(mockData));
    });
  });
  it("should not render with graph without data", async () => {
    const mockData: [] | undefined = undefined;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    render(<Chart data={mockData} />);

    await waitFor(() => {
      const chartElement = screen.getByTestId("mock-chart");
      expect(chartElement).toBeInTheDocument();
      expect(chartElement).not.toHaveTextContent(JSON.stringify(mockData));
    });
  });
});
