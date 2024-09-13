import PropType from 'prop-types'
import ReactPaginate from 'react-paginate';

import './styles.scss'

const Pagination = ({ handlePageClick, totalPages, page }) => {
    return (
        <ReactPaginate className='pagination-section'
            breakLabel="..."
            nextLabel={"»"}
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            pageCount={totalPages}
            previousLabel={"«"}
            renderOnZeroPageCount={null}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            previousClassName={page === 1 ? 'page-item disabled' : 'page-item'}
            previousLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
        />
    )
}

Pagination.propTypes = {
    handlePageClick: PropType.func,
    totalPages: PropType.number,
    page: PropType.number
}

export default Pagination