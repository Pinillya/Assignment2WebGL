  //------------------Textures------------------------
  function setupTextures () {

      pwgl.waterAni1= gl.createTexture();
      loadImageForTexture("textures/tileWater0.png", pwgl.waterAni1);
      
      pwgl.waterAni2= gl.createTexture();
      loadImageForTexture("textures/tileWater1.png", pwgl.waterAni2);
      
      pwgl.waterAni3= gl.createTexture();
      loadImageForTexture("textures/tileWater2.png", pwgl.waterAni3);
      
      pwgl.waterAni4= gl.createTexture();
      loadImageForTexture("textures/tileWater3.png", pwgl.waterAni4);

      pwgl.stare = gl.createTexture();
      loadImageForTexture("textures/stare.png", pwgl.stare);

      pwgl.basket = gl.createTexture();
      loadImageForTexture("textures/Stone2.png", pwgl.basket);

       pwgl.water = gl.createTexture();
      loadImageForTexture("textures/tileWater.png", pwgl.water);

      pwgl.character = gl.createTexture();
      loadImageForTexture("textures/character.png", pwgl.character);

      pwgl.enemie = gl.createTexture();
      loadImageForTexture("textures/enemie.png", pwgl.enemie);
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