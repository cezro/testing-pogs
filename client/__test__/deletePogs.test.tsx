import "@testing-library/jest-dom";
import DeleteButton from "@/__mocks__/delete-pogs";
import { PogDataForm } from "@/lib";
import { fireEvent, render, screen } from "@testing-library/react";

// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// const mock = new MockAdapter(axios);

// mock.onDelete("/api/pogs/delete").reply(200, {
//   message: "Successfully deleted",
// });

const pogsData: PogDataForm[] = [
  {
    color: "white",
    id: 3,
    name: "test",
    price: 100.0,
    ticker_symbol: "TS",
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "Successfully Deleted" }),
  })
) as jest.Mock;

describe("Delete Button", () => {
  describe("Delete data", () => {
    it("should delete data", () => {
      const { getByRole, getByText } = render(
        <DeleteButton pogPageId={"3"} data={pogsData} />
      );

      const deleteButton = getByRole("button", { name: "Delete" });

      fireEvent.click(deleteButton);
      // check for confirm
      const alertDialogTitle = getByText("Are you absolutely sure?");
      expect(alertDialogTitle).toBeInTheDocument();

      const confirmBtn = getByRole("button", { name: "Continue" });

      fireEvent.click(confirmBtn);

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/pogs/3",
        {
          method: "DELETE",
        }
      );
    });

    it("should display a confirmation when continue is clicked", () => {
      const { getByRole, getByText } = render(
        <DeleteButton pogPageId={"3"} data={pogsData} />
      );

      const deleteButton = getByRole("button", { name: "Delete" });

      fireEvent.click(deleteButton);

      const confirmButton = getByRole("button", { name: "Continue" });

      fireEvent.click(confirmButton);

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/api/pogs/3",
        {
          method: "DELETE",
        }
      );
    });
  });

  describe("Render alert dialog", () => {
    it("should render the component and display the alert dialog", () => {
      const { getByRole, getByText } = render(
        <DeleteButton pogPageId={"3"} data={pogsData} />
      );

      const deleteButton = getByRole("button", { name: "Delete" });

      fireEvent.click(deleteButton);

      const alertDialog = getByRole("alertdialog");
      expect(alertDialog).toBeInTheDocument();

      const alertDialogTitle = getByText("Are you absolutely sure?");
      expect(alertDialogTitle).toBeInTheDocument();

      const alertDialogDescription = getByText(
        "This action cannot be undone. This will permanently be deleted and removed from our database."
      );
      expect(alertDialogDescription).toBeInTheDocument();

      const cancelButton = getByText("Cancel");
      expect(cancelButton).toBeInTheDocument();

      const continueButton = getByText("Continue");
      expect(continueButton).toBeInTheDocument();
    });
  });
});
