import ReactDOM from "react-dom/client";

import {
  RouterProvider,
} from "react-router";

import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/primereact.min.css";
import "primeflex/themes/primeone-light.css";

import "/node_modules/primeflex/primeflex.css";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { budgetRouter } from "./router";

import "./assets/styles/theme.css"

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <PrimeReactProvider>
    <RouterProvider router={budgetRouter} />
  </PrimeReactProvider>
);
