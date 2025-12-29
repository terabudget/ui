import type { FormEvent, ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  id: string;
  action?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

export const FormComponent = ({ action, children, id, onSubmit }: Props) => {
  const doOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(e);
  };
  return (
    <form id={id} action={action || "#"} onSubmit={doOnSubmit}>
      {children}
    </form>
  );
};
