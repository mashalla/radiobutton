/*
---

name: Accessible Radiobuttons Demo

license: MIT-style license.

authors: Christian Merz

provides: [Radiobutton]

...
*/

window.addEvent('domready', function() {
	var mooAccessRadiobutton = new AccessibleRadiobutton({
		'radiobuttons' : $('MooAccessRadiobutton')
	})
});
