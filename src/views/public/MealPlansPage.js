import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {LOADING_COMPLETE, LOADING_STARTED} from "../../actions/mainActions";
import mealPlanService from "../../services/mealPlanService";
import {CREATE_MEAL_PLAN, LOAD_MEAL_PLANS} from "../../actions/mealPlanActions";
import DateFormat, {dateFormat, inputDateToDateObject} from "../../components/common/DateFormat";
import { Link } from 'react-router-dom';
import CreateMealPlanModal from "../../components/mealPlans/CreateMealPlanModal";

const styles = {
    grid: {
        padding: '10px',
    }
};

class MealPlansPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visiblePlans: this.props.mealPlans,
            createMealPlanOpen: false,
            createError: false,
        }
    }

    componentDidMount() {
        const { token, mealPlans, loadingStart, loadingComplete, loadMealPlans } = this.props;
        if (mealPlans.length < 1) {
            loadingStart();
            mealPlanService.getMealPlans(token)
                .then((mealPlans) => {
                    loadingComplete();
                    loadMealPlans(mealPlans);
                    this.setState({ visiblePlans: mealPlans });
                })
                .catch(console.err);
        }
    }

    searchPlans = (event) => {
        const searchText = event.target.value;
        this.setState({
            visiblePlans: this.props.mealPlans.filter(meal => meal.name.indexOf(searchText) > -1),
        });
    };

    openCreateModal = () => this.setState({ createMealPlanOpen: true });
    closeCreateModal = () => this.setState({ createMealPlanOpen: false });

    createMealPlan = ({ startDate, endDate }) => {
        const startDateObj = inputDateToDateObject(startDate);
        const endDateObj = inputDateToDateObject(endDate);
        const name = `Meal Plan for ${dateFormat(startDateObj)} to ${dateFormat(endDateObj)}`;

        const mealPlan = {
            name: name,
            startDate: startDateObj,
            endDate: endDateObj,
        };

        this.props.loadingStart();
        mealPlanService.createMealPlan(this.props.token, mealPlan)
            .then((mealPlanId) => {
                this.props.createPlan({ id: mealPlanId, ...mealPlan });
                this.props.history.push(`/meal-plans/${mealPlanId}`);
                this.props.loadingComplete();
            })
            .catch((err) => {
                this.props.loadingComplete();
                console.error(err);
                this.setState({ createError: true });
            });
    };

    render() {
        const { classes } = this.props;
        const { visiblePlans } = this.state;
        // sorting by newest end date to oldest end date
        visiblePlans.sort((plan1, plan2) => plan2.endDate - plan1.endDate);
        return <div>
            <CreateMealPlanModal open={this.state.createMealPlanOpen}
                                 onSave={this.createMealPlan}
                                 onCancel={this.closeCreateModal}
                                 error={this.state.createError}/>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Meal Plans
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid container spacing={24} className={classes.grid} justify="center" alignItems="center">
            <Grid item xs={12} md={10}>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            id="search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                maxLength: 50,
                            }}
                            onChange={this.searchPlans}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <div align="right">
                            <Button color="primary"
                                    variant="contained"
                                    onClick={this.openCreateModal}>NEW MEAL PLAN</Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={10}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Start Date</TableCell>
                                <TableCell align="right">End Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visiblePlans.map(plan =>
                                (<TableRow key={plan.id}>
                                    <TableCell component="th" scope="row">
                                        {plan.name}
                                    </TableCell>
                                    <TableCell align="right"><DateFormat value={plan.startDate} /></TableCell>
                                    <TableCell align="right"><DateFormat value={plan.endDate} /></TableCell>
                                    <TableCell align="right">
                                        <Button color="primary"
                                                component={Link}
                                                to={`/meal-plans/${plan.id}`}>VIEW</Button>
                                        <Button color="secondary">DELETE</Button>
                                    </TableCell>
                                </TableRow>))
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
            </Grid>
        </div>
    }
}

MealPlansPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        token: state.account.token,
        mealPlans: state.mealPlans.plans,
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        loadingStart: () => dispatch({ type: LOADING_STARTED }),
        loadingComplete: () => dispatch({ type: LOADING_COMPLETE }),
        loadMealPlans: (plans) => dispatch({ type: LOAD_MEAL_PLANS, payload: { plans } }),
        createPlan: (plan) => dispatch({ type: CREATE_MEAL_PLAN, payload: { plan } }),
    }
};

const connected = connect(mapStateToProps, mapActionsToProps)(MealPlansPage);
export default withStyles(styles)(connected);