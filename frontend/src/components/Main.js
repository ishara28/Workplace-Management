import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Login from './Login'
import Customer from './Clients/Client';
import Worker from './Workers/Worker'
import Agent from "./Agents/Agent";
import Machinery from './Machineries/Machinery';
import Site from './Sites/Site';
import ContactPerson from './ContactPerson/ContactPerson';
import Agreement from './agreements/Agreement';
import Project from './project/Project';
import { connect } from "react-redux";

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

    const ClientPage = () => {
      if (this.state.username != null) {
        return <Customer />;
      } else {
        return <Login />;
      }
    };

    const WorkerPage = () => {
      if (this.state.username != null) {
        return <Worker />;
      } else {
        return <Login />;
      }
    };

    const AgentPage = () => {
      if (this.state.username != null) {
        return <Agent />;
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

    const SitePage = () => {
      if (this.state.username != null) {
        return <Site />;
      } else {
        return <Login />;
      }
    };

    const CPPage = () => {
      if (this.state.username != null) {
        return <ContactPerson />;
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
          <Route path="/client" component={ClientPage} />
          <Route path="/worker" component={WorkerPage} />
          <Route path="/agent" component={AgentPage} />
          <Route path="/machinery" component={MachineryPage} />
          <Route path="/site" component={SitePage} />
          <Route path="/cp" component={CPPage} />
          <Route path="/agreement" component={AgreementPage} />
          <Route path="/project" component={ProjectPage} />
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));