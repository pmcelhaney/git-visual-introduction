(function () {
	
var HOUSE_WIDTH = 80;
var GRID_WIDTH = 700/5;
var GRID_START_X = 75;	

	
var paper;	
	
var drawHouse = function (col, row) {
	return paper.rect(GRID_START_X + col * GRID_WIDTH, 100, HOUSE_WIDTH, HOUSE_WIDTH);
};
	
var frames = [
	{
		next: function () {
			this.house = drawHouse(0, 0);
		},
		prev: function () {
			
		}
	},
	
	{
		next: function () {
			this.house = drawHouse(1, 1);
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