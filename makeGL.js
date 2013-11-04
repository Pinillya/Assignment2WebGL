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

    var pwgl={};

    function draw() {  //This is our on frame loop. :)
        //Starting some functions... dont want it all in here now do we? 
        initShaders();
        animate();
        movingObjects();
        staticObjects();

        initShadersNoTexture();
        drawOBJ();
        pwgl.requestId = requestAnimFrame(draw); //Here is where it goes to the next frame. To get this, we needed the 
                                                 //basic "webgl-utils.js" 
    }

    //So first things first. Lets make the moving objects. (It doesnt really matter what we make first right now....)
    //We will make the objects by calling on the sript that make objects. This means that we dont have to make one and 
    //one object, but instead we can write two simple function calls, and add values to the functions! 
    //("Illy did you make this system yourself?" "Why yes! thanks for notesing") 
    var movingWater = 0;

    //Enemies
    var cubeNumber = 0;
    var cubeXPosition = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var cubePosition = [0, 0, 0];
    var movingBoxes = [-3, -3, -3, -3, -3, -3, -3, -3, -3, -3];
    var enemieSpeed = 0.01;

    //Stares
    var starePositionX = [-4, -4, -4];
    var starePositionZ = [-4, -4, -4];
    var stareCounter = 0;
    var stareScore = 0;

    //Character
    var characterPosition = [0, 0, 0];
    var life = 3;

    function movingObjects(){
        //Water-----------
        if (movingWater == 0 || movingWater == 1 || movingWater ==2 || movingWater == 3){
            makePlaneBuffer(3, 8, 8); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
            drawPlane(0,-0.1,0, 8,1,8, 0, pwgl.waterAni1); //transX, transY, transZ, scaleX, scaleY, scaleZ 
            movingWater++;
        }else if (movingWater == 4 || movingWater == 5 || movingWater ==6 || movingWater == 7){
            makePlaneBuffer(3, 8, 8); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
            drawPlane(0,-0.1,0, 8,1,8, 0, pwgl.waterAni2); //transX, transY, transZ, scaleX, scaleY, scaleZ 
            movingWater++;
        }else if (movingWater == 8 || movingWater == 9 || movingWater ==10 || movingWater == 11){
            makePlaneBuffer(3, 8, 8); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
            drawPlane(0,-0.1,0, 8,1,8, 0, pwgl.waterAni3); //transX, transY, transZ, scaleX, scaleY, scaleZ 
            movingWater++;
        }else if (movingWater == 12 || movingWater == 13 || movingWater ==14 || movingWater == 15){
            makePlaneBuffer(3, 8, 8); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
            drawPlane(0,-0.1,0, 8,1,8, 0, pwgl.waterAni4); //transX, transY, transZ, scaleX, scaleY, scaleZ 
            movingWater = 0;
        }
     

        characterPosition = [translasjonX, 1.5, translasjonZ]
        //Character ------------
        makeCube(); 
        drawCube( 0, 0, 0,                                  //rotX, rotY, rotZ,   
                  characterPosition[0],characterPosition[1],characterPosition[2],          //transX, transY, transZ, 
                  5, 0.1, 5,                                //scaleX, scaleY, scaleZ
                  pwgl.character);                          //Texture

        //Enemies Spawn ---------------- 
        var spawnCubeTrigger = Math.floor(Math.random() * 300);
        
        if (spawnCubeTrigger == 1 && cubeNumber < 30){
            cubeNumber++;
            cubeXPosition[cubeNumber] = 4.5 + (Math.floor(Math.random() * -6));
            movingBoxes[cubeNumber] = 7.5 + (Math.floor(Math.random() * 3));
            var spawnCubeTrigger = 0;
        }

        //Stares Spawn--------------
        var spawnStareTrigger = Math.floor(Math.random() * 500);

        if (spawnStareTrigger == 1){
            var starToChange = Math.floor(Math.random() * 3);
            starePositionX[starToChange] = 4.5 + (Math.floor(Math.random() * -6));
            starePositionZ[starToChange] = 4.5 + (Math.floor(Math.random() * -6));
            var spawnStareTrigger = 0;
        }


        for (var i=0; i<3; i++){
            makeCube(); 
            drawCube( 0, 0, 0,          //rotX, rotY, rotZ,   
                      starePositionX[i], 1.5, starePositionZ[i],          //transX, transY, transZ, 
                      5, 0.1, 5,          //scaleX, scaleY, scaleZ
                      pwgl.stare);  //Texture
        }

        //handle Hittest Enemies
        for (var i=0; i<cubeNumber; i++){
            cubePosition = [movingBoxes[i], 1.5, cubeXPosition[i]];
            if (cubePosition[0]+0.5 > characterPosition[0]-0.5 && cubePosition[0]-0.5 < characterPosition[0]+0.5 && cubePosition[2]+0.5 > characterPosition[2]-0.5 && cubePosition[2]-0.5 < characterPosition[2]+0.5) {
                translasjonX = -5.0;
                translasjonZ = -1.5;
                life--;
                if (life <= 0){
                    gameOver();
                    break;
                }
                alert ("You now have: " + life + " lives left")
            }

            //Frinally drawing the cube
            makeCube(); 
            drawCube( 0, 0, 0,          //rotX, rotY, rotZ,   
                      movingBoxes[i], 1.5, cubeXPosition[i],          //transX, transY, transZ, 
                      5, 0.1, 5,          //scaleX, scaleY, scaleZ
                      pwgl.enemie);  //Texture

            if (movingBoxes[i] < -10){
                movingBoxes[i] = 7.5 + (Math.floor(Math.random() * 6));
                cubeXPosition[i] = 4.5 + (Math.floor(Math.random() * -6));
            }
        }

        //Handle hittest Stares
        for (var i=0; i<3; i++){
            var starePosition = [starePositionX[i], 1.5, starePositionZ[i]];
            if (starePosition[0]+0.5 > characterPosition[0]-0.5 && starePosition[0]-0.5 < characterPosition[0]+0.5 && starePosition[2]+0.5 > characterPosition[2]-0.5 && starePosition[2]-0.5 < characterPosition[2]+0.5) {
                stareScore++;
                starePositionX[i] = -4;
                starePositionZ[i] = -4;
                if (stareScore == 10 || stareScore == 20 || stareScore == 30 || stareScore == 40 || stareScore == 50)
                {
                    alert ("You have a new stare bundle! \n All in all you have: " + stareScore + " stares!");
                    enemieSpeed += 0.01;
                }
            }
        }
    }

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

