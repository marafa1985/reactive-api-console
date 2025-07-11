import "./App.css";
import { useGetApiResponseQuery } from "./store/feature/endpointApi/endpointApi";
import { initialApiEndpoints } from "./core/config/apis-list";

function App() {
  const { isLoading, data } = useGetApiResponseQuery(initialApiEndpoints[0]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}

export default App;
