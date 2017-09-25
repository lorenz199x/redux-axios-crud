import React, { Component } from 'react';
import axios from 'axios';

export function onChangeForm(title, category) {
    return (dispatch) => {
        dispatch({ type: 'FETCH_ALL_CUSTOMER_TITLE' })
        axios.get("http://localhost:4000/customers")
        .then((response) => {
            dispatch({ type: 'RECEIVE_TITLE', payload: response.data});
            // console.log('response',response);
        })
        .catch((err) => {
            dispatch({ type: 'FETCH_TITLE_ERROR', payload: err})
        })
    }
}

export function onSubmitForm(title, category) {
   // let { books } = this.props;
    return (dispatch) => {
        if  (title === '' || category === ''){
            axios.post("http://localhost:4000/customers")
            .then((response) => {
                dispatch({
                    type: 'ADD_TITLE',
                    payload: {
                        title,
                        category
                    } 
                }); console.log('response',response);
            })
            .catch(error => {
                    console.log(error);
                });
            
        }
        else {
            // axios.put("http://localhost:4000/customers/${data.id}")
            // .then(response => {
            //     dispatch({
            //         type: 'UPDATE_TITLE',
            //         payload: {
            //             title,
            //             category
            //         }
            //     });
            //     books = [...books];
            //     books = books.map(d => {
            //         if (d.id === response.d.id) {
			// 				d = response.data;
			// 			}
            //     });
            // })
            // .catch(error => {
            //         console.log(error);
            // });
        }
    }
}

export  function onDelete(title, category) {
    let { books } = this.props;
    return (dispatch) => {
        axios.delete("http://localhost:4000/customers/${data.id}")
        .then(response => {
            dispatch({
                type: 'DELETE_TITLE',
                payload: {
                    title,
                    category
                }
            })
            books === books.filter(d => {
                if (d.id !== books.id) {
					return books;
				}
            });
        })
    }
}


export function setTitle (title, category) {
    return {
        type: 'SET_TITLE_CATEGORY',
        payload: title, category
    }
} 
