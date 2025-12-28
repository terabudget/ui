import ReactDOM from "react-dom/client";
import Tailwind from "primereact/passthrough/tailwind";

import {
  RouterProvider,
} from "react-router";

import { PrimeReactProvider } from "primereact/api";

import "primeicons/primeicons.css";

import "./assets/styles/theme.css"

import { budgetRouter } from "./router";


const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <PrimeReactProvider value={{pt: Tailwind}}>
    <RouterProvider router={budgetRouter} />
  </PrimeReactProvider>
);
