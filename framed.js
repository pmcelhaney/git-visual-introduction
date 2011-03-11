(function () {
	
var HOUSE_WIDTH = 80;
var GRID_WIDTH = 100;
var GRID_START_X = 10;	


var SHAPES = {
	walls: function () { return paper.rect(10, 30, 60, 60, 3).attr('fill', '90-#b2cde0-#a7bedd'); },
	roof: function () { return paper.path( ['M40 0', 'L0 32', 'L80 32', 'L40 0'].join("") ).attr('fill', '90-#999-#555'); },
	door: function () { return paper.rect(21, 60, 16, 30, 1).attr('fill', '#000').attr('stroke-width', 0.5); },
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
		
	},
	window: function () {
		return paper.rect(45, 40, 15, 15, 2).attr('fill', '90-#e8e8e8-#fff-#e8e8e8');
	},
	color: function () {
		
		return paper.rect(21, 60, 16, 30, 2).attr('fill', '#64045e');
		
	},
	chimney: function () {
		return paper.path( ['M60 30', 'L60 3', 'L57 3', 'L57 0', 'L68 0', 'L68 3', 'L65 3', 'L65 30'].join(' ') ).attr( 'fill', '#333' );
		
	}
	
};


var frameIndex = 0;

var paper;	
var arrows = {};
var houses = {};

var upArrow = null;
var diagonalArrow;
	
var drawBranch = function (name, row) {
	var branch = paper.set();
	branch.push( paper.text(15.5, 25.5, name).attr( { 'font-size': '24pt', 'text-anchor': 'start', 'fill': '#888' } ) );
	branch.push( paper.rect(10.5, 10.5, 780, 125, 5).attr( { 'stroke-dasharray': '- ', 'stroke': '#888' } ) );
	branch.translate(0, row * 140);
	return branch;
};	
	
var drawHouse = function (col, row, features) {
	var features = (typeof features === "string") ? features.split(" ") : features + "x";
	var house = paper.set();
	$(features).each(function (i, name) {
		house.push( SHAPES[name]() );
	});
	house.translate( GRID_START_X + col * GRID_WIDTH + 0.5, 20.5 + row * 140 );
	if ( houses[col + ' ' + row] ) {
		houses[col + ' ' + row].remove();
	}
	houses[col + ' ' + row] = house;
	return house;
};

var removeHouse = function (col, row) {
	houses[col + ' ' + row].remove();
};

var drawArrow = function (col, row, pointRight) {
	var arrow = paper.path( ['M0 5', 'L20 5', 'L15 0', 'M15 10', 'L20 5'].join("") ).translate(0, 50);
	arrow.translate( GRID_START_X - 20.5 + col * GRID_WIDTH, 20.5 + row * 140 );
	if (!pointRight) {
		arrow.rotate(180);
	}
	arrows[col + ' ' + row] = arrow;
	return arrow;
};

var removeArrow = function (col, row) {
	arrows[col + ' ' + row].remove();
};

var drawUpArrow = function () {
	var arrow = upArrow = paper.path( ['M0 5', 'L30 5', 'L25 0', 'M25 10', 'L30 5'].join("") ).translate(0, 50);
	arrow.rotate(270);
	arrow.translate( 235.5, 80.5 );
	return arrow;
};

var drawDiagonalArrow = function () {
	var arrow = diagonalArrow = paper.path( ['M235 105', 'L235 90', 'L435 90', 'L435 75', 'L430 80', 'M435 75', 'L440 80'].join("") ).translate(0, 50);
	arrow.translate(15.5, 0.5);
	return arrow;
};


var terminalFrame = {
	next: function () {
		var nextOutput = $('#terminal *:hidden:first');
		var text = nextOutput.text();
		
		if ( nextOutput.is('kbd') ) {
			nextOutput.text('');
		}
					
		$('#terminal > *:hidden:not(#prompt):not(p):first').addClass('revealed');
		
		if ( nextOutput.is('kbd') ) {
			nextOutput.text(text);
		}
		
		this.showOrHidePrompt();
		$('#terminal').scrollTop( $('#terminal')[0].scrollHeight );
	},
	prev: function () {
		$('#terminal > *:not(#prompt):not(p):visible:last').removeClass('revealed');
		this.showOrHidePrompt();
	},
	
	showOrHidePrompt: function () {
		if ( $('#terminal *:hidden:first').is('kbd') ) {
			$('#prompt').addClass('revealed');
		} else {
			$('#prompt').removeClass('revealed'); 
		}
	}
};
	
var frames = [
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	
	{
		next: function () {
			this.house = drawHouse(0, 0, 'walls');
		},
		prev: function () {
			this.house.remove();
		}
	},
	
	
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,


	
	{
		next: function () {
			this.arrow = drawArrow(1, 0, true);
			this.house = drawHouse(1, 0, 'walls roof');
		},
		prev: function () {
			this.arrow.remove();
			this.house.remove();
		}
	},
	
	terminalFrame,
	terminalFrame,
	terminalFrame,
	
	
	
	{
		next: function () {
			this.arrow = drawArrow(2, 0, true);
			this.house = drawHouse(2, 0, 'walls roof door');
		},
		prev: function () {
			removeArrow(2, 0);
			removeHouse(2, 0);
		}
	},


	terminalFrame,
	terminalFrame,
	terminalFrame,


	
	{
		next: function () {
			$([ arrows['1 0'], arrows['2 0'] ] ).each( function () {
				this.animate({'rotation': 180}, 500);
			});
		},
		prev: function () {
			$([ arrows['1 0'], arrows['2 0'] ] ).each( function () {
				this.animate({'rotation': 0}, 500);
			});
		}
	},

	{
		next: function () {
			this.branch = drawBranch('master', 0);
			
		},
		prev: function () {
			this.branch.remove();
		}
	},
	
	terminalFrame,

	
	
	{
		next: function () {
			this.branch = drawBranch('my-branch', 1);
			
		},
		prev: function () {
			this.branch.remove();
		}
	},

	terminalFrame,
	terminalFrame,

	{
		next: function () {
			this.arrow = drawUpArrow();
			this.house = drawHouse(2, 1, 'walls door window roof');

		},
		prev: function () {
			removeHouse(2, 1);
			upArrow.remove();
		}
	},
	
	terminalFrame,
	terminalFrame,
	terminalFrame,
	
	
	{
		next: function () {
			this.arrow = drawArrow(3, 1);
			this.house = drawHouse(3, 1, 'walls door color window roof');

		},
		prev: function () {
			removeArrow(3, 1);
			removeHouse(3, 1);
		}
	},
	
	
	terminalFrame,
	terminalFrame,

	
	
	{
		next: function () {
			this.arrow = drawArrow(4, 1);
			this.house = drawHouse(4, 1, 'walls door color window chimney roof');

		},
		prev: function () {
			removeArrow(4, 1);
			removeHouse(4, 1);
		}
	},
	
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	
	{
		next: function () {
			this.arrow = drawArrow(3, 0);
			this.house = drawHouse(3, 0, 'walls siding door roof');

		},
		prev: function () {
			this.arrow.remove();
			this.house.remove();	
		}
	},
	
	terminalFrame,
	terminalFrame,

	{
		next: function () {
			this.arrow = drawArrow(4, 0);
			this.house = drawHouse(4, 0, 'walls siding brick door roof');

		},
		prev: function () {
			this.arrow.remove();
			this.house.remove();
		}
	},
	
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	
	{
		next: function () {
			upArrow.remove();
			drawDiagonalArrow();
		},
		
		prev: function () {
			diagonalArrow.remove();
			drawUpArrow();
		}
	},
	
	{
		next: function () {
			drawHouse(2,1, 'walls siding brick door window roof');
			drawHouse(3,1, 'walls siding brick door color window roof');
			drawHouse(4,1, 'walls siding brick door color window chimney roof');
		},
		
		prev: function () {
			drawHouse(2,1, 'walls door window roof');
			drawHouse(3,1, 'walls door color window roof');
			drawHouse(4,1, 'walls door color window chimney roof');	
		}
	},
	
	
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	
	{
		next: function () {
			
			this.items = [
				drawHouse(5, 0, 'walls siding brick door window roof'),
				drawArrow(5, 0),
				drawHouse(6, 0, 'walls siding brick door color window roof'),
				drawArrow(6, 0),
				drawHouse(7, 0, 'walls siding brick door color window chimney roof'),	
				drawArrow(7, 0)
			];
		},
		
		prev: function () {
			$(this.items).each(function () { this.remove(); });
		}
	},
	
	terminalFrame,
	terminalFrame,
	
	{
		next: function () {
			diagonalArrow.remove();
			this.mask = paper.rect(8.5, 148.5, 782.5, 127.5).attr( { 'fill': '#e8e8e8', 'stroke-width': 0 } );
		},
		
		prev: function () {
			drawDiagonalArrow();
			this.mask.remove();
		}
	},
	
	
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame,
	terminalFrame
	
];

$(function () {
    paper = Raphael("canvas", 800, 600);
	

	$('body').bind('keypress.presentation', function (e) {
		

	
		if(e.which === 39 || e.which === 32) {
			frames[frameIndex++].next();
			e.preventDefault();	
		} 
		
		if( (e.which === 37 || e.which === 98) && frameIndex > 0) {
		   console.log('back', frameIndex);
		   frameIndex--;
		   frames[frameIndex].prev && frames[frameIndex].prev();
		};
		
	
		
	});
	
});


}());