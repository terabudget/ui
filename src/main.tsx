import ReactDOM from "react-dom/client";
import Tailwind from "primereact/passthrough/tailwind";

import { PrimeReactProvider } from "primereact/api";

import "primeicons/primeicons.css";

import "./assets/styles/theme.css";

import "./main.css";

import { BudgetRouter } from "./BudgetRouter";
import { AuthProvider } from "./components/provider/AuthProvider";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <PrimeReactProvider value={{ pt: Tailwind }}>
    <AuthProvider>
      <BudgetRouter />
    </AuthProvider>
  </PrimeReactProvider>
);
