// https://github.com/romsson/d3-gridding v0.1.2 Copyright 2019 Romain Vuillemot
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("d3-scale"), require("d3-array"), require("d3-hierarchy"), require("d3-shape")) : "function" == typeof define && define.amd ? define(["exports", "d3-scale", "d3-array", "d3-hierarchy", "d3-shape"], t) : t((e = e || self).d3 = e.d3 || {}, e.d3, e.d3, e.d3, e.d3)
}(this, (function (e, t, i, n, _) {
    "use strict";

    function r(e, t) {
        t.shiftX || (t.shiftX = .5), t.shiftY || (t.shiftY = .5);
        var i = Math.ceil(Math.sqrt(e.length)),
            n = Math.ceil(e.length / i);
        return t.x.domain([0, i]).range([0, t.size[0] - t.size[0] / i]), t.y.domain([0, n]).range([0, t.size[1] - t.size[1] / n]), e.forEach((function (e, _) {
            var r = _ % i,
                o = Math.floor(_ / i);
            e[t.__x] = t.x(r) + t.offset[0] + t.padding, e[t.__y] = t.y(o) + t.offset[1] + t.padding, e[t.__width] = t.x.range()[1] / i - 2 * t.padding, e[t.__height] = t.y.range()[1] / n - 2 * t.padding, "left" === t.orient ? o % 2 == 1 && (e[t.__x] += e[t.__width] * t.shiftX) : "up" === t.orient ? r % 2 == 1 && (e[t.__y] += e[t.__height] * t.shiftY) : "down" === t.orient ? r % 2 == 0 && (e[t.__y] += e[t.__height] * t.shiftY) : "right" === t.orient ? o % 2 == 0 && (e[t.__x] += e[t.__width] * t.shiftX) : "none" === t.orient ? (e[t.__x] += 0, e[t.__y] += 0) : o % 2 == 0 && (e[t.__x] += e[t.__width] * t.shiftX), e[t.__cx] = e[t.__x] + e[t.__width] / 2, e[t.__cy] = e[t.__y] + e[t.__height] / 2
        })), e
    }

    function o(e, t) {
        return e.forEach((function (e) {
            e[t.__x] = 0 + t.padding + t.offset[0], e[t.__y] = 0 + t.padding + t.offset[1], e[t.__width] = t.size[0] - 2 * t.padding, e[t.__height] = t.size[1] - 2 * t.padding, e[t.__cx] = e[t.__x] + e[t.__width] / 2, e[t.__cy] = e[t.__y] + e[t.__height] / 2, e[t.__tx] = e[t.__cx] / 2, e[t.__ty] = t.padding / 2, e[t.__lx] = e[t.__cx] + t.padding / 2, e[t.__ly] = 0, e[t.__rx] = e[t.__cx] - t.padding / 2, e[t.__ry] = e[t.__yx] / 2
        })), e
    }

    function a(e, t) {
        var i = t.size[0] / (2 * e.length),
            n = t.size[1] / (2 * e.length);
        return e.forEach((function (_, r) {
            _[t.__x] = 0 + t.offset[0] + i * r, _[t.__y] = 0 + t.offset[1] + n * r, _[t.__width] = t.size[0] - i * e.length, _[t.__height] = t.size[1] - n * e.length, _[t.__cx] = _[t.__x] + _[t.__width] / 2, _[t.__cy] = _[t.__y] + _[t.__height] / 2
        })), e
    }

    function h(e, t) {
        return "object" == typeof e.margin ? "vertical" === t ? h(e, "top") + h(e, "bottom") : "horizontal" === t ? h(e, "left") + h(e, "right") : +e.margin[t] || 0 : +e.margin || 0
    }

    function u(e, t) {
        var n, _, r, o, a, u;
        return t.valueX ? "function" == typeof t.valueX && "string" == typeof t.valueX(e[0]) && t.valueX(e[0]).indexOf("px") === t.valueX(e[0]).length - 2 ? (n = function (e) {
            return +t.valueX(e).replace("px", "")
        }, _ = t.size[0]) : "string" == typeof t.valueX ? (n = function (e) {
            return e[t.valueX]
        }, _ = i.max(e, n)) : (n = t.valueX, _ = i.max(e, n)) : (n = function () {
            return Math.random()
        }, _ = 1), t.x.domain([0, _]).range([h(t, "left") + t.padding, t.size[0] - h(t, "right") - t.padding]), t.valueY ? "function" == typeof t.valueY && "string" == typeof t.valueY(e[0]) && t.valueY(e[0]).indexOf("px") === t.valueY(e[0]).length - 2 ? (r = function (e) {
            return +t.valueY(e).replace("px", "")
        }, o = t.size[1] - h(t, "left")) : "string" == typeof t.valueY ? (r = function (e) {
            return e[t.valueY]
        }, o = i.max(e, r)) : (r = t.valueY, o = i.max(e, t.valueY)) : (r = function () {
            return Math.random()
        }, o = 1), t.y.domain([0, o]).range([h(t, "top") + t.padding, t.size[1] - h(t, "bottom") - t.padding]), t.valueWidth ? "function" == typeof t.valueWidth && "string" == typeof t.valueWidth(e[0]) && t.valueWidth(e[0]).indexOf("px") === t.valueWidth(e[0]).length - 2 ? (a = function (e) {
            return +t.valueWidth(e).replace("px", "")
        }, t.width.domain([0, _])) : "string" == typeof t.valueWidth ? (a = function (e) {
            return e[t.valueWidth]
        }, t.width.domain([0, _])) : "number" == typeof t.valueWidth ? (a = function () {
            return t.valueWidth
        }, t.width.domain([0, t.size[0]])) : (a = t.valueWidth, t.width.domain([0, _])) : (a = function () {
            return 1
        }, t.width.domain([0, e.length])), t.width.range([0, t.size[0] - h(t, "horizontal") - 2 * t.padding]), t.valueHeight ? "function" == typeof t.valueHeight && "string" == typeof t.valueHeight(e[0]) && t.valueHeight(e[0]).indexOf("px") === t.valueHeight(e[0]).length - 2 ? (u = function (e) {
            return +t.valueHeight(e).replace("px", "")
        }, t.height.domain([0, o])) : "string" == typeof t.valueWidth ? (u = function (e) {
            return e[t.valueHeight]
        }, t.height.domain([0, o])) : "number" == typeof t.valueWidth ? (u = function () {
            return t.valueHeight
        }, t.height.domain([0, t.size[0]])) : (u = t.valueHeight, t.height.domain([0, o])) : (u = function () {
            return 1
        }, t.height.domain([0, e.length]).range([0, t.size[1]])), t.height.range([0, t.size[1] - h(t, "vertical") - 2 * t.padding]), e.forEach((function (e) {
            e[t.__x] = t.x(n(e)) + t.offset[0], e[t.__y] = t.y(r(e)) + t.offset[1], e[t.__width] = t.width(a(e)), e[t.__height] = t.height(u(e)), e[t.__cx] = e[t.__x] + e[t.__width] / 2, e[t.__cy] = e[t.__y] + e[t.__height] / 2
        })), e
    }

    function d(e, t) {
        var n, _, r = t.size[0] / (2 * e.length),
            o = t.size[1] / (2 * e.length);
        return t.valueWidth ? "number" == typeof t.valueWidth ? (n = function () {
            return t.valueWidth
        }, t.width.domain([0, t.size[0]]).range([0, t.size[0] - 2 * t.padding])) : (n = t.valueWidth, t.width.domain([0, i.max(e, n)]).range([0, t.size[0] - 2 * t.padding])) : (n = function (e, t) {
            return t
        }, t.width.domain([0, e.length]).range([0, t.size[0] - 2 * t.padding])), t.valueHeight ? "number" == typeof t.valueHeight ? (_ = function () {
            return t.valueHeight
        }, t.height.domain([0, t.size[1]]).range([0, t.size[1] - 2 * t.padding])) : (_ = t.valueHeight, t.height.domain([0, i.max(e, _)]).range([0, t.size[1] - 2 * t.padding])) : (_ = function (e, t) {
            return t
        }, t.height.domain([0, e.length]).range([0, t.size[1] - 2 * t.padding])), e.forEach((function (e, i) {
            e[t.__width] = t.size[0] - r * i * 2, e[t.__height] = t.size[1] - o * i * 2, "top right" === t.orient ? (e[t.__x] = t.size[0] - e.width + t.offset[0], e[t.__y] = 0 + t.offset[1]) : "bottom right" === t.orient ? (e[t.__x] = t.size[0] - e[t.__width] + t.offset[0], e[t.__y] = t.size[1] - e[t.__height] + t.offset[1]) : "bottom left" === t.orient ? (e[t.__x] = 0 + t.offset[0], e[t.__y] = t.size[1] - e[t.__height] + t.offset[1]) : "top" === t.orient ? (e[t.__width] = t.width(n(e, i)) - h(t, "horizontal"), e[t.__height] = t.height(_(e, i)) - h(t, "vertical"), e[t.__x] = 0 + t.offset[0] + t.size[0] / 2 - e[t.__width] / 2 + t.padding, e[t.__y] = 0 + t.offset[1] + t.padding) : "bottom" === t.orient ? (e[t.__width] = t.width(n(e, i)) - h(t, "horizontal"), e[t.__height] = t.size[1] - 10 - 3 * i, e[t.__x] = 0 + t.offset[0] + t.size[0] / 2 - e[t.__width] / 2 + 2 * i, e[t.__y] = 0 + t.offset[1] + t.size[1] - e[t.__height]) : "middle" === t.orient ? (e[t.__width] = t.width(n(e, i)) - h(t, "horizontal"), e[t.__height] = t.height(_(e, i)) - h(t, "vertical"), e[t.__x] = 0 + t.offset[0] + t.size[0] / 2 - e[t.__width] / 2, e[t.__y] = 0 + t.offset[1] + t.size[1] / 2 - e[t.__height] / 2) : (e[t.__x] = 0 + t.offset[0], e[t.__y] = 0 + t.offset[1], e[t.__width] = t.width(n(e, i)) - h(t, "horizontal"), e[t.__height] = t.height(_(e, i)) - h(t, "vertical")), e[t.__cx] = e[t.__x] + e[t.__width] / 2, e[t.__cy] = e[t.__y] + e[t.__height] / 2
        })), e
    }

    function f(e, t) {
        return t.x.domain([0, e.length]).range([0, t.size[0]]), t.y.domain([0, e.length]).range([0, t.size[1]]), e.forEach((function (i, n) {
            "up" == t.orient ? (i[t.__x] = t.x(n) + t.offset[0] + t.padding, i[t.__y] = t.size[1] - (t.y(n) + t.offset[1]) - t.size[1] / e.length + t.padding) : (i[t.__x] = t.x(n) + t.offset[0] + t.padding, i[t.__y] = t.y(n) + t.offset[1] + t.padding), i[t.__width] = t.size[0] / e.length - 2 * t.padding, i[t.__height] = t.size[1] / e.length - 2 * t.padding, i[t.__cx] = i[t.__x] + i[t.__width] / 2, i[t.__cy] = i[t.__y] + i[t.__height] / 2
        })), e
    }

    function l(e, t) {
        var i, n;
        return t.sort && (e = e.sort(t.sort)), i = t.cols ? t.cols : Math.ceil(Math.sqrt(e.length)), n = t.rows ? t.rows : Math.ceil(e.length / i), t.cellSize && (t.size[0] = t.cellSize[0] * i, t.size[1] = t.cellSize[1] * n), t.width.domain([0, e.length]).range([h(t, "left"), t.size[0] - t.padding - h(t, "horizontal")]), t.height.domain([0, 1]).range([0, t.size[1] - t.padding - h(t, "vertical")]), t.x.domain([0, i]).range([h(t, "left"), t.size[0] - h(t, "right")]), t.y.domain([0, n]).range([h(t, "top"), t.size[1] - h(t, "bottom")]), e.forEach((function (e, _) {
            var r = _ % i,
                o = Math.floor(_ / i);
            e[t.__x] = t.x(r) + t.offset[0] + t.padding, e[t.__y] = t.y(o) + t.offset[1] + t.padding, e[t.__width] = (t.size[0] - h(t, "horizontal")) / i - 2 * t.padding, e[t.__height] = (t.size[1] - h(t, "vertical")) / n - 2 * t.padding, "up" == t.orient ? e[t.__y] = t.size[1] - e[t.__y] - e[t.__height] : "down" == t.orient ? e[t.__y] = t.y(o) + t.offset[1] + t.padding : "left" == t.orient ? e[t.__y] = t.y(o) + t.offset[1] + t.padding : (t.orient, e[t.__y] = t.y(o) + t.offset[1] + t.padding), e[t.__cx] = e[t.__x] + e[t.__width] / 2, e[t.__cy] = e[t.__y] + e[t.__height] / 2, e.tx = e[t.__x] + e[t.__width] / 2, e.ty = t.padding / 2
        })), e
    }

    function s(e, t) {
        var n, _;
        return t.sort && (e = e.sort(t.sort)), t.valueHeight ? (n = t.valueHeight, t.height.domain([0, i.sum(e, n)]).range([0, t.size[1] - 2 * t.padding])) : (n = function () {
            return 1
        }, t.height.domain([0, e.length]).range([0, t.size[1] - 2 * t.padding])), t.valueWidth ? (_ = t.valueWidth, t.width.domain([0, i.max(e, _)]).range([0, t.size[0] - 2 * t.padding - h(t, "left") - h(t, "right")])) : (_ = function () {
            return 1
        }, t.width.domain([0, 1]).range([0, t.size[0] - 2 * t.padding - h(t, "left") - h(t, "right")])), e.length > 0 && (e[0].y0 = t.padding), e.forEach((function (i, r) {
            i[t.__y] = i.y0 + t.offset[1] + h(t, "top"), "right" === t.orient ? i[t.__x] = 0 + t.offset[0] + t.padding + h(t, "left") : "left" === t.orient ? i[t.__x] = t.size[0] - t.width(_(i)) + t.offset[0] - t.padding + h(t, "right") : "up" === t.orient ? i[t.__x] = 0 + t.offset[0] + t.padding + h(t, "left") : "center" === t.orient ? i[t.__x] = t.size[0] / 2 - t.width(_(i)) / 2 + t.offset[0] + h(t, "left") : i[t.__x] = 0 + t.offset[0] + t.padding + h(t, "left"), i[t.__width] = t.width(_(i)), i[t.__height] = t.height(n(i)), r < e.length - 1 && (e[r + 1].y0 = i.y0 + i[t.__height]), i[t.__height] -= h(t, "top") + h(t, "bottom"), i[t.__cx] = i[t.__x] + i[t.__width] / 2, i[t.__cy] = i[t.__y] + i[t.__height] / 2
        })), e
    }

    function g(e, t) {
        return e.forEach((function (e) {
            e[t.__x] = e[t.__x] || 0, e[t.__y] = e[t.__y] || 0, e[t.__width] = e[t.__width] || t.size[0], e[t.__height] = e[t.__height] || t.size[1], e[t.__cx] = e[t.__cx] || e[t.__x] + e[t.__width] / 2, e[t.__cy] = e[t.__cy] || e[t.__y] + e[t.__height] / 2
        })), e
    }

    function c(e, t) {
        var _, r, o = n.pack().size([t.size[0], t.size[1]]).padding(t.padding)(n.stratify().id((function (e, t) {
            return t
        })).parentId((function (e, t) {
            return 0 === t ? "" : 0
        }))([{}].concat(e)).sum((function () {
            return 1
        })));
        return t.valueWidth ? "number" == typeof t.valueWidth ? (_ = function () {
            return t.valueWidth
        }, t.width.domain([0, t.size[0]]).range([0, t.size[0] - 2 * t.padding])) : (_ = t.valueWidth, t.width.domain(i.extent(e, t.valueX)).range([0, t.size[0]])) : (_ = function (e, t) {
            return o.children[t].r
        }, t.width.domain([0, 1]).range([0, 1])), t.valueHeight ? "number" == typeof t.valueHeight ? (r = function () {
            return t.valueHeight
        }, t.height.domain([0, t.size[1]]).range([0, t.size[1] - 2 * t.padding])) : (r = t.valueHeight, t.height.domain(i.extent(e, t.valueY)).range([0, t.size[1]])) : (r = function (e, t) {
            return o.children[t].r
        }, t.width.domain([0, 1]).range([0, 1])), e.forEach((function (e, i) {
            e[t.__x] = o.children[i].x + t.offset[0], e[t.__y] = o.children[i].y + t.offset[1], e[t.__width] = t.width(_(e, i)), e[t.__height] = t.height(r(e, i)), e[t.__cx] = e[t.__x] + e[t.__width] / 2, e[t.__cy] = e[t.__y] + e[t.__height] / 2
        })), e
    }

    function p(e, t, i, n, _) {
        var r = Math.PI / 180 * _,
            o = Math.cos(r),
            a = Math.sin(r);
        return [o * (i - e) + a * (n - t) + e, o * (n - t) - a * (i - e) + t]
    }

    function y(e, t) {
        var i, n;
        return e.forEach((function (_, r) {
            "down" == t.orient ? (i = t.size[0] / (2 * e.length), n = t.size[1] / (2 * e.length), _[t.__x] = 0 + t.offset[0] + i * r, _[t.__y] = 0 + t.offset[1] + n * r * 2, _[t.__width] = t.size[0] - i * r * 2, _[t.__height] = t.size[1] - n * r * 2, _[t.__cx] = _[t.__x] + _[t.__width] / 2, _[t.__cy] = _[t.__y] + n) : "up" == t.orient ? (i = t.size[0] / (2 * e.length), n = t.size[1] / (2 * e.length), _[t.__x] = 0 + t.offset[0] + i * r, _[t.__y] = 0 + t.offset[1], _[t.__width] = t.size[0] - i * r * 2, _[t.__height] = t.size[1] - n * r * 2, _[t.__cx] = _[t.__x] + _[t.__width] / 2, _[t.__cy] = _[t.__y] + n * r * 2 + n) : (i = t.size[0] / (2 * e.length), n = t.size[1] / (2 * e.length), _[t.__x] = 0 + t.offset[0] + i * r, _[t.__y] = 0 + t.offset[1] + n * r, _[t.__width] = t.size[0] - i * r * 2, _[t.__height] = t.size[1] - n * r * 2, _[t.__cx] = _[t.__x] + _[t.__width] / 2, _[t.__cy] = _[t.__y] + _[t.__height] / 2, null !== t.rotate && (_.__p = [], _.__p.push(p(_[t.__cx], _[t.__cy], _[t.__x], _[t.__y], t.rotate)), _.__p.push(p(_[t.__cx], _[t.__cy], _[t.__x] + _[t.__width], _[t.__y], t.rotate)), _.__p.push(p(_[t.__cx], _[t.__cy], _[t.__x] + _[t.__width], _[t.__y] + _[t.__height], t.rotate)), _.__p.push(p(_[t.__cx], _[t.__cy], _[t.__x], _[t.__y] + _[t.__height], t.rotate)), _.__p.push(p(_[t.__cx], _[t.__cy], _[t.__x], _[t.__y], t.rotate))))
        })), e
    }

    function v(e, t) {
        t.radius || (t.radius = Math.min(t.size[0], t.size[1]) - t.size[1] / e.length * 2);
        var i = _.arc().outerRadius(t.radius).innerRadius(0),
            n = _.pie().sort(t.sort).value((function () {
                return 1
            }))(e);
        return e.forEach((function (_, r) {
            _[t.__width] = t.size[0] / e.length, _[t.__height] = t.size[1] / e.length, _[t.__x] = i.centroid(n[r])[0] + t.size[0] / 2 + t.offset[0] - _[t.__width] / 2 + t.padding, _[t.__y] = i.centroid(n[r])[1] + t.size[1] / 2 + t.offset[1] - _[t.__height] / 2 + t.padding, _[t.__cx] = _[t.__x] + _[t.__width] / 2, _[t.__cy] = _[t.__y] + _[t.__height] / 2
        })), e
    }

    function x(e, t) {
        t.sort && (e = e.sort(t.sort));
        var n = _.stack().keys(e.map((function (e, t) {
            return t + "_"
        }))).order(_.stackOrderDescending).value((function (t, i) {
            return e.indexOf(t[i])
        }));
        t.y.domain([0, i.sum(i.range(e.length)) + e.length]).range([0, t.size[1]]);
        var r = {};
        e.map((function (e, t) {
            r[t + "_"] = e
        }));
        var o = n([r]);
        return e.forEach((function (e, i) {
            var n = o[i][0];
            e[t.__x] = t.offset[0] + t.padding, e[t.__y] = t.y(n[1]) + t.offset[1] + t.padding, e[t.__width] = t.size[0], e[t.__height] = t.y(n[1]) - t.y(n[0]), e[t.__cx] = e[t.__x] + e[t.__width] / 2, e[t.__cy] = e[t.__y] + e[t.__height] / 2
        })), e
    }

    function z(e, t) {
        var i = t.size[0] / (2 * e.length);
        return e.forEach((function (e, n) {
            e[t.__x] = 0 + t.offset[0] + i * n + t.padding, e[t.__y] = 0 + t.offset[1] + t.padding, e[t.__width] = t.size[0] - i * n * 2, e[t.__height] = t.size[1], e[t.__cx] = e[t.__x] + e[t.__width] / 2, e[t.__cy] = e[t.__y] + e[t.__height] / 2
        })), e
    }

    function w(e, t) {
        var i = n.stratify().id(t.id).parentId(t.parentId)(e),
            _ = n.tree().size([t.size[0], t.size[1] / 2]),
            r = n.hierarchy(i, (function (e) {
                return e.children
            }));
        return r = _(r), e.forEach((function (i, n) {
            i[t.__width] = t.cellSize ? t.cellSize[0] : t.size[0] / e.length, i[t.__height] = t.cellSize ? t.cellSize[1] : t.size[1] / e.length, i[t.__x] = r.descendants()[n].x + t.offset[0] - i[t.__width] / 2, i[t.__y] = r.descendants()[n].y + t.offset[1], i[t.__cx] = i[t.__x] + i[t.__width] / 2, i[t.__cy] = i[t.__y] + i[t.__height] / 2
        })), e
    }

    function m(e, t) {
        var i = n.treemap().size([t.size[0] - h(t, "left") - h(t, "right"), t.size[1] - h(t, "top") - h(t, "bottom")]).padding(t.padding),
            _ = n.stratify().parentId((function (e) {
                return e.___parent_id
            }));
        e.forEach((function (e, t) {
            e.id = "_" + t, e.___parent_id = "_x"
        }));
        var r = _(e.concat([{
            id: "_x",
            ___parent_id: ""
        }])).sum((function (e) {
            return "" === e.___parent_id ? 0 : 1
        }));
        return t.valueHeight && r.sum((function (e) {
            return t.valueHeight(e)
        })), t.sort && (t.sortAsc ? r.sort((function (e, t) {
            return e.value - t.value
        })) : r.sort((function (e, t) {
            return t.value - e.value
        }))), i(r).leaves().forEach((function (i, n) {
            i.data[t.__x] = i.x0 + t.offset[0] + h(t, "left"), i.data[t.__y] = i.y0 + t.offset[1] + h(t, "top"), i.data[t.__width] = i.x1 - i.x0, i.data[t.__height] = i.y1 - i.y0, i.data[t.__cx] = e[n][t.__x] + e[n][t.__width] / 2, i.data[t.__cy] = e[n][t.__y] + e[n][t.__height] / 2
        })), e
    }

    function k(e, t) {
        var n, _;
        return t.sort && (e = e.sort(t.sort)), t.valueWidth ? (n = t.valueWidth, t.width.domain([0, i.sum(e, n)]).range([0, t.size[0] - 2 * t.padding])) : (n = function () {
            return 1
        }, t.width.domain([0, e.length]).range([0, t.size[0] - 2 * t.padding])), t.valueHeight ? (_ = t.valueHeight, t.height.domain([0, i.max(e, _)]).range([0, t.size[1] - 2 * t.padding])) : (_ = function () {
            return 1
        }, t.height.domain([0, 1]).range([0, t.size[1] - 2 * t.padding])), e.length > 0 && (e[0].x0 = t.padding), e.forEach((function (i, r) {
            i[t.__x] = i.x0 + t.offset[0] + h(t, "left"), "down" === t.orient ? i[t.__y] = 0 + t.offset[1] + h(t, "top") + t.padding : "up" === t.orient ? i[t.__y] = t.size[1] - t.height(_(i)) + t.offset[1] + h(t, "bottom") - t.padding : "center" === t.orient ? i[t.__y] = t.size[1] / 2 - t.height(_(i)) / 2 + t.offset[1] + h(t, "top") - t.padding : i[t.__y] = t.size[1] - t.height(_(i)) + t.offset[1] + h(t, "bottom") - t.padding, i[t.__height] = t.height(_(i)) - h(t, "top") - h(t, "bottom"), i[t.__width] = t.width(n(i)), r < e.length - 1 && (e[r + 1].x0 = i.x0 + i[t.__width]), i[t.__width] -= h(t, "left") + h(t, "right"), i[t.__cx] = i[t.__x] + i[t.__width] / 2, i[t.__cy] = i[t.__y] + i[t.__height] / 2, null !== t.rotate && (i.__p = [], i.__p.push(p(t.size[0] / 2, t.size[1] / 2, i[t.__x], i[t.__y], t.rotate)), i.__p.push(p(t.size[0] / 2, t.size[1] / 2, i[t.__x] + i[t.__width], i[t.__y], t.rotate)), i.__p.push(p(t.size[0] / 2, t.size[1] / 2, i[t.__x] + i[t.__width], i[t.__y] + i[t.__height], t.rotate)), i.__p.push(p(t.size[0] / 2, t.size[1] / 2, i[t.__x], i[t.__y] + i[t.__height], t.rotate)), i.__p.push(p(t.size[0] / 2, t.size[1] / 2, i[t.__x], i[t.__y], t.rotate)))
        })), e
    }
    e.gridding = function () {
        var e = {
            __prefix: "",
            __x: "",
            __y: "",
            __width: "",
            __height: "",
            __cx: "",
            __cy: "",
            __r: "",
            cellSize: null,
            cols: null,
            height: t.scaleLinear(),
            id: function (e, t) {
                return t
            },
            layout: g,
            margin: 0,
            mode: "identity",
            modes: {
                brick: {
                    layout: r,
                    properties: [{
                        key: "orient",
                        value: "left"
                    }, {
                        key: "orient",
                        value: "right",
                        default: !0
                    }, {
                        key: "orient",
                        value: "up"
                    }, {
                        key: "orient",
                        value: "down"
                    }]
                },
                cascade: {
                    layout: a,
                    properties: []
                },
                central: {
                    layout: o,
                    properties: []
                },
                coordinate: {
                    layout: u,
                    properties: [{
                        key: "valueX",
                        value: null
                    }, {
                        key: "valueY",
                        value: null
                    }]
                },
                corner: {
                    layout: d,
                    properties: [{
                        key: "orient",
                        value: "top right"
                    }]
                },
                diagonal: {
                    layout: f,
                    properties: [{
                        key: "orient",
                        value: "top"
                    }]
                },
                grid: {
                    layout: l,
                    properties: [{
                        key: "orient",
                        value: "up"
                    }, {
                        key: "orient",
                        value: "down",
                        default: !0
                    }, {
                        key: "orient",
                        value: "left"
                    }, {
                        key: "orient",
                        value: "right"
                    }]
                },
                horizontal: {
                    layout: s,
                    properties: [{
                        key: "orient",
                        value: "up"
                    }, {
                        key: "orient",
                        value: "left"
                    }, {
                        key: "orient",
                        value: "right"
                    }, {
                        key: "orient",
                        value: "center"
                    }, {
                        key: "valueY",
                        value: null
                    }, {
                        key: "valueWidth",
                        value: null
                    }]
                },
                pack: {
                    layout: c,
                    properties: []
                },
                pyramid: {
                    layout: y,
                    properties: [{
                        key: "orient",
                        value: "center",
                        default: !0
                    }, {
                        key: "orient",
                        value: "up"
                    }, {
                        key: "orient",
                        value: "down"
                    }]
                },
                radial: {
                    layout: v,
                    properties: [{
                        key: "orient",
                        value: "top"
                    }]
                },
                stack: {
                    layout: x,
                    properties: [{
                        key: "orient",
                        value: "top"
                    }]
                },
                step: {
                    layout: z,
                    properties: [{
                        key: "orient",
                        value: "top"
                    }]
                },
                tree: {
                    layout: w,
                    properties: [{
                        key: "orient",
                        value: "top"
                    }]
                },
                treemap: {
                    layout: m,
                    properties: []
                },
                vertical: {
                    layout: k,
                    properties: [{
                        key: "orient",
                        value: "up",
                        default: !0
                    }, {
                        key: "orient",
                        value: "left"
                    }, {
                        key: "orient",
                        value: "right"
                    }, {
                        key: "orient",
                        value: "center"
                    }, {
                        key: "valueHeight",
                        value: null
                    }]
                }
            },
            offset: [0, 0],
            orient: "down",
            parentId: function (e, t) {
                return 0 === t ? null : 0
            },
            padding: 0,
            radius: null,
            rotate: null,
            rows: null,
            shiftX: null,
            shiftY: null,
            size: [1, 1],
            sort: null,
            sortAsc: !0,
            value: function (e) {
                return e
            },
            valueHeight: null,
            valueWidth: null,
            valueX: null,
            valueY: null,
            width: t.scaleLinear(),
            x: t.scaleLinear(),
            y: t.scaleLinear()
        };

        function i(t) {
            return e.__x = e.__prefix + "x", e.__y = e.__prefix + "y", e.__width = e.__prefix + "width", e.__height = e.__prefix + "height", e.__cx = e.__prefix + "cx", e.__cy = e.__prefix + "cy", e.__r = e.__prefix + "r", (t = t ? Array.from(t, (function (t, i) {
                var n = e.value(t, i);
                return "object" != typeof n && (n = {
                    __value: n,
                    __index: i
                }), n
            })) : []).forEach((function (t) {
                t[e.__r] = 0
            })), e.layout(t, e)
        }
        return i.mode = function (t) {
            return arguments.length ? (e.mode = t, "identity" === e.mode ? e.layout = g : Object.keys(e.modes).indexOf(t) >= 0 && (e.layout = e.modes[e.mode].layout), i) : e.mode
        }, i.modes = function (t) {
            return 1 === arguments.length ? e.modes[t].properties : Object.keys(e.modes)
        }, i.size = function (t) {
            return arguments.length ? (e.size = t, i) : e.size
        }, i.cellSize = function (t) {
            return arguments.length ? (e.cellSize = t, i) : e.cellSize
        }, i.value = function (t) {
            return arguments.length ? (e.value = t, i) : e.value
        }, i.valueX = function (t) {
            return arguments.length ? (e.valueX = "string" == typeof t ? function (e) {
                return e[t]
            } : t, i) : e.valueX
        }, i.valueY = function (t) {
            return arguments.length ? (e.valueY = "string" == typeof t ? function (e) {
                return e[t]
            } : t, i) : e.valueY
        }, i.valueHeight = function (t) {
            return arguments.length ? (e.valueHeight = "string" == typeof t ? function (e) {
                return e[t]
            } : t, i) : e.valueHeight
        }, i.valueWidth = function (t) {
            return arguments.length ? (e.valueWidth = "string" == typeof t ? function (e) {
                return e[t]
            } : t, i) : e.valueWidth
        }, i.sort = function (t) {
            return arguments.length ? (e.sort = "string" == typeof t ? function (e) {
                return e[t]
            } : t, i) : e.sort
        }, i.sortAsc = function (t) {
            return arguments.length ? (e.sortAsc = t, i) : e.sortAsc
        }, i.padding = function (t) {
            return arguments.length ? (e.padding = t, i) : e.padding
        }, i.margin = function (t) {
            return arguments.length ? (e.margin = t, i) : e.margin
        }, i.offset = function (t) {
            return arguments.length ? (e.offset = t, i) : e.offset
        }, i.orient = function (t) {
            return arguments.length ? (e.orient = t, i) : e.orient
        }, i.cols = function (t) {
            return arguments.length ? (e.cols = t, i) : e.cols
        }, i.rows = function (t) {
            return arguments.length ? (e.rows = t, i) : e.rows
        }, i.radius = function (t) {
            return arguments.length ? (e.radius = t, i) : e.radius
        }, i.rotate = function (t) {
            return arguments.length ? (e.rotate = t, i) : e.rotate
        }, i.prefix = function (t) {
            return arguments.length ? (e.__prefix = t, i) : e.__prefix
        }, i.id = function (t) {
            return arguments.length ? (e.id = t, i) : e.id
        }, i.params = function (t) {
            if (!arguments.length) return e;
            for (var n in t) t.hasOwnProperty(n) && ("mode" === n ? i.mode(t[n]) : e[n] = t[n]);
            return i
        }, i.parentId = function (t) {
            return arguments.length ? (e.parentId = t, i) : e.parentId
        }, i.shiftX = function (t) {
            return arguments.length ? (e.shiftX = t, i) : e.shiftX
        }, i.shiftY = function (t) {
            return arguments.length ? (e.shiftY = t, i) : e.shiftY
        }, i
    }, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}));