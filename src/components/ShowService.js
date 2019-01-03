import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import ShowReview from './ShowReview';
class ShowService extends Component {

  constructor(props) {
    super(props);
    this.state = {
      service: {},
      reviews: [],
      key: ''
    };
  }

  componentWillMount() {
    const ref = firebase.firestore().collection('services').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const reviewSs = [];
        const revRef = firebase.firestore().collection('reviews');
        var querry = revRef.where('serviceID','==',this.props.match.params.id).get().then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }  
          snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            reviewSs.push(doc.data());
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
        this.setState({
          service: doc.data(),
          reviews : reviewSs,
          key: doc.id,
          isLoading: false
        });
        console.log(this.state);
      } else {
        console.log("No such document!");
      }
    });
    console.log(this.state);
  }

  delete(id){
    firebase.firestore().collection('services').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Service List</Link></h4>
            <h3 class="panel-title">
              {this.state.service.name}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.service.description}</dd>
              <dt>Phone:</dt>
              <dd>{this.state.service.phone}</dd>
              <dt>Email:</dt>
              <dd>{this.state.service.email}</dd>
              <dt>WebPage:</dt>
              <dd>{this.state.service.webpage}</dd>
              <dt>Address:</dt>
              <dd>{this.state.service.address}</dd>
              <dt>CoverImage:</dt>
              <dd>{this.state.service.coverImage}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <Link to={`/review/${this.state.key}`} class="btn btn-success">Add Review</Link>&nbsp;
            {/* <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button> */}
            {/* <ShowReview id={this.state.key}/> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowService;
