/*
 ---
 script: radiobutton.js
 description: ---
 license: MIT-style license
 authors:
 - Christian Merz
 requires:
 - core:1.4/Element.Event
 provides: [radiobutton]
 ...
 */

window.addEvent('domready', function() {
	var mooAccessRadiobutton = new AccessibleRadiobutton({
		'radiobuttons' : $('MooAccessRadiobutton')
	})
});
