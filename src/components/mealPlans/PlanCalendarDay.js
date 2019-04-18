import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, Typography, withStyles} from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import InputIcon from '@material-ui/icons/Input';
import TimeFormat from "../common/TimeFormat";

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];
const sortMeals = (meal1, meal2) => meal1.dateTime - meal2.dateTime;

const styles = {
    card: {
        height: '100%',
    },
    mealItem: {
        marginTop: '-1em',
    },
    mealInfo: {
        marginTop: '-1.5em',
        marginBottom: '2em',
    },
    mealInfoItem: {
        marginTop: '-1em',
    },
    icon: {
        position: 'absolute',
        marginLeft: '5px',
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
            { meals.sort(sortMeals).map((meal, index) =>
                <div key={index}>
                    <h5>
                        <TimeFormat value={meal.dateTime} /> <InputIcon fontSize="small"
                                                                        className={classes.icon}
                                                                        onClick={() => props.onMealEdit(meal)} />
                    </h5>
                    <Typography variant="caption" className={classes.mealInfo} >
                        <p className={classes.mealInfoItem} >Serving: {meal.servingsRequired}</p>
                        { meal.note ? <p className={classes.mealInfoItem} >Note: {meal.note}</p> : '' }
                    </Typography>
                    { meal.recipes.map((recipe, index) =>
                        <p className={classes.mealItem} key={index}> {/* TODO link to recipe */}
                            - {recipe.name} <DeleteOutlinedIcon color="secondary"
                                                                className={classes.icon}
                                                                onClick={() => props.onRecipeDelete(meal, recipe.id)} />
                        </p>
                    )}
                </div>
            )}
        </CardContent>
    </Card>
};

PlanCalendarDay.propTypes = {
    date: PropTypes.object,
    meals: PropTypes.array,
    onRecipeDelete: PropTypes.func,
    onMealEdit: PropTypes.func,
};

export default withStyles(styles)(PlanCalendarDay);