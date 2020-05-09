import React from 'react';
import PropTypes from 'prop-types';

import { PageWrapper, PageBox, NextPrevBox} from './Pagination.styles';

const Pagination = ({totalPosts, postsPerPage, currentPage, selectPage}) => {
  let pageNumbers = [];
  let pagesPattern = null;
  
  for ( let i = 1; i <= Math.ceil(totalPosts / +postsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (totalPosts <= +postsPerPage) selectPage('1');

  let pages = pageNumbers.length;
  switch (true) {
      case pages < 5:
        pagesPattern = [...pageNumbers.map((_, i) => i + 1)];
        break;
      case +currentPage < 4:
        pagesPattern = [1, 2, 3, 4, 5, "...", pages];
        break;
      case +currentPage > pages - 4:
        pagesPattern = [1, "...", pages - 4, pages - 3, pages - 2, pages - 1, pages];
        break;
      default:
        pagesPattern = [1, "...", +currentPage - 1, +currentPage, +currentPage + 1, "...", pages];
  }

  const changePage = (page) => {
      if(page === '...') return 
      if(+page <= 0) page = '1'
      if(+page > pages ) return
      if(typeof page !== 'string') page = `${page}`
      return selectPage(page)
  }
    
  return (
      <PageWrapper> 
          <NextPrevBox 
            title={+currentPage-1} 
            onClick={() => changePage(+currentPage - 1)}
          > 
            &lang; 
          </NextPrevBox>
            { 
              pagesPattern.map( (number, index) => (
                  <PageBox 
                    key={`${number}-${index}`} 
                    active={+number === +currentPage ? 'true' : null} 
                    onClick={() => changePage(number)}
                  >
                    {number}
                  </PageBox>
              ))
            } 
          <NextPrevBox 
            title={+currentPage+1} 
            onClick={() => changePage(+currentPage + 1)}
          >
            &rang; 
          </NextPrevBox>
      </PageWrapper>
  )
};

export default Pagination;

Pagination.propTypes = {
    totalPosts: PropTypes.number.isRequired,
    postsPerPage: PropTypes.string.isRequired,
    currentPage: PropTypes.string.isRequired,
    selectPage: PropTypes.func.isRequired
  };