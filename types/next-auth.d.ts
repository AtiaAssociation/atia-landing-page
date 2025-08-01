import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      role: "USER" | "ADMIN";
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    role: "USER" | "ADMIN";
    password?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "USER" | "ADMIN";
  }
}
