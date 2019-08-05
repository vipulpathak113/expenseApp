import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap';
import { createPerson } from '../store/actions/addPersonAction'
import { updatePerson } from '../store/actions/addPersonAction'
import { deletePerson } from '../store/actions/addPersonAction'
import {getAllPersons} from '../store/actions/addPersonAction'
import {getAllPayment} from '../store/actions/paymentAction'
import { updateSheet } from '../store/actions/sheetAction'
import { Tab, Tabs } from 'react-bootstrap';
import Expense from './Expenses'
import axios from 'axios'
import Sheets from './Sheets'
import Compute from './Compute'
import $ from 'jquery';
import DraggableModalDialog from './Draggable'

class PersonDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            name: '',
            nickname: '',
            comment: '',
            id: '',
            showModalSave: false,
            personId: '',
            isChecked: false,
            deleteDocId: [],
            isDisabled: true,
            key: 'group',
            isExpenseDisabled: true,
            isComputeDisabled: true,
            persons: '',
            items: [],
            intervalId: '',
            sheetId: '',
            isSelected: true,
            expenses:'',
            chckall: true,
        }
    }

    onToggle(e) {
        const items = this.state.items
        let index
        if (e.target.checked) {
            this.setState({ isSelected: false })
            items.push(this.props.persons1[e.target.value].id)
        } else {
            this.setState({ isSelected: true })
            index = items.indexOf(+e.target.value)
            items.splice(index, 1)
        }
        this.setState({ items: items })

    }

    onToggleAll(ele) {
        var items= this.state.items
        const persons= this.props.persons1
        if(persons)
        var checkboxes = document.getElementsByTagName('input');
        if (ele.target.checked) {
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].type === 'checkbox') {
                    checkboxes[i].checked = true;
                }
            }
            items.push(persons.map(item=>item.id))
            items=items[0]
                this.setState({
                    items:items,isSelected: false
                })

        } else {
            for (var j = 0; j < checkboxes.length; j++) {
                if (checkboxes[j].type === 'checkbox') {
                    checkboxes[j].checked = false;
                }
            }
            items.splice(persons.map(item=>item.id), 1)
            this.setState({
                items:items,isSelected: true
            })
        }
       
    }

    handleSelect(value) {
        this.setState({
            key: value,
        });

        if(value==="payment"){

            this.props.getAllPayment({expenses:this.props.expenses, persons: this.props.persons1})

        }
    }

    deleteSelected() {
        let userRes = window.confirm("Are you sure you want to delete this person");
        if(userRes){
            if(this.state.expenses){
         var items= this.state.items
       items&& items.map(pol=>{
        var pname= this.props.persons1.filter(item=>item.id===pol)[0].nickname
        var expp= this.state.expenses.filter(item=>item[2]===pname || item[4].includes(pname)).length
        if(expp!==0){
        alert("Cannot delete person as involved in transaction")
        }
        else{
            this.props.deletePerson({items:this.state.items,sheetId: this.state.sheetId});
            
        }
       })
        if (this.props.persons1 && this.props.persons1.length <= 2) {
            this.setState({
                isExpenseDisabled: true
            });
        }}
        else{
            this.props.deletePerson({items:this.state.items,sheetId: this.state.sheetId} );
        }}

        $('input[name=delchck]').prop('checked', false);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    close() {
        this.setState({ showModal: false,name: '',
        nickname: '',
        comment: '', });
    }

    Sclose() {
        this.setState({ showModalSave: false,name: '',
        nickname: '',
        comment: '', });
    }

   

    saveOpen() {
        this.setState({ showModalSave: true });
    }
    open() {
        this.setState({ showModal: true });
    }

    async save(e) {
        e.preventDefault();
        this.props.createPerson({ name: this.state.name,
             nickname: this.state.nickname,
              comment: this.state.comment,
             sheetId: this.state.sheetId });
        this.setState({
            showModal: false, name: '',
            nickname: '',
            comment: ''

        },);
    }

    async saveAndNew(e) {
        e.preventDefault();
        if (this.props.persons1 && this.props.persons1.length >= 1) {
            if (this.state.isExpenseDisabled) {
                this.setState({
                    isExpenseDisabled: false
                });
            }
        }
        this.props.createPerson({ name: this.state.name, 
        nickname: this.state.nickname,
         comment: this.state.comment, 
         sheetId: this.state.sheetId });
        this.setState({
            name: '',
            nickname: '',
            comment: '',
            showModal: true
        })
    }

    editMode(index, event) {
        var data = this.props.persons1[index]
        this.setState({
            showModalSave: true, name: data.name,
            nickname: data.nickname,
            comment: data.comment,
            personId: data.id
        });
    }

    async saveClose(e) {
        this.setState({ showModalSave: false });
        this.props.updatePerson({ name: this.state.name,
         nickname: this.state.nickname,
        comment: this.state.comment,
         personId: this.state.personId,
          sheetId: this.state.sheetId });
        this.setState({
            name: '',
            nickname: '',
            comment: '',
        })
    }

    tabChange() {
        this.setState({
            key: 'expense'
        })
    }

    componentDidMount() {

        var id = window.location.pathname.substring(7, 9)
        this.setState({
            sheetId: id
        })
       this.props.getAllPersons({id:id})

            axios.get(`http://127.0.0.1:8000/expense/?pk=${id}&pageNo=1`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    this.setState({ expenses: res.data.expenses });
                }
            })
    }

    capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}

    render() {
        this.interval = setInterval(() => {
            if (this.props.persons1 && this.props.persons1.length >= 2) {
                if (this.state.isExpenseDisabled && this.state.chckall) {
                    this.setState({
                        isExpenseDisabled: false,
                        chckall: false
                    });
                }
            }
            else {
                this.setState({

                })
            }
        }, 1000);

        

        this.interval1 = setInterval(() => {
            if (this.state.expenses && this.state.expenses.length >= 1) {
                if (this.state.isComputeDisabled) {
                    this.setState({
                        isComputeDisabled: false
                    });
                }
            }
            else {
                this.setState({

                })
            }
        }, 1000);


        const persons = this.props.persons1;

        return (
            <div>
            <Sheets persons={this.props.persons1} id= {this.state.sheetId}/>
                <Tabs activeKey={this.state.key}
                    onSelect={key => this.setState({ key })}>
                    <Tab eventKey="group" title="Create Group" ><table border="1">
                        <thead>
                            <tr className="rowContent">
                                <th><center><input type="checkbox" disabled={this.state.chckall} value="checkAll" onChange={this.onToggleAll.bind(this)} className="selectCheckbox" />Action</center></th>
                                <th><center>Person Name</center></th>
                                <th><center>Display Name</center></th>
                                <th><center>Description or Comment</center></th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>

    {persons? persons.map((item, id) => {
        return (
            <tr key={item.id}>
                <td><center>
                    <input type="checkbox" id="check" value={id} onChange={this.onToggle.bind(this)} className="selectCheckbox" name="delchck" />
                    <button onClick={this.editMode.bind(this, id)}>Edit</button>
                </center>
                </td>
                <td><center>{item.name}</center></td>
                <td><center>{item.nickname}</center></td>
                <td><center>{item.comment}</center></td>
            </tr>
        )

                })
                : <tr style={{height:'127px'}}>
                <td className="bor">Please enter the list of persons who are sharing expenses:</td> <td className="bor">Click Add Person to get started.</td>
                <td className="bor">Once you have entered at least 2 persons,</td><td className="bor"> click Enter Expenses to start entering expenses.</td>
                </tr>
}
                    </table>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={this.open.bind(this)}
                            className="perEx"
                        >
                            Add Person
        </Button>

                        <Button
                            variant="primary"
                            size="sm"
                            onClick={this.deleteSelected.bind(this)}
                            className="perEx"
                            disabled={this.state.isSelected}>

                            Delete Person
                            </Button>


                        <Button
                            variant="primary"
                            size="sm"
                            disabled={this.state.isExpenseDisabled}
                            onClick={() => this.handleSelect("expense")}
                            className="perEx">Enter Expense</Button>
                    </Tab>
                    <Tab eventKey="expense"
                        title="Enter Expenses"
                        disabled={this.state.isExpenseDisabled}>
                        <Expense open={this.open}
                            close={this.close} 
                            handleChange={this.handleChange}
                            persons={this.props.persons1}
                            handleSelect={this.handleSelect.bind(this)}
                            isComputeDisabled={this.state.isComputeDisabled}
                            />
                    </Tab>
                    <Tab eventKey="payment" title="Compute Payments" disabled={this.state.isComputeDisabled}>
                    <Compute/>
                    </Tab>
                </Tabs>


                <div>


                    <Modal dialogAs={DraggableModalDialog}  show={this.state.showModal} onHide={this.close.bind(this)}>
                        <Modal.Header closeButton className="modalheader">
                            <Modal.Title>New Person</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div><span>Person Name </span><input type="text" 
                            style={{ 'width': '280px', 'marginLeft': '11px' }}
                             id="name" value={this.state.name}
                              onChange={this.handleChange.bind(this)}
                            ></input>
                            </div>
                           
                            <div><span>Display Name</span> 
                            <input type="text" style={{ 'marginTop': '25px', 'marginLeft': '9px' }}
                             id="nickname" 
                             value={this.state.nickname}
                            onChange={this.handleChange.bind(this)}
                            ></input>
                            
                            </div>
                           <span className="error">{this.props.personError?this.capitalize(this.props.personError.nickname[0]):""}</span>
                           <div><span className="comment">Comment</span> <input type="text" 
                           style={{ 'marginTop': '25px', 'width': '280px', 'marginRight': '-2' }}
                           id="comment" value={this.state.comment} 
                           onChange={this.handleChange.bind(this)}></input></div>
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

                    <Modal dialogAs={DraggableModalDialog} show={this.state.showModalSave} onHide={this.Sclose.bind(this)}>
                        <Modal.Header closeButton className="modalheader">
                            <Modal.Title>Edit Person</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div><span>Person Name</span> 
                            <input type="text" 
                            style={{ 'width': '280px', 'marginLeft': '11px' }} 
                            id="name" value={this.state.name}
                             onChange={this.handleChange.bind(this)}></input></div>
                            <div><span>Display Name </span>
                            <input type="text"
                             style={{ 'marginTop': '25px', 'marginLeft': '10px' }}
                              id="nickname" value={this.state.nickname}
                               onChange={this.handleChange.bind(this)}></input></div>
                            <div><span className="comment">Comment</span>
                             <input type="text"
                              style={{ 'marginTop': '25px', 'width': '280px' }}
                               id="comment" value={this.state.comment}
                                onChange={this.handleChange.bind(this)}></input></div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary"
                                size="sm"
                                onClick={this.saveClose.bind(this)}>Save</Button>
                            <Button variant="primary"
                                size="sm"
                                onClick={this.Sclose.bind(this)}>Close</Button>
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
        personError: state.person.personError,
        persons: state.person.data,
        persons1: state.person.data1,
        expenses:state.expense.data1.expenses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPerson: (person) => dispatch(createPerson(person)),
        updatePerson: (person) => dispatch(updatePerson(person)),
        deletePerson: (person) => dispatch(deletePerson(person)),
        getAllPersons: (id) => dispatch(getAllPersons(id)),
        updateSheet: (sheet) => dispatch(updateSheet(sheet)),
        getAllPayment: (payment)=>dispatch(getAllPayment(payment))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);