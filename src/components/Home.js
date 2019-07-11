import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSheet } from '.././store/actions/sheetAction'
import StaticComp from './static'

class Home extends Component {

    state = {
        display_name: '',
        description: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props)

        this.props.createSheet(this.state);

    }

    render() {

        return (

            <div className="container-fluid">
                <div className="staticComp"><StaticComp /></div>
                <div style={{ "margin-left": "15px", "margin-top": "5px", "margin-bottom": "5px" }}><b>Start a new Expense Sheet <span className="registr">NO REGISTRATION REQUIRED - 100% FREE</span></b></div>
                <div className="sheetborder">
                    <div className="sheetName">

                        <label htmlFor="sheetName" style={{ "margin-right": "56px", "margin-left": "10px" }}>Name</label>
                        <input type="text" id="display_name" value={this.state.display_name} onChange={this.handleChange.bind(this)} required />
                        <img src={require('../start.svg')} alt="start" height="88px" width="200px" onClick={this.handleSubmit.bind(this)} />
                    </div>

                    <div>
                        <label htmlFor="sheetDesc" style={{ "margin-right": "19px", "margin-left": "10px", 'padding-right': '8px' }}>Description</label>
                        <input type="text" id="description" value={this.state.description} onChange={this.handleChange.bind(this)} required />

                    </div>

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
        createSheet: (sheet) => dispatch(createSheet(sheet))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);