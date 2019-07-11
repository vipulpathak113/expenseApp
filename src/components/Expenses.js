import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { createExpense } from '../store/actions/expenseAction'
import { updateExpense } from '../store/actions/expenseAction'
import { deleteExpense } from '../store/actions/expenseAction'
import { connect } from 'react-redux'
import axios from 'axios'


import "react-datepicker/dist/react-datepicker.css";

// var value = new Date().toISOString();
var newExpenses = ''

class Expense extends Component {
    constructor(props) {
        super(props)

    this.state = {
        description: '',
        paidBy: "",
        amount: '',
        showModal: false,
        showModalSave: false,
        isDisabled: true,
        startDate: new Date(),
        docId: window.location.pathname.slice(7),
        dis: 'block',
        selectedRadio: 0,
        paidTo: [],
        date2: '',
        expenses: '',
        expenseId: '',
        items: [],
        isSelected: true,
        sheetId: '',
        payment:''
    }
}

    handleStart = () => {
        console.log('here');
    }

    handleRadioChange = (event) => {
        console.log("event", this.props.persons[event].id)
        this.setState({
            selectedRadio: event,
            paidBy: this.props.persons[event].id
        })
    };

    onToggle(e) {
        console.log(this.props.persons)

        const paidTo = this.state.paidTo
        console.log(this.state.paidTo)
        let index


        if (e.target.checked) {

            paidTo.push(this.props.persons[e.target.value].nickname)
        } else {

            index = paidTo.indexOf(+e.target.value)
            paidTo.splice(index, 1)
        }
        this.setState({ paidTo: paidTo })
        console.log(this.state.paidTo)

    }

    changeDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleChange = (e) => {
        console.log(e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    Sclose() {
        this.setState({ showModalSave: false });
    }
    saveOpen() {
        this.setState({ showModalSave: true });
    }

    save(e) {
        e.preventDefault();
        this.props.createExpense({
            description: this.state.description,
            date: this.state.startDate,
            amount: this.state.amount,
            paidBy: this.state.paidBy !== "" ? this.state.paidBy : this.props.persons[0].id,
            paidTo: this.state.paidTo,
            sheetId: this.state.sheetId


        });
        this.setState({
            showModal: false,
            description: '',
            date: new Date(),
            amount: '',
            paidBy: '',
            paidTo: [],
            selectedRadio: 0,
            isPayment: false
        })
    }

    close() {
        this.setState({ showModal: false });
    }

    saveAndNew(e) {
        e.preventDefault();
        this.props.createExpense({
            description: this.state.description,
            date: this.state.startDate,
            amount: this.state.amount,
            paidBy: this.state.paidBy !== "" ? this.state.paidBy : this.props.persons[0].id,
            paidTo: this.state.paidTo,
            sheetId: this.state.sheetId


        });
        this.setState({
            showModal: true,
            description: '',
            date: new Date(),
            amount: '',
            paidBy: '',
            paidTo: [],
            selectedRadio: 0,
            isPayment: false
        })

    }

    deleteSelected() {
        console.log(this.state.paidTo)
        alert("Are you sure you want to delete this expense");

        this.props.deleteExpense({ items: this.state.items,expenses:this.state.expenses });
        if (this.state.expenses && this.state.expenses.length < 1) {
            console.log(this.state.expenses.length)
            console.log(this.state.isPayment)
            this.setState({
                isPayment: true
            });
        }
    }


    editMode(index, event) {
        console.log('item index = ', index)
        console.log(this.state.expenses)
        var data = this.state.expenses[index]
        // debugger;
        console.log(data)
        this.setState({
            showModalSave: true,
            startDate: new Date(Date.parse(data[0])),
            description: data[1],
            paidTo: data[4],
            paidBy: this.state.paidBy !== "" ? this.state.paidBy : this.props.persons[0].id,
            amount: data[3],
            expenseId: data[5]
        });
    }

    saveClose(e) {
        if(this.state.amount)
        this.setState({ showModalSave: false });
        this.props.updateExpense({
            amount: this.state.amount,
            date: this.state.startDate,
            description: this.state.description,
            paidTo: this.state.paidTo,
            paidBy: this.state.paidBy,
            expenseId: this.state.expenseId,
            sheetId: this.state.sheetId
        });
        this.setState({
            showModalSave: false,
            description: '',
            date: this.state.startDate,
            amount: '',
            paidBy: '',
            paidTo: [],
            selectedRadio: 0,
            items: [],

        });
    }

    onToggleEdit(e) {
        console.log(this.state.expenses)

        const items = this.state.items
        let index
        if (e.target.checked) {
            console.log(e.target.value)
            this.setState({ isSelected: false })
            items.push(this.state.expenses[e.target.value][5])
        } else {
            this.setState({ isSelected: true })
            index = items.indexOf(+e.target.value)
            items.splice(index, 1)
        }

        this.setState({ items: items })

    }

    handleSelection(e){
        console.log(e.target.value)
        // var expenses= this.state.expenses
        // console.log(expenses)
        if (e.target.value !== "all") {
            let selectedExpenses = newExpenses.filter(item => item[2] === e.target.value);
            this.setState({
                expenses: selectedExpenses
            })
        } else {
            this.setState({
                expenses: newExpenses
            })
        }
    }



    componentDidMount() {
        var id = window.location.pathname.substring(7, 9)
        this.setState({
            sheetId: id
        })
        axios.get(`http://127.0.0.1:8000/expense/?pk=${id}`)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    newExpenses = res.data;
                    this.setState({ expenses: res.data });
                }
            })
    }
    render() {

        this.interval = setInterval(() => {
            if (this.state.expenses && this.state.expenses.length >= 1) {
                if (this.state.isPayment) {
                    this.setState({
                        isPayment: false
                    });
                }
            }
            else {
                this.setState({

                })
            }
        }, 1000);

        const field = this.state.expenses;
        return (
            <div>
            
            <div style={{ padding: '10px' }}>
            <span>Filter By </span>
            <select class="mdb-select md-form"
                    value={this.state.selectValue}
                    onChange={this.handleSelection.bind(this)}>
                    <option value="all" >Anyone</option>
            {this.props.persons && this.props.persons.map((item, id) => {
                return(
                 <option value={item.nickname} >{item.nickname}</option>
                 ) })}
                </select>

               
                </div>

                <table border="1">
                    <thead>
                        <tr className="rowContent">
                            <th><center>Action</center></th>
                            <th><center>Date</center></th>
                            <th><center>Description</center></th>
                            <th><center>Who Paid?</center></th>
                            <th><center>Amount</center></th>
                            <th><center>For Whom</center></th>
                        </tr>
                        {field && field.map((item, id) => {
                            console.log(item)
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <input type="checkbox" value={id} onChange={this.onToggleEdit.bind(this)} className="selectCheckboxDel" />
                                        <button onClick={this.editMode.bind(this, id)}>Edit</button></td>
                                    <td><center className="dateexp">{new Date(Date.parse(item[0])).toDateString().substring(3, 18)}</center></td>
                                    <td><center>{item[1]}</center></td>
                                    <td><center>{item[2]}</center></td>
                                    <td><center>{item[3]}</center></td>
                                    <td><center>{item[4] && item[4].map((name) => {
                                        return (
                                            <span style={{ 'padding-right': '5px' }}>{name}</span>
                                        )
                                    })}</center></td>
                                </tr>
                            )
                        })}
                    </thead>
                </table>
                <div style={{ 'margin-top': '15px' }}>>><b>Click On Add Expense to enter the expense. Once done, click Compute Payments.</b></div>
                <div>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={this.props.open.bind(this)}
                        className="perEx"
                    >
                        Add Expense</Button>
                    <Button
                        variant="primary"
                        size="sm"
                        disabled={this.props.isComputeDisabled}
                        onClick={() => this.props.handleSelect("payment").bind(this)}
                        className="perEx">Compute Payments</Button>

                    <Button
                        variant="primary"
                        size="sm"
                        onClick={this.deleteSelected.bind(this)}
                        className="perEx"
                        disabled={this.state.isSelected}>

                        Delete Selected
                            </Button>
                </div>

                <div>

                    <Modal show={this.state.showModal} onHide={this.props.close.bind(this)} className="handle" >
                        <Modal.Header closeButton className="modalheader">
                            <Modal.Title>New Expense</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div><span className="date">Date </span><DatePicker
                                selected={this.state.startDate}
                                onChange={this.changeDate.bind(this)}
                                className="datePanel"
                                id="date"
                                value={this.state.startDate}
                            /></div>
                            <div><span className="expdesc">Description</span> <input type="text" id="description" value={this.state.description} onChange={this.handleChange.bind(this)} className="inputDesc"></input></div>
                            <div className="divPaid"><span className="paid">Who Paid?</span>

                                {this.props.persons && this.props.persons.map((item, id) => {
                                    return (
                                        <span className="paidradio">
                                            <input type="radio"
                                                name="radioButtonSet"
                                                id={id}
                                                value={id}
                                                checked={this.state.selectedRadio === id}
                                                onChange={this.handleRadioChange.bind(this, id)}
                                                style={{ 'margin-left': '9px' }} /> {item.nickname}
                                        </span>
                                    )
                                })}

                            </div>
                            <div><span className="expamount">Amount</span> <input type="number" style={{ 'margin-top': '9px', 'margin-left': '5px' }} id="amount" value={this.state.amount} onChange={this.handleChange.bind(this)}></input> <b><i>(Numbers only)</i></b></div>
                            <div className="divPaid"><span className="expWho">For Whom?</span>
                                {this.props.persons && this.props.persons.map((item, id) => {
                                    return (
                                        <span className="paidradio">
                                            <input type="checkbox"
                                                value={id}
                                                onChange={this.onToggle.bind(this)}
                                                style={{ 'margin-left': '10px' }} /> {item.nickname}
                                        </span>
                                    )
                                })}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="primary"
                                size="sm" onClick={this.saveAndNew.bind(this)}>Save & New</Button>
                            <Button
                                variant="primary"
                                size="sm" onClick={this.save.bind(this)}>Save</Button>
                            <Button variant="primary"
                                size="sm"
                                onClick={this.close.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={this.state.showModalSave} onHide={this.Sclose.bind(this)} className="handle" >
                        <Modal.Header closeButton className="modalheader">
                            <Modal.Title>New Expense</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div><span className="date">Date </span><DatePicker
                                selected={this.state.startDate}
                                onChange={this.changeDate.bind(this)}
                                className="datePanel"
                                id="date"
                                value={this.state.startDate}
                            /></div>
                            <div><span className="expdesc">Description</span> <input type="text" id="description" value={this.state.description} onChange={this.handleChange.bind(this)} className="inputDesc"></input></div>
                            <div className="divPaid"><span className="paid">Who Paid?</span>

                                {this.props.persons && this.props.persons.map((item, id) => {
                                    return (
                                        <span className="paidradio">
                                            <input type="radio"
                                                name="radioButtonSet"
                                                id={id}
                                                value={id}
                                                checked={this.state.selectedRadio === id}
                                                onChange={this.handleRadioChange.bind(this, id)} /> {item.nickname}
                                        </span>
                                    )
                                })}

                            </div>
                            <div><span className="expamount">Amount</span> <input type="text" style={{ 'margin-top': '9px' }} id="amount" value={this.state.amount} onChange={this.handleChange.bind(this)}></input></div>
                            <div className="divPaid"><span className="expWho">For Whom?</span>
                                {this.props.persons && this.props.persons.map((item, id) => {
                                    return (
                                        <span className="paidradio">
                                            <input type="checkbox" value={id} onChange={this.onToggle.bind(this)} /> {item.nickname}
                                        </span>
                                    )
                                })}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary"
                                size="sm"
                                onClick={this.saveClose.bind(this)}
                            >Save
                             </Button>
                            <Button variant="primary"
                                size="sm"
                                onClick={this.Sclose.bind(this)}
                            >Close</Button>
                        </Modal.Footer>
                    </Modal>

                </div>

            </div>
        )

    }
}


const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createExpense: (expense) => dispatch(createExpense(expense)),
        updateExpense: (expense) => dispatch(updateExpense(expense)),
        deleteExpense: (expense) => dispatch(deleteExpense(expense)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expense);