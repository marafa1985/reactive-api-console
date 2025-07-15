import { mount } from "cypress/react";
import { APINotFound } from "./APINotFound";
import { StoreProvider } from "@/store/StoreProvider";

describe("<APINotFound />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <StoreProvider>
        <APINotFound />
      </StoreProvider>
    );
  });
});
