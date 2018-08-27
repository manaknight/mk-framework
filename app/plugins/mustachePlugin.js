var MustachePlugin = function (core) {
    function isObj(val) {
        if (val === null) {
            return false;
        }
        return ((typeof val === 'function') || (typeof val === 'object'));
    }

    core.renderView = function (templateName, data) {
        if (!templateName || templateName.length < 1) {
            throw new Error('MustachePlugin: Template Missing');
        }

        if (typeof window['tpl'][templateName] != "function") {
            throw new Error('MustachePlugin: Template does not exist. Rebuild Templates');
        }

        if (!isObj(data)) {
            throw new Error('MustachePlugin: Data missing for ' + templateName);
        }

        var template = window.tpl[templateName]();
        Mustache.parse(template);
        return Mustache.render(template, data);
    };
};