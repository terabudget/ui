import { createBrowserRouter, RouterProvider } from "react-router";
import { SignIn } from "./pages/public/SignIn";
import { SignUp } from "./pages/public/SignUp";

import PublicLayout from "./layouts/PublicLayout";
import SecuredLayout from "./layouts/SecuredLayout";
import { SecuredHome } from "./pages/secured/SecuredHome";
import { authMiddleware } from "./middleware/authMiddleware";
import { SignOut } from "./pages/public/SignOut";

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
      middleware: [authMiddleware],
      children: [{ index: true, Component: SignOut }],
    },
    {
      path: "app",
      middleware: [authMiddleware],
      children: [
        {
          Component: SecuredLayout,
          children: [{ index: true, Component: SecuredHome }],
        },
      ],
    },
  ]);

  return <RouterProvider router={budgetRouter} />;
};
