
export const GET_MOVIES_LIST = "GET_MOVIES_LIST"
export const SET_MOVIES_LIST = "SET_MOVIES_LIST"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const SET_GENRE = "SET_GENRE"
export const SET_LANG = "SET_LANG"

const initialState: any = {
    moviesList: [],
    currentPage: 1,
    pageSize: 18,
    sorts: {
        genre: "",
        lang: ""
    }
};

const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_MOVIES_LIST:
            return (
                {
                    ...state,
                    moviesList: [...action.list]
                }
            )
        case SET_CURRENT_PAGE:
            return (
                {
                    ...state,
                    currentPage: action.page,
                }
            )
        case SET_GENRE:
            const filteredGenre = state.moviesList.filter((item: any) => {
                return (
                    item.genres.includes(action.genre))
            })
            return (
                {
                    ...state,
                    moviesList: filteredGenre,
                    sorts: { ...state.sorts, genre: action.genre }
                }
            )
        case SET_LANG:
            const filteredLang = state.moviesList.filter((item: any) => {
                return (
                    item.language === action.lang
                )})
                if (!filteredLang) {
                    return {
                        ...state,
                        moviesList: [],
                        sorts: { ...state.sorts, lang: action.lang }
                    }
                }
            return (
                {
                    ...state,
                    moviesList: filteredLang,
                    sorts: { ...state.sorts, lang: action.lang }
                }
            )
        default: return state;
    }
};

//Action creators
export const setMoviesList = (moviesList: any) => ({ type: SET_MOVIES_LIST, list: moviesList });
export const setCurrentPage = (page: any) => ({ type: SET_CURRENT_PAGE, page });
export const setGenre = (genre: any) => ({ type: SET_GENRE, genre });
export const setLang = (lang: any) => ({ type: SET_LANG, lang });
export const getMoviesList = () => ({ type: GET_MOVIES_LIST });

export default appReducer;