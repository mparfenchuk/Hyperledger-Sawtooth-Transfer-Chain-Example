import React from 'react';
import { reduxForm, Field } from 'redux-form';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import validate from './validation'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    icon: {
      marginRight: theme.spacing.unit,
    },
    fab: {
        marginTop: theme.spacing.unit * 2,
    },
});

const renderField = ({ input, label, placeholder, meta: { touched, error }, ...custom }) => (
  <TextField
      required
      label={label}
      type="text"
      fullWidth={true}
      placeholder={placeholder}
      error={touched && error && true}
      helperText={touched && error}
      margin="normal"
      variant="outlined"
      {...input}
      {...custom}
  />
)

const renderDescField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
        required
        label={label}
        multiline
        rowsMax="8"
        helperText={touched && error}
        fullWidth={true}
        error={touched && error && true}
        margin="normal"
        variant="outlined"
        {...input}
        {...custom}
    />
  )

const CreateNewAssetForm = ({ classes, handleSubmit, pristine, submitting, invalid }) => (
    <form autoComplete="off" onSubmit={handleSubmit}>
        <Field 
            name="name" 
            component={renderField}
            placeholder="@name"
            label="Channel name"
        />
        <Field 
            name="description" 
            component={renderDescField}
            label="Description"
        />
        <Fab 
            type="submit" 
            variant="extended" 
            aria-label="Add"
            className={classes.fab}
            disabled={pristine || submitting || invalid}
        >
            <AddIcon className={classes.icon} />
            <b>Post channel</b>
        </Fab>
    </form>
)

export default reduxForm({
    form: 'CreateNewAssetForm',
    validate
})(withStyles(styles)(CreateNewAssetForm))