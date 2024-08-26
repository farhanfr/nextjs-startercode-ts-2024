import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { BASE_URL, API_KEY } from "@/utils/constants"
import { IUser, IUserWithId } from "@/types/user";

const authOption: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                otp: {
                    label: 'password', type: 'password'
                }
            },
            authorize: async (credentials) => {
                const { phonenumber, otp } = credentials as {
                    phonenumber: string,
                    otp: string
                }

                // const data: any = {
                //     phonenumber: phonenumber,
                //     otp: otp
                // }
                // console.log(data)

                const result = await fetch(BASE_URL + '/verify-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': API_KEY ?? "1234"
                    },
                    body: JSON.stringify({ phonenumber: phonenumber, otp: otp })
                })
                const resultData = await result.json()
                if (result.ok) {
                    console.log("resultData=>", resultData)
                    const tokenData:IUser = {
                        id: "1",
                        name: "developer",
                        accessToken: resultData.data.accessToken,
                        refreshToken: resultData.data.refreshToken,
                    }
                    return tokenData as IUserWithId
                } else {
                    console.log(resultData)
                    throw new Error(resultData.message)
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {

            if (account?.provider === "credentials") {
                console.log("callback user=> ", user) //berdasarkan response backend
                console.log("callback token=> ", token)
                token.user = user
            }
            return token
        },
        async session({ session, token }: any) {
            console.log("session token => ", token)
            session.user = token.user
            console.log("session session=> ", session)
            return session
        }

    },
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }