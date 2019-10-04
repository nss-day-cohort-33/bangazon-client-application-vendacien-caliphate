import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import BangazonProject from './components/BangazonProject'
import './index.css'


ReactDOM.render(
  <Router>
      <BangazonProject />
  </Router>
  , document.getElementById('root'))

