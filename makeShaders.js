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

    function initShaders() 
	{
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) 
		{
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        //shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        //gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

        pwgl.vertexTextureAttributeLoc = gl.getAttribLocation(shaderProgram, "aTextureCoordinates");
        pwgl.uniformSamplerLoc = gl.getUniformLocation(shaderProgram, "uSampler");

        gl.enableVertexAttribArray(pwgl.vertexPositionAttributeLoc);
        gl.enableVertexAttribArray(pwgl.vertexTextureAttributeLoc);

        modelViewMatrix = mat4.create();
        projectionMatrix = mat4.create();
        modelViewMatrixStack = [];

    }

    //Utility functions -----------------------------------------------
    function uploadModelViewMatrixToShader() {
      gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, modelViewMatrix);
    }

    function uploadProjectionMatrixToShader() {
      gl.uniformMatrix4fv(shaderProgram.pMatrixUniform,
                          false, projectionMatrix);
    }

    function pushModelViewMatrix() {
      var copyToPush = mat4.create(modelViewMatrix);
      modelViewMatrixStack.push(copyToPush);    //made in setupShaders
    }

    function popModelViewMatrix() {
      if (modelViewMatrixStack.length == 0) {
        throw "Error popModelViewMatrix() - Stack was empty ";
      }
      modelViewMatrix = modelViewMatrixStack.pop();
    }