requirejs.config({
    paths:{
        hubiquitus      : 'components/hubiquitus4js/hubiquitus-full'
    },
    deps : ['hubiquitus'],
    shim : {

    }
});

require(['hubiquitus'],function(hubiquitus){
})