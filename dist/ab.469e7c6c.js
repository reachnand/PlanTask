// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"task.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Task = /*#__PURE__*/function () {
  //add and update working in local storage
  function Task(id, tname, desc, dueDate, assign, status) {
    _classCallCheck(this, Task);

    this.id = id;
    this.tname = tname;
    this.desc = desc;
    this.dueDate = dueDate;
    this.assign = assign;
    this.status = status;
  }

  _createClass(Task, [{
    key: "htmlString",
    value: function htmlString() {
      var htmlStr = "<div class=\"card\">\n       <div class=\"row no-gutters align-items-center\" id=\"editTask\">\n       <div class=\"col\"> <p class=\"text-big\" id=\"".concat(this.id, "\" data-abc=\"true\">").concat(this.tname, "</p>\n       <p class=\"text-big\">").concat(this.desc, "<br>").concat(this.dueDate, "<br>").concat(this.assign, "<br>").concat(this.status, "</p>\n       </div>\n       <button class=\"edit btn btn-warning\" id=\"").concat(this.id, "\"> Edit</button>\n        <button class=\"delete btn btn-danger\" id=\"deleteBtn_").concat(this.id, "\"> Delete</button>\n        </div>");
      return htmlStr;
    } //converting string into HTML

  }, {
    key: "toElement",
    value: function toElement() {
      var htmlElement = this.htmlString(); //assigning function to var

      var element = document.createRange().createContextualFragment(htmlElement);
      element.querySelector("button.edit").addEventListener("click", editTask);
      element.querySelector("button.delete").addEventListener("click", delfunc);
      return element;
    }
  }]);

  return Task;
}(); //class Task closed


exports.default = Task;
},{}],"taskmanager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _task = _interopRequireDefault(require("./task.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TaskManager = /*#__PURE__*/function () {
  function TaskManager(master) {
    _classCallCheck(this, TaskManager);

    this.taskArr = []; // checking for the curr id val. if 0 then assign 1 to it

    this.currentId = parseInt(localStorage.getItem('currentId')) || 1;
    localStorage.setItem('currentId', this.currentId);
    this.master = master;
  }

  _createClass(TaskManager, [{
    key: "addTask",
    value: function addTask(tname, desc, dueDate, assign, status) {
      //Defining Function/Method to Add TASK
      //validation(); 
      var ntask = new _task.default("ntask".concat(this.currentId++), tname, desc, dueDate, assign, status); //instance for Task class

      this.taskArr.push(ntask); //pushing newtask into tasksarr array
      //adding to local storage

      localStorage.setItem('currentId', this.currentId); // to access the object/ string from json

      var mynewtasks = JSON.parse(localStorage.getItem("mytasks")) || []; // local storage 

      mynewtasks.push(ntask);
      localStorage.setItem('mytasks', JSON.stringify(mynewtasks));
    }
  }, {
    key: "updateTask",
    value: function updateTask(id, tname, desc, dueDate, assign, status) {
      //Function to update TASK
      for (var i = 0; i < this.taskArr.length; i++) {
        if (this.taskArr[i].id === id) {
          this.taskArr[i].tname = tname;
          this.taskArr[i].desc = desc;
          this.taskArr[i].dueDate = dueDate;
          this.taskArr[i].assign = assign;
          this.taskArr[i].status = status; // Local storage

          var mynewtasks = JSON.parse(localStorage.getItem("mytasks"));
          mynewtasks[i].tname = tname;
          mynewtasks[i].desc = desc;
          mynewtasks[i].dueDate = dueDate;
          mynewtasks[i].assign = assign;
          mynewtasks[i].status = status;
          localStorage.setItem("mytasks", JSON.stringify(mynewtasks));
          break;
        }
      }
    }
  }, {
    key: "deletFunc",
    value: function deletFunc(id) {
      for (var i = 0; i < this.taskArr.length; i++) {
        if (this.taskArr[i].id === id) {
          this.taskArr.splice(i, 1); // Local storage

          var mynewtasks = JSON.parse(localStorage.getItem("mytasks"));
          mynewtasks.splice(i, 1);
          localStorage.setItem("mytasks", JSON.stringify(mynewtasks));
          break;
        }
      }
    }
  }, {
    key: "displayListHtml",
    value: function displayListHtml() {
      var _this = this;

      this.master.innerHTML = "";
      var cardhtml;
      this.taskArr.forEach(function (ntask) {
        var taskElement = ntask.toElement();

        _this.master.append(taskElement);
      });
    }
  }]);

  return TaskManager;
}();

