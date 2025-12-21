import { Outlet } from "react-router";

export const PrivateLayout = () => {
  return (
    <>
      private <Outlet />{" "}
    </>
  );
};
