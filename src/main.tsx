import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createContext,
  redirect,
  RouterProvider,
  type MiddlewareFunction,
} from "react-router";
import App from "./App";
import { PublicLayout } from "./layouts/PublicLayout";
import { PrivateLayout } from "./layouts/PrivateLayout";
import type { BudgetUser } from "./model/BudgetUser";
import { isAuthenticated } from "./api/AuthApi";

const authentiationContext = createContext<BudgetUser>();

const authMiddleware: MiddlewareFunction = async ({ context }) => {
  console.log("HERE");
  if (!(await isAuthenticated())) {
    throw redirect("/");
  }
  //   context.set(authentiationContext, await getUserById(userId));
  //   return authentiationContext;
};

const router = createBrowserRouter([
  {
    Component: PublicLayout,
    children: [{ index: true, Component: App }],
  },
  {
    path: "app",
    middleware: [authMiddleware],
    children: [
      {
        Component: PrivateLayout,
        children: [{ index: true, Component: App }],
      },
    ],
  },
]);

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