exports.default = TaskManager;
},{"./task.js":"task.js"}],"ab.js":[function(require,module,exports) {
"use strict";

var _taskmanager = _interopRequireDefault(require("./taskmanager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Task from "./task.js"
var taskcontainer = document.querySelector("#taskcontainer"); //parent master 

var taskmanager = new _taskmanager.default(taskcontainer); //instance

addBtn.onclick = function addingtask() {
  //    function addingtask() {
  var tname = document.querySelector("#tname"); //accepting user input from form

  var desc = document.querySelector("#desc");
  var dueDate = document.querySelector("#dueDate");
  var assign = document.querySelector("#assign");
  var status = document.querySelector("#status");
  taskmanager.addTask(tname.value, desc.value, dueDate.value, assign.value, status.value); //this will push the array into taskArr[]

  taskmanager.displayListHtml();
  $('#addTaskModal').modal('hide');
  resetFields();
}; //addBtn.addEventListener("click", validation);


function resetFields() {
  tname.value = null;
  desc.value = null;
  dueDate.value = null;
  assign.value = null;
  status.value = null;
}

function editTask() {
  var btnElement = $(event.target); //A reference to the object on which the event originally occured

  console.log(btnElement);
  var tid = btnElement[0].id;
  var task = taskmanager.taskArr.find(function (t) {
    return tid === t.id;
  });
  console.log(task);
  alert(task); //alert(taskmanager.taskArr.length);

  for (i = 0; i < taskmanager.taskArr.length; i++) {
    if (tid == taskmanager.taskArr[i].id) {
      document.querySelector("#editTaskId").value = tid; //accepting user input from form
      // alert(taskmanager.taskArr[i].tname);

      document.querySelector("#edittaskname").value = taskmanager.taskArr[i].tname; //Loading modal with prefilled task details

      document.querySelector("#editdesc").value = taskmanager.taskArr[i].desc;
      document.querySelector("#editdueDate").value = taskmanager.taskArr[i].dueDate;
      document.querySelector("#editassign").value = taskmanager.taskArr[i].assign;
      document.querySelector("#editstatus").value = taskmanager.taskArr[i].status;
      break;
    }
  }

  $("#editTaskModal").modal("show");
}

var updateTaskBtn = document.querySelector('#updateTaskBtn');

updateTaskBtn.onclick = function () {
  var tempId = document.querySelector("#editTaskId").value; //accepting user input from form

  var tempname = document.querySelector("#edittaskname").value; //accepting user input from form

  var tempdesc = document.querySelector("#editdesc").value;
  var tempdueDate = document.querySelector("#editdueDate").value;
  var tempassign = document.querySelector("#editassign").value;
  var tempstatus = document.querySelector("#editstatus").value;
  taskmanager.updateTask(tempId, tempname, tempdesc, tempdueDate, tempassign, tempstatus); //alert("after update")

  taskmanager.displayListHtml();
  $('#editTaskModal').modal('hide');
};

function delfunc() {
  //Function to delete TASK
  var taskElement = event.target.closest(".delete"); //see line 74.

  var delIdArr = taskElement.id.split("_"); //spliting the id by underscore. i.e . dbuton_id 

  var retreiveId = delIdArr[1];
  alert(retreiveId);
  taskmanager.deletFunc(retreiveId);
  taskmanager.displayListHtml();
}

displayStorageTasks();

function displayStorageTasks() {
  var mynewtasks = JSON.parse(window.localStorage.getItem('mytasks'));
  var displayHtml = "";

  if (mynewtasks) {
    for (var _i = 0; _i < mynewtasks.length; _i++) {
      displayHtml = "<div class=\"card\">\n                <div class=\"row no-gutters align-items-center\" id=\"editTask\">\n                <div class=\"col\"> <p class=\"text-big\" id=\"".concat(this.id, "\" data-abc=\"true\">").concat(this.tname, "</p>\n                <p class=\"text-big\">").concat(this.desc, "<br>").concat(this.dueDate, "<br>").concat(this.assign, "<br>").concat(this.status, "</p>\n                </div>\n                <button class=\"edit btn btn-warning\" id=\"").concat(this.id, "\"> Edit</button>\n                 <button class=\"delete btn btn-danger\" id=\"deleteBtn_").concat(this.id, "\"> Delete</button>\n                 </div>");
      return displayHtml;
    }
  }
}
},{"./taskmanager.js":"taskmanager.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60191" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ab.js"], null)
//# sourceMappingURL=/ab.469e7c6c.js.map