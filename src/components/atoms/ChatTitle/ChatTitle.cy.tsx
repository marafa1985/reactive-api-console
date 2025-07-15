import { mount } from "cypress/react";
import { ChatTitle } from "./ChatTitle";

describe("<ChatTitle />", () => {
  it("renders", () => {
    mount(<ChatTitle />);
  });
});
