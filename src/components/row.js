import React, { Component } from 'react';
import { onChangeForm } from '../redux/actions/index';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
	return: {
		user: state
	}
});



 class Row extends Component {
     componentDidMount() {
        this.props.dispatch(onChangeForm())
    }


    render() {
        let { user } = this.props;
        return (
            <tr>
                <td>{user}</td>
                <td>{user}</td>
                <td>
                    <button className="btn btn-info" >Edit</button>
                    <button className="btn btn-danger" >Delete</button>
                </td>
            </tr>
        )
    }
}
export default connect(mapStateToProps)(Row);