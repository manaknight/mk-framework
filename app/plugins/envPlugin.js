var EnvPlugin = function (core) {
    core.env = 'dev';

    if (core.env == 'dev') {
        core.log.info = function (data) {
            console.log('DEBUG: ', data);
        }
    }
};