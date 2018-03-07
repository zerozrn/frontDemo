var form = document.forms[0],
    uploadBox = document.getElementById("uploadBox"),
    previewBox = document.getElementById("previewBox"),
    btnSubmit = document.getElementById("btnSubmit"),
    fileData = new FormData(),
    count = 0;  // 已经选择的图片数量

/**
 * 表单change事件
 */
eventUtil.addHandler(form, "change", function (event) {
    var fileList = eventUtil.getTarget(event).files,
        len = fileList.length,
        i = 0;
    uploadBox.classList.add("hide");
    previewBox.classList.remove("hide");
    btnSubmit.classList.remove("hide");
    while (i < len) {
        var file = fileList[i];
        /*name = file.name,
        nameArr = name.split("."),
        extension = nameArr.pop(),
        exsLen = extension.length,
        filename = name.slice(0, name.length - exsLen - 1);*/
        fileData.append("file" + count, file);
        count++;
        if (!/image\/\w+/.test(file.type)) {
            alert(file.name + " 不是图片");
            return false;
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(file);
        }
        reader.onerror = function () {
            alert("Could not read file,error code is " + reader.error.code);
        };
        reader.onprogress = function (event) {
            if (event.lengthComputable) {
                console.log(event.loaded + "/" + event.total);
            }
        };
        reader.onload = function () {
            var _this = this,
                add = previewBox.innerHTML,
                html = '<div class="img-item js-img-item" style="background-image: url(' + _this.result + ')">\n' +
                    /*'            <img src="' + _this.result + '" alt="' + filename + '">\n' +*/
                    '            <div class="delete hide" data-name="'+count+'"><i class="iconfont icon-delete"></i></div>\n' +
                    '        </div>';
            previewBox.innerHTML = html + add;
        };
        console.log(fileData.get("file"+i));
        i++;
    }

});

/**
 * 提交表单
 */
eventUtil.addHandler(form, "submit", function (event) {
    var event = eventUtil.getEvent(event),
        xhr = createXHR();
    event.preventDefault(event);
    xhr.open("post", "http://localhost:8036/upload/upload.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var res = JSON.parse(xhr.responseText);
            console.log(res);
            fileData = null;
            // TODO,移除相应的图片
        }
    };
    if (fileData instanceof FormData) {
        xhr.send(fileData);
    }

});


/**
 * previewBox的事件委托
 * @param event
 */
function handleMouseEvent(event) {
    var event = eventUtil.getEvent(event),
        target = eventUtil.getTarget(event),
        relateTarget = eventUtil.getRelatedTarget(event);
    if (target.classList.value.indexOf("js-img-item") > -1) {
        eventUtil.preventDefault(event);
        var iconDelete = target.getElementsByClassName("delete")[0];
        if (event.type == "mouseover") {
            iconDelete.classList.remove("hide");
            iconDelete.onclick = function () {
                target.parentNode.removeChild(target);
                // TODO 删除fileData里对应的文件
            };
        } else if (event.type == "mouseout" && relateTarget != iconDelete) {
            iconDelete.classList.add("hide");
        }
    }
}

eventUtil.addHandler(previewBox, "mouseover", handleMouseEvent);
eventUtil.addHandler(previewBox, "mouseout", handleMouseEvent);

