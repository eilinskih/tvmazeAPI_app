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
import { Autocomplete, Pagination, TextField } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { AppStateType } from '../redux/store';
import { getMoviesList } from '../redux/appReducer';
import MovieModal from './MovieModal'


const theme = createTheme();

const App = () => {

  const paginate = (array: any, index: any, size: any) => {
    index = Math.abs(parseInt(index));
    index = index > 0 ? index - 1 : index;
    size = parseInt(size);
    size = size < 1 ? 1 : size;
    return [...(array.filter((value: any, n: any) => {
        return (n >= (index * size)) && (n < ((index+1) * size))
    }))]
}
  const [isModal, setIsModal] = useState<boolean>(false)
  const dispatch = useDispatch()
  const storeMovies: any = useSelector< AppStateType>((state) => {
    return state.appState.moviesList
  })
  if (!storeMovies.length) {
    dispatch(getMoviesList())
  }
  const [renderedItems, setRenderedItems] = useState<any>([])
  const [choosedMovie, setChoosedMovie] = useState<any>({})

  useEffect(() => {
    setRenderedItems(paginate(storeMovies, 1, 18))
  }, [storeMovies])
  

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

const paginatorChange = (e: any, page: any) => {
  setRenderedItems(paginate(storeMovies, page, 18)) 
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
          <Typography sx={{ cursor: 'pointer', textAlign: 'center'}} className="films" variant="h6" color="inherit" >
            Films
          </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} >
          <Typography sx={{ cursor: 'pointer', textAlign: 'center'}} className="favourite" variant="h6" color="inherit" >
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
<Pagination count={Math.ceil(storeMovies.length / 18)} sx={{display: 'flex', justifyContent: 'center',  marginTop: '50px'}} onChange={paginatorChange}/>

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
                  <FavoriteBorderIcon sx={{ cursor: 'pointer'}} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Pagination count={Math.ceil(storeMovies.length / 18)} sx={{display: 'flex', justifyContent: 'center'}} onChange={paginatorChange}/>
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