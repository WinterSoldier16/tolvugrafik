/////////////////////////////////////////////////////////////////
//    S�nid�mi � T�lvugraf�k
//     Teikna n�lgun � hring sem TRIANGLE_FAN
//
//    Hj�lmt�r Hafsteinsson, jan�ar 2022
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

// numCirclePoints er fj�ldi punkta � hringnum
// Heildarfj�ldi punkta er tveimur meiri (mi�punktur + fyrsti punktur kemur tvisvar)

// Breytti fjölda punkta úr 20 yfir í 200
var numCirclePoints = 4;       

var radius = 0.4;
var center = vec2(0, 0);

var points = [];
// createCirclePoints( center, radius, numCirclePoints );

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
	// Create the circle
    //points.push( center );
    // document.getElementById("slider").onchange = function(event) {
    //     var numCirclePoints = event.target.value;
    // }

    

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
        document.getElementById("slider").onchange = function(event) {
        numCirclePoints = event.target.value;
        console.log(numCirclePoints);
        render();
        //createCirclePoints( center, radius, numCirclePoints );
    };

    render();
   
}


// Create the points of the circle
function createCirclePoints( cent, rad, k )
{
    // Breytti hér, deili k (fjölda punkta) með 10
    // Prófaði mig áfram með nokkar tölur, 12 gaf mjög góðan hring
    // En 10 lætur þetta líta nákvæmlega eins út og hringinn í sýnidæminu
    var dAngle = 2*Math.PI/k;
    for( i=k; i>=0; i-- ) {
        // Bæti við auka punkti í miðjuna í þriðju hverri ítrun til að hægt sé að teikna marga þríhyrninga
        // sem allir eiga upptök sín í miðjunni
        // if (i % 3 === 0) {
        //     points.push(cent);
        // }
    	a = i*dAngle;
    	var p = vec2( rad*Math.sin(a) + cent[0], rad*Math.cos(a) + cent[1] );
    	points.push(p);
    }
}

function render() {

    points = [];
    points.push( center );

    createCirclePoints( center, radius, +numCirclePoints );
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    // Draw circle using Triangle Fan
    // Breytti hér
    gl.drawArrays( gl.TRIANGLE_FAN, 0, +numCirclePoints+2 );
    window.requestAnimFrame(render);
}
