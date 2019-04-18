import React from "react";
import PropTypes from 'prop-types';

const TimeFormat = function ({ value }) {
    const hour = value.getHours();
    const hour12 = hour > 11 ? hour - 11 : hour + 1;
    const amOrPm = hour > 11 ? 'PM' : 'AM';

    return <>{hour12}:{value.getMinutes()} {amOrPm}</>;
};

TimeFormat.propTypes = {
    value: PropTypes.object,
};

export default TimeFormat;