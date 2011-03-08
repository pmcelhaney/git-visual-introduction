(function () {
	
var HOUSE_WIDTH = 80;
var GRID_WIDTH = 700/5;
var GRID_START_X = 75;	

	
var paper;	
	
var drawHouse = function (col, row) {
	var house = paper.set();
	house.push( paper.rect(10, 30, 60, 60));
	house.push( paper.path( ['M40 0', 'L0 30', 'L80 30', 'L40 0'].join("") ) );
	house.translate( GRID_START_X + col * GRID_WIDTH, 100 );
	return house;
};

var drawArrow = function (col, row) {
	var arrow = paper.path( ['M0 5', 'L40 5', 'L35 0', 'M35 10', 'L40 5'].join("") ).translate(0, 50);
	arrow.translate( GRID_START_X + 90 + col * GRID_WIDTH, 100 );
};


	
var frames = [
	{
		next: function () {
			this.house = drawHouse(0, 0);
			drawArrow(0, 0);
		},
		prev: function () {
			
		}
	},
	
	{
		next: function () {
			this.house = drawHouse(1, 1);
			this.house = drawHouse(2, 1);
			this.house = drawHouse(3, 1);
			this.house = drawHouse(4, 1);
		},
		prev: function () {
			
		}
	}
];

$(function () {
    paper = Raphael("canvas", 800, 600);
	
	var i = 0;
	
	$('body').bind('keyup.presentation', function (e) {
		if(e.which === 32 && i < frames.length) {
			frames[i++].next();
			return false;
		} 
		
		if(e.which === 37 && i > 0) {
		   i--;
		   frames[i].prev && frames[i].prev();
		}
	});
	
});


}());