import React from 'react';
import { reduxForm, Field } from 'redux-form';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import validate from './validation'

import { withStyles } from '@material-ui/core/styles';

import AssetsAutosuggest from './fields/AssetsAutosuggest';
import RecipientsAutosuggest from './fields/RecipientsAutosuggest';

const styles = theme => ({
    icon: {
      marginRight: theme.spacing.unit,
    },
    fab: {
        marginTop: theme.spacing.unit * 2,
    },
});

const TransferAssetForm = ({ classes, handleSubmit, pristine, submitting, invalid, handleClose, recipients, assets }) => (
    <form autoComplete="off" onSubmit={handleSubmit}>
    <DialogContent>
        <Field 
            name="recipient" 
            component={RecipientsAutosuggest}
            suggestions={recipients}
        />
        <Field 
            name="asset" 
            component={AssetsAutosuggest}
            suggestions={assets}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
        </Button>
        <Button type="submit" color="primary" disabled={pristine || submitting || invalid}>
            Submit
        </Button>
    </DialogActions>
    </form>
)

export default reduxForm({
    form: 'TransferAssetForm',
    validate,
})(withStyles(styles)(TransferAssetForm))