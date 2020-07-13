import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import ReviewsList from "./components/reviews-list.component";
import EditReview from "./components/edit-reviews.component";
import CreateReview from "./components/create-review.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path = "/" exact component = {ReviewsList} />
        <Route path = "/edit/:id" component = {EditReview} />
        <Route path = "/create" component = {CreateReview} />
        <Route path = "/user" component = {CreateUser} />
      </div>
    </Router>
  );
}

export default App;
