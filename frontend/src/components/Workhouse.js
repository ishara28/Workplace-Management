import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Card, CardTitle } from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchWorkhouses } from "../redux/ActionCreators";
import axios from "axios";

const mapStateToProps = (state) => ({
  Workhouses: state.Workhouses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWorkhouses: () => dispatch(fetchWorkhouses()),
});

function RenderItem({ item }) {
  return (
    <Card>
      <CardTitle>{item.w_id}</CardTitle>
    </Card>
  );
}

class Workhouse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workhouses: [],
    };
  }

  componentDidMount() {
    // this.props.fetchWorkhouses();
    axios.get("/workhouse/").then((res) => {
      this.setState(
        {
          workhouses: res.data,
        },
        () => console.log(this.state.workhouses)
      );
    });
  }

  menu = this.props.Workhouses.workhouses.map((item) => {
    return (
      <div key={item.w_id} className="col-12 col-md-5 m-1">
        <RenderItem item={item} />
      </div>
    );
  });

  render() {
    console.log(this.props.Workhouses.workhouses);
    return (
      <>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Workhouse</BreadcrumbItem>
        </Breadcrumb>

        <div className="row">{this.menu}</div>
        <div>
          {this.state.workhouses.map((item) => {
            return (
              <Card>
                <CardTitle>{item.w_id}</CardTitle>
              </Card>
            );
          })}
        </div>
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Workhouse)
);

/*<div className="container-fluid d-flex flex-row-reverse">
<button className="btn btn-success ml-2">Register</button>
                    <input type="text" className="form-control textbox" placeholder="Search by Id"/>
                    </div>*/
