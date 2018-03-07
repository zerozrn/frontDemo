var dragDrop = function () {
    var drag = new EventTarget(),
        dragging = null,
        diffX = 0,
        diffY = 0;

    function handleEvent(event) {
        // 获取事件和目标
        event = eventUtil.getEvent(event);
        var target = eventUtil.getTarget(event);

        // 确定事件类型
        switch (event.type) {
            case "mousedown":
                if (target.className.indexOf("draggable") > -1) {
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    drag.fire({type: "dragstart", target: dragging, x: event.clientX, y: event.clientY});
                }
                break;
            case "mousemove":
                if (dragging != null) {
                    // 指定位置
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";
                    drag.fire({type: "drag", target: dragging, x: event.clientX, y: event.clientY});
                }
                break;
            case "mouseup":
                drag.fire({type: "dragend", target: dragging, x: event.clientX, y: event.clientY});
                dragging = null;
                break;
        }

    }

    //公共接口
    drag.enable = function () {
        eventUtil.addHandler(document, "mousedown", handleEvent);
        eventUtil.addHandler(document, "mousemove", handleEvent);
        eventUtil.addHandler(document, "mouseup", handleEvent);
    };
    drag.disable = function () {
        eventUtil.removeHandler(document, "mousedown", handleEvent);
        eventUtil.removeHandler(document, "mousemove", handleEvent);
        eventUtil.removeHandler(document, "mouseup", handleEvent);
    };

    return drag;
}();