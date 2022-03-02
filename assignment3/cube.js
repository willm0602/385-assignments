function Cube(gl) {

    var program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");
    aPosition = gl.getAttribLocation(program, "aPos");
    mv = gl.getUniformLocation(program, 'mv');
    p = gl.getUniformLocation(program, "p")

    this.mv = mat4();
    this.p = mat4();

    //coordinates
    const ZERO = [-1, -1, -1]
    const ONE = [-1, -1, 1]
    const TWO = [1, -1, -1]
    const THREE = [1, -1, 1]
    const FOUR = [-1, 1, -1]
    const FIVE = [-1,1, 1]
    const SIX = [1, 1, -1]
    const SEVEN = [1, 1, 1]

    var positions = [
        //front
        ...ZERO, //0
        ...FOUR, //1
        ...SIX, //2 
        ...TWO, //3

        //back
        ...ONE, //4
        ...FIVE, //5
        ...SEVEN, //6
        ...THREE, //7

        //left
        ...ZERO, //8
        ...FOUR, //9
        ...FIVE, //10
        ...ONE,  //11

        //right
        ...THREE, //12
        ...SEVEN,
        ...SIX,
        ...TWO,

        //top
        ...FOUR, //16
        ...FIVE,
        ...SEVEN,
        ...SIX,

        //bottom
        ...ZERO, //20
        ...ONE,
        ...THREE,
        ...TWO

    ];
    
    
    var indices = [
        0, 1, 2,        0, 2, 3, //front
        4, 5, 6,        4, 6, 7, //back
        8, 9, 10,       8, 10, 11, //left
        12, 13, 14,     12, 14, 15, //right
        16, 17, 18,     16, 18, 19, //top
        20, 21, 22,     20, 21, 23  //bottom

    ]
    positions.numComponents = 3;

    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );

    this.render = function () {
        gl.useProgram( program );
        gl.uniformMatrix4fv(mv, false, this.mv);
        gl.uniformMatrix4fv(p, false, this.p);

        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer( positions.aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }
};