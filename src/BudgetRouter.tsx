import { createBrowserRouter, RouterProvider } from "react-router";
import { SignIn } from "./pages/public/SignIn";
import { SignUp } from "./pages/public/SignUp";

import PublicLayout from "./layouts/PublicLayout";
import SecuredLayout from "./layouts/SecuredLayout";
import { Dashboard } from "./pages/secured/Dashboard";
import { authMiddleware } from "./middleware/authMiddleware";
import { SignOut } from "./pages/public/SignOut";
import { Categories } from "./pages/secured/Categories";
import { Planner } from "./pages/secured/Planner";
import { Accounts } from "./pages/secured/Accounts";
import { Transactions } from "./pages/secured/Transactions";
import { Reports } from "./pages/secured/Reports";
import { Settings } from "./pages/secured/Settings";

export const BudgetRouter = () => {
  const budgetRouter = createBrowserRouter([
    {
      Component: PublicLayout,
      children: [{ index: true, Component: SignIn }],
    },
    {
      path: "sign-up",
      Component: PublicLayout,
      children: [{ index: true, Component: SignUp }],
    },
    {
      path: "/sign-out",
      Component: PublicLayout,
    //   middleware: [authMiddleware],
      children: [{ index: true, Component: SignOut }],
    },
    {
      path: "app",
    //   middleware: [authMiddleware],
      children: [
        {
          Component: SecuredLayout,
          children: [
            { index: true, Component: Dashboard },
            { path: "/app/accounts", Component: Accounts },
            { path: "/app/categories", Component: Categories },
            { path: "/app/planner", Component: Planner },
            { path: "/app/reports", Component: Reports },
            { path: "/app/settings", Component: Settings },
            { path: "/app/transactions", Component: Transactions },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={budgetRouter} />;
};
