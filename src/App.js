import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('services');
    this.unsubscribe = null;
    this.state = {
      services: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const services = [];
    querySnapshot.forEach((doc) => {
      const { name, phone, email} = doc.data();
      services.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        phone,
        email,
      });
    });
    this.setState({
      services
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Service LIST
            </h3>
          </div>
          <div class="panel-body">
            {/* <h4><Link to="/create" class="btn btn-primary">Add Service</Link></h4> */}
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {this.state.services.map(service =>
                  <tr>
                    <td>{service.name}</td>
                    <td>{service.phone}</td>
                    <td>{service.email}</td>
                    <td><Link to={`/show/${service.key}`} class="btn btn-primary">Details</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
