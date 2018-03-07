/**
 * method gotoTop 返回页面顶部
 * @param id DOM元素的id
 */
function gotoTop(id) {
    var timer = null,
        ele = document.getElementById(id);

    ele.onclick = function () {
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (oTop > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
                timer = requestAnimationFrame(fn);
            } else {
                cancelAnimationFrame(timer);
            }
        });
    }
}
