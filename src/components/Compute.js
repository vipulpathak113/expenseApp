/* eslint-disable */
import React, { Component, lazy, Suspense } from "react";
import { allexpense } from "../store/actions/expenseAction";
import { connect } from "react-redux";
import { PushSpinner } from "react-spinners-kit";

class Compute extends Component {
  componentDidMount() {}

  render() {
    const payments = this.props.payment
      .split("\n")
      .slice(0, this.props.noOfPayments);
    const detail = this.props.detail;
    const PaymentList = () => (
      <div className="container-fluid">
        <p className="paytext">
          It would take <b> {this.props.noOfPayments} payments</b> to even out
          all debts:
        </p>
        <table border="1" style={{ width: "365px" }}>
          <tbody>
            {this.props.payment &&
            this.props.payment !== "No debt. Everything balances!" ? (
              payments.map((item, id) => {
                return (
                  <tr key={id}>
                    <td className="paymentcol">{item.split(",")[0]}</td>
                    <td className="paymentcol">
                      {" "}
                      <img
                        src={require("../newarrow.jpg")}
                        alt="start"
                        className="payarrow"
                      />
                    </td>
                    <td className="paymentcol">{item.split(",")[1]}</td>
                    <td className="paymentcol">
                      <img
                        src={require("../payarrow.jpg")}
                        alt="start"
                        className="payerarrow"
                      />
                    </td>
                    <td className="paymentcol">{item.split(",")[2]}</td>
                  </tr>
                );
              })
            ) : (
              <div className="zerobal">No debt. Everything balances!</div>
            )}
          </tbody>
        </table>

        <div>
          <div className="detaildiv">
            <b>Details:</b>
          </div>
          <table border="1">
            <thead>
              <tr>
                <th className="detailth">Name</th>
                <th className="detailth">Expenses+</th>
                <th className="detailth">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {detail &&
                detail.map((item, id) => {
                  console.log(item);
                  return (
                    <tr key={id}>
                      <td className="detailtd">
                        {item.split(",")[3].substring(7)}
                      </td>
                      <td className="detailtd">
                        {item.split(",")[2].substring(12)}
                      </td>
                      <td className="detailtd">
                        {item.split(",")[1].substring(7) === "None"
                          ? 0
                          : item.split(",")[1].substring(7)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div>+ Number of expenses paid</div>
        </div>
      </div>
    );

    const Lazy = lazy(
      () =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve({ default: () => <PaymentList /> });
          }, 1200);
        })
    );

    return (
      <div>
        <Suspense fallback={<PushSpinner size={30} color="#686769" />}>
          <Lazy />
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    payment: state.payment.data,
    noOfPayments: state.payment.data.split("\n").length - 1,
    count: state.expense.data1.count,
    detail: state.payment.detail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allexpense: expense => dispatch(allexpense(expense))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compute);
