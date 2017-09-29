

let initialState = {
    books: [],
    title: '',
    category: '',
    error: null,
    fetching: false,
    fetched: false,
    action: 'edit'
}

function titleReducer (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ALL_CUSTOMER_TITLE': {
            return {
                ...state,
                 fetching: true,
            }
        }
  
        case 'FETCH_TITLE_ERROR': {
            return {
                ...state,
                 fetching: false, error: action.payload,
            }
        }

        case 'RECEIVE_TITLE': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                books: action.payload,
            }
        }
        case 'ADD_TITLE': {
            return {
                ...state,
                books: [...state.books, action.payload],
            }
        }

        case 'UPDATE_TITLE': {
            return {
                ...state,
                 books: [...state.books, action.payload],
            }
        }

        case 'DELETE_TITLE': {
            return {
                books: action.payload
            }
        }

        default:
            return state
    }
}

export default titleReducer;