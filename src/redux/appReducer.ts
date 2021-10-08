import { paginate } from '../components/paginator'
import {IMovieItem, ISorts} from './../components/tsInterfaces'

export const GET_MOVIES_LIST = "GET_MOVIES_LIST"
export const SET_MOVIES_LIST = "SET_MOVIES_LIST"
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
export const SET_GENRE = "SET_GENRE"
export const SET_LANG = "SET_LANG"

export interface IInitialState {
    moviesList: IMovieItem[],
    portionList: IMovieItem[],
    currentPage: number,
    pageSize: number,
    sorts: ISorts
};

const initialState: IInitialState = {
    moviesList: [],
    portionList: [],
    currentPage: 1,
    pageSize: 18,
    sorts: {
        genre: "",
        lang: ""
    }
};

const appReducer = (state = initialState, action: ActionsType): IInitialState => {
    switch (action.type) {
        case SET_MOVIES_LIST:
            return {
                ...state,
                moviesList: [...action.list],
                portionList: paginate(action.list, state.currentPage, state.pageSize)
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page,
                portionList: paginate(state.moviesList, action.page, state.pageSize)
            }
        case SET_GENRE:
            const filteredGenre = state.moviesList.filter((item): boolean => {
                return (
                    item.genres.includes(action.genre)
                )
            })
            return {
                ...state,
                moviesList: filteredGenre,
                portionList: paginate(state.moviesList, state.currentPage, state.pageSize),
                sorts: { ...state.sorts, genre: action.genre }
            }
        case SET_LANG:
            const filteredLang = state.moviesList.filter((item): boolean => {
                return (
                    item.language === action.lang
                )
            })
            if (!filteredLang) {
                return {
                    ...state,
                    moviesList: [],
                    sorts: { ...state.sorts, lang: action.lang }
                }
            }
            return {
                ...state,
                moviesList: filteredLang,
                portionList: paginate(state.moviesList, state.currentPage, state.pageSize),
                sorts: { ...state.sorts, lang: action.lang }
            }
        default: return state;
    };
};

type ActionsType = 
|SetMoviesType
|SetCurrentPageType
|SetGenreType
|SetLangType
|GetMoviesListType

type SetMoviesType = {type: typeof SET_MOVIES_LIST, list: IMovieItem[]};
type SetCurrentPageType = {type: typeof SET_CURRENT_PAGE, page: number};
type SetGenreType = {type: typeof SET_GENRE, genre: string};
type SetLangType = {type: typeof SET_LANG, lang: string};
type GetMoviesListType = {type: typeof GET_MOVIES_LIST};
//Action creators
export const setMoviesList = (moviesList: IMovieItem[]): SetMoviesType => ({ type: SET_MOVIES_LIST, list: moviesList });
export const setCurrentPage = (page: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, page });
export const setGenre = (genre: string): SetGenreType => ({ type: SET_GENRE, genre });
export const setLang = (lang: string): SetLangType => ({ type: SET_LANG, lang });
export const getMoviesList = (): GetMoviesListType => ({ type: GET_MOVIES_LIST });

export default appReducer;