window.onload = function(){

    var dropTarget = document.getElementById("dragTarget");

    function handleEvent(event){
        var data, xhr,
            files, i, len;

        eventUtil.preventDefault(event);

        if (event.type == "drop"){
            data = new FormData();
            files = event.dataTransfer.files;
            i = 0;
            len = files.length;

            while (i < len){
                data.append("file" + i, files[i]);
                i++;
            }

            xhr = createXHR();
            xhr.open("post", "http://localhost:8036/upload/upload.php", true);
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4){
                    var res = JSON.parse(xhr.responseText),
                        fragment = document.createDocumentFragment();
                    console.log(res);

                    for(var i = 0,len = res.length;i<len;i++){
                        var r = res[i].Data,
                            img = document.createElement("img");
                        img.src = r.path;
                        fragment.appendChild(img);
                    }
                    document.body.insertBefore(fragment, dropTarget);
                }
            };
            xhr.send(data);
        }
    }

    eventUtil.addHandler(dropTarget, "dragenter", handleEvent);
    eventUtil.addHandler(dropTarget, "dragover", handleEvent);
    eventUtil.addHandler(dropTarget, "drop", handleEvent);

};