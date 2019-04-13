import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, Typography} from "@material-ui/core";

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

const PlanCalendarDay = function (props) {
    const { date, meals } = props;
    return <Card>
        <CardContent>
            <Typography color="textSecondary">
                {daysOfWeek[date.getDay()]} {date.getMonth() + 1}/{date.getDate()}
            </Typography>
            { meals.length === 0 ? 'There are no meals created for today!' : '' }
            { meals.map((meal, index) =>
                <div key={index}>
                    <h5>{ meal.dateTime + '' }</h5>
                    { meal.recipes.map((recipe, index) => <p key={index}>- {recipe.name}</p>) }
                </div>
            )}
        </CardContent>
    </Card>
};

PlanCalendarDay.propTypes = {
    date: PropTypes.object,
    meals: PropTypes.array,
};

export default PlanCalendarDay;