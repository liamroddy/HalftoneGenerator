let pattern = "vertical"
let minRadius = 1
let maxRadius = 6
let centreDistance = 10
let circleOffset = 6

let canvasW = 500
let canvasH = 500

let centreX = canvasW/2
let centreY = canvasW/2

let backgroundColour = "#111111"
let foregroundColour = "#555555"

//function setup() {
window.setup = function () {
  	setupPattern()
	createDownloadButton()
}

//function draw() {
window.draw = function () {
  
}

let setupPattern = function () {
	createCanvas(canvasW, canvasH)
	
	background(backgroundColour)	
	fill(foregroundColour)
	noStroke()	
	
	if (pattern == "radial")
	  {
		  let perRingOffsetDegrees = map(circleOffset, 0, 12, 0, (2*Math.PI)) // convert 0-100 range to 0-full circle radians
		  
		  for (let i=centreDistance; i < Math.max(canvasW, canvasH); i+=centreDistance) // todo: replace with pythagorean
			{	
				let circumference = 2 * Math.PI * i
				
				let circlesPerCircumference = Math.round( circumference / centreDistance )
				let degreesBetweenCircles = (2 * Math.PI / circlesPerCircumference)
				let circleDiameter = map(i, centreDistance, canvasW, minRadius, maxRadius)
				
				for (let j=0; j<circlesPerCircumference; j++)
					{										
						let sin = Math.sin((degreesBetweenCircles * j) + (perRingOffsetDegrees*i))
						let cos = Math.cos((degreesBetweenCircles * j) + (perRingOffsetDegrees*i))

						ellipse(centreX + (sin * i), centreY + (cos * i), circleDiameter, circleDiameter)
					}
				
				
		  	}
	  }
	else if (pattern == "horizontal")
		{
			for (let x=0; x < canvasW; x+=centreDistance)
				{
					let circleDiameter = map(x, 0, canvasW, minRadius, maxRadius)
					
					let offset = 0 
					if ((x/centreDistance) % 2 == 0)
					{
						offset = map(circleOffset, 0, 12, 0, centreDistance) // convert 0-100 range to 0-centre distance
					}
					
					for (let y=-centreDistance; y < canvasH+centreDistance; y+=centreDistance) // go a bit off-screen on each side for offset
						{
							ellipse(x, y + offset, circleDiameter, circleDiameter)
						}
				}
		}
	else if (pattern == "vertical")
		{
			for (let y=0; y < canvasH; y+=centreDistance)
				{
					let circleDiameter = map(y, 0, canvasH, minRadius, maxRadius)
					
					let offset = 0 
					if ((y/centreDistance) % 2 == 0)
					{
						offset = map(circleOffset, 0, 12, 0, centreDistance) // convert 0-100 range to 0-centre distance
					}
					
					for (let x=-centreDistance; x < canvasH+centreDistance; x+=centreDistance)  // go a bit off-screen on each side for offset
						{
							ellipse(x + offset, y, circleDiameter, circleDiameter)
						}
				}
		}
}

let createDownloadButton = function () {
	let saveImageBtn = createButton("Download Pattern")
	saveImageBtn.mousePressed(
		function() {save("output_canvas.png") }
	)
}

	


/// UI

let allowRestart = false

/// initial set up
window.onload = function() {
	canvasWidth.setAttribute("value", canvasW)
	canvasHeight.setAttribute("value", canvasH)
	backgroundColourPicker.setAttribute("value", backgroundColour)	
	foregroundColourPicker.setAttribute("value", foregroundColour)
	
	minRadiusSlider.setAttribute("value", minRadius)
	maxRadiusSlider.setAttribute("value", maxRadius)
	centreDistanceSlider.setAttribute("value", centreDistance)
	circleOffsetSlider.setAttribute("value", circleOffset)
	
	canvasWidth.oninput()
	canvasHeight.oninput()
	minRadiusSlider.oninput()
	maxRadiusSlider.oninput()
	centreDistanceSlider.oninput()
	circleOffsetSlider.oninput()
	patternDropdown.onchange()
	
	allowRestart = true
	setupPattern()
}

// on inputs

canvasWidth.oninput = function(suppress) {
	canvasW = parseInt(this.value)
	centreX = canvasW/2
	if (allowRestart)
		setupPattern() // restart
}
				
canvasHeight.oninput = function(suppress) {
	canvasH = parseInt(this.value)
	centreY = canvasH/2
	if (allowRestart)
		setupPattern() // restart
}

backgroundColourPicker.oninput = function(suppress) {
	backgroundColour = this.value
	if (allowRestart)
		setupPattern() // restart
}

foregroundColourPicker.oninput = function(suppress) {
	foregroundColour = this.value
	if (allowRestart)
		setupPattern() // restart
}


minRadiusSlider.oninput = function(suppress) {
	minRadius = parseInt(this.value)
	if (allowRestart)
		setupPattern() // restart
}

maxRadiusSlider.oninput = function() {
	maxRadius = parseInt(this.value)
	if (allowRestart)
		setupPattern() // restart
}

centreDistanceSlider.oninput = function() {
	centreDistance = parseInt(this.value)
	if (allowRestart)
		setupPattern() // restart
}

circleOffsetSlider.oninput = function() {
	//let temp = parseInt(this.value)
	// = temp / 180 * Math.PI // convert degrees to radians
	circleOffset = parseInt(this.value)
	if (allowRestart)
		setupPattern() // restart
}

patternDropdown.onchange = function() {
	pattern = this.value
	if (allowRestart)
		setupPattern() // restart
}

