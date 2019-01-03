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
class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      description: '',
      webpage: '',
      address: '',
      coverImage: '',
      key:'',
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('services').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const service = doc.data();
        this.setState({
          name: service.name,
          phone: service.phone,
          email: service.email,
          description: service.description,
          webpage: service.webpage,
          address: service.address,
          coverImage: service.coverImage,
          key : doc.id,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({service:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, phone, email, description, webpage,address,coverImage } = this.state;

    const updateRef = firebase.firestore().collection('services').doc(this.state.key);
    updateRef.set({
      name,
      phone,
      email,
      description,
      webpage,
      address,
      coverImage,
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
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT Service
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Service List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">name:</label>
                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="name" />
              </div>
              <div class="form-group">
                <label for="phone">phone:</label>
                <input type="text" class="form-control" name="phone" value={this.state.phone} onChange={this.onChange} placeholder="phone" />
              </div>
              <div class="form-group">
                <label for="email">email:</label>
                <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="email" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
