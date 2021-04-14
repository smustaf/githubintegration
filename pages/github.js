import GitHub from 'github-api';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
//import JiraApi from 'jira-client';
import { getSession, signIn, signOut, useSession, useState} from "next-auth/client";
import Link from 'next/link'
import Styles from '../styles/Home.module.css'
import {Table, Card,Nav} from 'react-bootstrap';
//import NextAuth from "next-auth";

export default function Github({yolo,p})

{
console.log(p)
const [session, loading] = useSession();

//const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
    console.log(yolo);
    //t.map((r)=>{console.log(r.name)})

    return(
      <div>
        {session && (
        <>
              <Nav/>
              <div className="row text-center">
                <div className="col-6" id={Styles.containerr}>
                  <h1><b>GITHUB ISSUES</b></h1>
                  <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell>
                      <b>GITHUB REPOS</b>
                    </TableCell>
                    <TableCell>
                      <b>ACTIONS</b>
                    </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                 {yolo.map((rr)=>(
                  <TableRow>
                    <TableCell><h4><b>{rr}</b></h4></TableCell>
                    <TableCell><Link href="/modal">show issues</Link></TableCell>
                  </TableRow>
                 ))}
                  </TableBody>
                </Table>
              </TableContainer>
                </div>
                <div className="col-6">
                  <h1><b>ATLASSIAN ISSUES</b></h1>
                  <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell>
                      <b>ATLASSIAN ISSUES</b>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {p.issues.map((rr)=>{return <TableCell>
                    <h4 key={key}><b>{rr.key}</b></h4></TableCell>})}
                  </TableBody>
                </Table>
              </TableContainer>
                </div>
              </div>
                    {/* MODAL STARTS HERE  */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </>
        )}
        {!session && (
        <>
          <h2>FIrst SIgn IN with</h2>
        </>
      )}
      </div>
);
  }
export async function getServerSideProps({req})
   {
    const session= await getSession({req});
    var gh = new GitHub
    ({
        username: session.user.name,
        accessToken: session.accessToken,
        /* also acceptable:
           token: 'MY_OAUTH_TOKEN'
         */
     });
const fetch = require('node-fetch');
const a= await fetch('https://api.atlassian.com/ex/jira/005f4274-f9ca-43a7-b1c5-4586925cea19/rest/api/2/search?jql=', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${Buffer.from(
      `${session.user.email}:P6QQY1BRMVZVgREvyFxh8C8F`
    ).toString('base64')}`,
    'Accept': 'application/json'
  }
})
  const p= await a.json()
  console.log(p)
    const result= await gh.getUser(session.user.name);
    const repo= await result.listRepos();
      // console.log(repo.data[0].name);
      const t=  repo.data;
      const getrepos = t.map((pp)=>{return pp.name})
     // console.log(repo.data[0].name);
   const yolo=  await repo.data.map((roww)=>{return roww.name});
   const rep= await gh.getIssues(session.user.name,yolo).listIssues();
   //console.log(yolo);
    console.log(rep);
   return{
  props: {
    yolo,p
  }
  };
}
// import GitHub from 'github-api';
// import React from 'react';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Button from '@material-ui/core/Button';
// //import JiraApi from 'jira-client';
// import { getSession, signIn, signOut, useSession } from "next-auth/client";
// import Link from 'next/link'
// import '../styles/Home.module.css'
// import {Table, Card,Nav} from 'react-bootstrap';
// //import NextAuth from "next-auth";
// export default function MainFunction({repo})
// {
//   //const dat =  yolo?.map((rr)=>{ return <TableRow><TableCell><h4><b>{rr}</b></h4></TableCell></TableRow>});
// const [session, loading] = useSession();
//     //console.log(repo);

//     //t.map((r)=>{console.log(r.name)})
//   return(
//       <div>
//         {session && (
//         <>
//             <div>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                     <TableCell>
//                       <b>GITHUB REPOS</b>
//                     </TableCell>
//                     <TableCell>
//                       <b>Actions</b>
//                     </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                         {repo}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               </div>
//             </>
//         )}
//         {!session && (
//         <>
//           <h2>FIrst SIgn IN with</h2>
//         </>
//       )}
//       </div>
// );
//   }
// export async function getServerSideProps({req})
//    {
//     const session= await getSession({req});
//     var gh = new GitHub
//     ({
//         username: session.user.name,
//         accessToken: session.accessToken,
//            /* also acceptable:
//            token: 'MY_OAUTH_TOKEN'
//          */
         
//      });
//      console.log(session.accessToken);
//     const result= await gh.getUser(session.user.name);
//     //console.log(result);
//      const repi= await result.listRepos();
//      const rep = repi.data;
//      const repo = rep.map((pp)=>{return pp.name})
//      console.log(repi);
//      const issue =await gh.getIssues('smustaf',repo).listIssues();

//       // console.log(repo.data[Job succeeded
//       return {
//       props : {repo , issue
//       }
        
//       }
//   };

