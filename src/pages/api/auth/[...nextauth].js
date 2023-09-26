import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import instance from "@/lib/axios";

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          let signInResponse = null;
          await instance
            .post("/auth/sign-in", {
              email: credentials?.email,
              password: credentials?.password,
            })
            .then((response) => {
              //Add Refresh Token to Cookie
              const cookies = response.headers.get("set-cookie");
              res.setHeader("Set-Cookie", cookies);

              if (response.data.user) {
                let user = {
                  ...response.data.user,
                  accessToken: response.data.accessToken,
                };
                signInResponse = user;
                return user;
              } else {
                return null;
              }
            })
            .catch((err) => {
              console.log(err);
              return null;
            });

          return signInResponse;

       
        },
      }),
    ],
    callbacks: {
      // called after sucessful signin
      jwt: async ({ token, user }) => {
        if (user) {
          token.id = user.id;
          token.user = user;
        }
        return token;
      },
      session: async ({ session, token }) => {
        if (token) {
          session.id = token.id;
          session.user = token.user;
        }
        return session;
      },
    },
    // secret: process.env.JWT_SECRET,
    session: {
      // strategy: "jwt",
      maxAge: 1 * 24 * 60 * 60, // 1day
    },
    // jwt: {
    //   secret: process.env.JWT_SECRET,
    //   encryption: true,
    // },
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
