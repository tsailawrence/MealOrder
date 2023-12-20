import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// export default authMiddleware({});
export default authMiddleware({
  publicRoutes: ["/"],
});
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
export const config = {
  matcher: [
    // Apply middleware to all routes except the root ("/")
    "/((?!/\\b|.+\\.[\\w]+$|_next).*)",
    // Apply middleware to all API and TRPC routes
    "/api/:path*",
    "/trpc/:path*"
  ],
};