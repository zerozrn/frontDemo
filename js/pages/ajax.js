var xhr = createXHR();
xhr.onload = function () {
    //if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        console.log(xhr.responseText);
        console.log(xhr.getResponseHeader("server"));
        console.log(xhr.getAllResponseHeaders());
    } else {
        console.log("Request was unsuccessful:" + xhr.status);
    }
    // }
};
xhr.onprogress=function (event) {
    var status = document.getElementById("status");
    if(event.lengthComputable){
        status.innerHTML="Recived "+event.position+" of " + event.totalSize + " bytes";
    }
};
xhr.open("get", "../index.html", true);
// 这里发送自定义请求头部信息
xhr.setRequestHeader("myHeader","myValue");
xhr.send(null);