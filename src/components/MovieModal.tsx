import CloseIcon from '@material-ui/icons/Close';
import m from './MovieModal.module.css';
import { IMovieItem } from './tsInterfaces';

type propsType ={
    choosedMovie: IMovieItem,
    setIsModal: React.Dispatch<React.SetStateAction<boolean>>
};

const MovieModal: React.FC<propsType> = (props) => {
    const onCloseClick = () => {
        props.setIsModal(false)
    };
    const background = {
        backgroundImage: `url(${props.choosedMovie.image.medium})`
    };
    return (
    <div className={m.modalWrapper}>
        <CloseIcon onClick={onCloseClick} sx={{ position: 'absolute', top: '5px', right: '25px', cursor: 'pointer' }} />
        <div className={m.picture} style={background} ></div>
        <div className={m.descriptions}>
            <h2>{props.choosedMovie.name}</h2>
            <h5>{props.choosedMovie.genres.map((genre: any) => <span key={props.choosedMovie.genres.indexOf(genre)}>{`|${genre}  `}</span>)}</h5>
            <h5>{props.choosedMovie.language}</h5>
            <p dangerouslySetInnerHTML={{__html: props.choosedMovie.summary}}></p>
        </div>
    </div>
    )
};

export default MovieModal;