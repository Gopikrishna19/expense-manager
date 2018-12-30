import React, {Component} from 'react';
import {Chart} from 'react-google-charts';
import {entryCategories, entryFields} from '../../../schema/state/entry';
import {query} from '../utils/gql';

const getChartEvents = () => [
    {
        callback({chartWrapper}) {
            chartWrapper.getChart().getSelection();
        },
        eventName: 'select'
    }
];

class StateManager {
    constructor(query) {
        this.query = query;
        this.rawData = [];
    }

    static aggregateData(items, field) {
        return Object.entries(
            items.reduce(
                (group, debit) =>
                    Object.assign(group, {[debit[field]]: (group[debit[field]] || 0) + debit.amount}),
                {}
            )
        );
    }

    async initialize(getData) {
        this.rawData = await this.query().then(getData);

        return this.rawData;
    }

    getRenderData() {
        this.cumulativeData = StateManager.aggregateData(this.rawData, entryFields.category);

        return this.cumulativeData.map(([key, value]) => [entryCategories[key], value]);
    }
}

export class SummaryChart extends Component {
    debitManager = new StateManager(query`debits {
        amount
        category
        reason
    }`);
    creditManager = new StateManager(query`credits {
        amount
        category
        reason
    }`);

    componentDidMount() {
        Promise.all([
            this.debitManager.initialize(({debits}) => debits),
            this.creditManager.initialize(({credits}) => credits)
        ])
            .then(() => this.setState({}));
    }

    render() {
        return (
            <>
                <Chart
                    height='500px'
                    chartEvents={getChartEvents(this, this.debitManager)}
                    chartType='PieChart'
                    data={[
                        ['Reason', 'Amount'],
                        ...this.debitManager.getRenderData()
                    ]}
                />
                <Chart
                    height='500px'
                    chartEvents={getChartEvents(this, this.creditManager)}
                    chartType='PieChart'
                    data={[
                        ['Reason', 'Amount'],
                        ...this.creditManager.getRenderData()
                    ]}
                />
            </>
        );
    }
}
