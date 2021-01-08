import { createContext } from "react";

export interface LyreOptions {
  endpoint?: string;
}

const LyreContext = createContext<LyreOptions>({});

export default LyreContext;
