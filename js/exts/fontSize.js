(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
/*
* 此代码选640px为基准值，为什么选640呢，
640px的页面宽度是一个安全的最大宽度，
保证了移动端页面两边不会留白。注意这里的px是css逻辑像素，
与设备的物理像素是有区别的。如iPhone 5使用的是Retina视网膜屏幕，
使用2px x 2px的 device pixel 代表 1px x 1px 的 css pixel，
所以设备像素数为640 x 1136px，而它的CSS逻辑像素数为320 x 568px。
所以当要切移动端的页面的时候，需要把效果图宽度等比例缩放到640px。
比如当页面中某一div的宽度为60px，高度为65px的时候，就可以直接这样写样式：
{
  width:0.6rem;
  height:0.65rem
}
* */