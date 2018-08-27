var RoutePlugin = function (core) {

    if (!Router) {
        throw new Error('RouteModule: Router Library missing');
    }

    core.log.info('RouterPlugin init');

    core.Router = Router;

    core.registerRoute = function (route) {
        if (!route) {
            throw new Error('RoutePlugin: Route does not exist.');
        }
        core.Router.add(route);
    }

    core.startRouter = function () {
        core.Router.init(function (route) {
            core.log.info('Route changed to: ' + route);
        }, function (tokens) {
            core.log.info('Route failed with tokens: ' + tokens);
        });
    }
};