import Header from "./Header";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Workhouse from "./Workhouse";
import Organization from "./Organization";
import Project from "./Project";
import { connect } from "react-redux";
import Machinery from "./machinery/Machinery";
import Customer from "./customers/Customer";
import Agreement from "./agreements/Agreement";
import React, { Component } from "react";

const mapStateToProps = (state) => {
  return {
    username: state.Auth.username,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem("username"),
    };
  }

  render() {
    const HomePage = () => {
      if (this.state.username != null) {
        return <Home />;
      } else {
        return <Login />;
      }
    };

    const CustomerPage = () => {
      if (this.state.username != null) {
        return <Customer />;
      } else {
        return <Login />;
      }
    };

    const MachineryPage = () => {
      if (this.state.username != null) {
        return <Machinery />;
      } else {
        return <Login />;
      }
    };

    const WorkhousePage = () => {
      if (this.state.username != null) {
        return <Workhouse />;
      } else {
        return <Login />;
      }
    };

    const OrganizationPage = () => {
      if (this.state.username != null) {
        return <Organization />;
      } else {
        return <Login />;
      }
    };

    const AgreementPage = () => {
      if (this.state.username != null) {
        return <Agreement />;
      } else {
        return <Login />;
      }
    };

    const ProjectPage = () => {
      if (this.state.username != null) {
        return <Project />;
      } else {
        return <Login />;
      }
    };

    return (
      <>
        {this.state.username != null && <Header />}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/customer" component={CustomerPage} />
          <Route path="/machinery" component={MachineryPage} />
          <Route path="/workhouse" component={WorkhousePage} />
          <Route path="/organization" component={OrganizationPage} />
          <Route path="/agreement" component={AgreementPage} />
          <Route path="/project" component={ProjectPage} />
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
