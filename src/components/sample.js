import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { withRouter, Route } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as dashboard from './../../../../../shared/utils/enums/dashboard';
import { setClient } from '../../../../../shared/redux/actions/';

import axios from 'axios';

class RidersPerformance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: '',
            startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            selectedStoreId: 0,
            selectedRiderId: 0
        }

        this.generateRidersPerformance = this.generateRidersPerformance.bind(this);
    }

    componentWillMount() {
        if (this.props.client) {
            this.setState({
                startDate: this.props.startDate,
                endDate: this.props.endDate,
                client: this.props.client
            });

            var sDate = moment(this.props.startDate).format('YYYY-MM-DD');
            var eDate = moment(this.props.endDate).format('YYYY-MM-DD');
            this.generateRidersPerformance(this.props.client, sDate, eDate, this.props.selectedStoreId, this.props.selectedStoreId);
        }
    }

    componentWillReceiveProps(props) {
        let self = this;

        if (props.client){
            self.resetToInitialState();
            this.setState({ startDate: props.startDate, endDate: props.endDate, client: props.client, selectedStoreId: props.selectedStoreId, selectedRiderId: props.selectedRiderId })

            var sDate = moment(props.startDate).format('YYYY-MM-DD');
            var eDate = moment(props.endDate).format('YYYY-MM-DD');

            this.generateRidersPerformance(props.client, sDate, eDate, props.selectedStoreId, props.selectedRiderId );
        }

    }

    resetToInitialState() {
        this.setState({ gte : 0, lte : 0 })
        this.setState({ startDate: this.props.startDate, endDate: this.props.endDate, client: this.props.client })
    }

    generateRidersPerformance(client, startDate, endDate, selectedStoreId, selectedRiderId ) {

        let filters = '0' == selectedStoreId && '0' == selectedRiderId ? '':
                      '0' != selectedStoreId && '0' != selectedRiderId ? '{"property_name":"store","operator":"eq","property_value":"'+selectedStoreId+'"},{"property_name":"assigned_to","operator":"eq","property_value":"'+selectedRiderId+'"}':
                      '0' != selectedStoreId && '0' == selectedRiderId ? '{"property_name":"store","operator":"eq","property_value":"'+selectedStoreId+'"}':'{"property_name":"assigned_to","operator":"eq","property_value":"'+selectedRiderId+'"}'
                      
        var aveURL = 'https://api.keen.io/3.0/projects/'+dashboard.keen.config.projectId+'/queries/average?api_key='+dashboard.keen.config.masterKey+'&event_collection=' + client + '&target_property=completion_time&group_by=rider_name&timezone=Asia/Singapore&timeframe={"start":"' + startDate + 'T00:00:00.000","end":"' + endDate + 'T23:59:59.000"}&filters=['+filters+']';
        var cntURL = 'https://api.keen.io/3.0/projects/'+dashboard.keen.config.projectId+'/queries/count?api_key='+dashboard.keen.config.masterKey+'&event_collection=' + client + '&group_by=rider_name&timezone=Asia/Singapore&timeframe={"start":"' + startDate + 'T00:00:00.000","end":"' + endDate + 'T23:59:59.000"}&filters=['+filters+']';

        axios.get(aveURL)
            .then(aveJson => {
                var aveData = aveJson.data.result;window.aveData = aveJson.data.result;
                axios.get(cntURL)
                    .then(cntJson => {
                        var cntData = cntJson.data.result;
                        var ridersData = [];

                        for (var i in aveData) {
                            ridersData.push({
                                name : aveData[i].rider_name,
                                colorValue : aveData[i].result,
                                value : cntData[i].result
                            });
                        }
                        
                        window.aveData = aveData
                        window.cntData = cntData

                        var chart = Highcharts.chart('riders-performance', {
                            colorAxis: {
                                minColor: '#FFFFFF',
                                maxColor: '#3cd9a5'
                            },
                            series: [{
                                type: 'treemap',
                                layoutAlgorithm: 'squarified',
                                data: ridersData
                            }],
                            title: {
                                text: 'Riders Performance'
                            },
                            tooltip: {
                                formatter: function () {
                                    return this.point.name + ": " + this.point.value + ' job(s) on ' + this.point.colorValue + ' mins(s)';
                                }
                            }
                        });
                        
                        if ( aveData.length == 0 || cntData.length == 0 ) {
                            chart.showLoading('No data to display');
                        }
                    })
                    .catch(error => {
                    });
            })
            .catch(error => {
            });
    }

    render() {
        return (
            <div id="riders-performance">
                <div className="loading">
                    <i className="icon-spinner icon-spin icon-large"></i>
                </div>
            </div>
        );
    }
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({ setClient }, dispatch);
}

function mapStateToProps(state) {
    return {
        startDate: state.dashboard.startDate,
        endDate: state.dashboard.endDate,
        activeUser: state.activeUser,
        client: state.activeUser.user.client,
        selectedStoreId: state.dashboard.selectedStoreId,
        selectedRiderId: state.dashboard.selectedRiderId
    };
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(RidersPerformance));