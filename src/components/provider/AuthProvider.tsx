import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthResponse } from "../../model/AuthResponse";
import { isAccessTokenValid } from "../../api/AuthApi";
import { lsUtil } from "../../util/localStorageUtil";

interface AuthContextInterface {
  tokens: AuthResponse | undefined;
  isAuthenticated: boolean;
  setTokens: (value: AuthResponse) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default AuthContext;

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

/**
 * The Auth provider is responsible for providing the context, not implementing logic based on the auth state.
 * @param param0
 * @returns
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [tokens, setTokens] = useState<AuthResponse | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const clearAuth = () => {
    setTokens(undefined);
    localStorage.clear();
  };

  useEffect(() => {
    const checkToken = async () => {
      if (!tokens) {
        setIsAuthenticated(false);
        const lsTokens = lsUtil.getAuth();
        if (lsTokens) {
          setTokens(lsTokens);
        }
        return;
      }
      const isValid = await isAccessTokenValid(tokens.accessToken);
      setIsAuthenticated(isValid);
    };

    checkToken();
  }, [tokens]);

  return (
    <AuthContext.Provider
      value={{ clearAuth, isAuthenticated, tokens, setTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};
