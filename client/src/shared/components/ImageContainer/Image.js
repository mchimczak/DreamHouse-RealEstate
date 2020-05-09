import React from 'react';
import noImg from '../../../img/unnamed.png';

import CardMedia from '@material-ui/core/CardMedia';

const Image = ({url}) => {
    const imageUrl = url
        ? `${process.env.REACT_APP_BACKEND_URL}${url}`
        : noImg

    const style = url
        ? { height: '100%', maxHeight: '300px', backgroundColor: 'transparent', objectFit: 'cover' }
        : { height: '100%', maxHeight: '300px', objectFit: 'contain' }

    return (
        <CardMedia 
            component='img' 
            image={imageUrl}
            style={style}
            onError={(e) => e.target.src = noImg}
        />
     );
}
 
export default Image;