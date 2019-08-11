import React, { Component, lazy, Suspense } from "react";
import { allexpense } from "../store/actions/expenseAction";
import { connect } from "react-redux";
import { PushSpinner } from "react-spinners-kit";

class Compute extends Component {
  componentDidMount() {}

  render() {
    const PaymentList = () => <div>{this.props.payment}</div>;

    const Lazy = lazy(
      () =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve({ default: () => <PaymentList /> });
          }, 1000);
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
  return {
    payment: state.payment.data
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
