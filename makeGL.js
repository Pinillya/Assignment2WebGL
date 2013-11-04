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
        animate();
        movingObjects();
        staticObjects();
        pwgl.requestId = requestAnimFrame(draw); //Here is where it goes to the next frame. To get this, we needed the 
                                                 //basic "webgl-utils.js" 

        //The camera:
       // mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        //mat4.identity(mvMatrix);
        //mat4.translate(mvMatrix, [0.5, -5, -10.0]);

        //mat4.rotate(mvMatrix, rotasjonX, [ 1, 0, 0], mvMatrix);
        //mat4.rotate(mvMatrix, rotasjonY, [ 0, 1, 0], mvMatrix);
        //mat4.rotate(mvMatrix, rotasjonZ, [ 0, 0, 1], mvMatrix); 

        //mat4.translate(mvMatrix, [translasjonX, translasjonY, translasjonZ]);
        //mat4.rotate(mvMatrix, translasjonY, [ 0, 1, 0], mvMatrix);
        //mat4.rotate(mvMatrix, translasjonZ, [ 0, 0, 1], mvMatrix); 
    }

    //So first things first. Lets make the moving objects. (It doesnt really matter what we make first right now....)
    //We will make the objects by calling on the sript that make objects. This means that we dont have to make one and 
    //one object, but instead we can write two simple function calls, and add values to the functions! 
    //("Illy did you make this system yourself?" "Why yes! thanks for notesing") 
    var moving = 0;
    var cubeNumber = 0;
    var cubeXPosition = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var cubePosition = [0, 0, 0];

    var starePositionX = [-4, -4, -4];
    var starePositionZ = [-4, -4, -4];
    var stareCounter = 0;

    var characterPosition = [0, 0, 0];
    var life = 3;
    var stareScore = 0;
    var movingBoxes = [-3, -3, -3, -3, -3, -3, -3, -3, -3, -3];
    function movingObjects(){
        //Water-----------
        if (moving == 0 || moving == 1 || moving ==2 || moving == 3){
            makePlaneBuffer(3, 8, 8); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
            drawPlane(0,-0.1,0, 8,1,8, 0, pwgl.waterAni1); //transX, transY, transZ, scaleX, scaleY, scaleZ 
            moving++;
        }else if (moving == 4 || moving == 5 || moving ==6 || moving == 7){
            makePlaneBuffer(3, 8, 8); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
            drawPlane(0,-0.1,0, 8,1,8, 0, pwgl.waterAni2); //transX, transY, transZ, scaleX, scaleY, scaleZ 
            moving++;
        }else if (moving == 8 || moving == 9 || moving ==10 || moving == 11){
            makePlaneBuffer(3, 8, 8); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
            drawPlane(0,-0.1,0, 8,1,8, 0, pwgl.waterAni3); //transX, transY, transZ, scaleX, scaleY, scaleZ 
            moving++;
        }else if (moving == 12 || moving == 13 || moving ==14 || moving == 15){
            makePlaneBuffer(3, 8, 8); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
            drawPlane(0,-0.1,0, 8,1,8, 0, pwgl.waterAni4); //transX, transY, transZ, scaleX, scaleY, scaleZ 
            moving = 0;
        }
     

        characterPosition = [translasjonX, 1.5, translasjonZ]
        //Character ------------
        makeCube(); 
        drawCube( 0, 0, 0,                                  //rotX, rotY, rotZ,   
                  characterPosition[0],characterPosition[1],characterPosition[2],          //transX, transY, transZ, 
                  5, 0.1, 5,                                //scaleX, scaleY, scaleZ
                  pwgl.character);                          //Texture

        //Monster ---------------- 
        var spawnCubeTrigger = Math.floor(Math.random() * 300);
        
        if (spawnCubeTrigger == 1 && cubeNumber < 30){
            cubeNumber++;
            cubeXPosition[cubeNumber] = 4.5 + (Math.floor(Math.random() * -6));
            movingBoxes[cubeNumber] = 7.5 + (Math.floor(Math.random() * 3));
            var spawnCubeTrigger = 0;
        }

        //Stares --------------
        var spawnStareTrigger = Math.floor(Math.random() * 600);

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
/*
     for (var j=0; j<cubeNumber; j++)
        {
            //for (var k=0; k<cubeNumber; k++){
                var cubePositionTemp1 = [movingBoxes[cubeNumber], 1.5, cubeXPosition[cubeNumber]];
                var cubePositionTemp2 = [movingBoxes[j], 1.5, cubeXPosition[j]];
                if (cubePositionTemp2[0]+0.5 > cubePositionTemp1[0]-0.5 && cubePositionTemp2[0]-0.5 < cubePositionTemp1[0]+0.5 && cubePositionTemp2[2]+0.5 > cubePositionTemp1[2]-0.5 && cubePositionTemp2[2]-0.5 < cubePositionTemp1[2]+0.5) 
                {
                    alert ("moo 1");
                    cubeXPosition[cubeNumber] += 1;
                    movingBoxes[cubeNumber] += 1;           
               }
           //} 
        }*/

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

            makeCube(); 
            drawCube( 0, 0, 0,          //rotX, rotY, rotZ,   
                      movingBoxes[i], 1.5, cubeXPosition[i],          //transX, transY, transZ, 
                      5, 0.1, 5,          //scaleX, scaleY, scaleZ
                      pwgl.enemie);  //Texture

            if (movingBoxes[i] < -10){
                movingBoxes[i] = 7.5 + (Math.floor(Math.random() * 6));
                cubeXPosition[i] = 4.5 + (Math.floor(Math.random() * -6));
        /*
                for (var j=0; j<cubeNumber; j++)
                {
                    var cubePositionTemp1 = [movingBoxes[i], 1.5, cubeXPosition[i]];
                    var cubePositionTemp2 = [movingBoxes[j], 1.5, cubeXPosition[j]];
                    if (cubePositionTemp2[0]+0.5 > cubePositionTemp1[0]-0.5 && cubePositionTemp2[0]-0.5 < cubePositionTemp1[0]+0.5 && cubePositionTemp2[2]+0.5 > cubePositionTemp1[2]-0.5 && cubePositionTemp2[2]-0.5 < cubePositionTemp1[2]+0.5) 
                    {
                        cubeXPosition[i] += 1;
                        movingBoxes[i] += 1; 

                        cubeXPosition[j] -= 1;
                        movingBoxes[j] -= 1;          
                   }
                }*/
            }
        }

        //Handle hittest Stares
        for (var i=0; i<3; i++){
            var starePosition = [starePositionX[i], 1.5, starePositionZ[i]];
            if (starePosition[0]+0.5 > characterPosition[0]-0.5 && starePosition[0]-0.5 < characterPosition[0]+0.5 && starePosition[2]+0.5 > characterPosition[2]-0.5 && starePosition[2]-0.5 < characterPosition[2]+0.5) {
                stareScore++;
                starePositionX[i] = -4;
                starePositionZ[i] = -4;
                if (stareScore > 10)
                {
                    alert ("You have a new stare bundle! \n All in all you have: " + stareScore + " stares!");
                }
            }
        }

      //The object has been spawned as a small object. To mold it into the object 
      //you need, use the "draw"object"" variables. You can not yet change colors.
   /*     makePyramide();
        drawPyramide( 0, 1, 0,          //rotX, rotY, rotZ,
                      0, 0.6, 0,          //transX, transY, transZ,
                      5.5, 5.0, 5.5);   //scaleX, scaleY, scaleZ

        makeCube(); 
        drawCube( 1, 1, 1,      //rotX, rotY, rotZ,   
                  2, 0, 0,      //transX, transY, transZ, 
                  4, 9, 1);     //scaleX, scaleY, scaleZ
   
        makeElementBoxBuffer();
        drawElementBox( 0, 0, 0,   //rotX, rotY, rotZ,
                        0, -1.0, 0,   //transX, transY, transZ,
                        2, 2, 2);  //scaleX, scaleY, scaleZ 

        //Door - We see as a comment here what you can change. Door also has the "doorPos" this will change if you press O
        //this is so that we can open and close the door! How interactive we are! 
        makePlaneBuffer(1, 0.7, 0.2, 0.4, 1.0); //1=facing camera, 2=Side, 3 = floor or roof.  Color = R, G, B Alfa
        drawPlane(doorPos,-1,4.01,1,2,1); //transX, transY, transZ, scaleX, scaleY, scaleZ */
    }

    //As above, we have two functions that we ass values to, to make out objects. As you can see the priorety 
    //of what we can add is diferent. This is just cause I didnt want exessive amounts of variables. 
    //That could be added if you insisted. 
    function staticObjects() {

        //The coord system is just for orientation. No need to fancy it up. 
        //makeCoordSystem();
        //drawCoordSystem();
    //Making the scene
/*    //Base Tiles
        makePlaneBuffer(3, 1, 6); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
        drawPlane(0,0,2,    6,1,1, 0, pwgl.floorTexture); //transX, transY, transZ, scaleX, scaleY, scaleZ
        
        makePlaneBuffer(3, 1, 9); //1=facing camera, 2=Side, 3 = floor or roof.  tileSizeZ tileSizeX
        drawPlane(0,0,-2,   9,1,1, 0, pwgl.floorTexture); //transX, transY, transZ, scaleX, scaleY, scaleZ
 
    //Cover
        makePlaneBuffer(1, 0.1, 8); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
        drawPlane(0,0.9,0,   8,0.1,1, 0, pwgl.floorTexture); //transX, transY, transZ, scaleX, scaleY, scaleZ
        
        makePlaneBuffer(1, 0.1, 6); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
        drawPlane(0,0.9,2,   6,0.1,1, 0, pwgl.floorTexture); //transX, transY, transZ, scaleX, scaleY, scaleZ
        
        makePlaneBuffer(1, 0.1, 6); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
        drawPlane(0,0.9,4,   6,0.1,1, 0, pwgl.floorTexture); //transX, transY, transZ, scaleX, scaleY, scaleZ
    */
    //Back
        makePlaneBuffer(1, 10, 10); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
        drawPlane(0,0,-2,   10,10,1, 0, pwgl.basket); //transX, transY, transZ, scaleX, scaleY, scaleZ
    /*
    //Bridges
        makePlaneBuffer(3, 1, 0.5); //1=facing camera, 2=Side, 3 = floor or roof. tileSizeZ tileSizeX
        drawPlane(-1,0,0,   0.5,1,1, 0, pwgl.floorTexture); //transX, transY, transZ, scaleX, scaleY, scaleZ
        
        makePlaneBuffer(3, 1, 1.5); //1=facing camera, 2=Side, 3 = floor or roof.  tileSizeZ tileSizeX
        drawPlane(3,0,0,    1.5,1,1, 0, pwgl.floorTexture); //transX, transY, transZ, scaleX, scaleY, scaleZ
        
        makePlaneBuffer(3, 1, 0.5); //1=facing camera, 2=Side, 3 = floor or roof.  tileSizeZ tileSizeX
        drawPlane(-3,0,0,    0.5,1,1, 0, pwgl.floorTexture); //transX, transY, transZ, scaleX, scaleY, scaleZ
        
        makePlaneBuffer(3, 1, 0.5); //1=facing camera, 2=Side, 3 = floor or roof.  tileSizeZ tileSizeX
        drawPlane(-5,0,0,    0.5,1,1, 0, pwgl.floorTexture); //transX, transY, transZ, scaleX, scaleY, scaleZ
    */
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
        
        //mat4.rotate(mvMatrix, rotasjonY, [ 0, 1, 0], mvMatrix);
        //mat4.rotate(mvMatrix, rotasjonZ, [ 0, 0, 1], mvMatrix); 

        //starts the draw thing. It has its own //stuff
        draw();

        //Calls the key up and key down. This is also dependant on an external script like the frameloop thing. 
        document.addEventListener('keydown', handleKeyDown, false);
        document.addEventListener('keyup', handleKeyUp, false);
  }

  //------------------Textures------------------------
  function setupTextures () {

      pwgl.waterAni1= gl.createTexture();
      loadImageForTexture("tileWater0.png", pwgl.waterAni1);
      
      pwgl.waterAni2= gl.createTexture();
      loadImageForTexture("tileWater1.png", pwgl.waterAni2);
      
      pwgl.waterAni3= gl.createTexture();
      loadImageForTexture("tileWater2.png", pwgl.waterAni3);
      
      pwgl.waterAni4= gl.createTexture();
      loadImageForTexture("tileWater3.png", pwgl.waterAni4);

      pwgl.stare = gl.createTexture();
      loadImageForTexture("stare.png", pwgl.stare);

      pwgl.basket = gl.createTexture();
      loadImageForTexture("Stone2.png", pwgl.basket);

       pwgl.water = gl.createTexture();
      loadImageForTexture("tileWater.png", pwgl.water);

      pwgl.character = gl.createTexture();
      loadImageForTexture("character.png", pwgl.character);

      pwgl.enemie = gl.createTexture();
      loadImageForTexture("enemie.png", pwgl.enemie);
  }

  pwgl.ongoingImageLoads = [];
  function loadImageForTexture (url, texture) {
      var image = new Image();
      image.onload = function() {
        pwgl.ongoingImageLoads.splice(pwgl.ongoingImageLoads.indexOf(image), 1);
        compleatingTexture(image, texture);
      }
      pwgl.ongoingImageLoads.push(image);
      image.src = url;
  }
  function compleatingTexture (image, texture) {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

      
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, 
                    image);
                    
      gl.generateMipmap(gl.TEXTURE_2D);
      
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
      gl.bindTexture(gl.TEXTURE_2D, null);
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

    //This will be used to move the camera.
    //Shouldnt have this many global variables, but you shouldnt smell, and here we both are!
/*    var rotasjonX = 0;
    var rotasjonY = 0;
    var rotasjonZ = 0;//-Math.PI/6;
*/
    var translasjonX = -5.0;
    //var translasjonY = 0.0;
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
                
              /*  case 87: translasjonZ += delta; break; // w
                case 83: translasjonZ -= delta; break; // s

                case 68: rotasjonY -= delta; break; // d
                case 65: rotasjonY += delta; break; // a
                //case 83: rotasjonX += delta; break; // a
                //case 87: rotasjonX -= delta; break; // a*/

                case 79: //o opening and closing the door.
                if (dOpened == false){
                    doorPos -= delta;
                } else {
                    doorPos += delta;
                }
                if (doorPos < -2){
                  dOpened = true;
                }
                if (doorPos >= 0){
                  dOpened = false;
                }
                break;  
            };
            moveAgain = false;
        }

  }

    //Stops the actions started, from just continuing foreeeeeeeveeeeer. 
    function handleKeyUp(event)
      {
        moveAgain = true;
        /*
        translasjonX = 0;
        translasjonY = 0;
        translasjonZ = 0;

        rotasjonX = 0;
        rotasjonY = 0;
        rotasjonZ = 0;*/
      }
