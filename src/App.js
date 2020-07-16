import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import ReviewsList from "./components/reviews-list.component";
import EditReview from "./components/edit-reviews.component";
import CreateReview from "./components/create-review.component";
import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";
import Profile from "./components/profile-component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path = "/" exact component = {ReviewsList} />
        <Route path = "/edit/:id" component = {EditReview} />
        <Route path = "/create" component = {CreateReview} />
        <Route path = "/register" component = {CreateUser} />
        <Route path = "/login" component = {LoginUser} />
        <Route path = "/profile" component = {Profile} />
      </div>
    </Router>
  );
}

export default App;
