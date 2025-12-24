import { createBrowserRouter } from "react-router";
import { SignIn } from "./pages/public/SignIn";
import { SignUp } from "./pages/public/SignUp";

import PublicLayout from "./layouts/PublicLayout";
import SecuredLayout from "./layouts/SecuredLayout";
import { SecuredHome } from "./pages/secured/SecuredHome";
import { authMiddleware } from "./middleware/authMiddleware";

export const budgetRouter = createBrowserRouter([
  {
    Component: PublicLayout,
    children: [{ index: true, Component: SignIn }],
  },
  {
    path: "signup",
    Component: PublicLayout,
    children: [{ index: true, Component: SignUp }],
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
