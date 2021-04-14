import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React from 'react';
import {
  signIn,
  signOut,
  useSession, providers
} from 'next-auth/client';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav'
import Git from './github'
const  home = ({providers}) => {
  const [ session, loading ] = useSession();
  return (
    <div >
      <Head>
        <title>Jobs App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!session && <>
          <div className={styles.container}>
          <h1>JIRA ISSUES APP</h1> <br/>
          <Button className="btn btn-primary" onClick={signIn}>LETS START</Button>
          </div>
        </>}
        {session && <>
          <Nav/>
          {/* <h1>Signed in as {session.user.name} </h1>  */}
          {/* {JSON.stringify(session)} */}
          {/* <h2>Go to <Link href="/jobs"><a>Issues</a></Link>  </h2> */}
          <Button onClick={signOut}>Sign out</Button>
          {Object.values(providers).map(provider => (
              <Button className="btn btn-primary" onClick={() => signIn(provider.id)}>
                Sign with {provider.name}
              </Button>
          ))}
          <br></br>
          <div className="row text-center">
              <div className="col-6">
                <h1><b>GITHUB ISSUES</b></h1>
                {JSON.stringify(session)}
              </div>
              <div className="col-6">
                <h1><b>ATLASSIAN ISSUES</b></h1>
              </div>
          </div>
        </>}
      </main>
    </div>
  )
}
export default home;
home.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}