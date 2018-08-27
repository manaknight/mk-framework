var IocContainer = function (core, instanceId, options, moduleId) {
    this.id = instanceId;
    this.options = options;
    this.moduleId = moduleId;
    this.core = core;

    core._mediator.installTo(this);
    return this;
};