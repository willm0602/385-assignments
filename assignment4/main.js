
"use strict";

var gl;

//defines constants

//sizes
const SUN_RADIUS = 4;
const EARTH_RADIUS = 2;
const MOON_RADIUS = 1;
const EARTH_ORBIT = 15;
const MOON_ORBIT = 4;
const OVERALL_DIAMETER = 15;

//colors
const SUN_COLOR = vec4(0.8, 0.8, 0, 1, 1);
const EARTH_COLOR = vec4(0, 0.6, 0.3, 1);
const MOON_COLOR = vec4(0.9, 0.9, 0.9, 1);

//view distances
const NEAR = 0.99;
const FAR = OVERALL_DIAMETER + NEAR;
const TAN = (OVERALL_DIAMETER / 2) / (NEAR + (OVERALL_DIAMETER / 2));

const FOVY = 2 * Math.atan(TAN) * 180;

//rotations
const EARTH_ROTATION = [0, 1, 0];
const MOON_ROTATION = [0, 1, 0];

//global variables
var Sun, Earth, Moon;
var view, day;
var P = perspective(FOVY, 1, NEAR, FAR)

function init() {
    var canvas = document.getElementById("webgl-canvas");
    
    gl = canvas.getContext("webgl2");
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    // Add your sphere creation and configuration code here
    
    //sun
    Sun = new Sphere();
    Sun.radius = SUN_RADIUS;
    Sun.color = SUN_COLOR;
    Sun.P = P;

    //earth
    Earth = new Sphere();
    Earth.radius = EARTH_RADIUS;
    Earth.color = EARTH_COLOR;
    Earth.orbit = EARTH_ORBIT;
    Earth.P = P;

    //moon
    Moon = new Sphere();
    Moon.radius = MOON_RADIUS;
    Moon.color = MOON_COLOR;
    Moon.orbit = MOON_ORBIT;
    Moon.P = P;

    view = translate(0, 0, -0.5 * (NEAR + FAR));
    day = 0;

    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here

    day+=1;
    //defines the matrix stack
    var ms = new MatrixStack();
    ms.load(view);

    //renders the sun to the matrix stack
    ms.push();
    ms.scale(Sun.radius);
    Sun.render();
    ms.pop();

    //renders the earth to the matrix stack
    ms.push();
    ms.rotate(day, EARTH_ROTATION);
    ms.translate(EARTH_ORBIT, 0, 0);
    ms.push()
    ms.scale(EARTH_RADIUS);
    Earth.MV = ms.current()
    Earth.render();
    ms.pop();

    //renders the moon to the matrix stack
    ms.push();
    ms.rotate(day * 24, MOON_ROTATION);
    ms.push();
    ms.scale(MOON_RADIUS);
    Moon.MV = ms.current();
    Moon.render();
    ms.pop();

    requestAnimationFrame(render);
}

window.onload = init;