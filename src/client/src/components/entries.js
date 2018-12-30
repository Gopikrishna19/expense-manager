import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, {Component} from 'react';
import {entryType, TEntry} from '../../../schema/state/entry';
import {query} from '../utils/gql';
import {Entry} from './entry';
import {Page} from './page';

const getEntries = query`entries {
    id
    amount
    category
    date
    reason
    type
}`;

export class Entries extends Component {
    state = {entries: []};

    componentDidMount() {
        getEntries()
            .then(({entries}) => this.setState({entries}));
    }

    render() {
        let balance = 0;

        return (
            <Page title='All Entries'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Reason</TableCell>
                            <TableCell>Debit</TableCell>
                            <TableCell>Credit</TableCell>
                            <TableCell>Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.entries.map(entry => {
                            balance += (entry.type === entryType.debit ? -1 : 1) * entry.amount;

                            return (
                                <Entry
                                    entry={new TEntry(entry)}
                                    key={entry.id}
                                    balance={balance}
                                />
                            );
                        }).reverse()}
                    </TableBody>
                </Table>
            </Page>
        );
    }
}
