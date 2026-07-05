import { notFound } from "next/navigation";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { getDemoUser, listDemoUsernames } from "@/content/demo";

type UserLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
};

export function generateStaticParams() {
  return listDemoUsernames().map((username) => ({ username }));
}

export default async function UserLayout({ children, params }: UserLayoutProps) {
  const { username } = await params;
  const user = getDemoUser(username);

  if (!user) {
    notFound();
  }

  return (
    <ProfileProvider username={username} profile={user.profile}>
      {children}
    </ProfileProvider>
  );
}
