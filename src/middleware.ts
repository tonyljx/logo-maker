import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/pricng"],
  afterAuth(auth, req, evt) {
    console.log("after auth");
    if (!auth.userId && !auth.isPublicRoute) {
      if (auth.isApiRoute) {
        return NextResponse.json(
          { code: -2, message: "invalid auth" },
          {
            status: 401,
          },
        );
      } else {
        // return NextResponse.redirect(new URL("/sign-in", req.url));
        return redirectToSignIn({ returnBackUrl: req.url });
      }
    }

    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
// };
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
