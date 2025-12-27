import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RandomQuote from "./02-random-quote/RandomQuote";
// import MyCalculator from "./01-calculator/MyCalculator.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RandomQuote />
  </StrictMode>
);
