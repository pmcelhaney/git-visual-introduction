(function () {
	
var HOUSE_WIDTH = 80;
var GRID_WIDTH = 700/5;
var GRID_START_X = 75;	
var MASTER_Y = 100;
	
var paper;	
	
var frames = [
	{
		next: function () {
			var i = 0;
			this.walls = paper.rect(GRID_START_X + GRID_WIDTH * i++, MASTER_Y, HOUSE_WIDTH, HOUSE_WIDTH);
			paper.rect(GRID_START_X + GRID_WIDTH * i++, MASTER_Y, HOUSE_WIDTH, HOUSE_WIDTH);
			paper.rect(GRID_START_X + GRID_WIDTH * i++, MASTER_Y, HOUSE_WIDTH, HOUSE_WIDTH);
			paper.rect(GRID_START_X + GRID_WIDTH * i++, MASTER_Y, HOUSE_WIDTH, HOUSE_WIDTH);
			paper.rect(GRID_START_X + GRID_WIDTH * i++, MASTER_Y, HOUSE_WIDTH, HOUSE_WIDTH);
		},
		prev: function () {
			
		}
	},
	
	{
		next: function () {
			this.walls = paper.rect(220, 100, 100, 100);
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
		} 
		
		if(e.which === 37 && i > 0) {
		   i--;
		   frames[i].prev && frames[i].prev();
		}
	});
	
});


}());