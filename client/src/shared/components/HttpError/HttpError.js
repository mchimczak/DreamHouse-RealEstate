import React from 'react';
import PropTypes from 'prop-types';

const HttpError = ({ status, info}) => {
    return ( 
        <div>
            <h4>{status}</h4>
            {
                info && <p>{info}</p>
            }
        </div>
     );
};
 
export default HttpError;

HttpError.propTypes = {
    status: PropTypes.number,
    info: PropTypes.string
}

HttpError.defaultProps = {
    status: 'Something went wrong'
}