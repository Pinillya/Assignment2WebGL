    /*
      Say hallo to the main document in our little creation! This is where we will add the scene, 
      where the objects will be made, and where the camera will be moved. 

      I will explain what -I- have done here, as for what gl.XXX does and so on, I suggest a tutorial. It's basic stuff
      and not basic stuff I have enough controll over to teach anyone else. When I come back and read it, I will know my
      share, but I will probably have to read up on things to. 
    */

var gl;
    function initGL(canvas) 
	{
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }

    function initScene() 
	 {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		    mat4.identity(pMatrix);
    }

//GlobalVariables
var pwgl={};
pwgl.ongoingImageLoads = [];
var canvas;
var translasjonX = -5.0;
var translasjonY = 1.5;
var translasjonZ = -1.5;


  //We start our scene!
  function webGLStart()
  {
        //We make and clear the canvas. See tutorial noob
        canvas = document.getElementById("illy-canvas");
        //Handle lost context
        canvas.addEventListener('webglcontenxtlost', handleContextLost, false);
        canvas.addEventListener('webglcontenxtrestored', handleContextRestored, false);
        initGL(canvas);

        
        initShaders();
        setupTextures();
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        initScene();

        setUpCam();

        //starts the draw thing. It has its own //stuff
        draw();

        //Calls the key up and key down. This is also dependant on an external script like the frameloop thing. 
        document.addEventListener('keydown', handleKeyDown, false);
        document.addEventListener('keyup', handleKeyUp, false);
  }

  function setUpCam() 
  {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //The camera:
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);
    mat4.rotate(mvMatrix, 45, [ 1, 0, 0], mvMatrix);
    mat4.translate(mvMatrix, [0, -10, -5.0]);


    uploadModelViewMatrixToShader();
    uploadProjectionMatrixToShader();
  }
  function draw() 
  {  //This is our on frame loop. :)
      //Starting some functions... dont want it all in here now do we? 
      animate();
      movingObjects();
      staticObjects();
      //drawOBJ("https://dl.dropboxusercontent.com/u/40630733/test.obj",1);
      pwgl.requestId = requestAnimFrame(draw); //Here is where it goes to the next frame. To get this, we needed the 
  }

//----------Drawing the OBJ:-----------
var numberOfObjectsMade = 0;
function drawMesh(URL, objectCounter) {
try {
        loadMeshFromObj(URL, parseObj);
  }
  catch(err){
        alert("Crap!");
  }
  gl.disableVertexAttribArray(pwgl.vertexTextureAttributeLoc);
  gl.bindBuffer(gl.ARRAY_BUFFER, meshVertexPositionBuffer[objectCounter]);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
                         meshVertexPositionBuffer[objectCounter].itemSize,
                         gl.FLOAT, false, 0, 0);
  //gl.bindTexture(gl.TEXTURE_2D, pwgl.basket);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshVertexIndexBuffer[objectCounter]);

  gl.drawElements(gl.TRIANGLES, meshVertexIndexBuffer[objectCounter].numberOfItems,
                  gl.UNSIGNED_SHORT, 0);
}

function drawOBJ(URL, objectCounter) {
  numberOfObjectsMade = objectCounter;
  pushModelViewMatrix();
  mat4.translate(modelViewMatrix, [6.0, 0.0 ,0.0], modelViewMatrix);
  mat4.rotate(modelViewMatrix, 1.2, [0, 1, 0], modelViewMatrix);
  mat4.scale(modelViewMatrix, [1.02, 1.02, 1.02], modelViewMatrix);
  uploadModelViewMatrixToShader();
  drawMesh(URL, objectCounter);
  popModelViewMatrix()
}

//------------------Finished drawing the obj

    //As above, we have two functions that we ass values to, to make out objects. As you can see the priorety 
    //of what we can add is diferent. This is just cause I didnt want exessive amounts of variables. 
    //That could be added if you insisted. 
    function staticObjects() {

    //Back
        makePlaneBuffer(1, 10, 10); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
        drawPlane(0,0,-2,   10,10,1, 0, pwgl.basket); //transX, transY, transZ, scaleX, scaleY, scaleZ
    }
    function gameOver (argument) {
        alert ("You Lost, get away from me");
    }