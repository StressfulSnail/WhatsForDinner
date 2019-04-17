import React from 'react';
import PropTypes from 'prop-types';

export const dateFormat = (value) => {
    const date = value instanceof Date ? value : new Date(value);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

/**
 * changes yyyy-mm-dd to a Date object with correct time zone
 * @param inputText - yyyy-mm-dd
 * @returns {Date}
 */
export const inputDateToDateObject = (inputText) => {
    const offset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.parse(inputText) + offset);
};

const DateFormat = function (props) {
    const { value } = props;
    return <>{dateFormat(value)}</>;
};

DateFormat.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};

export default DateFormat;