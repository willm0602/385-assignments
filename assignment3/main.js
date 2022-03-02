//color values for cone
const RED = 0.0;
const GREEN = 0.0;
const BLUE = 0.5;
const ALPHA = 1;

var angle = 0;
const angleDelta = 1;

//renders cube
function render()
{
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //gl.STENCIL_BUFFER_BIT also exists, not important rn, controls where you can draw
	
	//motion variables
	angle+=angleDelta;
	console.log(angle);
	R = rotate(angle, [1, 1, 1])
	cube.mv = R;
	cube.p = R;
	cube.render();
	render();

}

//initial function

function init()
{
	var canvas = document.getElementById("webgl-canvas");
	gl = canvas.getContext("webgl2");

	gl.clearColor(RED, GREEN, BLUE, ALPHA);
	cube = new Cube(gl, 1000);
	requestAnimationFrame(render);
}

window.onload = init;