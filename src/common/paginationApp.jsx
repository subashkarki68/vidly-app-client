import React from "react";
import Pagination from "react-bootstrap/Pagination";
import _ from "lodash";
import PropTypes from "prop-types"; // ES6

function PaginationApp({ itemsCount, pageSize, activePage, onPageChange }) {
  const pageNumbers = _.range(1, Math.ceil(itemsCount / pageSize) + 1);

  return (
    <Pagination>
      {pageNumbers.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === activePage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}

PaginationApp.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationApp;
