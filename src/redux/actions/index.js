import axios from 'axios';

export function onChangeForm(title, category) {
    return (dispatch) => {
        dispatch({ type: 'FETCH_ALL_CUSTOMER_TITLE' })
        axios.get("http://localhost:4000/customers")
        .then((response) => {
            dispatch({ type: 'RECEIVE_TITLE', payload: response.data});
        })
        .catch((err) => {
            dispatch({ type: 'FETCH_TITLE_ERROR', payload: err})
        })
    }
}

export function onSubmitForm(title, category) {
    return (dispatch) => {
        if  (title === '' || category === ''){
            alert('all fields are required');
            
        } else {
                 let formData = {title,category};
                    axios({
                    url: `http://localhost:4000/customers`,
                    method: 'POST',
                    data: formData
                })
                .then((response) => { 
                    dispatch({
                        type: 'ADD_TITLE',
                        payload: {
                            title,
                            category
                        }
                    });console.log('ADD_LOGS', response)
                })
                .catch(error => {
                        console.log(error);
                    });
        } 
    }
}

export function onDelete(id, title, category) {
    return (dispatch) => {
        // if  (title === ''){
        //     alert('Do you want to delete this ?');

        //     if  (title === '' || category === ''){
        //         alert('Do you want to delete this ?');

                if  (title === '' || category === ''){
                    alert('Do you want to delete this ?');

                    // let formData = {id};
                    //     axios({
                    //         url: `http://localhost:4000/customers/${id}`,
                    //         method: 'DELETE',
                    //     })
                    //     .then(() => {
                    //         axios.get("http://localhost:4000/customers")
                    //     .then((response) => {
                    //         dispatch({ type: 'RECEIVE_TITLE', payload: response.data});
                    //     })
                    // })
                }
            //}
        //}
    }
}

export function onUpdate(id, title, category){
    return(dispatch) => {
        let formData = {id, title, category};
        
        axios({
            url: `http://localhost:4000/customers/${id}`,
            method: 'PUT',
			data: formData
		})
        .then((response) => { 
            dispatch({
                type: 'UPDATE_TITLE',
                payload: {
                title,
                category
            }
            });console.log('UPDATE_LOGS', response)
        })
        .then(() => {
                axios.get("http://localhost:4000/customers")
            .then((response) => {
                dispatch({ type: 'RECEIVE_TITLE', payload: response.data});
            })
        })
    }
}

