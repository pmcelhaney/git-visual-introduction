(function () {
	
var HOUSE_WIDTH = 80;
var GRID_WIDTH = 700/5;
var GRID_START_X = 75;	


var SHAPES = {
	walls: function () { return paper.rect(10, 30, 60, 60); },
	roof: function () { return paper.path( ['M40 0', 'L0 30', 'L80 30', 'L40 0'].join("") ); }
	
};
	
var paper;	
	
var drawHouse = function (col, row, features) {
	var features = (typeof features === "string") ? features.split(" ") : features + "x";
	var house = paper.set();
	$(features).each(function (i, name) {
		house.push( SHAPES[name]() );
	});
	house.translate( GRID_START_X + col * GRID_WIDTH, 100 );
	return house;
};

var drawArrow = function (col, row) {
	var arrow = paper.path( ['M0 5', 'L40 5', 'L35 0', 'M35 10', 'L40 5'].join("") ).translate(0, 50);
	arrow.translate( GRID_START_X - 50 + col * GRID_WIDTH, 100 );
	return arrow;
};


	
var frames = [
	{
		next: function () {
			this.house = drawHouse(0, 0, 'walls');
		},
		prev: function () {
			
		}
	},
	
	{
		next: function () {
			this.arrow = drawArrow(1, 0);
			this.house = drawHouse(1, 1, 'walls roof');
		},
		prev: function () {
			
		}
	},
	
	{
		next: function () {
			this.arrow = drawArrow(2, 0);
			this.house = drawHouse(2, 1, 'walls roof');
	
		},
		prev: function () {
			
		}
	}
];

$(function () {
    paper = Raphael("canvas", 800, 600);
	
	var i = 0;
	
	$('body').bind('keypress.presentation', function (e) {
		
		
		if(e.which === 39 || e.which === 32 && i < frames.length) {
			frames[i++].next();
			e.preventDefault();	
		} 
		
		if(e.which === 37 && i > 0) {
		   i--;
		   frames[i].prev && frames[i].prev();
		};
		
		
	});
	
});


}());