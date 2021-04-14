import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
// import { PrismaClient } from '@prisma/client'
//import Adapters from 'next-auth/adapters'
// const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "user:email read:user user:follow read:me"
    }),
    Providers.Atlassian({
        clientId: process.env.ATLASSIAN_CLIENT_ID,
        clientSecret: process.env.ATLASSIAN_CLIENT_SECRET,
        scope: 'write:jira-work read:jira-work read:jira-user offline_access read:me'
      }),
    // ...add more providers here
  ],
  database: process.env.DATABASE_URL
  // A database is optional, but required to persist accounts in a database
  //adapter: Adapters.Prisma.Adapter({ prisma }),
  
  
})