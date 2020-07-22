import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Home.css";

function Home(props) {
  return (
    <>
      <div className="d-flex flex-row justify-content-around mb-5 mt-5">
        <Link to="/customer">
          <button className="btn btn-primary tile">
            <h2>Customers</h2>
          </button>
        </Link>
        <Link to="/machinery">
          <button className="btn btn-dark tile">
            <h2>Machineries</h2>
          </button>
        </Link>
        <Link to="/workhouse">
          <button className="btn btn-success tile">
            <h2>Workhouses</h2>
          </button>
        </Link>
      </div>
      <div className="d-flex flex-row justify-content-around">
        <Link to="/organization">
          <button className="btn btn-danger tile">
            <h2>Organizations</h2>
          </button>
        </Link>
        <Link to="/agreement">
          <button className="btn btn-secondary tile">
            <h2>Agreements</h2>
          </button>
        </Link>
        <Link to="/project">
          <button className="btn btn-info tile">
            <h2>Projects</h2>
          </button>
        </Link>
      </div>
    </>
  );
}

export default Home;
