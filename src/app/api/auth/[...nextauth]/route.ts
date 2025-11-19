import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// Simple admin user (no database needed)
const ADMIN_USER = {
    id: '1',
    email: 'admin@fastrocket.com',
    password_hash: '$2b$10$5DvWtFa3svqs5qCPxNVKveG1r3sN8/NlKbDcwvXeQrTNUBr9oZoCe', // password: password123
    name: 'Admin',
    role: 'admin'
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    // Check if it's the admin user
                    if (credentials.email !== ADMIN_USER.email) {
                        console.error('User not found');
                        return null;
                    }

                    // Verify password
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        ADMIN_USER.password_hash
                    );

                    if (!isPasswordValid) {
                        console.error('Invalid password');
                        return null;
                    }

                    // Return user object for session
                    return {
                        id: ADMIN_USER.id,
                        name: ADMIN_USER.name,
                        email: ADMIN_USER.email,
                    };
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
