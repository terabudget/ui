import { createContext, useContext, useRef, type ReactNode } from "react";
import { Toast, type ToastMessage } from "primereact/toast";

interface CommonUIContextInterface {
  toast: (message: ToastMessage | ToastMessage[]) => void;
}

const CommonUIContext = createContext<CommonUIContextInterface | undefined>(
  undefined,
);

export const useCommonUIContext = () => {
  const context = useContext(CommonUIContext);
  if (context === undefined) {
    throw new Error("useCommonUI must be used within a CommonUIProvider");
  }
  return context;
};

export default CommonUIContext;

interface CommonUIProviderProps {
  children: ReactNode | ReactNode[];
}

/**
 * The CommonUI provider is responsible for providing the context, not implementing logic based on the commonui state.
 * @param param0
 * @returns
 */
export const CommonUIProvider = ({ children }: CommonUIProviderProps) => {
  const toastRef = useRef<Toast>(null);

  const toast = (message: ToastMessage | ToastMessage[]) =>
    toastRef.current?.show(message);

  return (
    <CommonUIContext.Provider value={{ toast }}>
      <Toast ref={toastRef} />
      {children}
    </CommonUIContext.Provider>
  );
};
