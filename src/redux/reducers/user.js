

let initialState = {
    //books: [],
    // title: '',
    // category: '',
    books: {
        title: null,
        category: null
    },
    error: null,
    fetching: false,
    fetched: false
}

function titleReducer (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ALL_CUSTOMER_TITLE': {
            return {
                ...state,
                 fetching: true,
               // customers: action.customers
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

        case 'UPDATE_TITLE': {
            return {
                ...state,
                 books: [...state.books, action.payload],
            }
        }

        case 'DELETE_TITLE': {
            return {
                ...state,
                books: state.books.filter(books => books.title !== action.payload),
            }
        }

        case 'ADD_TITLE': {
            return {
                ...state,
                books: [...state.books, action.payload],
                // title: action.payload,
                // category: action.payload
            }
        }
        default:
            return state
    }
    //return state
}

export default titleReducer;