// start slingin' some d3 here.
var enemies = [];
var playerPos = [{x: 360, y: 315}];
var enemyCount = 10;
var collisions = 0;
var score = 0;
var highscore = 0;

for (var i = 0; i < enemyCount; i++) {
  enemies.push([Math.random() * 720, Math.random() * 625]);
}

var svg = d3.select('.board')
    .append('svg')
    .attr('height', 630)
    .attr('width', 720)
    .attr('position', 'center');


var drag = d3.drag()
  .on( 'drag', function(d, i) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select(this).attr('transform', function(d, i) {
      return 'translate(' + [ d.x, d.y ] + ')';
    });
  });


  

var player = svg.selectAll('.hero')
            .data(playerPos)
            .enter()
            .append('circle')
            .attr('class', 'hero')
            .attr('transform', 'translate(' + playerPos[0].x + ',' + playerPos[0].y + ')')
            .attr('r', 25)
            .style('fill', 'blue')
            .style('z-index', -1 )
            .call(drag);


var updateData = function (data) {


  var enemy = svg.selectAll('.enemies')
    .data(data);

  enemy.enter().append('circle')
    .attr('cx', function (d) { 
      return d[0]; 
    })
    .attr('cy', function (d) { 
      return d[1]; 
    })
  .merge(enemy)
    .transition()
    .duration(1000)
    .attr('class', 'enemies')
    .attr('r', 15)
    .attr('cx', function (d) { 
      return d[0]; 
    })
    .attr('cy', function (d) { 
      return d[1]; 
    })
    .style('fill', 'red');

  enemy.exit().remove();
};

// d3.selectAll('.mouse').call(d3.drag().on('start', function(event) {
//   playerPos[0].x = d3.event.x;
//   playerPos[0].y = d3.event.y;
// }));

//updateData(enemies);

d3.interval(function() {
  updateData(enemies.map(function (element) {
    element[0] = Math.random() * 720;
    element[1] = Math.random() * 625;
    return element; 
  }));
}, 1000);

var checkPos = function(data, hero) {

  for (var i = 0; i < data.length; i++) {
    var distance = Math.sqrt((data[i][0] * data[i][0] - hero[0].x * hero[0].x) + ((data[i][1] * data[i][1] - hero[0].y * hero[0].y)));
    if ( distance < 40) {
      collisions++;
      score = 0;
    } 
  }

};

setInterval(function() {
  checkPos(enemies, playerPos);
}, 10);

setInterval(function () {
  score = score + 10;
  if (score > highscore) {
    highscore = score;
  }
  d3.select('.current').text('Current score: ' + score);
  d3.select('.collisions').text('Collisions: ' + collisions);
  d3.select('.highscore').text('High score: ' + highscore);
}, 1000);



