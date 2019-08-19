/* eslint-disable */
import React, { Component, lazy, Suspense } from "react";
import { allexpense } from "../store/actions/expenseAction";
import { connect } from "react-redux";
import { PushSpinner } from "react-spinners-kit";
import { createExpense } from "../store/actions/expenseAction";
import { getAllPayment } from "../store/actions/paymentAction";
import { fetchAll } from "../store/actions/expenseAction";

class Compute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      paidBy: "",
      amount: "",
      startDate: new Date(),
      paidTo: [],
      sheetId: "",
      currentPage: 1,
      isSelected: true
    };
  }

  componentDidMount() {
    var id = window.location.pathname.substring(7, 9);
    this.setState({
      sheetId: id
    });

    this.props.fetchAll({ sheetId: id });
  }

  markPaid() {
    var id = window.location.pathname.substring(7, 9);
    this.props.createExpense({
      description: this.state.description,
      date: this.state.startDate,
      amount: this.state.amount,
      paidBy: this.state.paidBy,
      paidTo: this.state.paidTo,
      sheetId: id,
      currentPage: this.state.currentPage
    });

    this.props.getAllPayment({
      expenses: this.props.allExpense,
      persons: this.props.persons1,
      sheetId: this.state.sheetId
    });
  }

  onToggleEdit1(e) {
    const payments = this.props.payment
      .split("\n")
      .slice(0, this.props.noOfPayments);
    console.log(payments[e.target.value]);
    var pay = payments[e.target.value].split(",");
    console.log(pay);
    var person = this.props.persons1;

    var perfil = person.filter(item => item.nickname === pay[0])[0].id;
    console.log(perfil);

    var paidTo = this.state.paidTo;
    let index;
    if (e.target.checked) {
      console.log(pay[0]);
      paidTo.push(pay[2] + "-" + 1);
      this.setState({
        paidBy: perfil,
        description: "Debt Paid",
        paidTo: paidTo,
        amount: pay[1],
        isSelected: false
      });
    } else {
      index = paidTo.indexOf(+e.target.value);
      paidTo.splice(index, 1);
      this.setState({
        paidBy: "",
        description: "",
        paidTo: [],
        amount: "",
        isSelected: true
      });
    }
  }

  render() {
    console.log(this.props.loading);
    const payments = this.props.payment
      .split("\n")
      .slice(0, this.props.noOfPayments);
    console.log(this.props.noOfPayments);
    const detail = this.props.detail;
    return (
      <div>
        {this.props.loading ? (
          <div>Loading...</div>
        ) : (
          <div className="container-fluid">
            <p className="paytext">
              It would take <b> {this.props.noOfPayments} payments</b> to even
              out all debts:
            </p>
            <table border="1" style={{ width: "365px", height: "80px" }}>
              <tbody>
                {this.props.payment &&
                this.props.payment !== "No debt. Everything balances!" ? (
                  payments.map((item, id) => {
                    return (
                      <tr key={id}>
                        <td style={{ border: 0 }}>
                          <input
                            type="checkbox"
                            value={id}
                            onChange={this.onToggleEdit1.bind(this)}
                            className="paychck"
                            name="delchck"
                          />
                        </td>
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
            <table border="1" style={{ width: "364px", height: "31px" }}>
              <tbody>
                <tr>
                  <td style={{ border: "0", textAlign: "end" }}>Select:</td>
                  <td style={{ border: 0 }}>
                    <button
                      variant="primary"
                      size="sm"
                      type="button"
                      onClick={this.markPaid.bind(this)}
                      disabled={
                        this.state.isSelected || this.props.noOfPayments < 1
                      }
                      style={{ marginLeft: "189px" }}
                    >
                      Mark Selected as Paid
                    </button>
                  </td>
                </tr>
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
        )}
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
    detail: state.payment.detail,
    persons1: state.person.data1,
    expenses: state.expense.data1.expenses,
    allExpense: state.expense.allexpense,
    loading: state.payment.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allexpense: expense => dispatch(allexpense(expense)),
    createExpense: expense => dispatch(createExpense(expense)),
    getAllPayment: payment => dispatch(getAllPayment(payment)),
    fetchAll: payment => dispatch(fetchAll(payment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Compute);
