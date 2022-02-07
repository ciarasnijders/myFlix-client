import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';
import './visibility-filter-input.scss';

function VisibilityFilterInput(props) {
    return <Form.Control className="searchbar"
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Search for movie..."
        variant="light" 
    />;
}

// const mapStateToProps = ({visibilityFilter}) => ({
//     visibilityFilter
// });

// export default connect(mapStateToProps)(VisibilityFilterInput);

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);