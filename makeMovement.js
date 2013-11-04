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

                case 32: translasjonY += delta; break; // space
            };
            moveAgain = false;
/*
                switch(event.keyCode) {
                    case 32: translasjonY -= 0.01; break; // space
                break;
            }*/
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
