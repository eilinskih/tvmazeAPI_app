import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Autocomplete, FormControl, InputLabel, MenuItem, Pagination, Select, TextField } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { AppStateType } from '../redux/store';
import { getMoviesList, setCurrentPage, setGenre, setLang, setMoviesList } from '../redux/appReducer';
import MovieModal from './MovieModal';
import { paginate } from './paginator'


const theme = createTheme();

const App = () => {
  
  const dispatch = useDispatch()
  const storeMovies: any = useSelector< AppStateType>((state) => {
    return state.appState.moviesList
  })
  const currentPage: any = useSelector<AppStateType> ((state) => {
    return state.appState.currentPage
  })
  const sorts: any = useSelector<AppStateType> ((state) => {
    return state.appState.sorts
  })
  const pageSize: any = useSelector<AppStateType> ((state) => {
    return state.appState.pageSize
  })

  if (!storeMovies.length) {
    dispatch(getMoviesList())
  }
   

  const [renderedItems, setRenderedItems] = useState<any>([])
  const [isModal, setIsModal] = useState<boolean>(false)
  const [choosedMovie, setChoosedMovie] = useState<any>({})

  useEffect(() => {
    setRenderedItems(paginate(storeMovies, currentPage, pageSize))
  }, [storeMovies, currentPage, pageSize])

  const chooseMovieClick = (e: any) => {
    setIsModal(true)
    setChoosedMovie(storeMovies.find((item: any) => item.id === Number(e.target.id)))
  }

  const inputChange = (event: any, value: any) => {
    event.preventDefault()
    if (value) {
      setChoosedMovie(storeMovies.find((item: any) => item.id === value.id))
      setIsModal(true)
    }
  }

  const onFavouriteClick = (e: any) => {
    const upd = storeMovies.map((item: any) => {
      if (item.id === Number(e.target.id)) {
      item.isFavourite = true
      }
      return item
    })
    // console.log(upd)
    dispatch(setMoviesList(upd))
  }

  const onUnFavouriteClick = (e: any) => {
    const upd = storeMovies.map((item: any) => {
      if (item.id === Number(e.target.closest('svg').id)) {
      item.isFavourite = false
      }
      return item
    })
    // console.log(e.target.closest('svg'))
    dispatch(setMoviesList(upd))
  }

const paginatorChange = (e: any, page: any) => {
  dispatch(setCurrentPage(page)) 
}

const showFavouriteList = () => {
  dispatch(setMoviesList(storeMovies.filter((item: any) => item.isFavourite === true)))
}

const showFilms = () => {
  dispatch(getMoviesList())
}

const genreChange = (e: any) => {
  dispatch(setGenre(e.target.value))
}

const langChange = (e: any) => {
  dispatch(setLang(e.target.value))
}
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
        <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={12} md={1} >
          <Typography sx={{ cursor: 'pointer', textAlign: 'center'}} className="about" variant="h6" color="inherit" >
            About
          </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} >
          <Typography onClick={showFilms} sx={{ cursor: 'pointer', textAlign: 'center'}} className="films" variant="h6" color="inherit" >
            Films
          </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} >
          <Typography onClick={showFavouriteList} sx={{ cursor: 'pointer', textAlign: 'center'}} className="favourite" variant="h6" color="inherit" >
            Favourite
          </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} >
          <Typography sx={{ cursor: 'pointer', textAlign: 'center'}} className="contacts" variant="h6" color="inherit" >
            Contacts
          </Typography>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={storeMovies}
  getOptionLabel={(option: any) => `${option.id}:${option.name}`}
  sx={{ width: '70%', margin: '0 auto' }}
  renderInput={(params) => <TextField {...params} label="Movie" />}
  onChange={inputChange}
/>
<br />
<FormControl sx={{ m: 1, minWidth: 80, marginLeft: '20%' }} >
  <InputLabel id="demo-simple-select-label">Genre</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={sorts.genre}
    label="Genre"
    onChange={genreChange}
  >
    <MenuItem value={"Action"}>Action </MenuItem>
    <MenuItem value={"Crime"}>Crime </MenuItem>
    <MenuItem value={"Romance"}>Romance</MenuItem>
    <MenuItem value={"Drama"}>Drama</MenuItem>
    <MenuItem value={"Horror"}>Horror </MenuItem>
    <MenuItem value={"Science"}>Science</MenuItem>
    <MenuItem value={"Thriller"}>Thriller</MenuItem>
    <MenuItem value={"Adventure"}>Adventure </MenuItem>
    <MenuItem value={"Mystery"}>Mystery</MenuItem>

  </Select>
</FormControl>

<FormControl sx={{ m: 1, minWidth: 80 }} >
  <InputLabel id="demo-simple-select-label1">Lang</InputLabel>
  <Select
    labelId="demo-simple-select-label1"
    id="demo-simple-select1"
    value={sorts.lang}
    label="Lang"
    onChange={langChange}
  >
    <MenuItem value={"English"}>English</MenuItem>
  </Select>
</FormControl>



<Pagination count={Math.ceil(storeMovies.length / pageSize)} sx={{display: 'flex', justifyContent: 'center',  marginTop: '50px'}} page={currentPage} onChange={paginatorChange}/>

{!isModal? null: <MovieModal choosedMovie={choosedMovie} setIsModal={setIsModal}/>}
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={6}>
            {renderedItems.map((movie: any) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    id={movie.id}
                    sx={{ cursor: 'pointer'}}
                    image={movie.image.medium}
                    alt="random"
                    onClick={chooseMovieClick}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                  {movie.isFavourite?
                  <FavoriteIcon id={movie.id} onClick={onUnFavouriteClick} sx={{ cursor: 'pointer'}}/>:
                  <FavoriteBorderIcon id={movie.id} onClick={onFavouriteClick} sx={{ cursor: 'pointer'}}/>}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Pagination count={Math.ceil(storeMovies.length / 18)} sx={{display: 'flex', justifyContent: 'center'}} page={currentPage} onChange={paginatorChange}/>
      <br />
        <Typography variant="h6" align="center" gutterBottom>
          TVmaze API app
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Copyright here
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;