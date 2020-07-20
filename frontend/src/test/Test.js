import React, { Component } from "react";
import axios from "axios";

export class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    axios.get("/members/").then((res) =>
      this.setState(
        {
          members: res.data,
        },
        () => console.log(this.state.members)
      )
    );
  }

  render() {
    return (
      <div>
        <p>Test Component</p>
      </div>
    );
  }
}

export default Test;
