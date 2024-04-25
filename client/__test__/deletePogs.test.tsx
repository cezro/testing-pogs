import DeleteButton from "@/__mocks__/delete-pogs";
import { PogDataForm } from "@/lib";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const pogsData: PogDataForm[] = [
  {
    color: "white",
    id: 3,
    name: "test",
    price: 100.0,
    ticker_symbol: "TS",
  },
];

describe("Delete Button", () => {
  it("should render a delete button", () => {
    render(<DeleteButton pogPageId={"3"} data={pogsData} />);
  });
});
