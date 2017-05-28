var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 350 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var ball = new Object();
ball.x = 50;
ball.y = 35;
ball.size = 0.2;

var pitch = new Object();
pitch.length = 100;
pitch.width = 70;
pitch.x = 5;
pitch.y = 5;

var ground = new Object()
ground.length = 110;
ground.width  = 80;

var team = new Object();
team.name = "Arsenal";
team.shirt = "red";
team.short = "red";
team.socks = "white";
team.players = [
  { number: 1, x: 10, y: 10 },
  { number: 2, x: 15, y: 10 },
  { number: 3, x: 20, y: 10 },
  { number: 4, x: 25, y: 10 },
  { number: 5, x: 30, y: 10 },
  { number: 6, x: 5,  y: 5 },
  { number: 7, x: 10, y: 20 },
  { number: 8, x: 15, y: 20 },
  { number: 9, x: 20, y: 20 },
  { number: 10, x: 25, y: 20 },
  { number: 11, x: 30, y: 20 }
];

/* set up x */
var xValue = function(d) { return d.x;},                  // data -> value
    xScale = d3.scale.linear().range([0, width]),         // value -> display
    xMap = function(d) { return xScale(xValue(d));};      // data -> display

var yValue = function(d) { return d.y;},                  // data -> value
    yScale = d3.scale.linear().range([0, height]),        // value -> display
    yMap = function(d) { return yScale(yValue(d));};      // data -> display

xScale.domain([0, ground.width]);
yScale.domain([0, ground.length]);

var svg = d3.select('body').append('svg')
  .attr('height', height)
  .attr('width', width);


svg.append('rect')
  .attr('height', yScale(ground.length))
  .attr('width', xScale(ground.width))
  .attr('style', "fill:rgb(0,170,0);");

svg.append('rect')
  .attr('height', yScale(pitch.length))
  .attr('width', xScale(pitch.width))
  .attr('x', xScale(pitch.x))
  .attr('y', yScale(pitch.y))
  .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");

svg.append('rect')
  .attr('height', yScale(pitch.length/2))
  .attr('width', xScale(pitch.width))
  .attr('x', xScale(pitch.x))
  .attr('y', yScale(pitch.y+(pitch.length/2)))
  .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");

// north penalty box
svg.append('rect')
  .attr('width', xScale(44))
  .attr('height', yScale(18))
  .attr('x', xScale((pitch.width/2)-22))
  .attr('y', yScale(pitch.y))
  .attr('style', "stroke-width:2; stroke:rgb(255,255,255); fill-opacity:0;");

// south penalty box

// north goal
svg.append('line')
  .attr('x1', xScale(pitch.width/2-4))
  .attr('y1', yScale(pitch.y))
  .attr('x2', xScale(pitch.width/2+4))
  .attr('y2', yScale(pitch.y))
  .attr('style', "stroke-width:4; stroke:rgb(255,0,0); fill-opacity:1;");


var selection = svg.selectAll('circle')
  .data(team.players);

selection.enter().append('circle');
selection.attr("r", 3.5);
selection.attr('cx', xMap);
selection.attr('cy', yMap);
