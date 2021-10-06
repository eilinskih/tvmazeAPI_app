export const GET_MOVIES_LIST = "GET_MOVIES_LIST"
export const SET_MOVIES_LIST = "SET_MOVIES_LIST"



const initialState: any ={
moviesList: []
};

const appReducer = (state=initialState, action: any) => {
    switch (action.type) {
        case SET_MOVIES_LIST: 
        return (
            {...state,
            moviesList: action.list
            }
        )
        default: return state;
    }
};

//Action creators
export const setMoviesList = (moviesList: any) => ({type: SET_MOVIES_LIST, list: moviesList});
export const getMoviesList = () => ({type: GET_MOVIES_LIST}); 

export default appReducer;