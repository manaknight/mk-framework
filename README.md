# Manaknight Framework

There's a lot fo frontend frameworks out there. A lot of them have a really long learning curve and needs lots of dependancies. 

We wanted to make a framework that's easy to use, easy to learn in 1 hour and does not get in your way.

### Setup
```
npm install gulp -g
npm install
```

### Compile Project
```
./build.sh
```

## How Manaknight Framework Works
We wanted a framework anyone with knowledge of javascript can get started and start working with it within one hour. So our approach is lets bundle a bunch of libraries to do everything we need in a single page application.

Features we need:
- A way to organize the code that doesn't consume a lot of time and is scalable
- Router
- Template system that does the job without having to learn a zillion syntax
- Build Process that works with one click of a button
- Can work with any other framework
- Backward compatible with ES5 and lower without transpilers
- Simple to use and learn

## How we solve those issues listed
1.So we decided to take what was given by [scaleapp library](https://github.com/flosse/scaleApp). There are 3 parts we used from this framework: Sandbox, Modules and Plugins. This gives a very good backbone structure to the application as it handles publish subscribe events, isolates the code into modules and handles code structure.

Sandbox(We call it iocContainer) contains the API which every module will use. This is where you define constants and other events you need listen to. Every Module access iocContainer.

Modules are independent parts of your application. It has absolutely no reference to another piece of the app. The only thing the module knows is your iocContainer. The iocContainer is used to communicate with other parts of the application. So when a module want to deal with another module, it emits an event which another module will listen for. This allows for one way data flow throughout app like redux does it.

Plugins extend the core or the iocContainer with additional features. You could extend the core with basic functionalities (like DOM manipulation) or just aliases the features of a base library(i.e. jQuery).

So our app filestructure is:
```
/app
    /modules
    oneModule.js
    /plugins
    onePlugin.js
app.js
iocContainer.js
index.html
```

2.Router

A lot of frameworks have very complicated router and we spend a lot of time debugging it to work. At end of day, the router job is to read url, process and call a function to do something. So we decided to use [hash-router](http://michaelsogos.github.io/Hash-Router/) library. This library makes it very simple to use the router. There's a function before(called before route), on (function called if route pattern matched) and after (what to do after route is called). This gives you all the flexibility to add any logic before, during or after route is called. We inject router into our application using our routePlugin.js

```
var route = {
    path: '#/',
    before: function () {
        this.task.done(this);
    },
    on: function () {
        //Your controller task
        this.task.done(this);
    },
    after: function () {
        
    }
};

Router.add(route);
Router.init()
```

3.Template System

At the end of the day, a template system needs to do all the common logic commands(variable substitution, for loop, if statement, hide/show, custom functions). Why go through the hassle of debugging why X syntax not working. We decided to introduce [mustache.js](https://github.com/janl/mustache.js/) library as template. So user can write templates as html files inside templates folder and we have a gulp script that compiles all templates into javascript. We have mustachePlugin.js to introduce template system to our application.

4.Simple Build Process

A lot of frontend framework rely on having a complicated build system to assemble the code. Especially for newbies, this can be overwhelming. So we kept it simple to having gulp build the templates(this was the only way we can find) and a simple bash script to assemble to files. Literally just run build.sh and it makes you the project.


5.Backward compatible with ES5 

We made sure the code used is es5 friendly as not everyone is using the latest browser and we don't want to add to your headache.

6.Simple to use and learn

Since we are combining a bunch of libraries together, it is very simple to learn how to make an application with manaknight framework.
