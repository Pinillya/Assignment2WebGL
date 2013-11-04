/*
Lets make this easy on you: Go read the description on "make cube objects" this here is just the same, its just that
its a pyramide and not a cube. I think you can handle that, I have fate in you. 
*/

    var pyramidePositionBuffer, pyramideColorBuffer;
    function makePyramide() 
	{
        /*~~~~~~~~~~***Pyramide***~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        pyramidePositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidePositionBuffer);
		    var vertices = [
            // Front face
             0.0,  1.0,  0.0,
             0.0,  0.0,  1.0,
            -1.0,  0.0,  0.0,
            // Right face
             0.0,  1.0,  0.0,
             1.0,  0.0,  0.0,
             0.0,  0.0,  1.0,
            // Back face
                 0.0,  1.0,  0.0,
             0.0,  0.0, -1.0,
            -1.0,  0.0,  0.0,
            // Left face
             0.0,  1.0,  0.0,
             1.0,  0.0,  0.0,
             0.0,  0.0, -1.0,
		];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        pyramidePositionBuffer.itemSize = 3;
        pyramidePositionBuffer.numItems = 12;

        pyramideColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramideColorBuffer);
        var colors = [
            // Front face
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            // Right face
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            // Back face
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            // Left face
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        pyramideColorBuffer.itemSize = 4;
        pyramideColorBuffer.numItems = 12;
    }
    
    var rPyramide = 0;

	function drawPyramide(rotX, rotY, rotZ, transX, transY, transZ, scaleX, scaleY, scaleZ) 
	{
        /*~~~~~~~~~~***Pyramide***~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        mvPushMatrix();
        mat4.rotate(mvMatrix, degToRad(rPyramide), [rotX, rotY, rotZ]); 
        mat4.scale(mvMatrix, [scaleX, scaleY, scaleZ]); 
        mat4.translate(mvMatrix, [transX, transY, transZ]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, pyramidePositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pyramidePositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, pyramideColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute2, pyramideColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        setMatrixUniforms();
    	gl.drawArrays(gl.TRIANGLES, 0, pyramidePositionBuffer.numItems);
        mvPopMatrix();
	}