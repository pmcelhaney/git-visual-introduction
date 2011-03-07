(function () {
	
var frames = [
	{
		next: function () { 
			this.h1 = $('body').append('<h1>Hello World</h1>')
		},
		prev: function () {
			this.h1.remove();
		}
	}, 
	
	{	
		next: function () {
			this.originalH1Text = $('h1').text();
			$('h1').text('Goodbye World');
		}, 
		prev: function () {
			$('h1').text(this.originalH1Text);
		}
	}
];

$(function () {
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