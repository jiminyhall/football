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

xScale.domain([0, pitch.width]);
yScale.domain([0, pitch.length]);

var svg = d3.select('body').append('svg')
  .attr('height', height)
  .attr('width', width);

var svg_ball = d3.select('body')

var players = svg.selectAll('circle')
  .data(team.players);

players.enter().append('circle');


players.attr("r", 3.5);
players.attr('cx', xMap);
players.attr('cy', yMap);
