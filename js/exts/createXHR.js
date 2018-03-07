/**
 * 说明： 惰性载入修改createXHR函数。
 * 解释：惰性载入：（1）在函数被调用时再处理函数；（2）在声明函数时就指定适当的函数。
 */

function createXHR() {
    //console.log(createXHR); // 外层定义的函数声明
    if (typeof XMLHttpRequest != "undefined") {
        createXHR = function () {
            return new XMLHttpRequest();
        };
    }else if(typeof ActiveXObject != "undefined"){
        createXHR = function () {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                    i,
                    len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        };
    }else{
        createXHR = function () {
            throw new Error("No XHR object available.");
        };
    }
    //console.log(createXHR); // if分支里面的匿名函数，完全覆盖了原有函数

    return createXHR();
}


/**
 * @method createXHR 跨浏览器创建XHR对象
 * @returns {*} 返回XHR对象
 * 说明: 下列函数存在的问题是，每次调用createXHR()，都要对浏览器所支持
 * 的能力仔细检查。如果浏览器支持XHR，就一直支持，不必每次调用都检测。
 */
/*
function createXHR() {
    // IE7+、Firebox、Opera、Chrome、 Safari
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    }
    // IE7以下版本
    else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                i,
                len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {

                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}*/
