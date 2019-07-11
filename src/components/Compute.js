import React, { Component } from 'react';
import axios from 'axios'

class Compute extends Component{


    componentDidMount() {
        var id = window.location.pathname.substring(7, 9)
        this.setState({
            sheetId: id,
            expenses:''
        })

        axios.get(`http://127.0.0.1:8000/expense/?pk=${id}`)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.setState({ expenses: res.data });
                }
            })
    }

    render(){
        return(
            <div>
            
            hiii


            </div>
        )
    }
}

export default Compute