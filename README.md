Accessible Radiobutton
===========

Provides a class that makes a group of radiobuttons accessible

![Screenshot](http://www.accessiblemootoolsdemo.iao.fraunhofer.de/Mootools_Widgets/WidgetThumbs/Radiobutton.png)

How to use
----------

	#HTML
	<form action="" id="MooAccessRadiobutton">
		<p>
			<input type="radio" name="accessible" value="apple" checked>
			<span>Apple</span>
			<br>
			<input type="radio" name="accessible" value="banana">
			<span>Banana</span>
			<br>
			<input type="radio" name="accessible" value="orange">
			<span>Orange</span>
			<br>
			<input type="radio" name="accessible" value="pineapple">
			<span>Pineapple</span>
			<br>
			<input type="radio" name="accessible" value="melon">
			<span>Melon</span>
		</p>
	</form>
	
	#JS
	window.addEvent('domready', function() {
		var mooAccessRadiobutton = new AccessibleRadiobutton({
			'radiobuttons' : $('MooAccessRadiobutton')
		})
	});
