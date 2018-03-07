/**
 * 关于事件跨浏览器实现某些功能
 * 属性说明
 * @property {eventUtil} addHandler 指定事件处理程序
 * @property {eventUtil} getEvent 获取event对象
 * @property {eventUtil} getTarget 获取事件目标
 * @property {eventUtil} getRelatedTarget 获取mouseover或者mouseout触发时的相关元素
 * @property {eventUtil} getButton 获取event对象中的button属性信息
 * @property {eventUtil} getWheelDelta 获取鼠标滚轮事件中代表滚动方向的属性wheelDelta
 * @property {eventUtil} getCharCode 获取键盘的字符编码
 * @property {eventUtil} getClipboardData 获取剪贴板文本
 * @property {eventUtil} setClipboardData 设置剪贴板文本
 * @property {eventUtil} preventDefault 取消事件的默认行为
 * @property {eventUtil} removeHandler 移除之前添加的事件处理程序
 * @property {eventUtil} stopPropagation 取消事件捕获或冒泡
 *
 * @type {{addHandler: eventUtil.addHandler, getEvent: eventUtil.getEvent,
 * getTarget: eventUtil.getTarget, getRelatedTarget: eventUtil.getRelatedTarget,
 * getButton: eventUtil.getButton, getWheelDelta: eventUtil.getWheelDelta,
 * getCharCode: eventUtil.getCharCode,getClipboardData: eventUtil.getClipboardData,
 * setClipboardData: eventUtil.setClipboardData
 * preventDefault: eventUtil.preventDefault,removeHandler: eventUtil.removeHandler,
 * stopPropagation: eventUtil.stopPropagation}}
 */

var eventUtil = {
    // 如何跨浏览器指定事件处理程序
    addHandler: function (element, type, handler) {
        // DOM2级
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        // IE
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
        // DOM0级
        else {
            element["on" + type] = handler;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    getRelatedTarget: function (event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        }
        // IE, mouseout触发时相关元素
        else if (event.toElement) {
            return event.toElement;
        }
        // IE, mouseover触发时相关元素
        else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },
    getButton: function (event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            // IE8及以前版本提供的button属性处理
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    getWheelDelta: function (event) {
        if (event.wheelDelta) {
            return event.wheelDelta;
        } else {
            // firebox
            return -event.detail * 40;
        }
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    getCharCode:function (event) {
        if(typeof event.charCode == "number"){
            return event.charCode;
        }  else{
            return event.keyCode;
        }
    },
    getClipboardData:function (event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    setClipboardData:function (event,value) {
        if(event.clipboardData){
            return event.clipboardData.setData("text/plain",value);
        }
        // IE
        else if(window.clipboardData){
            return window.clipboardData.setData("text",value);
        }
    },
    removeHandler: function (element, type, handler) {
        // DOM2级
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        // IE
        else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        }
        // DOM0级
        else {
            element["on" + type] = null;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation(); // 可以取消事件捕获和事件冒泡
        } else {
            event.cancelBubble = true; // IE不支持事件捕获，所以只能取消事件冒泡
        }
    }
};
