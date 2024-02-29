import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import { FormattedMessage } from 'react-intl';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';

const handleRemoveLesion = (id, dispatch, history) => {
  dispatch(actions.removeLesion(id, () => history(`/lesion/home`)));
  window.location.reload('true');
}

const handleUpdateLesion = (id, dispatch, history) => {
  dispatch(actions.findLesionById(id, () => history(`/lesion/update/${id}`)));
}

const handleViewLesion = (id, dispatch, history) => {
  dispatch(actions.findLesionById(id, () => history(`/lesion/view/${id}`)));
}

function LesionsList({ items, fallback, dispatch, history, open, setOpen, handleClickOpen, handleClose }) {
  if (!items || items.length === 0) {
    dispatch(actions.findAllLesion(() => history('/lesion/home')));
    return fallback;
  } else {
    return items.map(item => {
      return <div key={item.id}>

        {/* <div class="container222 images-new">

          <div class="wrapper2">
            <div class="banner-image"> </div>
            <h1> {item.lesionName}</h1>
          </div>
          <div class="button-wrapper">
            <button variant="outlined" class="btn outline" onClick={handleClickOpen}>
              DETAILS</button>
            <button class="btn fill">{item.lesionType}</button>
          </div>

        </div> */}



        <div>
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <div class="card">
                  <img src={lesionPierna} alt="Person" class="card__image_lesion"></img>
                  <span class="title">{item.lesionName}</span>
                  <div class="buttons">
                    <button class="post">{item.lesionType}</button>
                  </div>
                </div>
              </div>
              <div class="flip-card-back">
                <div class="card">
                  <span class="desc">{item.description}</span>
                  <a href="#" class="button">
                    <span class="desc">{item.medication}</span>
                  </a>
                </div>
                <ul class="social-icons trashgrande trash_position">
                <li><a type="button" onClick={() => handleRemoveLesion(item.id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                </ul>
                <ul class="social-icons configgrande config_position">
                    <li><a type="button" onClick={() => handleUpdateLesion(item.id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>;


      {/* //       <Card sx={{ maxWidth: 345 }} raised="true">
      //   <CardActionArea>
      //     <CardMedia
      //       component="img"
      //       height="140"
      //       image={lesionPierna}
      //       alt="green iguana"
      //     />
      //     <CardContent>
      //       <Typography gutterBottom variant="h5" component="div">
      //       {item.lesionName}
      //       </Typography>
      //       <Typography variant="body2" color="text.secondary">
      //         Lizards are a widespread group of squamate reptiles, with over 6,000
      //         species, ranging across all continents except Antarctica
      //       </Typography>
      //     </CardContent>
      //   </CardActionArea>
      //   <CardActions>
      //     <Button size="small" color="primary">
      //     {item.lesionType}
      //     </Button>
      //   </CardActions>
      // </Card> */}




    });
  }
}

const Lesions = ({ lesions }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (

    <div className="card-group lesions_contaner">

      <LesionsList items={lesions} fallback={"Loading..."} dispatch={dispatch} history={history}
        open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose}
      />
    </div>
  )
};

Lesions.propTypes = {
  lesions: PropTypes.array
};

export default Lesions;