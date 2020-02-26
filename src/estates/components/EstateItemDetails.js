import React, {useState} from 'react';
import styled from 'styled-components';

import Button from '../../shared/components/Button/Button';
import Modal from '../../shared/components/Modal/Modal';

const ActionsWrapper = styled.div`
display: flex;
flex-direction: row;
width: 100%;
margin-top: 1rem;
`

const EstateItemDetails = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(prevState => !prevState);

    return ( 
        <div>
            <p>ID: {props.id}</p>
            <p>TITLE: {props.title}</p>
            <p>DESCRIPTION: {props.description}</p>
            <p>IMAGE: {props.image}</p>
            <p>ADDRESS: {props.address}</p>
            <p>LOCATION: {props.location.lat}, {props.location.lng}</p>
            <p>CREATOR{props.creator}</p>
            <ActionsWrapper>
                <Button onClick={toggleModal}>View on map</Button>
                <Button>EDIT</Button>
                <Button>DELETE</Button>
            </ActionsWrapper>
            { isOpen && 
                <Modal 
                    isOpen={isOpen} 
                    toggleModal={toggleModal}
                    title={props.title}
                    description={props.description}
                    address={props.address}
                >
                    <div>map</div>
                </Modal>
            }
        </div>
     );
}
 
export default EstateItemDetails;