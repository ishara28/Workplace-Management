import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import Axios from "axios";

export class DatatablePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      machinery: [],
      columns: [
        {
          label: "Machine Id",
          field: "m_id",
          // sort: "asc",
          width: 150,
        },
        {
          label: "Index No",
          field: "index_no",
          // sort: "asc",
          width: "270",
        },
        {
          label: "Reg Id",
          field: "reg_id",
          // sort: "asc",
          width: 200,
        },
        {
          label: "Reg Date",
          field: "reg_date",
          // sort: "asc",
          width: 100,
        },
        {
          label: "Status",
          field: "status",
          // sort: "asc",
          width: 150,
        },
        {
          label: "Category",
          field: "category",
          // sort: "asc",
          width: 100,
        },
        {
          label: "Description",
          field: "description",
          // sort: "asc",
          width: 100,
        },
        {
          label: "Owner Id",
          field: "owner_id",
          // sort: "asc",
          width: 100,
        },
      ],
    };
  }

  componentDidMount() {
    Axios.get("/machinery/")
      .then((res) =>
        this.setState(
          {
            machinery: res.data,
          },
          () => {
            this.setState({
              data: { columns: this.state.columns, rows: this.state.machinery },
            });
          }
        )
      )
      .then(() => console.log(this.state.machinery))
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <MDBDataTable
          hover
          sortable
          responsive
          striped
          bordered
          data={this.state.data}
        />
      </div>
    );
  }
}

export default DatatablePage;
