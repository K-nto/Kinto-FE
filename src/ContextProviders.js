import { createContext } from "react";

export const SectionContext = createContext("files");

export const UserContext = createContext({
  name: "Guest",
});
