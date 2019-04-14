import React from 'react';
import PropTypes from 'prop-types';

const DateFormat = function (props) {
    const { value } = props;
    const date = value instanceof Date ? value : new Date(value);
    return <>{`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}</>;
};

DateFormat.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};

export default DateFormat;