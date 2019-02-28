import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getKeys, createKey, changeKeysPage, changeKeysRowsPerPage, changeAssetsPage, changeAssetsRowsPerPage, getAsset } from './ducks/actions';

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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import TablePaginationActions from '../app/components/TablePaginationActions';

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
    addIcon: {
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

class HomePage extends Component {
    
    state = {
        open: false,
    };

    componentDidMount() {
        const { getKeys } = this.props;
        getKeys();
    }

    handleClickOpen = (asset) => {
        let { getAsset } = this.props;

        getAsset(asset);
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangeKeysPage = (event, page) => {
        let { changeKeysPage } = this.props;
        changeKeysPage(page);
    };
    
    handleChangeKeysRowsPerPage = event => {
        let { changeKeysRowsPerPage } = this.props;
        changeKeysRowsPerPage(Number(event.target.value));
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

        const { classes, keys, assets, asset, createKey, keysPage, keysRowsPerPage, assetsPage, assetsRowsPerPage } = this.props;

        const emptyKeysRows = keysRowsPerPage - Math.min(keysRowsPerPage, keys.length - keysPage * keysRowsPerPage);
        const emptyAssetsRows = assetsRowsPerPage - Math.min(assetsRowsPerPage, assets.length - assetsPage * assetsRowsPerPage);

        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <Typography gutterBottom className={classes.title} variant="h3">
                        Telegram channels exchange
                    </Typography>
                    <Grid 
                        container 
                        spacing={16}
                    >
                        <Grid xs={12} sm={12} md={3} className={classes.createGrid} item>
                            <Fab variant="extended" aria-label="Add" className={classes.fab} onClick={createKey}>
                                <AddIcon className={classes.addIcon} />
                                <b>Create new address</b>
                            </Fab>
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
                                                        Choose address below
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {keys.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={2}>
                                                        <Typography>
                                                            No addresses
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            {keys.slice(keysPage * keysRowsPerPage, keysPage * keysRowsPerPage + keysRowsPerPage).map((key, index) => (
                                                <TableRow key={key.public}>
                                                    <TableCell numeric padding="dense">
                                                        <Typography>
                                                            {(index + 1) + keysPage * keysRowsPerPage}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography component={Link} to={key.public}>
                                                            {key.public}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {emptyKeysRows > 0 && (
                                                <TableRow style={{ height: 48 * emptyKeysRows }}>
                                                    <TableCell />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    rowsPerPageOptions={[5, 10]}
                                                    count={keys.length}
                                                    rowsPerPage={keysRowsPerPage}
                                                    page={keysPage}
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                    onChangePage={this.handleChangeKeysPage}
                                                    onChangeRowsPerPage={this.handleChangeKeysRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            </Paper>
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
                                                        <Typography component={Button} onClick={() => this.handleClickOpen(asset.name)}>
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
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    keys: state.app.keys,
    assets: state.app.assets,
    asset: state.app.asset,
    keysPage: state.app.keysPage,
    keysRowsPerPage: state.app.keysRowsPerPage,
    assetsPage: state.app.assetsPage,
    assetsRowsPerPage: state.app.assetsRowsPerPage
})

export default connect(
    mapStateToProps,
    {
        getKeys, 
        createKey, 
        getAsset, 
        changeKeysPage, 
        changeAssetsPage, 
        changeKeysRowsPerPage, 
        changeAssetsRowsPerPage
    }
)(withStyles(styles)(HomePage));