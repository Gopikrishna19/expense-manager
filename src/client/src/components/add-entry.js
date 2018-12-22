import Button from '@material-ui/core/es/Button/Button';
import FormHelperText from '@material-ui/core/es/FormHelperText/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import {object} from 'prop-types';
import React, {Component} from 'react';
import {entryCategories, entryCategoryType, entryFields, entryType, getDefaultEntry} from '../state/entry';
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

const styles = () => ({fillWidth: {width: '100%'}});

class _AddEntry extends Component {
    state = {entry: getDefaultEntry()};

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
                <FormControl className={this.props.classes.fillWidth}>
                    <TextField
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
                <Button variant='contained' color='primary' disabled={!validations.all}>
                    Add Entry
                </Button>
            </Page>
        );
    }
}

_AddEntry.propTypes = {classes: object.isRequired};

export const AddEntry = withStyles(styles)(_AddEntry);
