import { mount } from "cypress/react";
import { ResultWrapper } from "./ResultWrapper";

describe("<ResultWrapper />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <ResultWrapper
        id="api-1"
        timestamp={1640995200000}
        pinnedIds={new Set()}
        responseMatches={{}}
        togglePin={() => {}}
      >
        <div>Test</div>
      </ResultWrapper>
    );
  });
});
