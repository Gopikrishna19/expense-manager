import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {array, bool, func} from 'prop-types';
import React from 'react';
import {Chart} from 'react-google-charts';

export const SummaryChart = props =>
    <>
        {
            props.isDetailed ?
                <Button variant='text' onClick={props.onDetailedViewExit}><ArrowBack/></Button> :
                <Button variant='text' disabled><SvgIcon><span/></SvgIcon></Button>
        }
        <Chart
            height='500px'
            chartEvents={props.chartEvents}
            chartType='PieChart'
            data={[
                ['Reason', 'Amount'],
                ...props.renderData
            ]}
            options={{
                animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true
                }
            }}
        />
    </>;

SummaryChart.propTypes = {
    chartEvents: array.isRequired,
    isDetailed: bool.isRequired,
    onDetailedViewExit: func.isRequired,
    renderData: array.isRequired
};
