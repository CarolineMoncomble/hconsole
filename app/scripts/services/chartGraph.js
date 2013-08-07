'use strict';

angular.module('hconsoleApp').factory('ChartGraph', function (highcharts) {
    console.log('lolo2');


    /*hubiquitus.onMessage(function (hMessage) {
        if (hMessage.type === 'peer-info') {
            var peerInfo = hMessage.payload;

            var now = new Date().getTime();

            var process = findProcess(peerInfo.peerPID);
            if (!process) {
                process = {pid: peerInfo.peerPID, actors: []};
                $scope.processes.push(process);
            }
            process.memory = peerInfo.peerMemory;
            process.loadAvg = peerInfo.peerLoadAvg;

            if (process.cpuSeries) {
                process.cpuSeries.addPoint([now, Math.round(peerInfo.peerLoadAvg[0] * 100) / 100], true, process.cpuSeries.data.length > 500);
            }
            if (process.heapSeries) {
                process.heapSeries.addPoint([now, Math.round(((100 / peerInfo.peerMemory.heapTotal) * peerInfo.peerMemory.heapUsed) * 100) / 100], true, process.heapSeries.data.length > 500);
            }

            var actor = findActor(process, peerInfo.peerId);
            if (!actor) {
                actor = {id: peerInfo.peerId};
                process.actors.push(actor);
            }
            actor.status = peerInfo.peerStatus;
        }
        else if (hMessage.type === 'peer-stop') {
            for (var i = 0; i < $scope.processes.length; i++) {
                var p = $scope.processes[i];
                for (var j = 0; j < p.actors.length; j++) {
                    var a = p.actors[j];
                    if (hMessage.payload.indexOf(a.id) === 0) {
                        p.actors.splice(j, 1);
                    }
                }
            }
        }
    })*/

    var ChartGraph = function (nodeId, dataTree, hubiquitus) {

        console.log('loumoui2');
        console.log('test : ' + dataTree.nodal);
        //console.log('dataTree: ' + hMessage);
        /*if ( hMessage.type === 'peer-info'){
            console.log('ok');
        }*/
        /*if (hMessage.type === 'peer-info') {
            var peerInfo = hMessage.payload;

            var now = new Date().getTime();

            var process = findProcess(peerInfo.peerPID);
            if (!process) {
                process = {pid: peerInfo.peerPID, actors: []};
                $scope.processes.push(process);
            }
            process.memory = peerInfo.peerMemory;
            process.loadAvg = peerInfo.peerLoadAvg;

            if (process.cpuSeries) {
                process.cpuSeries.addPoint([now, Math.round(peerInfo.peerLoadAvg[0] * 100) / 100], true, process.cpuSeries.data.length > 500);
            }
            if (process.heapSeries) {
                process.heapSeries.addPoint([now, Math.round(((100 / peerInfo.peerMemory.heapTotal) * peerInfo.peerMemory.heapUsed) * 100) / 100], true, process.heapSeries.data.length > 500);
            }

            var actor = findActor(process, peerInfo.peerId);
            if (!actor) {
                actor = {id: peerInfo.peerId};
                process.actors.push(actor);
            }
            actor.status = peerInfo.peerStatus;
        }*/

        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                if (attrs.chart === 'loadAvg' || attrs.chart === 'memory') {
                    var now = new Date().getTime();

                    var chart = new highcharts.Chart({
                        chart: {
                            renderTo: element.context,
                            events: {},
                            type: 'spline',
                            width: 360,
                            height: 130
                        },
                        colors: ['#3D96AE'],
                        credits: {enabled: false},
                        legend: {enabled: false},
                        tooltip: {enabled: false},
                        title: {
                            text: attrs.chart === 'loadAvg' ? '% CPU' : '% HEAP',
                            style: {fontSize: '10px'}
                        },
                        yAxis: {
                            title: {text: '', style: {fontSize: 0}},
                            min: 0,
                            gridLineColor: '#dddddd'
                        },
                        xAxis: {
                            type: 'datetime',
                            tickPixelInterval: 150,
                            dateTimeLabelFormats: {month: '%e. %b', year: '%b'},
                            lineColor: '#dddddd'
                        },
                        plotOptions: {
                            spline: {
                                lineWidth: 2,
                                shadow: false,
                                marker: {enabled: false},
                                enableMouseTracking: false
                            }
                        },
                        series: [
                            {data: [
                                attrs.chart === 'loadAvg' ?
                                    [now, Math.round(scope.process.loadAvg[0] * 100) / 100] :
                                    [now, Math.round(((100 / scope.process.memory.heapTotal) * scope.process.memory.heapUsed) * 100) / 100]
                            ]}
                        ]
                    });

                    if (attrs.chart === 'loadAvg') {
                        scope.process.cpuSeries = chart.series[0];
                    } else {
                        scope.process.heapSeries = chart.series[0];
                    }
                }
            }
        };
    }
    return ChartGraph;
});
