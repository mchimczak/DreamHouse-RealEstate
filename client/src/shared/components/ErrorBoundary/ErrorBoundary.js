import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../Button/Button';
import Wrong from '../../../img/wrong.png';

const SvgWrapper = styled.div`
position: absolute;
width: 100vw;
top: 50%;
transform: translateY(-50%);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

& > img {
    width: 60%;
    height: 50%;
    object-fit: contain;
    margin-bottom: 4rem;

    ${({theme}) => theme.media.tablet} {
    height: 300px;
    }
}
`

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: false, hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error: error })
    }
      

    render() {
        if (this.state.hasError || this.state.error) {
            return (
                <SvgWrapper>
                    <img src={Wrong} alt=""/>
                    <Button 
                        onClick={() => window.location.reload()} 
                        primary="true"
                        square="true"
                        small="true"
                        shadow="true"
                    >
                        Refresh
                    </Button>
                </SvgWrapper>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary;