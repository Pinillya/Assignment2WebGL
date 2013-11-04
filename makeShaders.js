/*
So here we have.... tsk. Go read a tutorial, i know stuff, but not well enough to explain!
*/

    function getShader(gl, id) 
	{
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }
        var str = "";
        var k = shaderScript.firstChild;
		
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }
        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }


    var shaderProgram;
    var shaderProgramNoTexture;

    function initShaders() 
	{
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        //Texture
        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        //Texture
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) 
		{
            alert("Could not initialise texture shaders");
        }

        //Texture
        gl.useProgram(shaderProgram);
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

        pwgl.vertexTextureAttributeLoc = gl.getAttribLocation(shaderProgram, "aTextureCoordinates");
        pwgl.uniformSamplerLoc = gl.getUniformLocation(shaderProgram, "uSampler");

        gl.enableVertexAttribArray(pwgl.vertexPositionAttributeLoc);
        gl.enableVertexAttribArray(pwgl.vertexTextureAttributeLoc);

    }
    function initShadersNoTexture() 
    {
        var vertexShaderNoTexture = loadShaderFromDOM("shader-vs2");
        var fragmentShaderNoTexture = loadShaderFromDOM("shader-fs2");

        //noTexture
        shaderProgramNoTexture = gl.createProgram();
        gl.attachShader(shaderProgramNoTexture, vertexShaderNoTexture);
        gl.attachShader(shaderProgramNoTexture, fragmentShaderNoTexture);
        gl.linkProgram(shaderProgramNoTexture);

        //noTexture
        if (!gl.getProgramParameter(shaderProgramNoTexture, gl.LINK_STATUS)) 
        {
            alert("Could not initialise NO texture shaders");
        }

        //NO texture
        gl.useProgram(shaderProgramNoTexture);
        shaderProgramNoTexture.vertexPositionAttribute = gl.getAttribLocation(shaderProgramNoTexture, "aVertexPosition"); 
        shaderProgramNoTexture.vertexColorAttribute = gl.getAttribLocation(shaderProgramNoTexture, "aVertexColor");
        shaderProgramNoTexture.uniformMVMatrix = gl.getUniformLocation(shaderProgramNoTexture, "uMVMatrix");
        shaderProgramNoTexture.uniformProjMatrix = gl.getUniformLocation(shaderProgramNoTexture, "uPMatrix");
      
        gl.enableVertexAttribArray(shaderProgramNoTexture.vertexPositionAttribute);
      
        modelViewMatrix = mat4.create(); 
        projectionMatrix = mat4.create();
        modelViewMatrixStack = [];
    }

    function loadShaderFromDOM(id) {
      var shaderScript = document.getElementById(id);
      
      // If we don't find an element with the specified id
      // we do an early exit 
      if (!shaderScript) {
        return null;
      }
      
      // Loop through the children for the found DOM element and
      // build up the shader source code as a string
      var shaderSource = "";
      var currentChild = shaderScript.firstChild;
      while (currentChild) {
        if (currentChild.nodeType == 3) { // 3 corresponds to TEXT_NODE
          shaderSource += currentChild.textContent;
        }
        currentChild = currentChild.nextSibling;
      }
     
      var shader;
      if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
      } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
      } else {
        return null;
      }
     
      gl.shaderSource(shader, shaderSource);
      gl.compileShader(shader);
     
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
      } 
      return shader;
    }