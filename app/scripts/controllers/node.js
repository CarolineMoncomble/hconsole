'use strict';

angular.module('hconsoleApp').controller('NodeCtrl', function ($rootScope, $location, $routeParams, $scope, hubiquitus, dataTree, ChartGraph) {


    /*if (!$routeParams.sessionid || !hubiquitus.isConnected()) {
        $location.path('/');
    }*/

    dataTree.testConnect();

    // Initialisation du graphique
    var Graph = new ChartGraph('#graphSpace', dataTree.nodal.data);

    dataTree.nodal.on('update');


    $scope.$on('$destroy', function () {
        dataTree.nodal.onUpdate = null;
    });

    /*$scope.processes = [];

    //var chartGraph = new ChartGraph();
    //console.log(chartGraph);

    function findProcess(pid) {
        for (var i = 0; i < $scope.processes.length; i++) {
            var process = $scope.processes[i];
            if (process.pid === pid) {
                return process;
            }
        }
        return null;
    }

    function findActor(process, id) {
        for (var i = 0; i < process.actors.length; i++) {
            var actor = process.actors[i];
            if (actor.id === id) {
                return actor;
            }
        }
        return null;
    }
    var now = new Date().getTime();
    console.log(now);*/




    /*
    hubiquitus.onMessage(function (hMessage) {
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
    });

    hubiquitus.onError(function (message) {
        $rootScope.state = 'error';
        $rootScope.error = message;
        $location.path('/');
    });

    hubiquitus.onDisconnected(function () {
        $rootScope.state = 'disconnected';
        delete $rootScope.error;
        $location.path('/');
    });

    $scope.$on('$destroy', function () {
        hubiquitus.onMessage(undefined);
        hubiquitus.onError(undefined);
        hubiquitus.onDisconnected(undefined);
    });

     */
});
