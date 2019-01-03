import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
// serviceID
// reviewDate
// reviewRating
// reviewText
class CreateReview extends Component {
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('reviews');
        // this.date = Date.now();
        // this.serviceID = this.props.match.params.id
        this.state = {
            serviceID   : '',
            date        : '',
            rating      : '',
            text        : '',       
        };
    }
    ComponentDidMount() {
        console.log(this.state);
      }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }


    // Add review to DB
    onSubmit = (e) =>{
        e.preventDefault();
        this.state.serviceID = this.props.match.params.id;
        var currentDate = new  Date();
        this.state.date = currentDate.getDate().toString()+'.'+ (currentDate.getMonth()+1).toString()+'.'+currentDate.getFullYear().toString();
        const { serviceID, date, rating,text } = this.state;
        
        this.ref.add({
          serviceID,
          date,
          rating,
          text,
        }).then((docRef) => {
          this.setState({
            serviceID   : '',
            date        : '',
            rating      : '',
            text        : '', 
          });
          this.props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  
    render() {
        const { rating, text } = this.state;
      return (
        <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD Review
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Service List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="rating">rating:</label>
                <input type="text" class="form-control" name="rating" value={rating} onChange={this.onChange} placeholder="rating" />
              </div>
              <div class="form-group">
                <label for="text">text:</label>
                <textArea class="form-control" name="text" onChange={this.onChange} placeholder="text" cols="80" rows="3">{text}</textArea>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
     )
  }
}



export default CreateReview;