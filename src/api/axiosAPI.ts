import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.tvmaze.com/' 
})

export const getMovies = () => {
   return instance.get('shows')
   .then(response => {return response.data}) 
}