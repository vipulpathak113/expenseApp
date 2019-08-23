import React, { Component } from "react";

class staticComp extends Component {
  render() {
    return (
      <div style={{ marginTop: "16px" }}>
        <ul>
          <li> Enter a list of persons ;</li>
          <li> Enter expenses (amount, who paid, for whom, etc.);</li>
          <li>
            {" "}
            The shortest list of payments needed to even the debts is
            calculated;
          </li>
          <li> Print, share, save and export your work.</li>
        </ul>
      </div>
    );
  }
}

export default staticComp;
