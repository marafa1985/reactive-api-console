/// <reference types="cypress" />

import React from "react";
import { ChatTitle } from "../../src/components/atoms/ChatTitle/ChatTitle";

describe("<ChatTitle />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ChatTitle />);
  });
});
