!function (a) {
    function b(b) {
        void 0 == window.DOMParser && window.ActiveXObject && (DOMParser = function () {
        }, DOMParser.prototype.parseFromString = function (a) {
            var b = new ActiveXObject("Microsoft.XMLDOM");
            return b.async = "false", b.loadXML(a), b
        });
        try {
            var c = (new DOMParser).parseFromString(b, "text/xml");
            if (!a.isXMLDoc(c))throw"Unable to parse XML";
            var d = a("parsererror", c);
            if (1 == d.length)throw"Error: " + a(c).text()
        } catch (e) {
            var f = void 0 == e.name ? e : e.name + ": " + e.message;
            return void a(document).trigger("xmlParseError", [f])
        }
        return c
    }

    function c(a, b, c) {
        (a.context ? jQuery(a.context) : jQuery.event).trigger(b, c)
    }

    function d(b, c) {
        var e = !1;
        return"string" == typeof c ? a.isFunction(b.test) ? b.test(c) : b == c : (a.each(b, function (f) {
            return void 0 === c[f] ? e = !1 : (e = !0, "object" == typeof c[f] ? d(b[f], c[f]) : e = a.isFunction(b[f].test) ? b[f].test(c[f]) : b[f] == c[f])
        }), e)
    }

    function e(b, c) {
        if (a.isFunction(b))return b(c);
        if (a.isFunction(b.url.test)) {
            if (!b.url.test(c.url))return null
        } else {
            var e = b.url.indexOf("*");
            if (b.url !== c.url && -1 === e || !new RegExp(b.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace("*", ".+")).test(c.url))return null
        }
        return b.data && c.data && !d(b.data, c.data) ? null : b && b.type && b.type.toLowerCase() != c.type.toLowerCase() ? null : b
    }

    function f(b, c) {
        var d = a.extend({}, a.mockjaxSettings, b);
        d.log && a.isFunction(d.log) && d.log("MOCK " + c.type.toUpperCase() + ": " + c.url, a.extend({}, c))
    }

    function g(c, d, e) {
        var f = function (f) {
            return function () {
                return function () {
                    this.status = c.status, this.statusText = c.statusText, this.readyState = 4, a.isFunction(c.response) && c.response(e), "json" == d.dataType && "object" == typeof c.responseText ? this.responseText = JSON.stringify(c.responseText) : "xml" == d.dataType ? this.responseXML = "string" == typeof c.responseXML ? b(c.responseXML) : c.responseXML : this.responseText = c.responseText, ("number" == typeof c.status || "string" == typeof c.status) && (this.status = c.status), "string" == typeof c.statusText && (this.statusText = c.statusText), a.isFunction(this.onreadystatechange) ? (c.isTimeout && (this.status = -1), this.onreadystatechange(c.isTimeout ? "timeout" : void 0)) : c.isTimeout && (this.status = -1)
                }.apply(f)
            }
        }(this);
        c.proxy ? p({global: !1, url: c.proxy, type: c.proxyType, data: c.data, dataType: "script" === d.dataType ? "text/plain" : d.dataType, complete: function (a) {
            c.responseXML = a.responseXML, c.responseText = a.responseText, c.status = a.status, c.statusText = a.statusText, this.responseTimer = setTimeout(f, c.responseTime || 0)
        }}) : d.async === !1 ? f() : this.responseTimer = setTimeout(f, c.responseTime || 50)
    }

    function h(b, c, d, e) {
        return b = a.extend({}, a.mockjaxSettings, b), "undefined" == typeof b.headers && (b.headers = {}), b.contentType && (b.headers["content-type"] = b.contentType), {status: b.status, statusText: b.statusText, readyState: 1, open: function () {
        }, send: function () {
            e.fired = !0, g.call(this, b, c, d)
        }, abort: function () {
            clearTimeout(this.responseTimer)
        }, setRequestHeader: function (a, c) {
            b.headers[a] = c
        }, getResponseHeader: function (a) {
            return b.headers && b.headers[a] ? b.headers[a] : "last-modified" == a.toLowerCase() ? b.lastModified || (new Date).toString() : "etag" == a.toLowerCase() ? b.etag || "" : "content-type" == a.toLowerCase() ? b.contentType || "text/plain" : void 0
        }, getAllResponseHeaders: function () {
            var c = "";
            return a.each(b.headers, function (a, b) {
                c += a + ": " + b + "\n"
            }), c
        }}
    }

    function i(a, b, c) {
        if (j(a), a.dataType = "json", a.data && r.test(a.data) || r.test(a.url)) {
            l(a, b);
            var d = /^(\w+:)?\/\/([^\/?#]+)/, e = d.exec(a.url), f = e && (e[1] && e[1] !== location.protocol || e[2] !== location.host);
            if (a.dataType = "script", "GET" === a.type.toUpperCase() && f) {
                var g = k(a, b, c);
                return g ? g : !0
            }
        }
        return null
    }

    function j(a) {
        "GET" === a.type.toUpperCase() ? r.test(a.url) || (a.url += (/\?/.test(a.url) ? "&" : "?") + (a.jsonp || "callback") + "=?") : a.data && r.test(a.data) || (a.data = (a.data ? a.data + "&" : "") + (a.jsonp || "callback") + "=?")
    }

    function k(b, c, d) {
        var e = (d && d.context || b, null);
        return c.response && a.isFunction(c.response) ? c.response(d) : a.globalEval("object" == typeof c.responseText ? "(" + JSON.stringify(c.responseText) + ")" : "(" + c.responseText + ")"), m(b, c), n(b, c), jQuery.Deferred && (e = new jQuery.Deferred, e.resolve("object" == typeof c.responseText ? c.responseText : jQuery.parseJSON(c.responseText))), e
    }

    function l(a, b) {
        jsonp = a.jsonpCallback || "jsonp" + s++, a.data && (a.data = (a.data + "").replace(r, "=" + jsonp + "$1")), a.url = a.url.replace(r, "=" + jsonp + "$1"), window[jsonp] = window[jsonp] || function (c) {
            data = c, m(a, b), n(a, b), window[jsonp] = void 0;
            try {
                delete window[jsonp]
            } catch (d) {
            }
            head && head.removeChild(script)
        }
    }

    function m(a, b) {
        a.success && a.success.call(callbackContext, b.response ? b.response.toString() : b.responseText || "", status, {}), a.global && c(a, "ajaxSuccess", [
            {},
            a
        ])
    }

    function n(a) {
        a.complete && a.complete.call(callbackContext, {}, status), a.global && c("ajaxComplete", [
            {},
            a
        ]), a.global && !--jQuery.active && jQuery.event.trigger("ajaxStop")
    }

    function o(b, c) {
        var d, g, j;
        "object" == typeof b ? (c = b, b = void 0) : c.url = b, g = jQuery.extend(!0, {}, jQuery.ajaxSettings, c);
        for (var k = 0; k < q.length; k++)if (q[k] && (j = e(q[k], g)))return f(j, g), "jsonp" === g.dataType && (d = i(g, j, c)) ? d : (j.cache = g.cache, j.timeout = g.timeout, j.global = g.global, function (b, c, e, f) {
            d = p.call(a, a.extend(!0, {}, e, {xhr: function () {
                return h(b, c, e, f)
            }}))
        }(j, g, c, q[k]), d);
        return p.apply(a, [c])
    }

    var p = a.ajax, q = [], r = /=\?(&|$)/, s = (new Date).getTime();
    a.extend({ajax: o}), a.mockjaxSettings = {log: function (a) {
        window.console && window.console.log && window.console.log(a)
    }, status: 200, statusText: "OK", responseTime: 500, isTimeout: !1, contentType: "text/plain", response: "", responseText: "", responseXML: "", proxy: "", proxyType: "GET", lastModified: null, etag: "", headers: {etag: "IJF@H#@923uf8023hFO@I#H#", "content-type": "text/plain"}}, a.mockjax = function (a) {
        var b = q.length;
        return q[b] = a, b
    }, a.mockjaxClear = function (a) {
        1 == arguments.length ? q[a] = null : q = []
    }, a.mockjax.handler = function (a) {
        return 1 == arguments.length ? q[a] : void 0
    }
}(jQuery);