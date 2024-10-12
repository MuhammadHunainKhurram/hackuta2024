import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Specify routes for middleware to match
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/dashboard(.*)', // Ensure middleware runs on this route
  ],
};
