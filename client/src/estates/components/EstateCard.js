import React, {useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { UserContext } from '../../auth/context/UserContext';
import  { EstatesContext } from '../../estates/context/EstatesContext';

import MyCard from '../../shared/components/Card/Card';
import CardFields from '../../shared/components/Card/CardFields';
import Btn from '../../shared/components/Button/Button';
import Image from '../../shared/components/ImageContainer/Image';

import { EstateCardMediaWrapper as StyledMediaWrapper, CardActionsWrapper, CardActionsBlock, Number, materialUIElements } from './styles/EstatesComponents.styles';
const { Divider, CardContent, FavoriteIcon } = materialUIElements;

const EstateCard = React.memo((props) => {
    const {isLoggedIn, userData, status: [, setStatus]} = useContext(UserContext);
    const {estatesLikes: [estatesLikes, ], addLike} = useContext(EstatesContext);
    
    const currentEstate = estatesLikes.find( estate => estate.estateId === props.id);

    let likesNumber = 0;
    if(currentEstate) likesNumber = currentEstate.likes.length;

    let didUserLike = userData.id && currentEstate && currentEstate.likes.includes(userData.id)
        ? { color: '#f53939' }
        : null

    const showFields = {
        city: props.city,
        address: props.address,
        price: props.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    };

    const likeEstate = useCallback(() => {
        if(isLoggedIn && userData.id) {
            const estateId = props.id;
            const userId = userData.id;

            currentEstate.likes.includes(userId) 
                ?  setStatus('You have already liked that post')
                :  addLike(estateId, userId);

        } else setStatus('You have to be logged in to like posts');
    },[isLoggedIn, userData.id, props.id]);

    const isUsers = useCallback((login, user) => {
        if(!!login === false) return true
        else if (login && user.id !== props.owner) return true
        else return false
    },[props.owner]);

    return (
        <MyCard title={props.title}>
            <StyledMediaWrapper images={props.file}>
                <Image url={props.file[0]} />
            </StyledMediaWrapper>
            <Divider light />
            <CardContent>
                    <CardFields data={showFields}  nowrap="true"/>
            </CardContent>
            <CardActionsWrapper>
                <Btn primary="true" shadow="true" upc="true" small="true" as={Link} to={`/estates/${props.id}`}>
                    View details
                </Btn>
                <CardActionsBlock>
                    { 
                        isUsers(isLoggedIn, userData) && 
                            <>
                                <Btn small="true" title="Like this post" onClick={likeEstate}>
                                    <Number>{likesNumber}</Number>
                                    <FavoriteIcon style={didUserLike} />
                                </Btn>
                                {   props.email 
                                        ?   <Btn small="true" upc="true" title="E-mail user">
                                                <a href={'mailto:' + props.email}>e-mail</a>
                                            </Btn>
                                        :   <Btn small="true" upc="true" disabled={true}>
                                                email
                                            </Btn> }
                                {   props.phone 
                                        ?   <Btn small="true" upc="true" title="Call user">
                                                <a href={'tel:' + props.phone}>tel</a>
                                            </Btn>
                                        :   <Btn small="true" upc="true" disabled>
                                                tel
                                            </Btn> }
                            </> 
                    }
                </CardActionsBlock>
            </CardActionsWrapper>
        </MyCard>
     );
});
 
export default EstateCard;

EstateCard.propTypes = {
    estatesLikes: PropTypes.array,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    file: PropTypes.arrayOf(PropTypes.string)
}