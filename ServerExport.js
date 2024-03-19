const meta = {"router":{"params":{},"_params":[],"caseSensitive":undefined,"mergeParams":undefined,"strict":undefined,"stack":[]},"create":function (type, path, func) {
    let fails = false;
    this.app.use(this.status);
    this.paths.push(path);
    this.app[type](path, async (req, res) => {
      if (!permafreeze) {
        console.log("\x1b[37m  ║║╠═\x1b[38;5;214mNew request.\x1b[37m");
      }

      req.random = Math.random().toString().replace(".", "").toString();
      globe.time(req.random);
      //debug("request start")
      result = await func(req, res);
      //debug("request end ")
      try {
        if (result !== undefined) {
        } else {
          throw "║║═\x1b[31mx \x1b[32mNo response data.";
        }
      } catch (err) {
        fails = true;
      }

      if (result.failSafe) {
        try {
          res.send(
            "Request did not return anything. Please check your function."
          );
          console.log("\x1b[37m  ║║╠═\x1b[31mRequest incomplete.");
        } catch (e) {}
      }
      console.log(
        `\x1b[37m  ║║╠═\x1b[38;5;10mRequest complete: ${
          req.method
        } ${req.url.split(32)} in ${await globe.timeEnd(req.random)}s`
      );
      fileLog(
        config.logging.file,
        `New request: ${req.method} ${req.url} ${req.ip}`
      );
      if (fails) {
        //throw ( "║║═\x1b[31mx \x1b[32mFailSafe was not created.");
      }
    });
  },"remove":function (path) {
    let index = this.paths.indexOf(path);
    if (index > -1) {
      this.paths.splice(index, 1);
      //console.log(apps[this.name]._router.stack);
      this.app._router.stack.splice(index + 4, 1);
    } else {
      console.log(
        `\x1b[37m  ║╠═\x1b[31mThe path ${path} does not exist in the server.`
      );
    }
  },"start":async function(port) {
    console.log("  ╠╦═\x1b[36m[Server Function] \x1b[0m");
    this.app.listen(port, () => {
      console.log(
        `\x1b[37m  ║╠╦═\x1b[38;5;13m[Running on port: ${port}]\n  \x1b[37m║║╠═\x1b[38;5;6mServer running...`
      );
    });
    this.app.use(this.status);

    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "q" && this.active) {
        permafreeze = !permafreeze;

        this.paused = !this.paused;
        this.repause();
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "d" && this.active) {
        console.log(process.memoryUsage());
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "c" && this.active) {
        if (!permafreeze) {
          this.end();
          permafreeze = true;
        }
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "e" && this.active) {
        if (!complete) {
          complete = !false;
        } else {
        }
      } else {
      }
    });
  },"init":async function () {
    console.log("  ╠╦═\x1b[36m[Server Function] \x1b[0m");
    this.send = async function (req, res) {
      return await this.app.handle(req, res, (data) => {
        return data;
      });
    };
    this.app.use(this.status);
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "q" && this.active) {
        permafreeze = !permafreeze;

        this.paused = !this.paused;
        this.repause();
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "d" && this.active) {
        console.log(process.memoryUsage());
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "c" && this.active) {
        if (!permafreeze) {
          this.end();
          permafreeze = true;
        }
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "e" && this.active) {
        if (!complete) {
          complete = !false;
        } else {
        }
      } else {
      }
    });
  },"status":async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  },"pause":function () {
    frozen = true;
    console.log("\x1b[37m  ║║╠═\x1b[38;5;44mApp connections paused");
  },"unpause":function() {
    frozen = false;
    console.log("\x1b[37m  ║║╠═\x1b[38;5;208mApp connections unpaused");
  },"repause":function () {
    if (this.paused) {
      this.pause();
    } else {
      this.unpause();
    }
  },"notFound":function (content) {
    this.app.all("*", async (req, res) => {
      res.status(404).send(content);
    });
  },"to":function (type, path, content) {
    return `fetch(location.origin + "/${path}/",  ${type}, ${{
      body: content,
    }})`;
  },"end":function () {
    this.app.listen(this.port).close();
    console.log("\x1b[37m  ╠╩╩═\x1b[32;5;214mServer closed.");
    console.log("\x1b[37m  ╠════════════════════════════════╗");
    console.log("  ║\x1b[31m        Process complete.       \x1b[37m║");
    console.log("\x1b[37m  ╠════════════════════════════════╣");
    console.log("  ║\x1b[31m Summary                        \x1b[37m║");
    console.log("\x1b[37m  ╠════════════════════════════════╝");
    console.log("╔═╝");
    console.timeLog("║uptime");
    console.log("║ELECTROServer by Renderlabs::Cloud");
    console.log("╙───────────────────────────────────");
    delete this.start;
    this.active = false;
  },"Exportable":async function () {
    const getMethods = (obj) => {
      let properties = new Set();
      let currentObj = obj;
      do {
        Object.getOwnPropertyNames(currentObj).map((item) =>
          properties.add(item)
        );
      } while ((currentObj = Object.getPrototypeOf(currentObj)));
      return [...properties.keys()].filter(
        (item) => typeof obj[item] === "function"
      );
    };
    let Result = {}
    let RouterResult = []
    let methods = getMethods(this);
    methods[methods.indexOf("hasOwnProperty")] = new Function("return 0")
    methods[methods.indexOf("valueOf")] = new Function("return 0")
    methods[methods.indexOf("toString")] = new Function("return 0")
    methods[methods.indexOf("propertyIsEnumerable")] = new Function("return 0")
    methods[methods.indexOf("isPrototypeOf")] = new Function("return 0")
    methods[methods.indexOf("toLocaleString")] = new Function("return 0")
    methods[methods.indexOf("__defineGetter__")] = new Function("return 0")
    methods[methods.indexOf("__defineSetter__")] = new Function("return 0")
    methods[methods.indexOf("__lookupGetter__")] = new Function("return 0")
    methods[methods.indexOf("__lookupSetter__")] = new Function("return 0")
    for(let method of methods){
      Result[method] = this[method];
    }
    
    let iR = 0
    for(let route of this.app._router.stack){
      RouterResult[iR] = this.app._router.stack[iR]
      if(this.app._router.stack[iR].name.trim() == "status"||typeof this.app._router.stack[iR].router === "function"){
        RouterResult[iR].route = new Function(`return ${this.app._router.stack[iR].route}(arguments)`);
        RouterResult[iR].handle = new Function(`return ${this.app._router.stack[iR].handle}(arguments)`);
      }
      else{
        RouterResult[iR].route = null
        RouterResult[iR].handle = {}
      }
      
      console.log(this.app._router.stack[iR].handle.toString())
      iR++
    }
    let AppResult = {}
    for(let func of ["handle", "route", "stack", "param", "use", "get", "post", "put", "delete"]){
      AppResult[func] = function(){this.app[func](arguments)}
    }
    AppResult = { ...this.app, ...AppResult }
    return { ...Result, app: {...this.app, _router: { stack:{ ...RouterResult }, handle: new Function(`${this.app._router.handle}(arguments)`) }}, router: {...this.router} }
  },"func":async (req, res) => {},"app":{"_events":{"mount":function onmount(parent) {
    // inherit trust proxy
    if (this.settings[trustProxyDefaultSymbol] === true
      && typeof parent.settings['trust proxy fn'] === 'function') {
      delete this.settings['trust proxy'];
      delete this.settings['trust proxy fn'];
    }

    // inherit protos
    setPrototypeOf(this.request, parent.request)
    setPrototypeOf(this.response, parent.response)
    setPrototypeOf(this.engines, parent.engines)
    setPrototypeOf(this.settings, parent.settings)
  }},"_eventsCount":1,"_maxListeners":undefined,"setMaxListeners":function setMaxListeners(n) {
  validateNumber(n, 'setMaxListeners', 0);
  this._maxListeners = n;
  return this;
},"getMaxListeners":function getMaxListeners() {
  return _getMaxListeners(this);
},"emit":function emit(type, ...args) {
  let doError = (type === 'error');

  const events = this._events;
  if (events !== undefined) {
    if (doError && events[kErrorMonitor] !== undefined)
      this.emit(kErrorMonitor, ...args);
    doError = (doError && events.error === undefined);
  } else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    let er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      try {
        const capture = {};
        ErrorCaptureStackTrace(capture, EventEmitter.prototype.emit);
        ObjectDefineProperty(er, kEnhanceStackBeforeInspector, {
          __proto__: null,
          value: FunctionPrototypeBind(enhanceStackTrace, this, er, capture),
          configurable: true,
        });
      } catch {
        // Continue regardless of error.
      }

      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }

    let stringifiedEr;
    try {
      stringifiedEr = inspect(er);
    } catch {
      stringifiedEr = er;
    }

    // At least give some kind of context to the user
    const err = new ERR_UNHANDLED_ERROR(stringifiedEr);
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  const handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    const result = handler.apply(this, args);

    // We check if result is undefined first because that
    // is the most common case so we do not pay any perf
    // penalty
    if (result !== undefined && result !== null) {
      addCatch(this, result, type, args);
    }
  } else {
    const len = handler.length;
    const listeners = arrayClone(handler);
    for (let i = 0; i < len; ++i) {
      const result = listeners[i].apply(this, args);

      // We check if result is undefined first because that
      // is the most common case so we do not pay any perf
      // penalty.
      // This code is duplicated because extracting it away
      // would make it non-inlineable.
      if (result !== undefined && result !== null) {
        addCatch(this, result, type, args);
      }
    }
  }

  return true;
},"addListener":function addListener(type, listener) {
  return _addListener(this, type, listener, false);
},"on":function addListener(type, listener) {
  return _addListener(this, type, listener, false);
},"prependListener":function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    },"once":function once(type, listener) {
  checkListener(listener);

  this.on(type, _onceWrap(this, type, listener));
  return this;
},"prependOnceListener":function prependOnceListener(type, listener) {
      checkListener(listener);

      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    },"removeListener":function removeListener(type, listener) {
      checkListener(listener);

      const events = this._events;
      if (events === undefined)
        return this;

      const list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = { __proto__: null };
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        let position = -1;

        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          if (spliceOne === undefined)
            spliceOne = require('internal/util').spliceOne;
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, listener);
      }

      return this;
    },"off":function removeListener(type, listener) {
      checkListener(listener);

      const events = this._events;
      if (events === undefined)
        return this;

      const list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = { __proto__: null };
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        let position = -1;

        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          if (spliceOne === undefined)
            spliceOne = require('internal/util').spliceOne;
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, listener);
      }

      return this;
    },"removeAllListeners":function removeAllListeners(type) {
      const events = this._events;
      if (events === undefined)
        return this;

      // Not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = { __proto__: null };
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = { __proto__: null };
          else
            delete events[type];
        }
        return this;
      }

      // Emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        for (const key of ReflectOwnKeys(events)) {
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = { __proto__: null };
        this._eventsCount = 0;
        return this;
      }

      const listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (let i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    },"listeners":function listeners(type) {
  return _listeners(this, type, true);
},"rawListeners":function rawListeners(type) {
  return _listeners(this, type, false);
},"listenerCount":function listenerCount(type, listener) {
  const events = this._events;

  if (events !== undefined) {
    const evlistener = events[type];

    if (typeof evlistener === 'function') {
      if (listener != null) {
        return listener === evlistener || listener === evlistener.listener ? 1 : 0;
      }

      return 1;
    } else if (evlistener !== undefined) {
      if (listener != null) {
        let matching = 0;

        for (let i = 0, l = evlistener.length; i < l; i++) {
          if (evlistener[i] === listener || evlistener[i].listener === listener) {
            matching++;
          }
        }

        return matching;
      }

      return evlistener.length;
    }
  }

  return 0;
},"eventNames":function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
},"init":function init() {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  this.defaultConfiguration();
},"defaultConfiguration":function defaultConfiguration() {
  var env = process.env.NODE_ENV || 'development';

  // default settings
  this.enable('x-powered-by');
  this.set('etag', 'weak');
  this.set('env', env);
  this.set('query parser', 'extended');
  this.set('subdomain offset', 2);
  this.set('trust proxy', false);

  // trust proxy inherit back-compat
  Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
    configurable: true,
    value: true
  });

  debug('booting in %s mode', env);

  this.on('mount', function onmount(parent) {
    // inherit trust proxy
    if (this.settings[trustProxyDefaultSymbol] === true
      && typeof parent.settings['trust proxy fn'] === 'function') {
      delete this.settings['trust proxy'];
      delete this.settings['trust proxy fn'];
    }

    // inherit protos
    setPrototypeOf(this.request, parent.request)
    setPrototypeOf(this.response, parent.response)
    setPrototypeOf(this.engines, parent.engines)
    setPrototypeOf(this.settings, parent.settings)
  });

  // setup locals
  this.locals = Object.create(null);

  // top-most app is mounted at /
  this.mountpath = '/';

  // default locals
  this.locals.settings = this.settings;

  // default configuration
  this.set('view', View);
  this.set('views', resolve('views'));
  this.set('jsonp callback name', 'callback');

  if (env === 'production') {
    this.enable('view cache');
  }

  Object.defineProperty(this, 'router', {
    get: function() {
      throw new Error('\'app.router\' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.');
    }
  });
},"lazyrouter":function lazyrouter() {
  if (!this._router) {
    this._router = new Router({
      caseSensitive: this.enabled('case sensitive routing'),
      strict: this.enabled('strict routing')
    });

    this._router.use(query(this.get('query parser fn')));
    this._router.use(middleware.init(this));
  }
},"handle":function handle(req, res, callback) {
  var router = this._router;

  // final handler
  var done = callback || finalhandler(req, res, {
    env: this.get('env'),
    onerror: logerror.bind(this)
  });

  // no routes
  if (!router) {
    debug('no routes defined on app');
    done();
    return;
  }

  router.handle(req, res, done);
},"use":function use(fn) {
  var offset = 0;
  var path = '/';

  // default path to '/'
  // disambiguate app.use([fn])
  if (typeof fn !== 'function') {
    var arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) {
      arg = arg[0];
    }

    // first arg is the path
    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }

  var fns = flatten(slice.call(arguments, offset));

  if (fns.length === 0) {
    throw new TypeError('app.use() requires a middleware function')
  }

  // setup router
  this.lazyrouter();
  var router = this._router;

  fns.forEach(function (fn) {
    // non-express app
    if (!fn || !fn.handle || !fn.set) {
      return router.use(path, fn);
    }

    debug('.use app under %s', path);
    fn.mountpath = path;
    fn.parent = this;

    // restore .app property on req and res
    router.use(path, function mounted_app(req, res, next) {
      var orig = req.app;
      fn.handle(req, res, function (err) {
        setPrototypeOf(req, orig.request)
        setPrototypeOf(res, orig.response)
        next(err);
      });
    });

    // mounted an app
    fn.emit('mount', this);
  }, this);

  return this;
},"route":function route(path) {
  this.lazyrouter();
  return this._router.route(path);
},"engine":function engine(ext, fn) {
  if (typeof fn !== 'function') {
    throw new Error('callback function required');
  }

  // get file extension
  var extension = ext[0] !== '.'
    ? '.' + ext
    : ext;

  // store engine
  this.engines[extension] = fn;

  return this;
},"param":function param(name, fn) {
  this.lazyrouter();

  if (Array.isArray(name)) {
    for (var i = 0; i < name.length; i++) {
      this.param(name[i], fn);
    }

    return this;
  }

  this._router.param(name, fn);

  return this;
},"set":function set(setting, val) {
  if (arguments.length === 1) {
    // app.get(setting)
    var settings = this.settings

    while (settings && settings !== Object.prototype) {
      if (hasOwnProperty.call(settings, setting)) {
        return settings[setting]
      }

      settings = Object.getPrototypeOf(settings)
    }

    return undefined
  }

  debug('set "%s" to %o', setting, val);

  // set value
  this.settings[setting] = val;

  // trigger matched settings
  switch (setting) {
    case 'etag':
      this.set('etag fn', compileETag(val));
      break;
    case 'query parser':
      this.set('query parser fn', compileQueryParser(val));
      break;
    case 'trust proxy':
      this.set('trust proxy fn', compileTrust(val));

      // trust proxy inherit back-compat
      Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
        configurable: true,
        value: false
      });

      break;
  }

  return this;
},"path":function path() {
  return this.parent
    ? this.parent.path() + this.mountpath
    : '';
},"enabled":function enabled(setting) {
  return Boolean(this.set(setting));
},"disabled":function disabled(setting) {
  return !this.set(setting);
},"enable":function enable(setting) {
  return this.set(setting, true);
},"disable":function disable(setting) {
  return this.set(setting, false);
},"acl":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"bind":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"checkout":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"connect":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"copy":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"delete":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"get":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"head":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"link":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"lock":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"m-search":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"merge":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"mkactivity":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"mkcalendar":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"mkcol":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"move":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"notify":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"options":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"patch":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"post":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"propfind":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"proppatch":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"purge":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"put":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"rebind":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"report":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"search":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"source":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"subscribe":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"trace":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"unbind":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"unlink":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"unlock":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"unsubscribe":function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  },"all":function all(path) {
  this.lazyrouter();

  var route = this._router.route(path);
  var args = slice.call(arguments, 1);

  for (var i = 0; i < methods.length; i++) {
    route[methods[i]].apply(route, args);
  }

  return this;
},"del":function (arg0) {log.call(deprecate, message, site)
return fn.apply(this, arguments)
},"render":function render(name, options, callback) {
  var cache = this.cache;
  var done = callback;
  var engines = this.engines;
  var opts = options;
  var renderOptions = {};
  var view;

  // support callback function as second arg
  if (typeof options === 'function') {
    done = options;
    opts = {};
  }

  // merge app.locals
  merge(renderOptions, this.locals);

  // merge options._locals
  if (opts._locals) {
    merge(renderOptions, opts._locals);
  }

  // merge options
  merge(renderOptions, opts);

  // set .cache unless explicitly provided
  if (renderOptions.cache == null) {
    renderOptions.cache = this.enabled('view cache');
  }

  // primed cache
  if (renderOptions.cache) {
    view = cache[name];
  }

  // view
  if (!view) {
    var View = this.get('view');

    view = new View(name, {
      defaultEngine: this.get('view engine'),
      root: this.get('views'),
      engines: engines
    });

    if (!view.path) {
      var dirs = Array.isArray(view.root) && view.root.length > 1
        ? 'directories "' + view.root.slice(0, -1).join('", "') + '" or "' + view.root[view.root.length - 1] + '"'
        : 'directory "' + view.root + '"'
      var err = new Error('Failed to lookup view "' + name + '" in views ' + dirs);
      err.view = view;
      return done(err);
    }

    // prime the cache
    if (renderOptions.cache) {
      cache[name] = view;
    }
  }

  // render
  tryRender(view, renderOptions, done);
},"listen":function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
},"request":{"app":function(req, res, next) {
    app.handle(req, res, next);
  }},"response":{"app":function(req, res, next) {
    app.handle(req, res, next);
  }},"cache":{},"engines":{},"settings":{"x-powered-by":true,"etag":"weak","etag fn":function generateETag (body, encoding) {
    var buf = !Buffer.isBuffer(body)
      ? Buffer.from(body, encoding)
      : body

    return etag(buf, options)
  },"env":"development","query parser":"extended","query parser fn":function parseExtendedQueryString(str) {
  return qs.parse(str, {
    allowPrototypes: true
  });
},"subdomain offset":2,"trust proxy":false,"trust proxy fn":function trustNone () {
  return false
},"view":function View(name, options) {
  var opts = options || {};

  this.defaultEngine = opts.defaultEngine;
  this.ext = extname(name);
  this.name = name;
  this.root = opts.root;

  if (!this.ext && !this.defaultEngine) {
    throw new Error('No default engine was specified and no extension was provided.');
  }

  var fileName = name;

  if (!this.ext) {
    // get extension from default engine name
    this.ext = this.defaultEngine[0] !== '.'
      ? '.' + this.defaultEngine
      : this.defaultEngine;

    fileName += this.ext;
  }

  if (!opts.engines[this.ext]) {
    // load engine
    var mod = this.ext.slice(1)
    debug('require "%s"', mod)

    // default engine export
    var fn = require(mod).__express

    if (typeof fn !== 'function') {
      throw new Error('Module "' + mod + '" does not provide a view engine.')
    }

    opts.engines[this.ext] = fn
  }

  // store loaded engine
  this.engine = opts.engines[this.ext];

  // lookup path
  this.path = this.lookup(fileName);
},"views":"\u002Fhome\u002Frunner\u002FNexusServerjs\u002Fviews","jsonp callback name":"callback"},"locals":{"settings":{"x-powered-by":true,"etag":"weak","etag fn":function generateETag (body, encoding) {
    var buf = !Buffer.isBuffer(body)
      ? Buffer.from(body, encoding)
      : body

    return etag(buf, options)
  },"env":"development","query parser":"extended","query parser fn":function parseExtendedQueryString(str) {
  return qs.parse(str, {
    allowPrototypes: true
  });
},"subdomain offset":2,"trust proxy":false,"trust proxy fn":function trustNone () {
  return false
},"view":function View(name, options) {
  var opts = options || {};

  this.defaultEngine = opts.defaultEngine;
  this.ext = extname(name);
  this.name = name;
  this.root = opts.root;

  if (!this.ext && !this.defaultEngine) {
    throw new Error('No default engine was specified and no extension was provided.');
  }

  var fileName = name;

  if (!this.ext) {
    // get extension from default engine name
    this.ext = this.defaultEngine[0] !== '.'
      ? '.' + this.defaultEngine
      : this.defaultEngine;

    fileName += this.ext;
  }

  if (!opts.engines[this.ext]) {
    // load engine
    var mod = this.ext.slice(1)
    debug('require "%s"', mod)

    // default engine export
    var fn = require(mod).__express

    if (typeof fn !== 'function') {
      throw new Error('Module "' + mod + '" does not provide a view engine.')
    }

    opts.engines[this.ext] = fn
  }

  // store loaded engine
  this.engine = opts.engines[this.ext];

  // lookup path
  this.path = this.lookup(fileName);
},"views":"\u002Fhome\u002Frunner\u002FNexusServerjs\u002Fviews","jsonp callback name":"callback"}},"mountpath":"\u002F","_router":{"stack":{"0":{"handle":{},"name":"query","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":null},"1":{"handle":{},"name":"expressInit","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":null},"2":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"3":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Fexample\\\u002F?$", "i"),"route":null},"4":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"5":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Fplugin\\\u002F?$", "i"),"route":null},"6":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"7":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Fhelp\\\u002F?$", "i"),"route":null},"8":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"9":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Fhelp\\\u002Futsp\\\u002F?$", "i"),"route":null},"10":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"11":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Fhelp\\\u002Fcap\\\u002F?$", "i"),"route":null},"12":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"13":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Fhelp\\\u002Futep\\\u002F?$", "i"),"route":null},"14":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"15":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Fapp\\.jsg\\\u002F?$", "i"),"route":null},"16":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"17":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Fassets\\\u002Fexample\\.txt\\\u002F?$", "i"),"route":null},"18":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"19":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Fassets\\\u002Flogo\\.svg\\\u002F?$", "i"),"route":null},"20":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"21":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Ficon\\.png\\\u002F?$", "i"),"route":null},"22":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"23":{"handle":function anonymous(
) {
return async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }(arguments)
},"name":"status","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002F?(?=\\\u002F|$)", "i"),"route":function anonymous(
) {
return undefined(arguments)
}},"24":{"handle":{},"name":"bound dispatch","params":undefined,"path":undefined,"keys":[],"regexp":new RegExp("^\\\u002Fapi\\\u002F?$", "i"),"route":null}},"handle":function anonymous(
) {
function handle(req, res, out) {
  var self = this;

  debug('dispatching %s %s', req.method, req.url);

  var idx = 0;
  var protohost = getProtohost(req.url) || ''
  var removed = '';
  var slashAdded = false;
  var sync = 0
  var paramcalled = {};

  // store options for OPTIONS request
  // only used if OPTIONS request
  var options = [];

  // middleware and routes
  var stack = self.stack;

  // manage inter-router variables
  var parentParams = req.params;
  var parentUrl = req.baseUrl || '';
  var done = restore(out, req, 'baseUrl', 'next', 'params');

  // setup next layer
  req.next = next;

  // for options requests, respond with a default if nothing else responds
  if (req.method === 'OPTIONS') {
    done = wrap(done, function(old, err) {
      if (err || options.length === 0) return old(err);
      sendOptionsResponse(res, options, old);
    });
  }

  // setup basic req values
  req.baseUrl = parentUrl;
  req.originalUrl = req.originalUrl || req.url;

  next();

  function next(err) {
    var layerError = err === 'route'
      ? null
      : err;

    // remove added slash
    if (slashAdded) {
      req.url = req.url.slice(1)
      slashAdded = false;
    }

    // restore altered req.url
    if (removed.length !== 0) {
      req.baseUrl = parentUrl;
      req.url = protohost + removed + req.url.slice(protohost.length)
      removed = '';
    }

    // signal to exit router
    if (layerError === 'router') {
      setImmediate(done, null)
      return
    }

    // no more matching layers
    if (idx >= stack.length) {
      setImmediate(done, layerError);
      return;
    }

    // max sync stack
    if (++sync > 100) {
      return setImmediate(next, err)
    }

    // get pathname of request
    var path = getPathname(req);

    if (path == null) {
      return done(layerError);
    }

    // find next matching layer
    var layer;
    var match;
    var route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);
      route = layer.route;

      if (typeof match !== 'boolean') {
        // hold on to layerError
        layerError = layerError || match;
      }

      if (match !== true) {
        continue;
      }

      if (!route) {
        // process non-route handlers normally
        continue;
      }

      if (layerError) {
        // routes do not match with a pending error
        match = false;
        continue;
      }

      var method = req.method;
      var has_method = route._handles_method(method);

      // build up automatic options response
      if (!has_method && method === 'OPTIONS') {
        appendMethods(options, route._options());
      }

      // don't even bother matching route
      if (!has_method && method !== 'HEAD') {
        match = false;
      }
    }

    // no match
    if (match !== true) {
      return done(layerError);
    }

    // store route for dispatch on change
    if (route) {
      req.route = route;
    }

    // Capture one-time layer values
    req.params = self.mergeParams
      ? mergeParams(layer.params, parentParams)
      : layer.params;
    var layerPath = layer.path;

    // this should be done for the layer
    self.process_params(layer, paramcalled, req, res, function (err) {
      if (err) {
        next(layerError || err)
      } else if (route) {
        layer.handle_request(req, res, next)
      } else {
        trim_prefix(layer, layerError, layerPath, path)
      }

      sync = 0
    });
  }

  function trim_prefix(layer, layerError, layerPath, path) {
    if (layerPath.length !== 0) {
      // Validate path is a prefix match
      if (layerPath !== path.slice(0, layerPath.length)) {
        next(layerError)
        return
      }

      // Validate path breaks on a path separator
      var c = path[layerPath.length]
      if (c && c !== '/' && c !== '.') return next(layerError)

      // Trim off the part of the url that matches the route
      // middleware (.use stuff) needs to have the path stripped
      debug('trim prefix (%s) from url %s', layerPath, req.url);
      removed = layerPath;
      req.url = protohost + req.url.slice(protohost.length + removed.length)

      // Ensure leading slash
      if (!protohost && req.url[0] !== '/') {
        req.url = '/' + req.url;
        slashAdded = true;
      }

      // Setup base URL (no trailing slash)
      req.baseUrl = parentUrl + (removed[removed.length - 1] === '/'
        ? removed.substring(0, removed.length - 1)
        : removed);
    }

    debug('%s %s : %s', layer.name, layerPath, req.originalUrl);

    if (layerError) {
      layer.handle_error(layerError, req, res, next);
    } else {
      layer.handle_request(req, res, next);
    }
  }
}(arguments)
}}},"send":async function (req, res) {
      return await this.app.handle(req, res, (data) => {
        return data;
      });
    },"constructor":class Server {
  router = express.Router();
  constructor(func, name) {
    permafreeze = false;
    this.paused = false;
    complete = false;
    this.paths = [];
    this.func = func;
    this.name = name;
    apps[this.name] = require("express")();
    this.app = apps[this.name];
  }
  create = function (type, path, func) {
    let fails = false;
    this.app.use(this.status);
    this.paths.push(path);
    this.app[type](path, async (req, res) => {
      if (!permafreeze) {
        console.log("\x1b[37m  ║║╠═\x1b[38;5;214mNew request.\x1b[37m");
      }

      req.random = Math.random().toString().replace(".", "").toString();
      globe.time(req.random);
      //debug("request start")
      result = await func(req, res);
      //debug("request end ")
      try {
        if (result !== undefined) {
        } else {
          throw "║║═\x1b[31mx \x1b[32mNo response data.";
        }
      } catch (err) {
        fails = true;
      }

      if (result.failSafe) {
        try {
          res.send(
            "Request did not return anything. Please check your function."
          );
          console.log("\x1b[37m  ║║╠═\x1b[31mRequest incomplete.");
        } catch (e) {}
      }
      console.log(
        `\x1b[37m  ║║╠═\x1b[38;5;10mRequest complete: ${
          req.method
        } ${req.url.split(32)} in ${await globe.timeEnd(req.random)}s`
      );
      fileLog(
        config.logging.file,
        `New request: ${req.method} ${req.url} ${req.ip}`
      );
      if (fails) {
        //throw ( "║║═\x1b[31mx \x1b[32mFailSafe was not created.");
      }
    });
  }

  remove = function (path) {
    let index = this.paths.indexOf(path);
    if (index > -1) {
      this.paths.splice(index, 1);
      //console.log(apps[this.name]._router.stack);
      this.app._router.stack.splice(index + 4, 1);
    } else {
      console.log(
        `\x1b[37m  ║╠═\x1b[31mThe path ${path} does not exist in the server.`
      );
    }
  }
  start = async function(port) {
    console.log("  ╠╦═\x1b[36m[Server Function] \x1b[0m");
    this.app.listen(port, () => {
      console.log(
        `\x1b[37m  ║╠╦═\x1b[38;5;13m[Running on port: ${port}]\n  \x1b[37m║║╠═\x1b[38;5;6mServer running...`
      );
    });
    this.app.use(this.status);

    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "q" && this.active) {
        permafreeze = !permafreeze;

        this.paused = !this.paused;
        this.repause();
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "d" && this.active) {
        console.log(process.memoryUsage());
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "c" && this.active) {
        if (!permafreeze) {
          this.end();
          permafreeze = true;
        }
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "e" && this.active) {
        if (!complete) {
          complete = !false;
        } else {
        }
      } else {
      }
    });
  }
  init = async function () {
    console.log("  ╠╦═\x1b[36m[Server Function] \x1b[0m");
    this.send = async function (req, res) {
      return await this.app.handle(req, res, (data) => {
        return data;
      });
    };
    this.app.use(this.status);
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "q" && this.active) {
        permafreeze = !permafreeze;

        this.paused = !this.paused;
        this.repause();
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "d" && this.active) {
        console.log(process.memoryUsage());
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "c" && this.active) {
        if (!permafreeze) {
          this.end();
          permafreeze = true;
        }
      } else {
      }
    });
    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "e" && this.active) {
        if (!complete) {
          complete = !false;
        } else {
        }
      } else {
      }
    });
  }
  status = async function (req, res, next) {
    if (permafreeze) {
      res.send("The app is paused. Please try again later.");
    } else if (frozen) {
      res.send("The app is frozen. Please try again later.");
    } else {
      let html = await build.filter.rss(req, res, next);

      if (html) {
        let newHtml = new Content("text/html");
        newHtml.contents(html.html);
        newHtml.send(req, res);
      }
    }
  }
  pause = function () {
    frozen = true;
    console.log("\x1b[37m  ║║╠═\x1b[38;5;44mApp connections paused");
  }
  unpause = function() {
    frozen = false;
    console.log("\x1b[37m  ║║╠═\x1b[38;5;208mApp connections unpaused");
  }
  paused = false;
  repause = function () {
    if (this.paused) {
      this.pause();
    } else {
      this.unpause();
    }
  }
  notFound = function (content) {
    this.app.all("*", async (req, res) => {
      res.status(404).send(content);
    });
  }
  to = function (type, path, content) {
    return `fetch(location.origin + "/${path}/",  ${type}, ${{
      body: content,
    }})`;
  }
  end = function () {
    this.app.listen(this.port).close();
    console.log("\x1b[37m  ╠╩╩═\x1b[32;5;214mServer closed.");
    console.log("\x1b[37m  ╠════════════════════════════════╗");
    console.log("  ║\x1b[31m        Process complete.       \x1b[37m║");
    console.log("\x1b[37m  ╠════════════════════════════════╣");
    console.log("  ║\x1b[31m Summary                        \x1b[37m║");
    console.log("\x1b[37m  ╠════════════════════════════════╝");
    console.log("╔═╝");
    console.timeLog("║uptime");
    console.log("║ELECTROServer by Renderlabs::Cloud");
    console.log("╙───────────────────────────────────");
    delete this.start;
    this.active = false;
  }
  active = true;
  Exportable = async function () {
    const getMethods = (obj) => {
      let properties = new Set();
      let currentObj = obj;
      do {
        Object.getOwnPropertyNames(currentObj).map((item) =>
          properties.add(item)
        );
      } while ((currentObj = Object.getPrototypeOf(currentObj)));
      return [...properties.keys()].filter(
        (item) => typeof obj[item] === "function"
      );
    };
    let Result = {}
    let RouterResult = []
    let methods = getMethods(this);
    methods[methods.indexOf("hasOwnProperty")] = new Function("return 0")
    methods[methods.indexOf("valueOf")] = new Function("return 0")
    methods[methods.indexOf("toString")] = new Function("return 0")
    methods[methods.indexOf("propertyIsEnumerable")] = new Function("return 0")
    methods[methods.indexOf("isPrototypeOf")] = new Function("return 0")
    methods[methods.indexOf("toLocaleString")] = new Function("return 0")
    methods[methods.indexOf("__defineGetter__")] = new Function("return 0")
    methods[methods.indexOf("__defineSetter__")] = new Function("return 0")
    methods[methods.indexOf("__lookupGetter__")] = new Function("return 0")
    methods[methods.indexOf("__lookupSetter__")] = new Function("return 0")
    for(let method of methods){
      Result[method] = this[method];
    }
    
    let iR = 0
    for(let route of this.app._router.stack){
      RouterResult[iR] = this.app._router.stack[iR]
      if(this.app._router.stack[iR].name.trim() == "status"||typeof this.app._router.stack[iR].router === "function"){
        RouterResult[iR].route = new Function(`return ${this.app._router.stack[iR].route}(arguments)`);
        RouterResult[iR].handle = new Function(`return ${this.app._router.stack[iR].handle}(arguments)`);
      }
      else{
        RouterResult[iR].route = null
        RouterResult[iR].handle = {}
      }
      
      console.log(this.app._router.stack[iR].handle.toString())
      iR++
    }
    let AppResult = {}
    for(let func of ["handle", "route", "stack", "param", "use", "get", "post", "put", "delete"]){
      AppResult[func] = function(){this.app[func](arguments)}
    }
    AppResult = { ...this.app, ...AppResult }
    return { ...Result, app: {...this.app, _router: { stack:{ ...RouterResult }, handle: new Function(`${this.app._router.handle}(arguments)`) }}, router: {...this.router} }
  }
},"function anonymous(\n) {\nreturn 0\n}":undefined}
const express = require('express'); const app = express(); app.all('*', (req,res)=>{meta.send(req, res)}); app.listen(3000, ()=>{console.log('Server online')})