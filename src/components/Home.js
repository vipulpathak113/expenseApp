import React, { Component } from "react";
import { connect } from "react-redux";
import { createSheet } from ".././store/actions/sheetAction";
import StaticComp from "./static";

class Home extends Component {
  state = {
    display_name: "",
    description: "",
    sheet: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.createSheet(this.state);
  }

  componentDidMount() {
    var id = Math.random()
      .toString(36)
      .substr(2, 6);
    this.setState({
      sheet: id
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="staticComp">
          <StaticComp />
        </div>
        <div
          style={{
            marginLeft: "15px",
            marginTop: "25px",
            marginBottom: "12px"
          }}
        >
          <b>
            Start a new Expense Sheet{" "}
            <span className="registr">
              NO REGISTRATION REQUIRED - 100% FREE
            </span>
          </b>
        </div>
        <div className="sheetborder">
          <div className="sheetName">
            <label
              htmlFor="sheetName"
              style={{
                marginRight: "56px",
                marginLeft: "10px",
                fontWeight: "600"
              }}
            >
              Name
            </label>
            <input
              type="text"
              id="display_name"
              value={this.state.display_name}
              onChange={this.handleChange.bind(this)}
              required
            />
            <img
              src={require("../start.svg")}
              alt="start"
              height="88px"
              width="200px"
              onClick={this.handleSubmit.bind(this)}
            />
          </div>

          <div>
            <label
              htmlFor="sheetDesc"
              style={{
                marginRight: "19px",
                marginLeft: "10px",
                paddingRight: "8px",
                fontWeight: "600"
              }}
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={this.state.description}
              onChange={this.handleChange.bind(this)}
              required
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    createSheet: sheet => dispatch(createSheet(sheet))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
