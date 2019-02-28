import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { changeAssetsPage, changeAssetsRowsPerPage } from './ducks/actions';
import { getAsset } from '../home/ducks/actions';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import NavigationIcon from '@material-ui/icons/Navigation';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import TablePaginationActions from '../app/components/TablePaginationActions';
import Form from './components/Form';

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
    paper: {
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 3,
    },
    createGrid: {
        textAlign: 'center'
    },
    icon: {
        marginRight: theme.spacing.unit,
    },
    fab: {
        margin: theme.spacing.unit * 2,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});


class AddressPage extends Component {
    
    state = {
        open: false,
        openAsset: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleClickOpenAsset = (asset) => {
        let { getAsset } = this.props;

        getAsset(asset);
        this.setState({ openAsset: true });
    };

    handleCloseAsset = () => {
        this.setState({ openAsset: false });
    };

    handleChangeAssetsPage = (event, page) => {
        let { changeAssetsPage } = this.props;
        changeAssetsPage(page);
    };
    
    handleChangeAssetsRowsPerPage = event => {
        let { changeAssetsRowsPerPage } = this.props;
        changeAssetsRowsPerPage(Number(event.target.value));
    };

    render() {

        const { classes, assets, asset, assetsPage, assetsRowsPerPage, match, user, recipients, update, transfers } = this.props;
        const emptyAssetsRows = assetsRowsPerPage - Math.min(assetsRowsPerPage, assets.length - assetsPage * assetsRowsPerPage);

        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <Typography gutterBottom className={classes.title} variant="h5">
                        {match.params.address}
                    </Typography>
                    <Grid 
                        container 
                        spacing={16}
                    >
                        <Grid xs={12} sm={12} md={3} className={classes.createGrid} item>
                            <Fab variant="extended" aria-label="Add" className={classes.fab} component={Link} to={{pathname: '/new-asset', user}}>
                                <AddIcon className={classes.icon} />
                                <b>Create new asset</b>
                            </Fab>
                            <Fab variant="extended" aria-label="Add" className={classes.fab} onClick={this.handleClickOpen}>
                                <NavigationIcon className={classes.icon} />
                                <b>Transfer asset</b>
                            </Fab>
                            <Typography gutterBottom variant="h6">
                                Transfers
                            </Typography>
                            {transfers.length === 0 && (
                                <Typography gutterBottom>
                                    No transfers
                                </Typography>
                            )}
                            {transfers.map((transfer, index) => 
                                <Paper className={classes.paper} key={index}>
                                    <Typography gutterBottom>
                                        {transfer.asset}
                                    </Typography>
                                    <Button onClick={() => update(user.private, 'accept', transfer.asset)} color="primary">
                                        Accept
                                    </Button>
                                    <Button onClick={() => update(user.private, 'reject', transfer.asset)} color="secondary">
                                        Reject
                                    </Button>
                                </Paper>
                            )}
                        </Grid>
                        <Grid xs={12} sm={12} md={9} item>
                            <Paper className={classes.paper}>
                                <div className={classes.tableWrapper}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell numeric padding="dense">
                                                    <Typography color="textSecondary">
                                                        #
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary">
                                                        Asset
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary">
                                                        Owner
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {assets.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={3}>
                                                        <Typography>
                                                            No assets
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            {assets.slice(assetsPage * assetsRowsPerPage, assetsPage * assetsRowsPerPage + assetsRowsPerPage).map((asset, index) => (
                                                <TableRow key={index}>
                                                    <TableCell numeric padding="dense">
                                                        <Typography>
                                                            {(index + 1) + assetsPage * assetsRowsPerPage}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography component={Button} onClick={() => this.handleClickOpenAsset(asset.name)}>
                                                            {asset.name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>
                                                            {asset.owner}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {emptyAssetsRows > 0 && (
                                                <TableRow style={{ height: 48 * emptyAssetsRows }}>
                                                    <TableCell />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10]}
                                                    count={assets.length}
                                                    rowsPerPage={assetsRowsPerPage}
                                                    page={assetsPage}
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                    onChangePage={this.handleChangeAssetsPage}
                                                    onChangeRowsPerPage={this.handleChangeAssetsRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Select recipient and asset</DialogTitle>
                    <Form handleClose={this.handleClose} recipients={recipients} assets={assets} onSubmit={(values) => update(user.private, 'transfer', values.asset, values.recipient)} />
                </Dialog>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.openAsset}
                    onClose={this.handleCloseAsset}
                >
                    <DialogTitle>Telegram channel info</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Name: <b>{asset.name}</b>
                        </Typography>
                        <Typography>
                            Description: <b>{asset.description}</b>
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseAsset} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    const transfers = _.filter(state.app.transfers, (transfer) => transfer.owner === ownProps.match.params.address);
    const recipients = _.filter(state.app.keys, (key) => key.public !== ownProps.match.params.address);
    const assets = _.filter(state.app.assets, (asset) => asset.owner === ownProps.match.params.address);
    const user = _.find(state.app.keys, { public: ownProps.match.params.address });

    return {
        transfers: transfers,
        recipients: recipients,
        assets: assets,
        user: user,
        asset: state.app.asset,
        assetsPage: state.address.addressPage,
        assetsRowsPerPage: state.address.addressRowsPerPage
    }
    
}

export default connect(
    mapStateToProps,
    {
        changeAssetsPage,
        changeAssetsRowsPerPage,
        getAsset,
        update: (key, action, asset, owner) => ({type:"SUBMIT_UPDATE",  action: action, owner: owner, object: asset, privateKey: key, formId: "TransferAssetForm" })
    }
)(withStyles(styles)(AddressPage));