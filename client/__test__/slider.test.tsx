import { Marque } from "@/__mocks__/react-fast-marquee";
import { DataPogs } from "@/lib";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const allDataMock: DataPogs[] = [
  {
    id: 1,
    name: "Green",
    ticker_symbol: "BLUW",
    color: "red",
    value: 1000,
    createdat: "2024-04-24T09:02:03.782Z",
    prev_value: 0,
  },
  {
    id: 2,
    name: "gym",
    ticker_symbol: "GY",
    color: "green",
    value: 100,
    createdat: "2024-04-24T12:05:35.381Z",
    prev_value: 0,
  },
  {
    id: 3,
    name: "test",
    ticker_symbol: "TS",
    color: "green",
    value: 170,
    createdat: "2024-04-24T16:47:45.556Z",
    prev_value: 100,
  },
];

describe("Display the slider", () => {
  it("should render THREE individual slider", () => {
    render(<Marque allDataPogs={allDataMock} />);

    const indivSlider = screen.getAllByTestId("mock-indiv-slider");
    expect(indivSlider).toHaveLength(3);
  });
  it("should check for boundary in indiv slider expected false output is 2 which must be faulty", () => {
    render(<Marque allDataPogs={allDataMock} />);

    const indivSlider = screen.getAllByTestId("mock-indiv-slider");
    expect(indivSlider).not.toHaveLength(2);
  });
  it("should check for boundary in indiv slider expected false output is 4 which must be faulty", () => {
    render(<Marque allDataPogs={allDataMock} />);

    const indivSlider = screen.getAllByTestId("mock-indiv-slider");
    expect(indivSlider).not.toHaveLength(4);
  });
});

describe("Wait for the slider to load", () => {
  it("should show loading of slider", () => {
    let allDataMock = null;
    render(<Marque allDataPogs={allDataMock} />);

    const slider = screen.getByTestId("mock-loading");

    expect(slider).not.toBeEmptyDOMElement();
  });
  it("should render a text of loading", () => {
    let allDataMock = null;
    render(<Marque allDataPogs={allDataMock} />);

    const sliderText = screen.queryByText("Loading...");
    expect(sliderText).toBeInTheDocument();
  });
});
