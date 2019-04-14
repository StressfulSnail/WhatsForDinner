import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, Typography, withStyles} from "@material-ui/core";
import TimeFormat from "../common/TimeFormat";

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

const styles = {
    card: {
        height: '100%',
    },
    mealItem: {
        marginTop: '-1em',
    },
};

const PlanCalendarDay = function (props) {
    const { classes, date, meals } = props;
    return <Card className={classes.card}>
        <CardContent>
            <Typography color="textSecondary">
                {daysOfWeek[date.getDay()]} {date.getMonth() + 1}/{date.getDate()}
            </Typography>
            { meals.length === 0 ? <p>There are no meals created for today!</p> : '' }
            { meals.map((meal, index) =>
                <div key={index}>
                    <h5><TimeFormat value={meal.dateTime} /></h5>
                    { meal.recipes.map((recipe, index) =>
                        <p className={classes.mealItem} key={index}>- {recipe.name}</p>) } {/* TODO link to recipe */}
                </div>
            )}
        </CardContent>
    </Card>
};

PlanCalendarDay.propTypes = {
    date: PropTypes.object,
    meals: PropTypes.array,
};

export default withStyles(styles)(PlanCalendarDay);