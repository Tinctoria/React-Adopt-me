import { Component } from "react";
import { withRouter } from "react-router";

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(
      //   id nedan kommer från :id i vår route path i app.js
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
    // Nedan och Object.assign gör samma sak, ovan är vanligare i typescript.
    // this.setState({
    //   loading: false,
    //   name: json.pets[0].name,
    //   animal: json.pets[0].animal,
    //   breed: json.pets[0].breed,
    //   city: json.pets[0].city,
    //   state: json.pets[0].state,
    //   description: json.pets[0].description,
    // });
  }

  render() {
    const { animal, breed, city, state, description, name } = this.state;
    return (
      <div className="details">
        <div>
          <h1> {name} </h1>
          <h2> {`${animal} - ${breed} - ${city} - ${state}`}</h2>
          {/* <h2> {animal} - {breed} - {city} - {state}</h2> detta gör samma som ovan i detta fall. */}
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Details);
