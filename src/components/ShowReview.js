import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class ShowReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  componentDidMount() {
    const reviews = [];
    const reviewref = firebase.firestore().collection('reviews')
    var query = reviewref.where('serviceID', '==', this.props.match.params.id).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        } 
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          reviews.push(doc.data());
          console.log('review'+reviews)
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
      this.setState({
        reviews : reviews,
      })
    console.log(this.state);
  }

  render() {
    const reviewApp = ({reviews}) => (
      <div>
        {reviews.map(review => (
          <div className="review" key={review.serviceId}>{review.date}</div>
        ))}
      </div>
    ); 
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Service List</Link></h4>
          </div>
          <div class="panel-body">
            {reviewApp}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowReview;
