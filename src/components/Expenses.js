import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { createExpense } from '../store/actions/expenseAction'
import { updateExpense } from '../store/actions/expenseAction'
import { deleteExpense } from '../store/actions/expenseAction'
import {getAllExpenses} from '../store/actions/expenseAction'
import {getfilterexpense} from '../store/actions/expenseAction'
import {filterexpense} from '../store/actions/expenseAction' 
import {allexpense} from '../store/actions/expenseAction' 
import { connect } from 'react-redux'
import axios from 'axios'


import "react-datepicker/dist/react-datepicker.css";

// var value = new Date().toISOString();


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
        payment:'',
        chckall:true,
        selectValue:'all',
        currentPage: 1,
        selectedValue:10,
    }
}


    handleRadioChange = (event) => {
        this.setState({
            selectedRadio: event,
            paidBy: this.props.persons[event].id
        })
    };

    onToggle(e) {
        const paidTo = this.state.paidTo
        let index
        if (e.target.checked) {

            paidTo.push(this.props.persons[e.target.value].nickname)
        } else {

            index = paidTo.indexOf(+e.target.value)
            paidTo.splice(index, 1)
        }
        this.setState({ paidTo: paidTo })

    }

    changeDate(date) {
        this.setState({
            startDate: date
        });
    }

    handleChange = (e) => {
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
            sheetId: this.state.sheetId,
            currentPage:this.state.currentPage


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
            sheetId: this.state.sheetId,
            currentPage:this.state.currentPage


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
        alert("Are you sure you want to delete this expense");

        this.props.deleteExpense({ items: this.state.items,expenses:this.props.expenses,sheetId: this.state.sheetId,currentPage:this.state.currentPage });
    
        if (this.props.expenses && this.props.expenses.length < 1) {
            this.setState({
                isPayment: true,
            });
        }
    }


    editMode(index, event) {
        var data = this.props.expenses[index]
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
            sheetId: this.state.sheetId,
            currentPage:this.state.currentPage
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
        const items = this.state.items
        let index
        if (e.target.checked) {
            this.setState({ isSelected: false })
            items.push(this.props.expenses[e.target.value][5])
        } else {
            this.setState({ isSelected: true })
            index = items.indexOf(+e.target.value)
            items.splice(index, 1)
        }

        this.setState({ items: items })

    }

    handleSelection(e){
        console.log(e.target.value)
        this.setState({selectValue:e.target.value});
        if (e.target.value !== "all") {
          this.props.getfilterexpense({sheetId:this.state.sheetId,value:e.target.value,currentPage:1})
          this.setState({
            selectedValue:10
        })
        } else {
            var id = window.location.pathname.substring(7, 9)
            this.props.allexpense({id:id,currentPage:1})
            this.setState({
                selectedValue:10
            })
        }
    }

    filterSelection(e){
        console.log(e.target.value)
        this.setState({selectedValue:e.target.value});

        if (e.target.value == 10) {
            var id = window.location.pathname.substring(7, 9)
              this.props.allexpense({id:id,currentPage:1})
              this.setState({currentPage:1});
          } else {
              
              this.props.filterexpense({sheetId:this.state.sheetId,value:e.target.value,selectValue:this.state.selectValue})
          }


        
    }

    onToggleAll(ele) {
        var items= this.state.items
        const expenses= this.props.expenses
        if(expenses)
        var checkboxes = document.getElementsByTagName('input');
        if (ele.target.checked) {
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].type == 'checkbox') {
                    checkboxes[i].checked = true;
                }
            }
            items.push(expenses.map(item=>item[5]))
            items=items[0]
                this.setState({
                    items:items,isSelected: false
                })

        } else {
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].type == 'checkbox') {
                    checkboxes[i].checked = false;
                }
            }
            items.splice(expenses.map(item=>item[5]), 1)
            this.setState({
                items:items,isSelected: true
            })
        }
       
    }

    clickNext(event) {
          this.props.getAllExpenses({id:this.state.sheetId,currentPage:Number(event.target.id) + 1,selectValue:this.state.selectValue})

        this.setState({
          currentPage: Number(event.target.id) + 1
        });
    
        if (Number(event.target.id) + 1 >= Math.ceil(this.props.count /10)) {
          this.setState({
            dis: "none"
          });
        }
      }
    
      clickPrev(event) {
        console.log(Number(event.target.id) - 1);
        this.props.allexpense({id:this.state.sheetId,currentPage:Number(event.target.id) - 1})
        this.setState({
          currentPage: Number(event.target.id) - 1
        });
      }
    
      clickLast(event) {
        this.props.getAllExpenses({id:this.state.sheetId,currentPage:Number(event.target.id),selectValue:this.state.selectValue})
        this.setState({
          currentPage: Number(event.target.id)
        });
      }


    componentDidMount() {
        var id = window.location.pathname.substring(7, 9)
        this.setState({
            sheetId: id
        })
        this.props.allexpense({id:id,currentPage:this.state.currentPage})
    }
    render() {

        this.interval = setInterval(() => {
            if (this.props.expenses && this.props.expenses.length >= 1) {
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

        this.interval = setInterval(() => {
            if (this.props.expenses &&this.props.expenses.length >= 2) {
                if (this.state.chckall) {
                    this.setState({
                        chckall: false
                    });
                }
            }
            else {
                this.setState({

                })
            }
        }, 1000);

        const field = this.props.expenses;
        var arr2=[]
     field && field.map(item=>{
         arr2.push(item[2])
     })
   var arr3= [... new Set(arr2)]
        return (
            <div>
            
            <div style={{ padding: '5px' }}>
            <span>Filter By </span>
            <select className="mdb-select md-form"
                    value={this.state.selectValue}
                    onChange={this.handleSelection.bind(this)}
                    style={{"margin-right": "24px"}}
                    >
                    <option value="all" >Anyone</option>
            {arr3 && arr3.map((item, id) => {
                return(
                 <option value={item} >{item}</option>
                 ) })}
                </select>


                <span>Rows </span>
            <select className="mdb-select md-form"
                    value={this.state.selectedValue} 
                    onChange={this.filterSelection.bind(this)}
                    style={{"margin-right": "24px"}}
                    >
                    <option value="10" >10</option>
                    <option value="25" >25</option>
                    <option value="50" >50</option>
                    <option value="100" >100</option>
                    <option value="500" >500</option>
           
                </select>
               

                <div className="pagination-items" style={{"display": "inline-flex"}}> 

                <button
                type="button"
                id={1}
                style={{
                  display: this.state.currentPage > 1 ? "block" : "none"
                }}
                onClick={this.clickLast.bind(this)}
                className="allbtn"
              >
                First
              </button>
    
              <button
                type="button"
                id={this.state.currentPage}
                style={{
                  display: this.state.currentPage !== 1 ? "block" : "none"
                }}
                onClick={this.clickPrev.bind(this)}
                className="prevbtn"
              >
                Previous
              </button>
          <p className="pagecount">Showing page {this.state.currentPage} of{" "}
          {this.props.count>10 && (this.props.count>this.state.selectedValue)?Math.ceil(this.props.count /10):1} </p>
              <button
                type="button"
                id={this.state.currentPage}
                style={{
                  display:
                  Math.ceil(this.props.count /10) > this.state.currentPage && this.props.count> this.state.selectedValue
                      ? "block"
                      : "none"
                }}
                onClick={this.clickNext.bind(this)}
                className="nxtbtn"
              >
                Next
              </button>
              <button
                type="button"
                id={Math.ceil(this.props.count /10)}
                style={{
                  display:
                  this.props.count== "undefined" || Math.ceil(this.props.count /10) === this.state.currentPage || this.props.count< this.state.selectedValue
                      ? "none"
                      : "block"
                }}
                onClick={this.clickLast.bind(this)}
                className="allbtn"
              >
                Last
              </button>
                
                </div>
                </div>
                



                <table border="1">
                    <thead>
                        <tr className="rowContent">
                            <th><center><input type="checkbox" disabled={this.state.chckall} value="checkAll" onChange={this.onToggleAll.bind(this)} className="selectCheckbox" />Action</center></th>
                            <th><center>Date</center></th>
                            <th><center>Description</center></th>
                            <th><center>Who Paid?</center></th>
                            <th><center>Amount</center></th>
                            <th><center>For Whom</center></th>
                        </tr>
                        {field && field.map((item, id) => {
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
                                            <span style={{ 'paddingRight': '5px' }}>{name}</span>
                                        )
                                    })}</center></td>
                                </tr>
                            )
                        })}
                    </thead>
                </table>
                <div style={{ 'marginTop': '15px' }}>>><b>Click On Add Expense to enter the expense. Once done, click Compute Payments.</b></div>
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
        expenses: state.expense.data1.expenses,
        count: state.expense.data1.count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createExpense: (expense) => dispatch(createExpense(expense)),
        updateExpense: (expense) => dispatch(updateExpense(expense)),
        deleteExpense: (expense) => dispatch(deleteExpense(expense)),
        getAllExpenses: (expense)=>dispatch (getAllExpenses(expense)),
        getfilterexpense: (expense)=>dispatch(getfilterexpense(expense)),
        filterexpense: (expense)=> dispatch(filterexpense(expense)),
        allexpense: (expense)=> dispatch(allexpense(expense))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expense);