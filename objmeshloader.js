function loadMeshFromObj(url, callback) {
    //alert("loading file!!!");
    var objFile = new XMLHttpRequest();
    //var allText = null;
    //var lines = null;
    objFile.open("GET", url, false);
    objFile.onreadystatechange = function() {
        // 4      The request is complete
        if (objFile.readyState == 4) {         // && xmlhttp.responseText != '') {
            //alert("file is there");
            // Makes sure the document is ready to parse.
            if (objFile.status == 200) {
                //alert("reading file")
                // Makes sure it's found the file.
                allText = objFile.responseText;
                //lines = objFile.responseText.split("\n");	// Will separate each line into an array
                callback(allText);
            }
            else{
                alert("File not ready!!!");
            }
        }
    }
    objFile.send(null);
}