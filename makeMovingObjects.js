    //So first things first. Lets make the moving objects. (It doesnt really matter what we make first right now....)
    //We will make the objects by calling on the sript that make objects. This means that we dont have to make one and 
    //one object, but instead we can write two simple function calls, and add values to the functions! 
    //("Illy did you make this system yourself?" "Why yes! thanks for notesing") 
    var movingWater = 0;
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

        characterPosition = [translasjonX, 1.61, translasjonZ]

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
        var spawnStareTrigger = Math.floor(Math.random() * 400);
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
                if (stareScore == 10 || stareScore == 20 || stareScore == 50 || stareScore == 100 || stareScore == 200)
                {
                    enemieSpeed += 0.01;
                    alert ("You have a new stare bundle! \n All in all you have: " + stareScore + " stares!");
                }
            }
        }
    }