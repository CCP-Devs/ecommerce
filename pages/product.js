import { Component } from "react";

export class product extends Component {
  constructor() {
    super();
    this.state = {
      item: "This is the product",
    };
  }

  render() {
    const { item } = this.state;
    return (
      <div>
        <h1><b>{item}</b></h1>
      </div>
    );
  }
}
export default product;
