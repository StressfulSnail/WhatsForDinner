import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import RecoverAccountForm from "../../components/RecoverAccountForm";
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

class AccountRecoveryPage extends React.Component {
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
        const { email } = values;
        console.log(email)
        AccountService.recoverAccount(email)
            .then( () => {
                this.setState({
                    resultsOpen: true,
                    error: false,
                    resultsHeader: "Account Found",
                    resultsMessage: "Check your email address for account for temporary password"
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
                    <RecoverAccountForm onSubmit={this.submit}/>
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

AccountRecoveryPage.propTypes = {
    classes: PropTypes.object.isRequired
};



export default withStyles(styles)(AccountRecoveryPage);