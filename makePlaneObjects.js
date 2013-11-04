/*
This little thing here is the base of our house. We want to make the house in planes and not a box. As its easier, and
makes us able to shape it as we wish. (with doors and stuff) 
*/
   //var planePositionBuffer, planeColorBuffer;
  
  //Unlike the cubes, we make the Planes with a bit of basis stuff, like color. 
  //The most important thing however is the "check" this will check if the maker wants us to have a roof/floor plane,
  //a plane on one of the sides, or a plane facing the camera. We could maybe have done this by rotation... But this way is much
  //more handy i think. 
    function makePlaneBuffer(check, W, H) 
	{
        /*~~~~~~~~~~***Plane***~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        planePositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, planePositionBuffer);
      var withB = 1.0;
      var hightB = -1.0;

      if (check == 1)
      {
        var vertices = [
            //Front
              hightB, hightB, hightB, //A
              withB,  hightB, hightB, //B
              hightB, withB,  hightB, //D
              withB,  withB,  hightB, //C                 
        ];
      }
      else if (check == 2)
      {
        var vertices = [
             //Sides
              withB,  withB,  hightB,
              withB, hightB, hightB,
              withB, withB, withB,
              withB, hightB, withB     
        ];
      }
      else if (check == 3)
      {
        var vertices = [
              //Topp 
              withB,  withB,  withB,
              withB,  withB,  hightB,
              hightB, withB,  withB,
              hightB, withB,  hightB      
        ];
      }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        planePositionBuffer.itemSize = 3;
        planePositionBuffer.numItems = 4;

       /* //Adding the colors based on the values given when we called the function
        planeColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, planeColorBuffer);
        var colors = [
            R, G, B, A,
            R, G, B, A,
            R, G, B, A,
            R, G, B, A
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        planeColorBuffer.itemSize = 4;
        planeColorBuffer.numItems = 4;*/

//Texture
        pwgl.planeTextureBufferCoordinationBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.planeTextureBufferCoordinationBuffer);

        if (check == 3) {
          var planeTextureCoordinates = [
            0.0, 0.0,
            W  , 0.0,

            W  , H,
            0.0,   H   
          ];
        }
        if (check == 2) {
          var planeTextureCoordinates = [
            
            W  ,   H,
            W  , 0.0,
            0.0,   H, 
            0.0, 0.0, 
          ];
        }
        if (check == 1) {
          var planeTextureCoordinates = [
            0.0, 0.0, 
            W  ,   H, 
            W  , 0.0,
            0.0,   H   
          ];
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(planeTextureCoordinates), gl.STATIC_DRAW);
        pwgl.PLANE_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
        pwgl.PLANE_VERTEX_TEX_COORD_BUF_NUM_ITEMS = 4;
}

  //We still have the same things as in "make cube object", just not the parts about rotation. We could ofc add them, but 
  //I didnt like them much so they wernt welcome this round. 
	function drawPlane(transX, transY, transZ, scaleX, scaleY, scaleZ, rotate, textureChoice) 
	{
        /*~~~~~~~~~~***Plane***~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        mvPushMatrix(); 
        mat4.rotate(mvMatrix, rotate, [1, 1, 0]);
        mat4.translate(mvMatrix, [transX, transY, transZ ]); 
        mat4.scale(mvMatrix, [scaleX, scaleY, scaleZ ]); 

        gl.bindBuffer(gl.ARRAY_BUFFER, planePositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, planePositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        //gl.bindBuffer(gl.ARRAY_BUFFER, planeColorBuffer);
        //gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, planeColorBuffer.itemSize, gl.FLOAT, false, 0, 0);




        gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.planeTextureBufferCoordinationBuffer);
        gl.vertexAttribPointer(pwgl.vertexTextureAttributeLoc, pwgl.PLANE_VERTEX_TEX_COORD_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);
        gl.bindTexture(gl.TEXTURE_2D, textureChoice);
        //gl.drawArrays(gl.TRIANGLES, 0, pwgl.PLANE_VERTEX_TEX_COORD_BUF_NUM_ITEMS);

        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, planePositionBuffer.numItems);

        mvPopMatrix();
	}