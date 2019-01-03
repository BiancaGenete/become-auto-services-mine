import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
// serviceAddress
// serviceCoverImage
// serviceDescription
// serviceEmail
// serviceName
// servicePhone
// serviceWebpage
class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('services');
    this.state = {
      name: '',
      phone: '',
      email: '',
      description: '',
      webpage: '',
      address: '',
      coverImage: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, phone, email, description, webpage,address,coverImage } = this.state;

    this.ref.add({
      name,
      phone,
      email,
      description,
      webpage,
      address,
      coverImage
    }).then((docRef) => {
      this.setState({
        name: '',
        phone: '',
        email: '',
        description: '',
        webpage: '',
        address: '',
        coverImage: '',
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const {  name, phone, email, description, webpage,address,coverImage  } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD SERVICE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Service List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="name" />
              </div>
              <div class="form-group">
                <label for="phone">phone:</label>
                <input type="text" class="form-control" name="phone" value={phone} onChange={this.onChange} placeholder="phone" />
              </div>
              <div class="form-group">
                <label for="email">email:</label>
                <input type="text" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="email" />
              </div>
              <div class="form-group">
                <label for="webpage">webpage:</label>
                <input type="text" class="form-control" name="webpage" value={webpage} onChange={this.onChange} placeholder="webpage" />
              </div>
              <div class="form-group">
                <label for="address">address:</label>
                <input type="text" class="form-control" name="address" value={address} onChange={this.onChange} placeholder="address" />
              </div>
              <div class="form-group">
                <label for="coverImage">coverImage:</label>
                <input type="text" class="form-control" name="coverImage" value={coverImage} onChange={this.onChange} placeholder="coverImage" />
              </div>
              <div class="form-group">
                <label for="description">description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
