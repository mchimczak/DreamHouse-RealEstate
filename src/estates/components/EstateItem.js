import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../shared/components/Button/Button';

const EstateItemWrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
padding: 1rem 2rem;
background-color: #333;
color: #white;
width: 300px;
margin-top: 3rem;
`

const EstateInfoWrapper = styled.div`
display: flex;
flex-direction: column;
`

const ActionsWrapper = styled.div`
display: flex;
flex-direction: row;
width: 100%;
margin-top: 1rem;
`

const EstateItem = (props) => {
    return ( 
        <EstateItemWrapper>
            <EstateInfoWrapper>
                <p>{props.id}</p>
                <p>{props.title}</p>
                <p>{props.description}</p>
                <p>{props.creator}</p>
            </EstateInfoWrapper>
            <ActionsWrapper>
                <Link to={`/estates/${props.id}`}>View offer</Link>
                <Button>EDIT</Button>
                <Button>DELETE</Button>
            </ActionsWrapper>
        </EstateItemWrapper>
     );
}
 
export default EstateItem;