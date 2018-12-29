import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Close from '@material-ui/icons/Close';
import {object} from 'prop-types';
import React, {Component} from 'react';
import {RouteContext} from '../providers/route-context-provider';
import {entryCategories, entryCategoryType, entryFields, entryType, getDefaultEntry} from '../../../schema/state/entry';
import {addNewEntry} from '../utils/path';
import {Page} from './page';

const getUpdatedEntry = (_entry, _field, _value) => {
    let entry = _entry;
    let value = _value;

    if (_field === entryFields.category) {
        entry = _entry.updateField(entryFields.type, _value === entryCategoryType.income ? entryType.credit : entryType.debit);
    } else if (_field === entryFields.type) {
        value = _value ? entryType.credit : entryType.debit;
    }

    return entry.updateField(_field, value);
};

const styles = theme => ({
    fillWidth: {width: '100%'},
    flex: {flex: 1},
    padContent: {padding: theme.spacing.unit * 3}
});

class _AddEntry extends Component {
    state = {entry: getDefaultEntry()};

    handleClose = history => () => history.goBack();
    handleNumberChange = field => event => this.updateEntry(field, parseFloat(parseFloat(event.target.value).toFixed(2)));
    handleTextChange = field => event => this.updateEntry(field, event.target.value);
    handleToggleChange = field => (event, isCredit) => this.updateEntry(field, isCredit);

    updateEntry = (field, value) => this.setState({entry: getUpdatedEntry(this.state.entry, field, value)});

    render() {
        const {entry} = this.state;
        const isCreditPreselected = entry.category !== entryCategoryType.miscellaneous;
        const validations = entry.getValidations();

        return (
            <Page title='Add New Entry'>
                <RouteContext.Consumer>
                    {
                        ({history, location}) =>
                            <Dialog
                                fullScreen
                                open={location.pathname === addNewEntry}
                                onClose={this.handleClose(history)}
                            >
                                <AppBar position='static'>
                                    <Toolbar>
                                        <IconButton color='inherit' onClick={this.handleClose(history)}>
                                            <Close/>
                                        </IconButton>
                                        <Typography color='inherit' className={this.props.classes.flex} variant='title'>
                                            Add New Entry
                                        </Typography>
                                        <Button color='inherit' disabled={!validations.all} onClick={this.handleClose(history)}>
                                            Save
                                        </Button>
                                    </Toolbar>
                                </AppBar>
                                <main className={this.props.classes.padContent}>
                                    <FormControl className={this.props.classes.fillWidth}>
                                        <TextField
                                            autoFocus
                                            label='Reason'
                                            margin='normal'
                                            onChange={this.handleTextChange(entryFields.reason)} value={entry.reason}
                                            error={!validations.reason}
                                            required
                                        />
                                    </FormControl>
                                    <FormControl className={this.props.classes.fillWidth}>
                                        <TextField
                                            select
                                            error={!validations.category}
                                            value={entry.category}
                                            label='Category'
                                            margin='normal'
                                            required
                                            onChange={this.handleTextChange(entryFields.category)}
                                        >
                                            {
                                                Object.entries(entryCategories)
                                                    .map(([value, label]) =>
                                                        <MenuItem key={value} value={value}>{label}</MenuItem>
                                                    )
                                            }
                                        </TextField>
                                    </FormControl>
                                    {
                                        isCreditPreselected ?
                                            <FormHelperText>
                                                {entryCategories[entry.category]} is a {entry.type}
                                            </FormHelperText> :
                                            <FormHelperText>
                                                Select Credit or Debit
                                            </FormHelperText>
                                    }
                                    <FormControlLabel
                                        disabled={isCreditPreselected}
                                        control={<Switch/>}
                                        label='Credit'
                                        checked={entry.type === entryType.credit}
                                        onChange={this.handleToggleChange(entryFields.type)}
                                    />
                                    <FormControl className={this.props.classes.fillWidth}>
                                        <TextField
                                            error={!validations.amount}
                                            value={entry.amount}
                                            label='Amount'
                                            margin='normal'
                                            onChange={this.handleNumberChange(entryFields.amount)}
                                            type='number'
                                            required
                                        />
                                    </FormControl>
                                </main>
                            </Dialog>
                    }
                </RouteContext.Consumer>
            </Page>
        );
    }
}

_AddEntry.propTypes = {classes: object.isRequired};

export const AddEntry = withStyles(styles)(_AddEntry);
