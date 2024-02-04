import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useNavigate } from 'react-router';
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
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


function LesionsList({ items, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findAllLesion(() => history('/lesion/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div key={item.id}>
            
            <Card sx={{ maxWidth: 345 }} raised="true">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={lesionPierna}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {item.lesionName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
          {item.lesionType}
          </Button>
        </CardActions>
      </Card>
          </div>;
        

      
      
      });
      }
}

const Lesions = ({lesions}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    
    return(
        <div className="card-group">
          <LesionsList items={lesions} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )
};

Lesions.propTypes = {
    lesions: PropTypes.array
};

export default Lesions;