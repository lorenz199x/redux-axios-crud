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
            console.log('all fields are required');
            
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

export function onDelete(id) {
    return (dispatch) => {
        let formData = {id};
        console.log('DELETE_LOGS',formData);
            axios({
                url: `http://localhost:4000/customers/${id}`,
                method: 'DELETE',
            })
            .then(() => {
                axios.get("http://localhost:4000/customers")
            .then((response) => {
                dispatch({ type: 'RECEIVE_TITLE', payload: response.data});
            })
        })
     }
}

export function onUpdate(title, category){
    return(dispatch) => {
        let formData = {title, category};
        console.log('UPDATE_LOGs', formData);
        axios({
            url: `http://localhost:4000/customers/`,
                method: 'PUT',
				//data: formData
			}).then(response => {
                dispatch({
                    type: 'ADD_TITLE',
                    payload: {
                        title,
                        category
                    }
                });
			}).catch(error => {
				console.log(error);
		});
    }
}

// export function onAction(){
//     return (dispatch) => {
//         dispatch({
//             type: 'ACTION_FORM',
            
//         })
        

//     }
// }

