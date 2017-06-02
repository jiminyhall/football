var t; // timer
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 350 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var ball = { x: 50, y: 35, z:0, size: 0.2 , nx: 0, ny: 0, nz: 0, speed: 0};
var pitch = { length: 100, width: 70, x: 5, y: 5 };
var ground = { length: 110, width: 80, x: 0, y: 0 };

var team = {  name: "Arsenal",
              shirts: "red",
              shorts: "red",
              socks: "white",
              players: [
                { number: 1, x: (pitch.width/2)+pitch.x, y: pitch.y+3, speed: 1+Math.random()*3 },
                { number: 2, x: 1*(pitch.width/6)+pitch.x, y: pitch.y+20, speed: 1+Math.random()*3 },
                { number: 3, x: 2.25*(pitch.width/6)+pitch.x, y: pitch.y+20, speed: 1+Math.random()*3 },
                { number: 4, x: 3.75*(pitch.width/6)+pitch.x, y: pitch.y+20, speed: 1+Math.random()*3 },
                { number: 5, x: 5*(pitch.width/6)+pitch.x, y: pitch.y+20, speed: 1+Math.random()*3 },
                { number: 6, x: 2.25*(pitch.width/6)+pitch.x, y: 0.8*(pitch.length/2), speed: 1+Math.random()*3 },
                { number: 7, x: 1*(pitch.width/6)+pitch.x, y: 0.8*(pitch.length/2), speed: 1+Math.random()*3 },
                { number: 8, x: 3.75*(pitch.width/6)+pitch.x, y: 0.8*(pitch.length/2), speed: 1+Math.random()*3 },
                { number: 11, x: 5*(pitch.width/6)+pitch.x, y: 0.8*(pitch.length/2), speed: 1+Math.random()*3 },
                { number: 9, x: (pitch.width/2)+pitch.x+3, y: pitch.y+(pitch.length/2)-2, speed: 1+Math.random()*3 },
                { number: 10, x: (pitch.width/2)+pitch.x-3, y: pitch.y+(pitch.length/2)-2, speed: 1+Math.random()*3 }

]};

/* set up x */
var xValue = function(d) { return d.x;},                  // data -> value
    xScale = d3.scale.linear().range([0, width]),         // value -> display
    xMap = function(d) { return xScale(xValue(d));};      // data -> display
xScale.domain([0, ground.width]);

/* set up y */
var yValue = function(d) { return d.y;},                  // data -> value
    yScale = d3.scale.linear().range([0, height]),        // value -> display
    yMap = function(d) { return yScale(yValue(d));};      // data -> display
yScale.domain([0, ground.length]);

// set up SVG root
var svg = d3.select('div#pitch-container').append('svg')
  .attr('class', 'root')
  .attr('width', width)
  .attr('height', height);

setUpInfoPanel();
drawGround();
drawPitch();
drawPlayers();
drawBall();


function startTimer() {

  t = d3.timer(function(elapsed) {
    console.log('...');
    // if(elapsed>300) t.stop();

    //move ball if still
    if(ball.speed === 0) {
      randLocation(ball);

      // set the ball to move to a newly generated location
      d3.selectAll('g.ball circle').transition()
        .attr("cx",xScale(ball.nx))   // new x location
        .attr("cy",yScale(ball.ny))   // new y location
        .duration(1000)   // how long the transition lasts (ms)
        .delay(100)   // how long until the transition starts (ms)
        .each("end", function() { console.log("transition end"); ball.speed = 0; });  // when the transition ends

      //
      d3.selectAll('g.players circle').transition()
        .attr("cx",xScale(ball.nx))
        .attr("cy",yScale(ball.ny))
        .duration(function(d,i) { console.log(d.number + ": " + d.speed); return d.speed*1000; })
        .delay(500);

      }

  }, 150);
}


function randLocation(obj) {
  obj.nx = Math.random()*ground.width;
  obj.ny = Math.random()*ground.length;
  obj.speed = Math.random()*3;

  console.log("Going to: " + obj.nx + "," + obj.ny + " @ " + obj.speed);
}

function drawPlayers() {

  d3.selectAll('svg').append('svg:g')
    .attr('class', "players");

  svg = d3.select('g.players').selectAll('circle')
    .data(team.players)
    .enter()
    .append("svg:circle")
    .attr('class', "players")
    .attr('r', 3.5)
    .attr('cx', xMap)
    .attr('cy', yMap)
    .attr('style','fill:red;stroke:white;stroke-width:1');

}

function drawGround() {

    // draw ground
    svg.append('svg:g')
        .attr('class', "ground")
        .append('svg:rect')
          .attr('class', "ground")
          .attr('width', xScale(ground.width))
          .attr('height', yScale(ground.length))
          .attr('style', "fill:rgb(0,170,0);");
}

