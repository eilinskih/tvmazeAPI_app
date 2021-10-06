export const GET_MOVIES_LIST = "GET_MOVIES_LIST"
export const SET_MOVIES_LIST = "SET_MOVIES_LIST"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"


const initialState: any ={
moviesList: [],
currentPage: 1,
pageSize: 18
};

const appReducer = (state=initialState, action: any) => {
    switch (action.type) {
        case SET_MOVIES_LIST: 
        return (
            {...state,
            moviesList: action.list
            }
        )
        case SET_CURRENT_PAGE: 
        return (
            {...state,
            currentPage: action.page,

            }
        )
        default: return state;
    }
};

//Action creators
export const setMoviesList = (moviesList: any) => ({type: SET_MOVIES_LIST, list: moviesList});
export const setCurrentPage = (page: any) => ({type: SET_CURRENT_PAGE, page});
export const getMoviesList = () => ({type: GET_MOVIES_LIST}); 

export default appReducer;