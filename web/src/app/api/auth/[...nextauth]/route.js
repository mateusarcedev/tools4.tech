import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { AxiosConfig } from '@/utils';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          avatar_url: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { id, name, email, avatar_url } = profile;

      try {
        // First, try to authenticate with the backend
        const authResponse = await fetch(`${process.env.URL_API}/auth/validate-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            githubId: parseInt(id),
            token: account.access_token 
          }),
        });

        // If authentication fails, create/update the user
        if (!authResponse.ok) {
          const res = await AxiosConfig.post('/users', {
            githubId: parseInt(id),
            name: name || profile.login || 'Unknown',
            email: email || '',
            avatar: avatar_url || '',
          });

          if (res.status === 200 || res.status === 201) {
            user.role = res.data.role;
            user.githubId = parseInt(id);
            return true;
          }
        } else {
          // Authentication succeeded
          const userData = await authResponse.json();
          user.role = userData.role;
          user.githubId = parseInt(id);
          return true;
        }
      } catch (error) {
        console.error('Error connecting to the backend: ', error);
        // Still allow sign in even if backend is down
        return true;
      }
    },
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        token.githubId = parseInt(profile.id);
        token.avatar_url = profile.avatar_url;
        token.access_token = account.access_token;
      }
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.githubId = token.githubId;
        session.user.avatar_url = token.avatar_url;
        session.user.role = token.role;
        session.accessToken = token.access_token;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};

// Initialize NextAuth
const handler = NextAuth(authOptions);

// Export GET and POST functions for App Router
export { handler as GET, handler as POST, authOptions };