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