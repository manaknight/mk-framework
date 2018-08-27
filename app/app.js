(function (mk, ioc) {
    var init = function () {
        var core = new mk.Core(ioc);

        core.register('homePage', SamplePageRouteModule);
        core.use(EnvPlugin);
        core.use(RoutePlugin);
        core.use(MustachePlugin);
        core.start(function (data) {
            core.startRouter();
        });
    };

    window.app = {
        init: init
    };
})(window.mk, IocContainer);

app.init();