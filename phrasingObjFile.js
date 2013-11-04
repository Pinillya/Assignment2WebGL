//parsing obj-file
var meshVertexPositionBuffer= [];
var meshVertexIndexBuffer= []; 
function parseObj(linesIn) {
    //Set up vertex buffers:
    //alert("Hey" + linesIn);
    var meshVertecies = [];
    var meshUVs = [];
    var meshNormals = [];
    var meshVertexIndex = [];
    var meshUVIndex = [];
    var meshNormalIndex = [];

    var fLineType;	//holds the f-linetype. 0 = with //, 1 = with 4 numbers
    var tempF1;		//used to hold the first index if the f-lines are 4 numbers
    var tempF3;		//used to hold the first index if the f-lines are 4 numbers

    //Needs this to set up the buffer:
    //Might need more of this to count UVs and texture coordinates
    var vertexCount = 0;
    var indexCount = 0;

    //Split up the read file to separate lines:
    var lines = linesIn.split("\n");

    //Iterates throu the lines
    for (var n=0; n<lines.length; n++) {
        //The current line:
        var line = lines[n];
        //alert(line);
        //Splits the line into its info elements
        var info = line.split(" ");

        //parser:
        // 0 = comment or empty line, 1 = v, 2 = vt, 3 = vn, 4 = f
        var lineType = 0;

        //Iterates throu the items on the current line
        for (var m=0; m<info.length; m++) {
            //ignor comment
            if (info[m] == "#"){
                //document.writeln("-----");
                lineType = 0;
                break;
            }

            if (m == 0){
              //ignore empty lines
              if (info[m] == ""){
                  lineType = 0;
                  break;
              }

              //Lines with vertexes
              else if (info[m] == "v"){
                  vertexCount  ++;
                  lineType = 1;
              }

              //lines with texture coordinates
              else if (info[m] == "vt"){
                  lineType = 2;
              }

              //lines with vertex normales
              else if (info[m] == "vn"){
                  lineType = 3;
              }

              //lines with face/texture/normal indices
              else if (info[m] == "f"){
                  lineType = 4;
              }
              else 
              {
                break;
              }
            }

            //-------------------------------------------------------

            //For some reason some values are just empty, and we don´t want those:
            if (m > 0 && info[m] != "") {
                //vertex
                if (lineType == 1) {
                    //alert(info[m]);
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
    meshVertexPositionBuffer[numberOfObjectsMade] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, meshVertexPositionBuffer[numberOfObjectsMade]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshVertecies), gl.STATIC_DRAW);
    //alert(meshVertecies);
    //Since this holds vertexes, it will allways be 3
    meshVertexPositionBuffer[numberOfObjectsMade].itemSize = 3;
    meshVertexPositionBuffer[numberOfObjectsMade].numberOfItems = vertexCount;

    //Vertex indexes:
    meshVertexIndexBuffer[numberOfObjectsMade] = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshVertexIndexBuffer[numberOfObjectsMade]);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(meshVertexIndex), gl.STATIC_DRAW);
    //Since this holds indexes, it will allways be 1
    meshVertexIndexBuffer[numberOfObjectsMade].itemSize = 1;
    meshVertexIndexBuffer[numberOfObjectsMade].numberOfItems = indexCount;
    //alert(meshVertexIndex);
}