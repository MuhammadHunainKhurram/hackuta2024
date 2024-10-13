'use client';

import { useUser, RedirectToSignIn, UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div>
      <UserButton/>
    </div>
  );
}
