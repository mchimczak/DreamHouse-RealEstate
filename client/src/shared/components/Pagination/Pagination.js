import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.ul`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 2rem;
`
const PageBox = styled.li`
display: flex;
align-items: center;
justify-content: center;
padding: 1rem 2rem;
border: 1px solid #bbb;
cursor: pointer;
transition: .2s ease-in;

&:hover {
    background-color: ${({theme}) => theme.colors.black};
    color: ${({theme}) => theme.colors.white};
}
`

const Pagination = ({totalPosts, postsPerPage, selectPage}) => {
    const pageNumbers = [];
    
    for( let i = 1; i <= Math.ceil(totalPosts / +postsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <div>
            <PageWrapper> 
                { pageNumbers.map( number => (
                    <PageBox key={number} onClick={() => selectPage(number)}>
                        {number}
                    </PageBox>
                )) } 
            </PageWrapper>
        </div>
    )
};

export default Pagination;
