import {Button, Navbar, Form, Nav, FormControl ,NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import * as Icon from 'react-bootstrap-icons';

export default function Navi() {
    return (
        <div>
            
         <Navbar bg="dark" variant="dark">
    
    <Nav className="mr-auto">
      <Nav.Link style={{ color:  'darkorange'}}href="/github">MyBoard</Nav.Link>
    </Nav>
    <Form inline>
    <Nav.Link style={{ color:'darkorange'}}href="/"><Icon.BoxArrowDown></Icon.BoxArrowDown>SignOut</Nav.Link>
    </Form>
  </Navbar>
  <br />
        </div>
   )
    }

