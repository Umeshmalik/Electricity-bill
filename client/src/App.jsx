import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Container } from "@mui/material"

import Home from "./modules/Home";
import BillView from "./modules/BillView";
import EditBill from './modules/EditBill';

const App = () => {
  return (
    <Container maxWidth="xl" fluid={2}>
      <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/bill/:id" element = {<BillView/>} />
            <Route path="/:id/edit" element = {<EditBill/>} />
            <Route path="/addBill" element = {<EditBill/>} />
        </Routes>
      </Router>

    </Container>
  )
}

export default App