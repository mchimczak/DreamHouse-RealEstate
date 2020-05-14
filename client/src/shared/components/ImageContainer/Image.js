import React from 'react';
import PropTypes from 'prop-types';
import noImg from '../../../img/unnamed.png';

import CardMedia from '@material-ui/core/CardMedia';

const Image = ({url, onClick}) => {
    const imageUrl = url
        ? `${process.env.REACT_APP_BACKEND_URL}${url}`
        : noImg

    const style = url
        ? { height: '100%', maxHeight: '300px', backgroundColor: 'transparent', objectFit: 'cover', cursor: `${onClick ? 'pointer': 'null'}` }
        : { height: '100%', maxHeight: '300px', objectFit: 'contain' }

    return (
        <CardMedia 
            component='img' 
            alt="image"
            image={imageUrl}
            style={style}
            onClick={onClick}
            onError={(e) => e.target.src = noImg}
        />
     );
}
 
export default Image;

Image.propTypes = {
    url: PropTypes.string,
    onClick: PropTypes.func
}