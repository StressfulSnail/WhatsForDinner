import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AccountForm from "../../components/CreateAccountForm";
import AccountService from "../../services/accountService";
import SuccessOrErrorDialog from "../../components/common/SuccessOrErrorDialogue";

const styles = (theme) => ({
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    input: {
        margin: theme.spacing.unit
    }
});

// Avoid properties collisions
const HomeLink = props => <Link to="/" {...props} />;

class CreateAccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsOpen: false,
            error: false,
            resultsHeader: "",
            resultsMessage: ""
        }
    }

    handleClose = () => {
      this.setState({
          resultsOpen: false,
      });
    };

    submit = (values) => {
        const { username, password, email, firstName, lastName, middleName } = values;
        AccountService.createAccount(username, password, email, firstName, lastName, middleName)
            .then( () => {
                this.setState({
                    resultsOpen: true,
                    error: false,
                    resultsHeader: "Account created",
                    resultsMessage: "Your account has been created!\nCheck your email account for an activation email"
                });
            })
            .catch( (error) => {
                this.setState({
                    resultsOpen: true,
                    error: true,
                    resultsHeader: "Error",
                    resultsMessage: error.message
                });
            });
    };

    render() {

        const { classes } = this.props;
        const { resultsOpen, error, resultsHeader, resultsMessage } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Create Account!
                        </Typography>
                        <Button color="inherit" component={HomeLink}>
                            Home
                        </Button>
                    </Toolbar>
                </AppBar>
                <Paper>
                    <AccountForm onSubmit={this.submit}/>
                </Paper>
                <SuccessOrErrorDialog
                    open={resultsOpen}
                    error={error}
                    resultsHeader={resultsHeader}
                    resultsMessage={resultsMessage}
                    handleClose={this.handleClose}
                />
            </div>
        );
    }
}

CreateAccountPage.propTypes = {
    classes: PropTypes.object.isRequired
};



export default withStyles(styles)(CreateAccountPage);