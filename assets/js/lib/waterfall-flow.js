/**
 * Created by Leester on 2016/11/17.
 * 说明：插件套入方式借鉴 Swiper.js 源码写的
 * dom 是列表外面第一层 div元素类或id
 * params {
 *      需要传入参数
 *      listEle 表示列表的元素 -- 是需要传入
 *      responsive 是否需要 自适应 -- 是需要传入参数 默认为：false 不自适应
 * }
 */

(function () {
    'use strict';

    var Flow = function (dom, params) {
        if (!(this instanceof Flow)) return new Flow(dom, params);
        //初始化参数
        var defaults = {
            listEle : "media-list",
            responsive : false,
            ele : false,
            eleWid : false,
            list : false,
            listLen : false,
            liWid : false,
            column : false
        };
        //循环并重写所有参数
        if(typeof params == "object") {
            for (var def in defaults) {
                if(typeof params[def] === "undefined") {
                    params[def] = defaults[def];
                } else if (typeof params[def] === "object" || params[def] === true) {
                    for (var deepDef in defaults[def]) {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                } else {
                    params[def] = defaults[def];
                }
            }
        }
        //s = this
        var s = this;
        //s.params = 参数
        s.params = params;
        //处理是id 还是 class元素
        s.dom = function () {
            if(dom[0] === ".") {
                s.params.ele = document.getElementsByClassName(dom.substring(1));
            } else {
                s.params.ele = document.getElementById(dom.substring(1));
            }
        };

        //计算出页面可放数据块的列数 并获取相应数据
        s.getColumn = function () {
            s.params.eleWid = s.params.ele[0].offsetWidth;
            s.params.list = document.getElementsByClassName(s.params.listEle.toString(1));
            s.params.liWid = Math.ceil(s.params.list[0].offsetWidth) - 1;
            s.params.listLen = s.params.list.length;
            s.params.column = Math.floor(s.params.eleWid / s.params.liWid);
        };

        //获取所有元素高度
        var liHei = [];
        s.getAllListHei = function () {
            liHei = [];
            for (var i = 0; i < s.params.listLen; i++) {
                liHei.push(s.params.list[i].offsetHeight);
            }
        };

        //用绝对定位先将页面第一行填满，因为第一行的top位置都是一样的，然后用数组记录每一列的总高度。
        var oArr = [];
        s.setTop = function () {
            oArr = [];
            for (var i = 0; i < s.params.column; i++) {
                s.params.list[i].style.top = 0;
                s.params.list[i].style.left = s.params.liWid * i + "px";
                oArr.push(liHei[i]);
            }
        };

        //获取数组最大值
        s._getMaxValue = function(arr) {
            var a = arr[0];
            for (var k in arr) {
                if (arr[k] > a) {
                    a = arr[k];
                }
            }
            return a;
        };

        //获取数组最小值
        s._getMinKey = function(arr) {
            var a = arr[0];
            var b = 0;
            for (var k in arr) {
                if (arr[k] < a) {
                    a = arr[k];
                    b = k;
                }
            }
            return b;
        };

        //写入其它值
        s.setAllNum = function () {
            for (var i = s.params.column; i < s.params.listLen; i++) {
                var x = s._getMinKey(oArr);
                s.params.list[i].style.top = oArr[x] + "px";
                s.params.list[i].style.left = s.params.liWid * x + "px";
                oArr[x] = liHei[i] + oArr[x];
            }
        };

        //所有函数
        s.init = function () {
            s.dom();
            s.getColumn();
            s.getAllListHei();
            s.setTop();
            s.setAllNum();
            s.params.ele[0].style.height = s._getMaxValue(oArr) + 20 + "px";
        };

        //执行所有函数
        s.init();

        //做自适应
        if(s.params.responsive == true) {
            window.onresize = function () {
                s.init();
            };
        }

        //返回执行结果
        return s;
    };

    window.Flow = Flow;
})();