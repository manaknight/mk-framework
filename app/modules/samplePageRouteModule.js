var SamplePageRouteModule = function (sandbox) {
    var route = {
        path: '#/',
        on: function () {
            console.log('on');
            // document.getElementsByClassName('root-container')[0].innerHTML = '<p> ON GAME</p>';
            document.getElementsByClassName('root-container')[0].innerHTML = sandbox.core.renderView('test.html', {
                name: 'haha'
            });
        }
    };

    var init = function () {
        sandbox.core.registerRoute(route);
    };

    return {
        init: init
    };
};