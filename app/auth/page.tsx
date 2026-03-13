import AuthView from "@/src/components/auth/AuthView";

type AuthPageProps = {
  searchParams: Promise<{ message?: string }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;

  return <AuthView initialMessage={params.message} />;
}