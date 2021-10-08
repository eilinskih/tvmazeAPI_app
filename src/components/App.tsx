import React, { useEffect, useState, MouseEvent } from 'react';
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
import { Autocomplete, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { AppDispatch, AppStateType } from '../redux/store';
import { getMoviesList, setCurrentPage, setGenre, setLang, setMoviesList } from '../redux/appReducer';
import MovieModal from './MovieModal';
import { IMovieItem } from './tsInterfaces';
import {IInitialState} from './../redux/appReducer';

const theme = createTheme();

const App: React.FC = () => {
  
  const { moviesList, portionList, currentPage, pageSize, sorts } = useSelector<AppStateType, IInitialState>(({ appState: { moviesList, portionList, currentPage, pageSize, sorts } }) => {
    return {
      moviesList,
      portionList,
      currentPage,
      pageSize,
      sorts
    };
    });
    
  const dispatch: AppDispatch = useDispatch();  
  const [isModal, setIsModal] = useState<boolean>(false);
  const [choosedMovie, setChoosedMovie] = useState<IMovieItem>(moviesList[0]);

  useEffect(() => {
    dispatch(getMoviesList())
  }, [dispatch]);
 
  const chooseMovieClick = (e: MouseEvent<HTMLElement>) => {
    setIsModal(true)
    setChoosedMovie(moviesList.filter((item): boolean => item.id === Number((e.target as any).id))[0])
  };

  const inputChange = (event: React.SyntheticEvent, value: IMovieItem | null) => {
    event.preventDefault()
    if (value) {
      setChoosedMovie(moviesList.filter((item): boolean => item.id === value.id)[0])
      setIsModal(true)
    }
  };

  const onFavouriteClick = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {id: string}
    const upd = moviesList.map((item): IMovieItem => {
      if (item.id === Number(target.id)) {
        item.isFavourite = true
      }
      return item
    })
    dispatch(setMoviesList(upd))
  };

  const onUnFavouriteClick = (e: any) => {
    const upd = moviesList.map((item) => {
      if (item.id === Number(e.target.closest('svg').id)) {
        item.isFavourite = false
      }
      return item
    })
    dispatch(setMoviesList(upd))
  };

  const paginatorChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage(page)) 
  };

  const showFavouriteList = () => {
    dispatch(setMoviesList(moviesList.filter((item): boolean => item.isFavourite)))
  };

  const showFilms = () => {
    dispatch(getMoviesList())
  };

  const genreChange = (e: SelectChangeEvent<string>): void => {
    dispatch(setGenre(e.target.value))
  };

  const langChange = (e: SelectChangeEvent<string>): void => {
    dispatch(setLang(e.target.value))
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={12} md={1} >
              <Typography sx={{ cursor: 'pointer', textAlign: 'center' }} className="about" variant="h6" color="inherit" >
                About
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={1} >
              <Typography onClick={showFilms} sx={{ cursor: 'pointer', textAlign: 'center' }} className="films" variant="h6" color="inherit" >
                Films
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={1} >
              <Typography onClick={showFavouriteList} sx={{ cursor: 'pointer', textAlign: 'center' }} className="favourite" variant="h6" color="inherit" >
                Favourite
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={1} >
              <Typography sx={{ cursor: 'pointer', textAlign: 'center' }} className="contacts" variant="h6" color="inherit" >
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
            options={moviesList}
            getOptionLabel={(option: IMovieItem) => `${option.id}:${option.name}`}
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
          <Pagination count={Math.ceil(moviesList.length / pageSize)} 
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
          page={currentPage} onChange={paginatorChange} />
          {!isModal ? null : <MovieModal choosedMovie={choosedMovie} setIsModal={setIsModal} />}
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={6}>
            {portionList.map((movie: any) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    id={movie.id}
                    sx={{ cursor: 'pointer' }}
                    image={movie.image.medium}
                    alt="random"
                    onClick={chooseMovieClick}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    {movie.isFavourite ?
                      <FavoriteIcon id={movie.id} onClick={onUnFavouriteClick} sx={{ cursor: 'pointer' }} /> :
                      <FavoriteBorderIcon id={movie.id} onClick={onFavouriteClick} sx={{ cursor: 'pointer' }} />}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Pagination count={Math.ceil(moviesList.length / 18)}
        sx={{ display: 'flex', justifyContent: 'center' }}
        page={currentPage}
        onChange={paginatorChange} />
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