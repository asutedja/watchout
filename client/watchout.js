// start slingin' some d3 here.
var enemies = [];
var playerPos = [{x: 360, y: 315}];
var enemyCount = 10;
var collisions = 0;
var score = 0;
var highscore = 0;
var cStatus;

for (var i = 0; i < enemyCount; i++) {
  enemies.push([Math.random() * 720, Math.random() * 625]);
}

var svg = d3.selectAll('.board')
    .append('svg')
    .attr('height', 630)
    .attr('width', 720)
    .attr('position', 'center');


var drag = d3.drag()
  .on( 'drag', function(d, i) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select(this)
    // .attr('transform', function(d, i) {
    //   return 'translate(' + [ d.x, d.y ] + ')';
    // })
    .attr('cx', function (d) { 
      return d.x; 
    })
    .attr('cy', function (d) { 
      return d.y; 
    });
  });





var updateData = function (data) {

var player = svg.selectAll('.hero')
            .data(playerPos)
            .enter()
            .append('circle')
            .attr('class', 'hero')
            //.attr('transform', 'translate(' + playerPos[0].x + ',' + playerPos[0].y + ')')
            .attr('cx', function (d) { 
              return d.x; 
            })
            .attr('cy', function (d) { 
              return d.y; 
            })
            .attr('r', 25)
            .style('fill', 'url(#circles-2)')
            .style('z-index', -1 )
            .style('position', 'absolute')
            .call(drag);
            
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
    .style('fill', 'url(#circles-1)');

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
    var distance = Math.sqrt(Math.pow(data[i][0] - hero[0].x, 2) + Math.pow(data[i][1] - hero[0].y, 2));
    if ( distance < 40 && cStatus === false) {
      collisions++;
      score = 0;
      cStatus = true;
    } 
  }
};

d3.interval(function() {
  checkPos(enemies, playerPos);
}, 100);
// d3.timer(
//   function() {

//     for (var i = 0; i < enemies.length; i++) {
//       var distance = Math.sqrt((enemies[i][0] * enemies[i][0] - playerPos[0].x * playerPos[0].x) + ((enemies[i][1] * enemies[i][1] - playerPos[0].y * playerPos[0].y)));
//       if ( distance < 40 && cStatus === false) {
//         collisions++;
//         score = 0;
//         cStatus = true;
//       } 
//     }
//   }
// , 10);

d3.select('svg').html('<defs><pattern id="circles-1" patternUnits="objectBoundingBox" width="30" height="30"><image xlink:href="http://media2.giphy.com/media/SwWXo32l7mfaU/giphy.gif" x="0" y="0" width="30" height="30"></image></pattern><pattern id="circles-2" patternUnits="objectBoundingBox" width="50" height="50"><image xlink:href="http://myfirstchat.com/myfirstworld/aug13/3910.gif" x="0" y="0" width="50" height=""></image></pattern></defs>').append();


setInterval(function () {
  score = score + 10;
  if (score > highscore) {
    highscore = score;
  }
  cStatus = false;
  d3.select('.current').text('Current score: ' + score);
  d3.select('.collisions').text('Collisions: ' + collisions);
  d3.select('.highscore').text('High score: ' + highscore);
}, 1000);





