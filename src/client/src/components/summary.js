import React, {Component} from 'react';
import {entryCategories, entryFields} from '../../../schema/state/entry';
import {query} from '../utils/gql';
import {Page} from './page';
import {SummaryChart} from './summary-chart';

const setAggregateView = (component, manager) => () => {
    if (manager.isDetailed) {
        manager.setAggregateRenderData();
        component.setState({});
    }
};

const setDetailedView = (component, manager) => (chart) => {
    if (!manager.isDetailed) {
        const category = manager.categories[chart.getSelection()[0].row];

        manager.setDetailedRenderData(category);
        component.setState({});
    }
};

const getChartEvents = (component, manager) => {
    const detailedViewHandler = setDetailedView(component, manager);

    return [
        {
            callback: ({chartWrapper}) => detailedViewHandler(chartWrapper.getChart()),
            eventName: 'select'
        }
    ];
};

class StateManager {
    #categories = [];
    #query = '';
    #rawData = [];
    #renderData = [];
    #detailed = false;

    constructor(query) {
        this.#query = query;
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

    get categories() {
        return this.#categories;
    }

    get isDetailed() {
        return this.#detailed;
    }

    get renderData() {
        return this.#renderData;
    }

    setAggregateRenderData() {
        const cumulativeData = StateManager.aggregateData(this.#rawData, entryFields.category);

        this.#detailed = false;
        this.#categories = cumulativeData.map(([key]) => key);
        this.#renderData = cumulativeData.map(([key, value]) => [entryCategories[key], value]);
    }

    setDetailedRenderData(category) {
        this.#renderData = StateManager.aggregateData(
            this.#rawData
                .filter(entry => entry.category === category)
                .map(entry => ({
                    ...entry,
                    reason: entry.reason.split('/').pop()
                })),
            entryFields.reason
        );
        this.#detailed = true;
    }

    async initialize(getData) {
        this.#rawData = await this.#query().then(getData);

        this.setAggregateRenderData();
    }
}

export class Summary extends Component {
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
            <Page title='Summary'>
                <SummaryChart
                    isDetailed={this.debitManager.isDetailed}
                    onDetailedViewExit={setAggregateView(this, this.debitManager)}
                    chartEvents={getChartEvents(this, this.debitManager)}
                    renderData={this.debitManager.renderData}
                />
                <SummaryChart
                    isDetailed={this.creditManager.isDetailed}
                    onDetailedViewExit={setAggregateView(this, this.creditManager)}
                    chartEvents={getChartEvents(this, this.creditManager)}
                    renderData={this.creditManager.renderData}
                />
            </Page>
        );
    }
}
