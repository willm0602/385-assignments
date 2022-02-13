//color values for cone
const RED = 0.7;
const GREEN = 0.1;
const BLUE = 0.1;
const ALPHA = 0.3;

//renders cone
function render()
{
	gl.clear(gl.COLOR_BUFFER_BIT);
	cone.render();
}

//initial function

function init()
{
	var canvas = document.getElementById("webgl-canvas");
	gl = canvas.getContext("webgl2");

	gl.clearColor(RED, GREEN, BLUE, ALPHA);
	cone = new Cone(gl, 1000);
	render();
}

window.onload = init;