import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImageGallery = ({ images, handleClose }) => {
    const [currentImg, setCurrentImg] = useState(0);

    const album = images.map( img => `${process.env.REACT_APP_BACKEND_URL}${img}`)

    return (
        <Lightbox
            mainSrc={album[currentImg]}
            nextSrc={album[(currentImg + 1) % album.length]}
            prevSrc={album[(currentImg + album.length - 1) % album.length]}
            onCloseRequest={() => handleClose()}
            onMovePrevRequest={() => setCurrentImg(prevImg => (prevImg + album.length - 1) % album.length)}
            onMoveNextRequest={() => setCurrentImg(prevImg => (prevImg + album.length + 1) % album.length)}
        />
    );
}
 
export default ImageGallery;