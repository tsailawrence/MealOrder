import { authMiddleware } from "@clerk/nextjs";

const publicRoutes = ["/"];
const ignoredRoutes = [
  "/((?!api|trpc))(_next.*|.+\.[\w]+$)", 
  "/foody-backend-ALB-1197695098.us-east-1.elb.amazonaws.com/clerk/register"
];

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: publicRoutes,
  ignoredRoutes: ignoredRoutes,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};