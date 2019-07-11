import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import { Button, Modal } from 'react-bootstrap';
import { updateSheet } from '../store/actions/sheetAction'
import { connect } from 'react-redux'

class Sheets extends Component{
    constructor(props){
        console.log(props)
        super(props);
        this.state={
            editModal: false,
            sheetId:'',
            sheets:'',
            payment:''
        }
    }

componentDidMount(){
    var id = window.location.pathname.substring(7, 9)
    this.setState({
        sheetId: id
    })
    axios.get(`http://127.0.0.1:8000/expense/sheet/?pk=${id}`)
    .then(res => {
        console.log(res)
        if (res.status === 200) {
            const sheets = res.data[0];
            this.setState({ sheets });
        }
    }).catch(err => console.log(err.message));


    axios.get(`http://127.0.0.1:8000/expense/payment/?pk=${id}`)
    .then(res => {
        console.log(res)
        if (res.status === 200) {
            this.setState({ payment: res.data });
        }
    }).catch(err => console.log(err.message));
}

editSheet() {   
    var data = this.state.sheets;
    this.setState({
        editModal: true,
        display_name: data.display_name,
        description: data.description,
        created_date: data.created_date,
        sid: data.id

    })
}

handleChange = (e) => {
    console.log(e.target.id)
    this.setState({
        [e.target.id]: e.target.value
    })
}

editclose() {
    this.setState({ editModal: false });
}

saveEdit(e) {
    this.setState({ showModalSave: false });
    this.props.updateSheet({ display_name: this.state.display_name, description: this.state.description, created_date: this.state.created_date, sid: this.state.sid });
    this.setState({
        display_name: '',
        description: '',
        editModal: false
    })
}

    render(){
       
        const sheets = this.state.sheets
        const persons= this.props.persons
        const payment= this.state.payment
        return(
            <div>
                    <div className="created"><b className="sheetName1">{sheets ? sheets.display_name === '' ? "New Expense Sheet" : sheets.display_name : ""}</b>
                        <b>-{sheets ? sheets.description : ""}</b>
                        <a onClick={this.editSheet.bind(this)} className="edit"><u style={{ "margin-left": "30px" }}>Edit</u></a>
                    </div>
                    <div className="created"> {persons ? <span><b>{persons.length} Persons | </b></span> : ""}
                    {payment ? <span><b>{payment.expenses} expenses | </b></span> : ""}
                    {payment ? <span><b>Total Spent: {payment.amount} | </b></span> : ""}
                    <b> Created on: {sheets ? moment(sheets.created_date).format('MMMM Do YYYY') : ""}</b>

                    </div>

                    <Modal show={this.state.editModal} onHide={this.editclose.bind(this)}>
                        <Modal.Header closeButton className="modalheader">
                            <Modal.Title>Edit Sheet</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div><span>Name</span> <input type="text" style={{ 'width': '280px', 'margin-left': '37px', 'margin-right': '6px' }} id="display_name" value={this.state.display_name} onChange={this.handleChange.bind(this)}></input></div>
                            <div><span>Description </span><input type="text" style={{ 'width': '280px', 'margin-left': '10px', 'margin-top': '25px' }} id="description" value={this.state.description} onChange={this.handleChange.bind(this)}></input></div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary"
                                size="sm"
                                onClick={this.saveEdit.bind(this)}>Save</Button>
                            <Button variant="primary"
                                size="sm"
                                onClick={this.editclose.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSheet: (sheet) => dispatch(updateSheet(sheet))
    }
}

export default connect(null,mapDispatchToProps)(Sheets)