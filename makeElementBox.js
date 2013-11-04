/*
Here we made a box! 
"But Illy why did we make another box?" 
Shhhh let me explain.... Ok so here we made ANOTHER box. The thing about this box, is that this box is made by gl.drawElements
As you can see, we make 7 points in space, then we draw between the points. The box will be drawn in triangles as can bee 
seen in the variable "indices" 
"But Illy.... is this any good?"
Actually, Im glad you asked. You could argue this isnt really that relevant. Its hard to make textures for an object like this
Simply cause of the thing I said above. Its all triangles. (Well might be more, but thats the argument that stuck in my mind)
Now the thing that is actually the positive thing about this way of doing things........ is that its eficient! 
If you want your program to be quick and stuff, this is a good way of making boxes! 
*/

	function makeElementBoxBuffer()
	{
		var sizeS  = 0.5;
	    tetraederVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, tetraederVertexPositionBuffer);
		var vertices = [
			 sizeS,  sizeS,   sizeS, //0	
			 sizeS, -sizeS,   sizeS, //1
			 sizeS, -sizeS,  -sizeS, //2
			 sizeS,  sizeS,  -sizeS, //3

			-sizeS,  sizeS, -sizeS, //4	
			-sizeS, -sizeS, -sizeS, //5
			-sizeS, -sizeS,  sizeS, //6
			-sizeS,  sizeS,  sizeS  //7
		];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        tetraederVertexPositionBuffer.itemSize = 3;
        tetraederVertexPositionBuffer.numItems = 8;

        tetraederVertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, tetraederVertexColorBuffer);
        var colors = [
			1.0, 0.0, 0.0, 1.0, //0
			1.0, 1.0, 0.0, 1.0, //1
			1.0, 1.0, 1.0, 1.0, //2
			0.0, 1.0, 1.0, 1.0, //3
			0.0, 0.0, 1.0, 1.0, //4
			1.0, 0.0, 1.0, 1.0, //5
			1.0, 0.5, 0.5, 1.0, //6
			0.0, 0.0, 0.5, 1.0  //7
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        tetraederVertexColorBuffer.itemSize = 4;
        tetraederVertexColorBuffer.numItems = 8;
		
		var indices = [
			//Right
			0,3,1,  1,2,3,
			//Back
			3,4,5,  5,2,3, 
			//Left
			4,5,6,  6,7,4,
			//Front
			7,0,1,  1,6,7,
			//Roof
			0,3,4,  4,7,0,
			//Floor
			1,2,5,  5,6,1
			];
			var indexBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	}
	
	//See explenation in "Make cube objects"
	function drawElementBox(rotX, rotY, rotZ, transX, transY, transZ, scaleX, scaleY, scaleZ) 
	{
		mvPushMatrix();
        mat4.rotate(mvMatrix, rBox, [rotX, rotY, rotZ]);
        mat4.scale(mvMatrix, [scaleX, scaleY, scaleZ]);
        mat4.translate(mvMatrix, [transX, transY, transZ]);

	    gl.bindBuffer(gl.ARRAY_BUFFER, tetraederVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, tetraederVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, tetraederVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, tetraederVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

		setMatrixUniforms();
		gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();
	}