import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CreateNewAssetForm from './components/Form';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    title: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 6,
    },
});

class NewAssetPage extends Component {
    
    render() {

        const { classes, location: { user }, update } = this.props;
        
        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <Typography gutterBottom className={classes.title} variant="h3">
                        Enter your telegram channel
                    </Typography>
                    <Grid 
                        container 
                        spacing={16}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid xs={12} sm={9} md={6} item>
                            <CreateNewAssetForm onSubmit={(values) => update(user.private, 'create', values)}/>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export default connect(
    null,
    {
        update: (key, action, values, owner) => ({type:"SUBMIT_UPDATE", action: action, owner: owner, object: values, privateKey: key, formId: "CreateNewAssetForm" })
    }
)(withStyles(styles)(NewAssetPage));