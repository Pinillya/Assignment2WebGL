/*
So here we have.... tsk. Go read a tutorial, i know stuff, but not well enough to explain!
*/

    var mvMatrix = mat4.create();
    var mvMatrixStack = [];
    var pMatrix = mat4.create();

    function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
      }

    function mvPopMatrix() {
        if (mvMatrixStack.length == 0) {
          throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
      }

    function setMatrixUniforms() 
	{
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }


    //No texture
    function uploadModelViewMatrixToShader() {
        gl.uniformMatrix4fv(shaderProgramNoTexture.uniformMVMatrix, false, modelViewMatrix);
    }

    function uploadProjectionMatrixToShader() {
        gl.uniformMatrix4fv(shaderProgramNoTexture.uniformProjMatrix, 
                          false, projectionMatrix);
    }

    function pushModelViewMatrix() {
        var copyToPush = mat4.create(modelViewMatrix);
        modelViewMatrixStack.push(copyToPush);  //made in setupShaders
    }

    function popModelViewMatrix() {
        if (modelViewMatrixStack.length == 0) {
            throw "Error popModelViewMatrix() - Stack was empty ";
        }
        modelViewMatrix = modelViewMatrixStack.pop();
    }