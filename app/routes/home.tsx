import type { Route } from "./+types/home";
import type { BankAccount } from "~/model/BankAccount";
import { budgetAxios } from "~/core/budgetAxios";
import { PostLoginHome } from "~/pages/postlogin/PostLoginHome";

export async function loader({ params }: Route.LoaderArgs) {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const bankAccounts = (
    await budgetAxios.get<BankAccount[]>(`${apiUrl}/bank-accounts`)
  ).data;
  return { bankAccounts };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { bankAccounts } = loaderData;
  return <PostLoginHome bankAccounts={bankAccounts} />;
}
