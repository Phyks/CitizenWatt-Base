/**
 * Handle graph menu buttons
 */
var Menu = function() {
	var api = {};
	var now_btn = document.getElementById('scale-now')
	  , day_btn = document.getElementById('scale-day')
	  , week_btn = document.getElementById('scale-week')
	  , month_btn = document.getElementById('scale-month')
	  , unit_energy = document.getElementById('unit-energy')
	  , unit_price = document.getElementById('unit-price')
	  , prev = document.getElementById('prev')
	  , next = document.getElementById('next')
	  , mode = ''
	  , unit = ''
	  , date = null // means 'now'
	  ;

	api.onunitchange = function(unit, callback){};
	api.onmodechange = function(mode, callback){};
	api.ondatechange = function(date, callback){};

	// Defined by user view width. Default to 15min
	api.timeWidth = 15*60*1000;

	/**
	 * Add menu listeners
	 */
	api.init = function() {
		now_btn.addEventListener('click', function() {
			api.setMode('now');
		});

		day_btn.addEventListener('click', function() {
			api.setMode('day');
		});

		week_btn.addEventListener('click', function() {
			api.setMode('week');
		});

		month_btn.addEventListener('click', function() {
			api.setMode('month');
		});

		unit_energy.addEventListener('click', function() {
			api.setUnit('energy');
		});

		unit_price.addEventListener('click', function() {
			api.setUnit('price');
		});

		prev.addEventListener('click', function() {
			api.setDate(new Date((date || new Date()).getTime() - api.getTimeWidth()));
		});

		next.addEventListener('click', function() {
			api.setDate(new Date((date || new Date()).getTime() + api.getTimeWidth()));
		});
	}

	/**
	 * Get display mode
	 */
	api.getMode = function() {
		return mode;
	};

	/**
	 * Set display mode.
	 * @param mode: New mode
	 * @param callback: (optional)
	 * @return boolean Whether the mode is accepted.
	 */
	api.setMode = function(new_mode, callback) {
		now_btn.className = '';
		day_btn.className = '';
		week_btn.className = '';
		month_btn.className = '';
		switch(new_mode) {
			case 'now':
				now_btn.className = 'active';
				break;
			case 'day':
				day_btn.className = 'active';
				break;
			case 'week':
				week_btn.className = 'active';
				break;
			case 'month':
				month_btn.className = 'active';
				break;
			default:
				return false;
		}
		if (new_mode != mode) {
			mode = new_mode;
			api.onmodechange(mode, callback);
		}
		return true;
	};

	/**
	 * Set unit.
	 * @param unit: New unit
	 * @param callback: (optional)
	 * @return boolean Whether the unit is accepted.
	 */
	api.setUnit = function(new_unit, callback) {
		unit_energy.className = '';
		unit_price.className = '';
		switch(new_unit) {
			case 'energy':
				unit_energy.className = 'active';
				break;
			case 'price':
				unit_price.className = 'active';
				break;
			default:
				return false;
		}
		if (new_unit != unit) {
			unit = new_unit;
			api.onunitchange(unit, callback);
		}
		return true;
	};

	/**
	 * Get unit.
	 */
	api.getUnit = function() {
		return unit;
	};

	/**
	 * Get unit string, which designate unit in ascii chars.
	 * This is used for example in the API.
	 * @return unit string.
	 */
	api.getUnitString = function() {
		return {
			'energy': mode == 'now' ? 'watts' : 'kwatthours',
			'price': 'euros'
		}[unit];
	};

	/**
	 * Get unit shortcut.
	 * This is used for displaying.
	 * @return unit shortcut.
	 */
	api.getUnitShortcut = function() {
		return {
			'energy': mode == 'now' ? 'W' : 'kWh',
			'price': '€'
		}[unit];
	};

	/**
	 * Get date.
	 */
	api.getDate = function() {
		return date;
	};

	/**
	 * Set date.
	 * @param date: New date
	 * @param callback: (optional)
	 */
	api.setDate = function(new_date, callback) {
		if (date != new_date) {
			date = new_date;
			api.ondatechange(unit, callback);
		}
	};

	/**
	 * Return view width in milliseconds 
	 */
	api.getTimeWidth = function() {
		switch (mode) {
			case 'now':
				return api.timeWidth; // Written
			case 'day':
				return dateutils.getDayLength();
			case 'week':
				return dateutils.getWeekLength();
			case 'month':
				return dateutils.getMonthLength(date);
		}
	};


	return api;
}
