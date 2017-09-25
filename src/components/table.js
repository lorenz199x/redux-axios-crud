import React, { Component } from 'react';

//import Row from './row';
import { connect } from 'react-redux';
import { onChangeForm, onSubmitForm, } from '../redux/actions/index';

const mapStateToProps = (state) => ({
	return: {
		user: state.user
	}
});

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeForm: () => dispatch(onChangeForm())
    };
}

class Table extends Component {
   
    componentWillMount() {
        this.props.dispatch(onChangeForm())
    }

    render() {
        let { user, books } = this.props;
        //let mapBooks = this.props.user.map()
       
         let usermap = this.props.user.map(books => <td> {user.title} </td>)
            

       // let mapuser = this.props.user.map(title => <td> {user.title} </td>)
        //console.log('MALAKING ERROR', this.props)
        return (
            <table className="table table-inverse">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Actions</th>
                        <th> <input type="text" className="form-control" placeholder="Search" /> </th>
                        <th> ^ </th>
                    </tr>
                </thead>
                <tbody>
                     {usermap}
                    <tr>
                       <td></td>
                       <td></td>
                        <td>
                            <button className="btn btn-info" >Edit</button>
                            <button className="btn btn-danger" >Delete</button>
                        </td>
                    </tr> 
                       
                </tbody>
            </table>
        )   
    }
}

export default connect(mapStateToProps)(Table);


/* 
export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }

        this.sortByAsc = this.sortByAsc.bind(this);
    }

    sortByAsc = (event) => {
        this.setState({
            sorting:event.target.value
        })
        //let { customers } = this.props;
    //     customers.sort((a, b) => { return a.title > b.title })
    //     .map((title, i) => 
    //     <Row key={i}>  {title.title}{title.category}</Row>)
    //     console.log(customers);
     }

    handleChange = (event) => {
        this.setState({
        search:event.target.value
        })
    }

    render() {
        let { onDelete, customers, edit } = this.props;
       // console.log(customers);
        // let filteredCustomers = this.props.customers.filter(
        //     (customers) => {
        //     //     return customers.firstName.toLowerCase().indexOf(this.state.handleChange.toLowerCase()) !== -1;
        //     console.log(customers);
        // }
        // );   

        let  customers2 = [];  

        this.props.customers.forEach((item,index) => {
            if(item.title.toLowerCase().indexOf(this.state.search) > -1){
                customers2.push(
                    // <Row key={index} data={this.props.customers[index]} edit={edit} onDelete={onDelete} />
                    this.props.customers[index]
                );
            } 
        })

        customers.sort((a, b) => { return a.title > b.title })
        // .map((title, i) => 
        // <Row> {title.title}{title.category}  </Row>)
        console.log(customers);

        return (
            <table className="table table-inverse">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Actions</th>
                        <th> <input type="text" className="form-control" placeholder="Search" onChange={(val)=>{this.handleChange(val)}}/> </th>
                        <th onClick={this.sortByAsc}> ^ </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers2.map((title, i) => {
                        return <Row key={i} data={title} edit={edit} onDelete={onDelete} >
                                    
                                </Row>;
                    })}
                    
                    {/*{customers2}}
                </tbody>
            </table>
        )   
    }
}
*/