import { useNavigate } from "react-router";
import { useAuthContext } from "../../components/provider/AuthProvider";

export const SignOut = () => {
  const nav = useNavigate();
  const { clearAuth } = useAuthContext();

  clearAuth();

  return (
    
    <div className="flex grid grid-cols-1">
      <div className="col-span-1 flex m-auto p-4">
        <h1>Sign Out</h1>
      </div>
      <div className="col-span-1 m-auto p-4">
        You have been signed out.{" "}
        <a href="#" onClick={() => nav("/")}>
          Click here
        </a>{" "}
        to return to the sign in page.
      </div>
    </div>
  );
};
