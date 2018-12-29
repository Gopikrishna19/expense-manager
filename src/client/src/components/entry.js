import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import {instanceOf, number, object} from 'prop-types';
import React from 'react';
import {entryType, TEntry} from '../../../schema/state/entry';

const styles = theme => ({
    credit: {color: theme.palette.primary.main},
    debit: {color: theme.palette.secondary.main}
});

const _Entry = props =>
    <TableRow>
        <TableCell>{moment.utc(props.entry.date).format('DD MMM, YYYY')}</TableCell>
        <TableCell>{props.entry.reason}</TableCell>
        <TableCell className={props.classes.debit}>{props.entry.type === entryType.debit ? props.entry.amount : ''}</TableCell>
        <TableCell className={props.classes.credit}>{props.entry.type === entryType.credit ? props.entry.amount : ''}</TableCell>
        <TableCell>{props.balance}</TableCell>
    </TableRow>;

_Entry.propTypes = {
    balance: number.isRequired,
    classes: object.isRequired,
    entry: instanceOf(TEntry).isRequired
};

export const Entry = withStyles(styles)(_Entry);
