import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
      GoogleProvider({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      }),
    ],
    callbacks: {
      // called after sucessful signin
      signIn: async ({ user, profile, account, metadata }) => {
        console.log(user, metadata);
        if (account?.provider === "google") {
          const googleAuthData = {
            username: profile.name.replaceAll(" ", "_"),
            email: profile.email,
            // role: credentials?.role || "Host"
          };
          let signInResponse = null;
          await instance
            .post("/auth/oauth-sign-in", googleAuthData)
            .then((response) => {
              //Add Refresh Token to Cookie
              const cookies = response.headers.get("set-cookie");
              res.setHeader("Set-Cookie", cookies);

              if (response.data.user) {
                user = {
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
          user.test = "test";
          return true;
        } else return true;
      },
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