var canvas;
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

        //The camera:
        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        mat4.identity(mvMatrix);
        mat4.rotate(mvMatrix, 45, [ 1, 0, 0], mvMatrix);
        mat4.translate(mvMatrix, [0, -10, -5.0]);

        draw();
        //mat4.rotate(mvMatrix, rotasjonY, [ 0, 1, 0], mvMatrix);
        //mat4.rotate(mvMatrix, rotasjonZ, [ 0, 0, 1], mvMatrix); 

        //starts the draw thing. It has its own //stuff
        //Calls the key up and key down. This is also dependant on an external script like the frameloop thing. 
        document.addEventListener('keydown', handleKeyDown, false);
        document.addEventListener('keyup', handleKeyUp, false);
  }

//-----------------------Content Lost--------------------------
//Testing out this context lost thing. Seems to be alright...ISH! Dont touch it, dont even breath!
  function handleContextLost (event) 
  {
      event.preventDefult();
      cancelRequestAnimFrame(pwgl.requestId);
    for (var i = 0; i < pwgl.ongoingImageLoads.length; i++) {
     pwgl.ongoingImageLoads[i].onload = undefined;
   }
   pwgl.ongoingImageLoads = [];
  }

    function handleContextRestored (event) 
    {
         initShaders();
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        initScene();

        //starts the draw thing. It has its own //stuff
        draw();

        //Calls the key up and key down. This is also dependant on an external script like the frameloop thing. 
        document.addEventListener('keydown', handleKeyDown, false);
        document.addEventListener('keyup', handleKeyUp, false);  
  }

    var translasjonX = -5.0;
    var translasjonZ = -1.5;

    //Lets move around and marvel at the nice boxes. 
    //We also have an o key (79) that will Ooooopen the door. If the door is open, it will close with the same key.
    var moveAgain = true;
    function handleKeyDown(event)
    {

        if (moveAgain){
              var delta = 1;
              console.log("keyCode=%d", event.keyCode); 
              
              switch(event.keyCode) {
                case 37: translasjonZ -= delta; break; // venstre
                case 38: translasjonX += delta; break; // opp
                case 39: translasjonZ += delta; break; // høyre
                case 40: translasjonX -= delta; break; // ned
                
                break;  
            };
            moveAgain = false;
        }

  }

    //Stops the actions started, from just continuing foreeeeeeeveeeeer. 
    function handleKeyUp(event)
      {
        moveAgain = true;
      }
