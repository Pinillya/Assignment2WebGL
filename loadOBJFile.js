// --------------LOADS MESH FROM FILE - OBJ PARSER ----------------
// Could use XMLHttpRequest to read from external URL. For now it just reads from the included script
// Expand this to support other tags you might need. 
// You should be able to use the same method shown here to do this. 
function loadObjFromFile(id) {

    //Set up vertex buffers:

    var meshVertecies = [];
    var meshUVs = [];
    var meshNormals = [];
    var meshVertexIndex = [];
    var meshUVIndex = [];
    var meshNormalIndex = [];
    
    var fLineType;  //holds the f-linetype. 0 = with //, 1 = with 4 numbers
    var tempF1;   //used to hold the first index if the f-lines are 4 numbers
    var tempF3;   //used to hold the first index if the f-lines are 4 numbers

    //Load mesh:
    var importedMesh = document.getElementById(id);

    if (!importedMesh) {
      alert("Import of mesh not succsessfull");
      return null;
    }

    //meshSource will hold the imported obj mesh file
    var meshSource = "";

    //get the first child. There is only one...
    var currentChild = importedMesh.firstChild;

    //loads in one line at a time
    while (currentChild) {
        if (currentChild.nodeType == 3) {
            meshSource += currentChild.textContent;
            //document.writeln(meshSource);
        }
    currentChild = currentChild.nextSibling;
    //document.writeln("En gang gått");
    }

    //Needs this to set up the buffer:
    //Might need more of this to count UVs and texture coordinates
    var vertexCount = 0;
    var indexCount = 0;

    //Split up the read file to separate lines:
    var lines = meshSource.split("\n");
    //Iterates throu the lines
    for (var n=0; n<lines.length; n++) {
        //The current line:
        var line = lines[n];
        //Splits the line into its info elements
        var info = line.split(" ");

        //parser:
        // 0 = comment or empty line, 1 = v, 2 = vt, 3 = vn, 4 = f
        var lineType = 0;

        //Iterates throu the items on the current line
        for (var m=0; m<info.length; m++) {
            //ignor comments
            if (info[m] == "#"){
                //document.writeln("-----");
                lineType = 0;
                break;
            }
            //ignore empty lines
            if (m == 0 && info[m] == ""){
                lineType = 0;
                break;
            }

            //Lines with vertexes
            if (m == 0 && info[m] == "v"){
                vertexCount  ++;
                lineType = 1;
            }

            //lines with texture coordinates
            if (m == 0 && info[m] == "vt"){
                lineType = 2;
            }

            //lines with vertex normales
            if (m == 0 && info[m] == "vn"){
                lineType = 3;
            }

            //lines with face/texture/normal indices
            if (m == 0 && info[m] == "f"){
                lineType = 4;
            }

            //ignore lines that starts with white space
            if (m == 0 && info[m] == " "){
                break;
            }

            //ignore other line types for now -----------------------
            if (m == 0 && info[m] == "o"){
                break;
            }

            if (m == 0 && info[m] == "mtllib"){
                break;
            }

            if (m == 0 && info[m] == "usemtl"){
                break;
            }

            if (m == 0 && info[m] == "s"){
                break;
            }
            
            if (m == 0 && info[m] == "g"){
                break;
            }
            //-------------------------------------------------------

            //For some reason some values are just empty, and we don´t want those:
            if (m > 0 && info[m] != "") {
                //vertex
                if (lineType == 1) {
                    meshVertecies.push(info[m]);
                    //document.writeln(info[m]);
                }
                //texture Coordinates
                if (lineType == 2) {
                    meshUVs.push(info[m]);
                    //document.writeln(info[m]);
                }
                //vertex normales
                if (lineType == 3) {
                    meshNormals.push(info[m]);
                    //document.writeln(info[m]);
                }
                //face indices
                if (lineType == 4) {
                  indexCount ++;
                  
                  //split the info into separate values in a temp list
                    var temp = info[m].split("/");
                    
                    //if longer than 1 this is a // line
                    if (m == 1 && temp.length > 1) {
                      //Must subtract 1 !!!! OBJ starts indices with 1, OpenGL with 0 !!!!
                      meshVertexIndex.push(temp[0]-1);
                    meshUVIndex.push(temp[1]-1);
                    if (temp[2]) {
                        meshNormalIndex.push(temp[2]-1);
              }
                      tempF1 = temp[0];
                    }
                    
                  if (m == 1 && temp.length < 2) {
                  tempF1 = temp[0];
                  meshVertexIndex.push(temp[0]-1);
                }
                if (m == 2) {
                    meshVertexIndex.push(temp[0]-1);
                  }
                if (m == 3) {
                    meshVertexIndex.push(temp[0]-1);
                  tempF3 = temp[0];
                }
                if (m == 4) {
                    meshVertexIndex.push(tempF1-1);
                    indexCount ++;
                    meshVertexIndex.push(tempF3-1);
                    indexCount ++;
                    meshVertexIndex.push(temp[0]-1);
                  }
                }
            }
        }
    }
    
    //Finishes buffers:
    //Vertex:
    meshVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, meshVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshVertecies), gl.STATIC_DRAW);
    //Since this holds vertexes, it will allways be 3
    meshVertexPositionBuffer.itemSize = 3;
    meshVertexPositionBuffer.numberOfItems = vertexCount;

    //Vertex indexes:
    meshVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshVertexIndex), gl.STATIC_DRAW);
    //Since this holds indexes, it will allways be 1
    meshVertexIndexBuffer.itemSize = 1;
    meshVertexIndexBuffer.numberOfItems = indexCount;
}