import React, { Component } from 'react';
//import logo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Carousel from 'react-bootstrap/Carousel'
import '../../App.scss'
import egypt from '../layout/This is Egypt.mp4'
import {Redirect} from 'react-router-dom'
import Header from '../layout/header'
import ReactDOM from 'react-dom';
import Companies from '../pages/Companies'

class LandingBody extends Component {

  render() {
    return (
       
        <Carousel>
        <Carousel.Item>
            <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop" width="100%">
                 <source src={egypt} type="video/mp4"></source>
            </video>
          <Carousel.Caption>
            <h1>Invest in Egypt</h1>
              <Button variant="outline-light" size="lg"  href="/register">Sign Up</Button> <Button variant="outline-light" size="lg" href="/login">Sign In</Button>
          </Carousel.Caption>
        </Carousel.Item>
         <Carousel.Item>
          <Companies/>
          </Carousel.Item>
        {/*<Carousel.Item>
          <img
            className="d-block w-100"
             src={sum}
            alt="Third slide"
            height="100%"
          />
      
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item> */}
      </Carousel>
      
        )}
}

export default LandingBody;