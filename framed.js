(function () {
	
var HOUSE_WIDTH = 80;
var GRID_WIDTH = 700/5;
var GRID_START_X = 75;	


var SHAPES = {
	walls: function () { return paper.rect(10, 30, 60, 60); },
	roof: function () { return paper.path( ['M40 0', 'L0 30', 'L80 30', 'L40 0'].join("") ); },
	door: function () { return paper.rect(21, 60, 16, 30).attr('fill', '#ddd'); },
	siding: function () { return paper.path( ['M10 38', 'L70 38', 'M10 46', 'L70 46', 'M10 54', 'L70 54', 'M10 62', 'L70 62', 'M10 70', 'L70 70', 'M10 78', 'L70 78', 'M10 86', 'L70 86'].join("") ).attr('stroke-width', 0.5); },
	brick: function () { 
		var x, y, xoffset = 10, path = [];
		for (y = 30; y <= 78; y+= 8) {
			xoffset = xoffset === 10 ? 20: 10;
			for (x = xoffset; x <= 60; x+= 20 ) {
				path.push('M' + x + ' ' + y + 'L' + x + ' ' + (y + 8));
			}
		}
		
		return paper.path( path.join("") ).attr('stroke-width', 0.5); 
		
	}
};
	
var paper;	
	
var drawHouse = function (col, row, features) {
	var features = (typeof features === "string") ? features.split(" ") : features + "x";
	var house = paper.set();
	$(features).each(function (i, name) {
		house.push( SHAPES[name]() );
	});
	house.translate( GRID_START_X + col * GRID_WIDTH + 0.5, 100.5 );
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
			this.house = drawHouse(2, 1, 'walls roof door');
	
		},
		prev: function () {
			
		}
	},

	{
		next: function () {
			this.arrow = drawArrow(3, 0);
			this.house = drawHouse(3, 1, 'walls roof siding door');

		},
		prev: function () {

		}
	},

	{
		next: function () {
			this.arrow = drawArrow(4, 0);
			this.house = drawHouse(4, 1, 'walls roof siding brick door');

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