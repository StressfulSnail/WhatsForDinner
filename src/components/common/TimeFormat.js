import React from "react";
import PropTypes from 'prop-types';

const TimeFormat = function ({ value }) {
    const hour = value.getHours();
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const amOrPm = hour > 11 ? 'PM' : 'AM';
    const mins = value.getMinutes().toString().length === 1 ? `0${value.getMinutes()}` : value.getMinutes();

    return <>{hour12}:{mins} {amOrPm}</>;
};

TimeFormat.propTypes = {
    value: PropTypes.object,
};

export default TimeFormat;