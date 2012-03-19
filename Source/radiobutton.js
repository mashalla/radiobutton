/*
---

name: Accessible Radiobuttons

license: MIT-style license.

authors: Christian Merz

provides: [Radiobutton]

...
*/

var AccessibleRadiobutton = new Class({
	Implements : [Options, Events],

	options : {
		radiobuttons : null,
		classPrefix : 'MooAccessRadiobutton',
		buttonHeight : 25
	},
	initialize : function(options) {
		this.setOptions(options);
		if(!this.options.radiobuttons)
			return;
		this.options.radiobuttons.setProperty('role', 'radiogroup');
		this.buttons = this.options.radiobuttons.getElements('input');
		this.newButtons = new Array();
		this.buttons.each( function(button) {
			var index = this.buttons.indexOf(button);
			this.newButtons[index] = new Element('span', {
				'role' : 'radio',
				'class' : 'MooAccessRadiobutton',
				'text' : button.getNext('span').get('text'),
				'tabindex' : '-1'
			}).inject(button, 'after');
			this.newButtons[index].getNext('span').dispose();
			button.setStyles({
				'visibility' : 'hidden',
				'display' : 'none'
			});
			if(!button.getProperty('disabled')) {
				if(button.get('checked')) {
					this.newButtons[index].style.backgroundPosition = "0 -" + this.options.buttonHeight * 2 + "px";

					this.newButtons[index].setProperty('aria-checked', true);
				}
				this.newButtons[index].addEvents({
					mousedown : this.push.bind(this),
					mouseup : function() {
						this.check(this.newButtons[index]);
					}.bind(this),
					mouseout : this.reset.bind(this),
					keydown : function(e) {
						switch (e.key) {
							case 'right':
								e.stop();
								if(e.control)
									this.indexIncrease(index).focus();
								else
									this.check(this.indexIncrease(index));
								break;
							case 'left':
								e.stop();
								if(e.control)
									this.indexDecrease(index).focus();
								else
									this.check(this.indexDecrease(index));
								break;
							case 'down':
								e.stop();
								if(e.control)
									this.indexIncrease(index).focus();
								else
									this.check(this.indexIncrease(index));
								break;
							case 'up':
								e.stop();
								if(e.control)
									this.indexDecrease(index).focus();
								else
									this.check(this.indexDecrease(index));
								break;
							case 'space':
								e.stop();
								this.check(this.newButtons[index]);
								break;
							case 'enter':
								e.stop();
								this.check(this.newButtons[index]);
								break;
						}
					}.bind(this)

				});
			}
		}.bind(this));
		this.newButtons[0].setProperty('tabindex', '0');
	},
	indexDecrease : function(index) {
		if(index == 0) {
			return this.newButtons.getLast();
		} else {
			return this.newButtons[index - 1];
		}
	},
	indexIncrease : function(index) {
		if(index == this.newButtons.indexOf(this.newButtons.getLast())) {
			return this.newButtons[0];
		} else {
			return this.newButtons[index + 1];
		}
	},
	reset : function(event) {
		var button = event.target.getPrevious();
		if(button.get('checked')) {
			event.target.style.backgroundPosition = "0 -" + this.options.buttonHeight * 2 + "px";
		} else {
			event.target.style.backgroundPosition = "0 -" + this.options.buttonHeight * 0 + "px";
		}
	},
	push : function(event) {
		var button = event.target.getPrevious();
		if(button.get('checked')) {
			event.target.style.backgroundPosition = "0 -" + this.options.buttonHeight * 3 + "px";
		} else {
			event.target.style.backgroundPosition = "0 -" + this.options.buttonHeight + "px";
		}
	},
	check : function(newButton) {
		var button = newButton.getPrevious();
		if(button.get('checked')) {
			newButton.style.backgroundPosition = "0 -" + this.options.buttonHeight * 0 + "px";
			button.set('checked', false);
			newButton.setProperty('aria-checked', false);
		} else {
			newButton.style.backgroundPosition = "0 -" + this.options.buttonHeight * 2 + "px";
			button.set('checked', true);
			this.newButtons.each( function(button) {
				if(button.getPrevious().get('checked')) {
					button.style.backgroundPosition = "0 -" + this.options.buttonHeight * 2 + "px";
					button.setProperty('tabindex', '0');
					button.setProperty('aria-checked', true);
					button.focus();
				} else {
					button.style.backgroundPosition = "0 -" + this.options.buttonHeight * 0 + "px";
					button.setProperty('tabindex', '-1');
					button.setProperty('aria-checked', false);
				}
			}.bind(this));
		}
	}
});
