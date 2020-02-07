
import React, { Component } from 'react'

class InBox extends Component {

    componentDidMount(){
        console.log(this.props)
    }

    render() {
        return (
            <div>
                WSNBB ,{this.props.match.params.param},{this.props.match.params.a}
            </div>
        )
    }
}

export default InBox