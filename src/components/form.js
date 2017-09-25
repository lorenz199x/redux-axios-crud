import React, { Component } from 'react';
import { onChangeForm } from '../redux/actions/index';

export default class Form extends Component {

    // componentWillMount() {
    //     this.props.dispatch(onChangeForm())
    // }`

    render() {
        let { action } = this.props;
        
        return (
            <div className="col-xs-12">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Title" />
                    </div>
                    <div className="form-group">
                        {/*<input type="text" className="form-control" placeholder="Category" value={formData.category} onChange={e => onChangeForm(e, 'category')} />*/}
                        <select className="form-group" name="cats">
                            <option value="Web Design">Web Design </option>
                            <option value="Mobile Dev">Mobile Dev </option>
                            <option value="Web Dev">Web Dev </option>
                        </select>
                    </div>
                    {/*<div className="form-group">
                        <input type="number" className="form-control" placeholder="Age" value={formData.age} onChange={e => onChangeForm(e, 'age')} />
                    </div>*/}
                    <button type="submit" className="btn btn-primary">
                        {(action === 'edit')
                            ? <span>Update</span>
                            : <span>Add</span>
                        }
                    </button>
                </form>
            </div>
        )
    }
}


/*return (
            <div className="col-xs-12">
                <form onSubmit={onSubmitForm}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Title" value={formData.title} onChange={e => onChangeForm(e, 'title')} />
                    </div>
                    <div className="form-group">
                        {/*<input type="text" className="form-control" placeholder="Category" value={formData.category} onChange={e => onChangeForm(e, 'category')} />}
                        <select className="form-group" name="cats" value={formData.category} onChange={e => onChangeForm(e, 'category')} >
                            <option value="Web Design">Web Design </option>
                            <option value="Mobile Dev">Mobile Dev </option>
                            <option value="Web Dev">Web Dev </option>
                        </select>
                    </div>
                    {/*<div className="form-group">
                        <input type="number" className="form-control" placeholder="Age" value={formData.age} onChange={e => onChangeForm(e, 'age')} />
                    </div>}
                    <button type="submit" className="btn btn-primary">
                        {(action === 'edit')
                            ? <span>Update</span>
                            : <span>Add</span>
                        }
                    </button>
                </form>
            </div>
        )
    */