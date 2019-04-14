import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/index';
import PlanCalendarDay from "./PlanCalendarDay";
import {withStyles} from "@material-ui/core";

const isSameDay = (date1, date2) => {
    return date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate() &&
        date1.getFullYear() === date2.getFullYear();
};

const createCalendarDay = (meals) => (date, index) =>
    <Grid item xs={12} md={12} lg={1} key={index}>
        <PlanCalendarDay date={date}
                         meals={meals.filter(meal => isSameDay(date, meal.dateTime))}/>
    </Grid>;

const styles = {
    calendar: {
        paddingLeft: '1em',
        paddingRight: '1em',
    },
    bottomWeek: {
        marginTop: '5px',
    },
};

const PlanCalendar = function (props) {
    const { classes, meals, startDate, endDate } = props;
    // create array of Date objects for each day between start and end dates
    const dates = [];
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
    }

    return <div className={classes.calendar}>
        <Grid container spacing={8} justify="center">
            {dates.splice(0, 7).map(createCalendarDay(meals))}
        </Grid>
        <Grid container spacing={8} justify="center" className={classes.bottomWeek}>
            {dates.map(createCalendarDay(meals))}
        </Grid>
    </div>
};

PlanCalendar.propTypes = {
    meals: PropTypes.array,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
};

export default withStyles(styles)(PlanCalendar);