import Nav from "@/components/test/nav/Nav";
// this is a copy of the nav, I cannot use the real Nav because it leads to dependency and node_module errors

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const session = {
  user: {
    given_name: "Ian Clyde E.",
    family_name: "TEJADA",
    nickname: "ianclyde.tejada-16",
    name: "Ian Clyde E. TEJADA",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocJM2hRAznACEOHRTOhSy-p84Ht7iO5pFgGmAfWHC_wm9dY1T48=s96-c",
    locale: "en",
    updated_at: "2024-04-24T11:17:53.142Z",
    email: "ianclyde.tejada-16@cpu.edu.ph",
    email_verified: true,
    sub: "google-oauth2|112104175161595340582",
    sid: "SmQafsWB1GlWFDfMCHfgpEAiQLBERfIa",
  },
  accessToken:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il9VZHREQldWLVUxMjZlanRjcTF6dyJ9.eyJpc3MiOiJodHRwczovL2Rldi1zMzd4bmYwenJteDFibjczLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMjEwNDE3NTE2MTU5NTM0MDU4MiIsImF1ZCI6WyJodHRwczovL2hlbGxvLXdvcmxkLmV4YW1wbGUuY29tIiwiaHR0cHM6Ly9kZXYtczM3eG5mMHpybXgxYm43My51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzEzOTU3NDc0LCJleHAiOjE3MTQwNDM4NzQsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhenAiOiJTcHhXUVRSRzhvd01VUElrdUxmRWJVazc1RXd1UGk2SyJ9.ZfNsv_vX9L3USt_fWQfkhiwOzZ2jG3qsbX5PFpO7yVVC51skpN8GhuZ3aVrZ5JWJt-wr8DAPBchzaj4ob2ogXBoU2Yvj-DM4dJ4qk61U3hFDOhDTh2sip2ZAAS9PHQgyR5GImnVrZCMu0ndwBpK9EHxC3OiRTxnokWvvZnmW3-AXsKTVjV4Kg0Nsw1oSMszD2ZhE80b3o8LBO6cavygEurghYc2ENWovm-UpF5djuDBDXG5pS0emw0egJ-36vvvFxeNYYHRMSIedZyl359LXEm5iNRwYqizgrsFVKnR1-Hd4dkwdryrlvQ5O5gzDpnZ_-GQiYSPAfArWhJN7KzAZ7g",
  accessTokenScope: "openid profile email",
  accessTokenExpiresAt: 1714043873,
  idToken:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il9VZHREQldWLVUxMjZlanRjcTF6dyJ9.eyJnaXZlbl9uYW1lIjoiSWFuIENseWRlIEUuIiwiZmFtaWx5X25hbWUiOiJURUpBREEiLCJuaWNrbmFtZSI6ImlhbmNseWRlLnRlamFkYS0xNiIsIm5hbWUiOiJJYW4gQ2x5ZGUgRS4gVEVKQURBIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pNMmhSQXpuQUNFT0hSVE9oU3ktcDg0SHQ3aU81cEZnR21BZldIQ193bTlkWTFUNDg9czk2LWMiLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA0LTI0VDExOjE3OjUzLjE0MloiLCJlbWFpbCI6ImlhbmNseWRlLnRlamFkYS0xNkBjcHUuZWR1LnBoIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vZGV2LXMzN3huZjB6cm14MWJuNzMudXMuYXV0aDAuY29tLyIsImF1ZCI6IlNweFdRVFJHOG93TVVQSWt1TGZFYlVrNzVFd3VQaTZLIiwiaWF0IjoxNzEzOTU3NDc0LCJleHAiOjE3MTM5OTM0NzQsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTEyMTA0MTc1MTYxNTk1MzQwNTgyIiwic2lkIjoiU21RYWZzV0IxR2xXRkRmTUNIZmdwRUFpUUxCRVJmSWEiLCJub25jZSI6IkllaE5YNERzd2dMXzN5ZmtfLU8weWhkT0llLVl3N2JLYnFCZWpFbXhHb0EifQ.iPMeMoEQaQTmpd4zbMzFeBnx4X3B0tItcLUYEKmWBne1CA-bfvs9KKeRNDwSuR7bqQO_Nxgd3jhIrhlhLxCDq3S2RDxDA8T3S8fm-3qxPcULqKxHClVmG6hAUciG3sHTBxQV5sB7UoBpL5LO3z0FboC0tGbbrSz9_CwtX9AQXJu6w2yB-0b5b0ZhvtJJd2v4ncBF-gPg_NLFhKUewo1v7G187CZxtg47Q7VBSS-r8Gn9QRCGhEmWkGi4gruKM4Tb_fFSAphi2X_ebhZArHE-u3LsJhLP5IVCz_SwtLt-9CkgjiGDddCXGZACalSUcPDDJV2SVaIvHEp1gghgnu1ZBQ",
  token_type: "Bearer",
};

describe("Navigation Bar", () => {
  it("should renders a nav", () => {
    render(<Nav />);

    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });

  describe("Nav Links", () => {
    it("should render a home link", () => {
      render(<Nav />);

      const home = screen.queryByText("Home");
      expect(home).toBeInTheDocument();
    });
    it("should render a stocks link", () => {
      render(<Nav />);

      const stocks = screen.queryByText("Stocks");
      expect(stocks).toBeInTheDocument();
    });

    describe("User is not Logged In", () => {
      it("should not render a logout link", () => {
        render(<Nav session={null} />);
        const logoutLink = screen.queryByText("Logout");
        expect(logoutLink).not.toBeInTheDocument();
      });
      it("should render a login link", () => {
        render(<Nav session={null} />);
        const loginLink = screen.queryByText("Login");
        expect(loginLink).toBeInTheDocument();
      });
      it("should render a signUp link", () => {
        render(<Nav session={null} />);
        const signUpLink = screen.queryByText("Sign Up");
        expect(signUpLink).toBeInTheDocument();
      });
    });

    describe("User is Logged In with Session", () => {
      it("should display the name Ian Clyde E. TEJADA", () => {
        render(<Nav session={session} />);
        const displayName = screen.queryByText("Ian Clyde E. TEJADA");
        expect(displayName).toBeInTheDocument();
      });
      it("should display Image of user", () => {
        render(<Nav session={session} />);
        const displayUserImage = screen.queryByTestId("nav-user-image");
        expect(displayUserImage).toBeVisible();
      });
      it("should render a logout link", () => {
        render(<Nav session={session} />);
        const logoutLink = screen.queryByText("Logout");
        expect(logoutLink).toBeInTheDocument();
      });
      it("should not render a login link", () => {
        render(<Nav session={session} />);
        const loginLink = screen.queryByText("Login");
        expect(loginLink).not.toBeInTheDocument();
      });
      it("should not render a signUp link", () => {
        render(<Nav session={session} />);
        const signUpLink = screen.queryByText("Sign Up");
        expect(signUpLink).not.toBeInTheDocument();
      });
    });
  });
});
