import CreatePogsButton from "@/components/pogs/createPogs";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("CreatePogsButton", () => {
  beforeEach(() => {
    render(<CreatePogsButton />);
  });

  it("should render the button", () => {
    const createPogs = screen.getByTestId("create-pogs");
    expect(createPogs).toBeInTheDocument();
  });

  it("should have attribute type 'button'", () => {
    const createPogs = screen.getByTestId("create-pogs");
    expect(createPogs).toHaveAttribute("type", "button");
  });

  it("should have role 'button'", () => {
    const createPogs = screen.getByTestId("create-pogs");
    expect(createPogs).toHaveRole("button");
  });

  it("should not be disabled by default", () => {
    const createPogs = screen.getByTestId("create-pogs");
    expect(createPogs).not.toHaveAttribute("disabled");
  });

  it("should display the button text 'Create Pogs'", () => {
    const createPogsText = screen.getByText("Create Pogs");
    expect(createPogsText).toBeInTheDocument();
  });
});
