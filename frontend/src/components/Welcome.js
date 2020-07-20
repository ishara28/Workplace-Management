<<<<<<< Updated upstream
import React, { Component } from "react";
import "../stylesheets/Welcome.css";

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="mainContainer bg-dark">
        <div className="container-fluid bg-primary">
          <div className="text-center text-white font-weight-bold">
            <h1 className="p-4">Workplace Management System</h1>
          </div>
        </div>
        <div className="row">
          <div className="container bg-light formbox">
            <h2 className="text-center">
              <b>Login</b>
            </h2>
            <hr className="bg-success horizontal_line" />
            <form onSubmit={this.handleSubmit}>
              <input
                type="username"
                className="form-control mb-3"
                id="username"
                name="username"
                value={this.username}
                onChange={this.handleInputChange}
                placeholder="username"
                required
              />
              <input
                type="password"
                className="form-control mb-3"
                id="password"
                name="password"
                value={this.password}
                onChange={this.handleInputChange}
                placeholder="password"
                required
              />
              <center>
                <button
                  type="submit"
                  class="btn btn-success btn_login_register"
                >
                  Login
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
=======
import React, { Component } from "react";
import "../stylesheets/Welcome.css";

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="mainContainer bg-dark">
        <div className="container-fluid bg-primary">
          <div className="text-center text-white font-weight-bold">
            <h1 className="p-4">Workplace Management System</h1>
          </div>
        </div>
        <div className="row">
          <div className="container bg-light formbox">
            <h2 className="text-center">
              <b>Login</b>
            </h2>
            <hr className="bg-success horizontal_line" />
            <form onSubmit={this.handleSubmit}>
              <input
                type="username"
                className="form-control mb-3"
                id="username"
                name="username"
                value={this.username}
                onChange={this.handleInputChange}
                placeholder="username"
                required
              />
              <input
                type="password"
                className="form-control mb-3"
                id="password"
                name="password"
                value={this.password}
                onChange={this.handleInputChange}
                placeholder="password"
                required
              />
              <center>
                <button
                  type="submit"
                  class="btn btn-success btn_login_register"
                >
                  Login
                </button>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
>>>>>>> Stashed changes
