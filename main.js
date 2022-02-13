function render()
{
	gl.clear(gl.COLOR_BUFFER_BIT);
	cone.render();
}

function init()
{
	var canvas = document.getElementById("webgl-canvas");
	gl = canvas.getContext("webgl2");

	gl.clearColor(0.7, 0.1, 0.1, 1);
	cone = new Cone(gl, 1000);
	render();
}

window.onload = init;