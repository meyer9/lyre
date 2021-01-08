import React from "react";
import { LyreContext, LyreOptions } from "lyre";
import PlanetList from "./PlanetList";

const lyreOptions: LyreOptions = {
  endpoint: "http://localhost:3000/graphql",
};

const App = () => {
  return (
    <LyreContext.Provider value={lyreOptions}>
      <PlanetList />
    </LyreContext.Provider>
  );
};

export default App;
