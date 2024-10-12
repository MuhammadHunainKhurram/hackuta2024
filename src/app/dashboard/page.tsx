'use client';

import { useUser, RedirectToSignIn, UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div>
      <UserButton/>
    </div>
  );
}