function drawPitch() {

  // add a new group to root
  svg.append('svg:g')
      .attr('class', "pitch");

  // selec the new group
  svg = d3.selectAll('g.pitch')

  // draw pitch
  svg.append('svg:rect')
    .attr('width', xScale(pitch.width))
    .attr('height', yScale(pitch.length))
    .attr('x', xScale(pitch.x))
    .attr('y', yScale(pitch.y))
    .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");

  /* draw north penalty circle */
  svg.append('circle')
    .attr('r', xScale(10))
    .attr('cx', xScale((pitch.width/2)+pitch.x))
    .attr('cy', yScale(12+pitch.y))
    .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");

  // draw north half
  svg.append('svg:rect')
    .attr('width', xScale(pitch.width))
    .attr('height', yScale(pitch.length/2))
    .attr('x', xScale(pitch.x))
    .attr('y', yScale(pitch.y))
    .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");

  // draw north penalty box
  svg.append('rect')
    .attr('width', xScale(44))
    .attr('height', yScale(18))
    .attr('x', xScale((pitch.width/2)-22+pitch.x))
    .attr('y', yScale(pitch.y))
    .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill:rgb(0,170,0); fill-opacity:1;");

  // draw north 6 yard box
  svg.append('rect')
    .attr('width', xScale(14))
    .attr('height', yScale(6))
    .attr('x', xScale((pitch.width/2)-7+pitch.x))
    .attr('y', yScale(pitch.y))
    .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");

  /* draw penalty spot */
    svg.append('circle')
      .attr('r', 0.2)
      .attr('cx', xScale((pitch.width/2)+pitch.x))
      .attr('cy', yScale(pitch.y+12))
      .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:1;");


    /* draw south penalty circle */
    svg.append('circle')
      .attr('r', xScale(10))
      .attr('cx', xScale((pitch.width/2)+pitch.x))
      .attr('cy', yScale(pitch.y+pitch.length-12))
      .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");

    // draw south half
    svg.append('svg:rect')
      .attr('width', xScale(pitch.width))
      .attr('height', yScale(pitch.length/2))
      .attr('x', xScale(pitch.x))
      .attr('y', yScale(pitch.y+(pitch.length/2)))
      .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");

    // draw south penalty box
    svg.append('rect')
      .attr('width', xScale(44))
      .attr('height', yScale(18))
      .attr('x', xScale((pitch.width/2)-22+pitch.x))
      .attr('y', yScale(pitch.y+pitch.length-18))
      .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill:rgb(0,170,0); fill-opacity:1;");

    // draw south 6 yard box
    svg.append('rect')
      .attr('width', xScale(14))
      .attr('height', yScale(6))
      .attr('x', xScale((pitch.width/2)-7+pitch.x))
      .attr('y', yScale(pitch.y+pitch.length-6))
      .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");

    /* draw south penalty spot */
      svg.append('circle')
        .attr('r', 0.2)
        .attr('cx', xScale((pitch.width/2)+pitch.x))
        .attr('cy', yScale(pitch.y+pitch.length-12))
        .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:1;");


  /* draw centre */
    svg.append('circle')
      .attr('r', xScale(10))
      .attr('cx', xScale((pitch.width/2)+pitch.x))
      .attr('cy', yScale((pitch.length/2)+pitch.y))
      .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");




  // south penalty box

  // north goal
  svg.append('line')
    .attr('x1', xScale((pitch.width/2)-4+pitch.x))
    .attr('y1', yScale(pitch.y))
    .attr('x2', xScale((pitch.width/2)+4+pitch.x))
    .attr('y2', yScale(pitch.y))
    .attr('style', "stroke-width:4; stroke:rgb(255,0,0); fill-opacity:1;");

  // south goal
  svg.append('line')
    .attr('x1', xScale((pitch.width/2)-4+pitch.x))
    .attr('y1', yScale(pitch.y+pitch.length))
    .attr('x2', xScale((pitch.width/2)+4+pitch.x))
    .attr('y2', yScale(pitch.y+pitch.length))
    .attr('style', "stroke-width:4; stroke:rgb(255,0,0); fill-opacity:1;");
}

function drawBall() {

  svg = d3.select('svg.root').append('svg:g').attr('class','ball')
    .append('svg:circle')
      .attr('cx',xScale((pitch.width/2) + pitch.x))
      .attr('cy',yScale((pitch.length/2) + pitch.y))
      .attr('r',3)
      .attr('style','fill:rgb(255,140,0); stroke-width:1; stroke:rgb(255,255,255)');


}

function setUpInfoPanel() {

  var btnStopStart = document.getElementById('btn-stop-start');

  btnStopStart.addEventListener("click", function() {
    if(btnStopStart.innerHTML === "Start") {
      console.log("Button stop START");
      startTimer();
      btnStopStart.innerHTML = "Stop";
    }
    else {
      console.log("Button STOP start");
      t.stop();
      btnStopStart.innerHTML = "Start";
    }
  });

}
