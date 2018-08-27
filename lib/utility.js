(function () {
  var utility = {
    id: function (idName) {
      return document.getElementById(idName);
    },
    classname: function (className) {
      var elements = document.getElementsByClassName(className);

      if (elements.length > 0) {
        return elements[0];
      }

      return null;
    },
    element: function (elementName) {
      return document.getElementsByTagName(elementName);
    },
    select: function (query) {
      return document.querySelectorAll(query);
    },
    clone: function (obj) {
      var clonedObjectsArray = [];
      var originalObjectsArray = []; //used to remove the unique ids when finished
      var next_objid = 0;

      function objectId(obj) {
        if (obj == null) return null;
        if (obj.__obj_id == undefined) {
          obj.__obj_id = next_objid++;
          originalObjectsArray[obj.__obj_id] = obj;
        }
        return obj.__obj_id;
      }

      function cloneRecursive(obj) {
        if (null == obj || typeof obj == "string" || typeof obj == "number" || typeof obj == "boolean") return obj;

        // Handle Date
        if (obj instanceof Date) {
          var copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
          var copy = [];
          for (var i = 0; i < obj.length; ++i) {
            copy[i] = cloneRecursive(obj[i]);
          }
          return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
          if (clonedObjectsArray[objectId(obj)] != undefined)
            return clonedObjectsArray[objectId(obj)];

          var copy;
          if (obj instanceof Function) //Handle Function
            copy = function () {
              return obj.apply(this, arguments);
            };
          else
            copy = {};

          clonedObjectsArray[objectId(obj)] = copy;

          for (var attr in obj)
            if (attr != "__obj_id" && obj.hasOwnProperty(attr))
              copy[attr] = cloneRecursive(obj[attr]);

          return copy;
        }


        throw new Error("Unable to copy obj! Its type isn't supported.");
      }
      var cloneObj = cloneRecursive(obj);



      //remove the unique ids
      for (var i = 0; i < originalObjectsArray.length; i++) {
        delete originalObjectsArray[i].__obj_id;
      };

      return cloneObj;
    },
    parseQuery: function (str) {
      if (typeof str != "string" || str.length == 0) return {};
      var s = str.split("&");
      var s_length = s.length;
      var bit, query = {},
        first, second;
      for (var i = 0; i < s_length; i++) {
        bit = s[i].split("=");
        first = decodeURIComponent(bit[0]);
        if (first.length == 0) continue;
        second = decodeURIComponent(bit[1]);
        if (typeof query[first] == "undefined") query[first] = second;
        else if (query[first] instanceof Array) query[first].push(second);
        else query[first] = [query[first], second];
      }
      return query;
    }
  };

  if (
    (typeof define !== "undefined" && define !== null ? define.amd : void 0) !=
    null
  ) {
    define(function () {
      return utility;
    });
  } else if (
    (typeof module !== "undefined" && module !== null ?
      module.exports :
      void 0) != null
  ) {
    module.exports = utility;
  } else if (typeof window !== "undefined" && window !== null) {
    if (window.mkUtility == null) {
      window.mkUtility = utility;
    }
  }
}.call(this));