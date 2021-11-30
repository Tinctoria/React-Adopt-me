import { Component } from "react";
import { withRouter } from "react-router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  state = { loading: true, showModal: false };

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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2> Loading... </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1> {name} </h1>
          <h2> {`${animal} - ${breed} - ${city} - ${state}`}</h2>
          {/* <h2> {animal} - {breed} - {city} - {state}</h2> detta gör samma som ovan i detta fall. */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {showModal ? (
            <Modal>
              <ThemeContext.Consumer>
                {([theme]) => (
                  <div>
                    <h2> Would you like to adopt {name}?</h2>
                    <div className="buttons">
                      <button
                        style={{ backgroundColor: theme }}
                        button
                        onClick={this.adopt}
                      >
                        Yes
                      </button>
                      <button
                        style={{ backgroundColor: theme }}
                        onClick={this.toggleModal}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </ThemeContext.Consumer>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
