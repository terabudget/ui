import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createContext,
  RouterProvider,
  type MiddlewareFunction,
} from "react-router";
import App from "./App";
import { PublicLayout } from "./layouts/PublicLayout";
import { PrivateLayout } from "./layouts/PrivateLayout";
import type { BudgetUser } from "./model/BudgetUser";

const userContext = createContext<BudgetUser>();

async function authMiddleware({ context }): MiddlewareFunction<BudgetUser> {
  const userId = getUserId();

  if (!userId) {
    throw redirect("/login");
  }

  context.set(userContext, await getUserById(userId));
}

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
