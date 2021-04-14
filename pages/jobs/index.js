import JobCard from '../../components/JobCard';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_ALL_JOBS } from '../../graphql/queries';
import {
  signIn, 
  signOut,
  useSession,
  getSession
} from 'next-auth/client';

const Jobs = ({ jobList }) => {
  
  const [ session ] = useSession();

  return (
    <div className="jobs">

      {session && <>
        {jobList.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
        
        <div>
          <h1>Signed in as {session.user.name} </h1> <br/>
          <button onClick={signOut}>Sign out</button>
        </div>

      </>}shazi.atlassian.net


    </div>
  )
}

export const getServerSideProps = async (context) => {

  const session = await getSession(context);

  if (!session) return {
    props: {}
  };

  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL_URL,
    cache: new InMemoryCache()
  });

  const { data } = await client.query({ query: GET_ALL_JOBS });
  console.log("Query!!");

  return {
    props: {
      jobList: data.jobs
    }
  }
}

export default Jobs;
