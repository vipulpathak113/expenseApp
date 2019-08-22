/* eslint-disable */
import React, { Component, lazy, Suspense } from "react";
import { allexpense } from "../store/actions/expenseAction";
import { connect } from "react-redux";
import { PushSpinner } from "react-spinners-kit";
import { createExpense } from "../store/actions/expenseAction";
import { getAllPayment } from "../store/actions/paymentAction";
import { fetchAll } from "../store/actions/expenseAction";
import store from "../store/store";

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
      isSelected: true,
      ischckSelected: this.props.chckSelected ? this.props.chckSelected : false,
      value: ""
    };
  }

  componentDidMount() {
    var id = window.location.pathname.substring(7, 9);
    this.setState({
      sheetId: id
    });
    this.props.fetchAll({ sheetId: id });
    this.props.getAllPayment({
      expenses: this.props.allExpense,
      persons: this.props.persons1,
      sheetId: this.state.sheetId
    });
  }

  markPaid() {
    var ckName = document.getElementsByName("newchck");
    var checked = document.getElementById(this.state.value);

    if (checked.checked) {
      for (var i = 0; i < ckName.length; i++) {
        if (!ckName[i].checked) {
          ckName[i].disabled = false;
        } else {
          ckName[i].disabled = true;
        }
      }
      this.setState({ isSelected: true });
    } else {
      for (var i = 0; i < ckName.length; i++) {
        ckName[i].disabled = true;
        this.setState({ isSelected: true });
      }
    }

    var id = window.location.pathname.substring(7, 9);
    this.props.createExpense({
      description: this.state.description,
      date: this.state.startDate,
      amount: this.state.amount,
      paidBy: this.state.paidBy,
      paidTo: this.state.paidTo,
      sheetId: id,
      currentPage: this.props.currentPage
    });
    $(`.paymentcol${this.state.value}`).css({
      textDecoration: "line-through",
      color: "red"
    });
    this.props.fetchAll({ sheetId: id });

    this.props.getAllPayment({
      expenses: this.props.allExpense,
      persons: this.props.persons1,
      sheetId: this.state.sheetId
    });

    this.props.getAllPayment({
      expenses: this.props.allExpense,
      persons: this.props.persons1,
      sheetId: this.state.sheetId
    });

    this.setState({ paidTo: [] });
  }

  unCheck() {
    var ckName = document.getElementsByName("newchck");
    var checked = document.getElementById(this.state.value);

    if (checked) {
      if (checked.checked) {
        for (var i = 0; i < ckName.length; i++) {
          if (!ckName[i].checked) {
          } else {
            ckName[i].checked = false;
            this.setState({ paidTo: [], isSelected: true });
          }
        }
      } else {
      }
    }
  }

  onToggleEdit1(e) {
    var ckName = document.getElementsByName(e.target.name);
    var checked = document.getElementById(e.target.value);

    if (checked.checked) {
      for (var i = 0; i < ckName.length; i++) {
        if (!ckName[i].checked) {
          ckName[i].disabled = true;
        } else {
          ckName[i].disabled = false;
        }
      }
    } else {
      for (var i = 0; i < ckName.length; i++) {
        ckName[i].disabled = false;
      }
    }

    const payments = this.props.payment
      .split("\n")
      .slice(0, this.props.noOfPayments);
    var pay = payments[e.target.value].split(",");
    var person = this.props.persons1;

    var perfil = person.filter(item => item.nickname === pay[0])[0].id;

    var paidTo = this.state.paidTo;
    let index;
    if (e.target.checked) {
      paidTo.push(pay[2] + "-" + 1);
      this.setState({
        paidBy: perfil,
        description: "Debt Paid",
        paidTo: paidTo,
        amount: pay[1],
        isSelected: false,
        value: e.target.value
      });
    } else {
      index = paidTo.indexOf(+e.target.value);
      paidTo.splice(index, 1);
      this.setState({
        paidBy: "",
        description: "",
        paidTo: [],
        amount: "",
        isSelected: true,
        value: ""
      });
    }
  }

  render() {
    const payments = this.props.payment
      .split("\n")
      .slice(0, this.props.noOfPayments);
    const detail = this.props.detail;
    return (
      <div>
        {this.props.loading ? (
          <img src={require("../pacman.svg")} alt="loader" />
        ) : (
          <div className="container-fluid">
            <p className="paytext">
              It would take <b> {this.props.noOfPayments} payments</b> to even
              out all debts:
            </p>
            <table
              border="1"
              style={{
                width: "365px",
                height: "80px",
                backgroundColor: "white"
              }}
            >
              <tbody>
                {this.props.payment &&
                this.props.payment !== "No debt. Everything balances!" ? (
                  payments.map((item, id) => {
                    return (
                      <tr key={id}>
                        <td style={{ border: 0 }}>
                          <input
                            id={id}
                            type="checkbox"
                            value={id}
                            onChange={this.onToggleEdit1.bind(this)}
                            className="paychck"
                            name="newchck"
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
                        <td className={`paymentcol${id}`}>
                          {item.split(",")[1]}
                        </td>
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
                  <tr className="zerobal">
                    <td>No debt. Everything balances!</td>
                  </tr>
                )}
              </tbody>
            </table>
            {this.props.noOfPayments >= 1 ? (
              <div style={{ marginTop: "5px" }}>
                <span style={{ border: "0", textAlign: "end" }}>
                  <b>Select: </b>
                  <a className="unchck" onClick={this.unCheck.bind(this)}>
                    <u>Uncheck</u>
                  </a>
                </span>
                <span style={{ border: 0 }}>
                  <button
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={this.markPaid.bind(this)}
                    disabled={
                      this.state.isSelected || this.props.noOfPayments < 1
                    }
                    style={{ marginLeft: "119px" }}
                  >
                    Mark Selected as Paid
                  </button>
                </span>
              </div>
            ) : null}
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
                  {detail
                    ? detail.map((item, id) => {
                        return (
                          <tr key={id} style={{ background: "lavender" }}>
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
                      })
                    : null}
                </tbody>
              </table>
              <div style={{ fontWeight: "500", fontStyle: "italic" }}>
                + Number of expenses paid
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
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
