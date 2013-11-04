// ----------------------- DRAW FUNCTION FOR THE MESH ----------------
function drawOBJMesh(r,g,b,a) {
  loadObjFromFile("monkey3");
  
  // Disable vertex attrib array and use constant color for the mesh.
  //Actually I use the position as color for now
  gl.disableVertexAttribArray(shaderProgramNoTexture.vertexColorAttribute);
  // Set color
  //gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, r, g, b, a);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, meshVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgramNoTexture.vertexPositionAttribute, 
                         meshVertexPositionBuffer.itemSize, 
                         gl.FLOAT, false, 0, 0);
       
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshVertexIndexBuffer);
        
  gl.drawElements(gl.TRIANGLES, meshVertexIndexBuffer.numberOfItems, 
                  gl.UNSIGNED_SHORT, 0);  
}

function drawOBJ() { 
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  mat4.perspective(60, gl.viewportWidth / gl.viewportHeight, 
                   0.1, 100.0, projectionMatrix);
  mat4.identity(modelViewMatrix);
  mat4.lookAt([8, 5, -10],[0, 0, 0], [0, 1,0], modelViewMatrix);
  
  uploadModelViewMatrixToShader();
  uploadProjectionMatrixToShader();
    
  // Draw mesh
  pushModelViewMatrix();
  mat4.translate(modelViewMatrix, [0.0, 0.0 ,0.0], modelViewMatrix);
  mat4.rotate(modelViewMatrix, 1.2, [0, 1, 0], modelViewMatrix);
  mat4.scale(modelViewMatrix, [2.02, 2.02, 2.02], modelViewMatrix);
  uploadModelViewMatrixToShader();
  drawOBJMesh(0.0, 0.0, 1.0, 1.0);
  popModelViewMatrix()
}