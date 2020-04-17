import React from 'react';
import noImg from '../../../img/unnamed.png';

import CardMedia from '@material-ui/core/CardMedia';

const Image = ({url}) => {
    const imageUrl = url
        ? `http://localhost:5000/${url}`
        : noImg

    const style = url
        ? { height: '100%', maxHeight: '300px', backgroundColor: 'transparent', objectFit: 'cover' }
        : { height: '100%', maxHeight: '300px', objectFit: 'contain' }

    return (
        <div> 
            <CardMedia 
            component='img' 
            image={imageUrl}
            style={style}
            />
        </div>
     );
}
 
export default Image;