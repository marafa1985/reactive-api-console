import { mount } from "cypress/react";
import { CatFacts } from "./CatFacts";

describe("<CatFacts />", () => {
  it("renders", () => {
    mount(
      <CatFacts
        response={{
          id: "api-1",
          apiId: "api-1",
          timestamp: 1640995200000,
          data: {
            id: 1,
            fact: "Cats are amazing animals",
          },
        }}
        searchTerm={"cat"}
        hasMatches={true}
        matches={[
          {
            path: "fact",
            value: "Cats are amazing animals",
            matchedText: "cat",
          },
        ]}
      />
    );
  });
});
