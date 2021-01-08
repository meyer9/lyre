import React, { useEffect, useState } from "react";
import {
  GetPlanetsDocument,
  GetPlanetsQuery,
  Planet,
} from "../graphql/generated";

import {
  usePolledQuery,
  useQuery,
  useCache,
  createCache,
  useQueryResult,
} from "lyre";

const countingCache = createCache({
  reducer: (state, action: any) => {
    console.log(state, action);
    return state + 1;
  },
  initialState: 0,
});

const PlanetList = () => {
  const getPlanets = useQuery(GetPlanetsDocument);
  const { data: planets, loading, refetch } = useQueryResult(getPlanets);

  const { start, stop, polling } = usePolledQuery(refetch, 2000);

  return (
    <div className="container">
      <div>
        <div>Polling: {polling ? "yes" : "no"}</div>
        <button onClick={start}>Start Polling</button>
        <button onClick={stop}>Stop Polling</button>
      </div>
      Planets:
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ol>
          {/* {numCalls} */}
          {planets?.planets.map((planet, idx) => (
            <li key={idx}>
              {planet.name} at {planet.altitude} m.
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default PlanetList;
