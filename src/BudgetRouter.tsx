import { createBrowserRouter, RouterProvider } from "react-router";
import { SignIn } from "./pages/public/SignIn";
import { SignUp } from "./pages/public/SignUp";

import PublicLayout from "./layouts/PublicLayout";
import SecuredLayout from "./layouts/SecuredLayout";
import { Dashboard } from "./pages/secured/Dashboard";
// import { authMiddleware } from "./middleware/authMiddleware";
import { SignOut } from "./pages/public/SignOut";
import { Categories } from "./pages/secured/Categories";
// import { Planner } from "./pages/secured/Planner";
import { BankAccounts } from "./pages/secured/BankAccounts";
import { Transactions } from "./pages/secured/Transactions";
import { Reports } from "./pages/secured/Reports";
import { Settings } from "./pages/secured/Settings";
import { BankAccountView } from "./pages/secured/BankAccountView";
import { BankAccountCreate } from "./pages/secured/BankAccountCreate";
import { BankAccountClose } from "./pages/secured/BankAccountClose";

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
            { path: "/app/accounts", Component: BankAccounts },
            { path: "/app/accounts/create", Component: BankAccountCreate },
            { path: "/app/accounts/:accountId", Component: BankAccountView },
            {
              path: "/app/accounts/:accountId/close",
              Component: BankAccountClose,
            },
            { path: "/app/categories", Component: Categories },
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
