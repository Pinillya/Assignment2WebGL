/*
We are now making a coordination indicator. This will help us see what where and so on. 
*/

function makeCoordSystem() 
	{
        coordinationPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, coordinationPositionBuffer);
		var vertices = [
			 //X
			 0.0, 	0.0, 	0.0, //from point
			 11.0, 	0.0,  	0.0, //to point
			 
			 //Y
			 0.0, 	0.0, 	0.0,
			 0.0, 	11.0,  	0.0,

			 //Z
			 0.0, 	0.0, 	0.0,
			 0.0, 	0.0,  	11.0,		 
		];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        coordinationPositionBuffer.itemSize = 3;
        coordinationPositionBuffer.numItems = 6;

        coordinationColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, coordinationColorBuffer);
        var colors = [
        	//X
			1.0, 0.0, 0.0, 1.0,
			1.0, 0.0, 0.0, 1.0,

			//Y
			0.0, 1.0, 0.0, 1.0,
			0.0, 1.0, 0.0, 1.0,
			
			//Z
			0.0, 0.0, 1.0, 1.0,
			0.0, 0.0, 1.0, 1.0,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        coordinationColorBuffer.itemSize = 4;
        coordinationColorBuffer.numItems = 6;
    }

	function drawCoordSystem() 
	{
        gl.bindBuffer(gl.ARRAY_BUFFER, coordinationPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, coordinationPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, coordinationColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, coordinationColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

		setMatrixUniforms();
		gl.drawArrays(gl.LINES, 0, coordinationPositionBuffer.numItems);
	}