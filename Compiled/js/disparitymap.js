/*	VéritéCo JS Master
	Version: 0.6
	Date: June 19, 2012
	Copyright 2012 VéritéCo unless part of TimelineJS, 
	if part of TimelineJS then it inherits TimelineJS's license.
	Designed and built by Zach Wise digitalartwork.net
================================================== */


/*	Simple JavaScript Inheritance
	By John Resig http://ejohn.org/
	MIT Licensed.
================================================== */
(function() {
	var initializing = false,
	fnTest = /xyz/.test(function() {
		xyz;
		}) ? /\b_super\b/: /.*/;
		// The base Class implementation (does nothing)
	this.Class = function() {};

    // Create a new Class that inherits from this class
	Class.extend = function(prop) {
		var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

        // Copy the properties over onto the new prototype
		for (var name in prop) {
            // Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" &&
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			(function(name, fn) {
				return function() {
					var tmp = this._super;

					// Add a new ._super() method that is the same method
					// but on the super-class
					this._super = _super[name];

					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					var ret = fn.apply(this, arguments);
					this._super = tmp;

					return ret;
				};
			})(name, prop[name]) :
			prop[name];
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init)
			this.init.apply(this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
    };
})();

/*	Access to the Global Object
	access the global object without hard-coding the identifier window
================================================== */
var global = (function () {
   return this || (1,eval)('this');
}());

/* VMM
================================================== */
if (typeof VMM == 'undefined') {
	
	/* Main Scope Container
	================================================== */
	//var VMM = {};
	var VMM = Class.extend({});
	
	/* Debug
	================================================== */
	VMM.debug = true;
	
	/* Master Config
	================================================== */
	
	VMM.master_config = ({
		
		init: function() {
			return this;
		},
		
		sizes: {
			api: {
				width:			0,
				height:			0
			}
		},
		
		vp:				"Pellentesque nibh felis, eleifend id, commodo in, interdum vitae, leo",
		
		api_keys_master: {
			flickr:		"RAIvxHY4hE/Elm5cieh4X5ptMyDpj7MYIxziGxi0WGCcy1s+yr7rKQ==",
			google:		"jwNGnYw4hE9lmAez4ll0QD+jo6SKBJFknkopLS4FrSAuGfIwyj57AusuR0s8dAo=",
			twitter:	""
		},
		
		timers: {
			api:			7000
		},
		
		api:	{
			pushques:		[]
			
		},
		
		twitter: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},
		
		flickr: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},
		
		youtube: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},
		
		vimeo: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},
		
		googlemaps: {
			active:			false,
			map_active:		false,
			places_active:	false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},
		
		googledocs: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},
		
		googleplus: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},
		
		wikipedia: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[],
			tries:			0
		},
		
		soundcloud: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		}
		
	}).init();
	
	//VMM.createElement(tag, value, cName, attrs, styles);
	VMM.createElement = function(tag, value, cName, attrs, styles) {
		
		var ce = "";
		
		if (tag != null && tag != "") {
			
			// TAG
			ce += "<" + tag;
			if (cName != null && cName != "") {
				ce += " class='" + cName + "'";
			};
			
			if (attrs != null && attrs != "") {
				ce += " " + attrs;
			};
			
			if (styles != null && styles != "") {
				ce += " style='" + styles + "'";
			};
			
			ce += ">";
			
			if (value != null && value != "") {
				ce += value;
			}
			
			// CLOSE TAG
			ce = ce + "</" + tag + ">";
		}
		
		return ce;
		
    };

	VMM.createMediaElement = function(media, caption, credit) {
		
		var ce = "";
		
		var _valid = false;
		
		ce += "<div class='media'>";
		
		if (media != null && media != "") {
			
			valid = true;
			
			ce += "<img src='" + media + "'>";
			
			// CREDIT
			if (credit != null && credit != "") {
				ce += VMM.createElement("div", credit, "credit");
			}
			
			// CAPTION
			if (caption != null && caption != "") {
				ce += VMM.createElement("div", caption, "caption");
			}

		}
		
		ce += "</div>";
		
		return ce;
		
    };

	// Hide URL Bar for iOS and Android by Scott Jehl
	// https://gist.github.com/1183357

	VMM.hideUrlBar = function () {
		var win = window,
			doc = win.document;

		// If there's a hash, or addEventListener is undefined, stop here
		if( !location.hash || !win.addEventListener ){

			//scroll to 1
			window.scrollTo( 0, 1 );
			var scrollTop = 1,

			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = "scrollTop" in doc.body ? doc.body.scrollTop : 1;
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );

			win.addEventListener( "load", function(){
				setTimeout(function(){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}, 0);
			}, false );
		}
	};
	

}

/* Trace (console.log)
================================================== */
function trace( msg ) {
	if (VMM.debug) {
		if (window.console) {
			console.log(msg);
		} else if ( typeof( jsTrace ) != 'undefined' ) {
			jsTrace.send( msg );
		} else {
			//alert(msg);
		}
	}
}

/*	Array Remove - By John Resig (MIT Licensed)
	http://ejohn.org/blog/javascript-array-remove/
================================================== */
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}

/* Extending Date to include Week
================================================== */
Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

/* Extending Date to include Day of Year
================================================== */
Date.prototype.getDayOfYear = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((this - onejan) / 86400000);
}

/* A MORE SPECIFIC TYPEOF();
//	http://rolandog.com/archives/2007/01/18/typeof-a-more-specific-typeof/
================================================== */
// type.of()
var is={
	Null:function(a){return a===null;},
	Undefined:function(a){return a===undefined;},
	nt:function(a){return(a===null||a===undefined);},
	Function:function(a){return(typeof(a)==="function")?a.constructor.toString().match(/Function/)!==null:false;},
	String:function(a){return(typeof(a)==="string")?true:(typeof(a)==="object")?a.constructor.toString().match(/string/i)!==null:false;},
	Array:function(a){return(typeof(a)==="object")?a.constructor.toString().match(/array/i)!==null||a.length!==undefined:false;},
	Boolean:function(a){return(typeof(a)==="boolean")?true:(typeof(a)==="object")?a.constructor.toString().match(/boolean/i)!==null:false;},
	Date:function(a){return(typeof(a)==="date")?true:(typeof(a)==="object")?a.constructor.toString().match(/date/i)!==null:false;},
	HTML:function(a){return(typeof(a)==="object")?a.constructor.toString().match(/html/i)!==null:false;},
	Number:function(a){return(typeof(a)==="number")?true:(typeof(a)==="object")?a.constructor.toString().match(/Number/)!==null:false;},
	Object:function(a){return(typeof(a)==="object")?a.constructor.toString().match(/object/i)!==null:false;},
	RegExp:function(a){return(typeof(a)==="function")?a.constructor.toString().match(/regexp/i)!==null:false;}
};
var type={
	of:function(a){
		for(var i in is){
			if(is[i](a)){
				return i.toLowerCase();
			}
		}
	}
};





/*********************************************** 
     Begin VMM.Library.js 
***********************************************/ 

/*	* LIBRARY ABSTRACTION
================================================== */
if(typeof VMM != 'undefined') {
	
	VMM.smoothScrollTo = function(elem, duration, ease) {
		if( typeof( jQuery ) != 'undefined' ){
			var _ease		= "easein",
				_duration	= 1000;
		
			if (duration != null) {
				if (duration < 1) {
					_duration = 1;
				} else {
					_duration = Math.round(duration);
				}
				
			}
			
			if (ease != null && ease != "") {
				_ease = ease;
			}
			
			if (jQuery(window).scrollTop() != VMM.Lib.offset(elem).top) {
				VMM.Lib.animate('html,body', _duration, _ease, {scrollTop: VMM.Lib.offset(elem).top})
			}
			
		}
		
	};
	
	VMM.attachElement = function(element, content) {
		if( typeof( jQuery ) != 'undefined' ){
			jQuery(element).html(content);
		}
		
	};
	
	VMM.appendElement = function(element, content) {
		
		if( typeof( jQuery ) != 'undefined' ){
			jQuery(element).append(content);
		}
		
	};
	
	VMM.getHTML = function(element) {
		var e;
		if( typeof( jQuery ) != 'undefined' ){
			e = jQuery(element).html();
			return e;
		}
		
	};
	
	VMM.getElement = function(element, p) {
		var e;
		if( typeof( jQuery ) != 'undefined' ){
			if (p) {
				e = jQuery(element).parent().get(0);
				
			} else {
				e = jQuery(element).get(0);
			}
			return e;
		}
		
	};
	
	VMM.bindEvent = function(element, the_handler, the_event_type, event_data) {
		var e;
		var _event_type = "click";
		var _event_data = {};
		
		if (the_event_type != null && the_event_type != "") {
			_event_type = the_event_type;
		}
		
		if (_event_data != null && _event_data != "") {
			_event_data = event_data;
		}
		
		if( typeof( jQuery ) != 'undefined' ){
			jQuery(element).bind(_event_type, _event_data, the_handler);
			
			//return e;
		}
		
	};
	
	VMM.unbindEvent = function(element, the_handler, the_event_type) {
		var e;
		var _event_type = "click";
		var _event_data = {};
		
		if (the_event_type != null && the_event_type != "") {
			_event_type = the_event_type;
		}
		
		if( typeof( jQuery ) != 'undefined' ){
			jQuery(element).unbind(_event_type, the_handler);
			
			//return e;
		}
		
	};
	
	VMM.fireEvent = function(element, the_event_type, the_data) {
		var e;
		var _event_type = "click";
		var _data = [];
		
		if (the_event_type != null && the_event_type != "") {
			_event_type = the_event_type;
		}
		if (the_data != null && the_data != "") {
			_data = the_data;
		}
		
		if( typeof( jQuery ) != 'undefined' ){
			jQuery(element).trigger(_event_type, _data);
			
			//return e;
		}
		
	};
	
	VMM.getJSON = function(url, data, callback) {
		if( typeof( jQuery ) != 'undefined' ){
			jQuery.ajaxSetup({
			     timeout: 3000
			});
			/* CHECK FOR IE
			================================================== */
			if ( VMM.Browser.browser == "Explorer" && parseInt(VMM.Browser.version, 10) >= 7 && window.XDomainRequest) {
				trace("IE JSON");
				var ie_url = url;
				if (ie_url.match('^http://')){
					return jQuery.getJSON(ie_url, data, callback);
				} else if (ie_url.match('^https://')) {
					ie_url = ie_url.replace("https://","http://");
					return jQuery.getJSON(ie_url, data, callback);
				} else {
					return jQuery.getJSON(url, data, callback);
				}
				
			} else {
				return jQuery.getJSON(url, data, callback);

			}
		}
	}
	
	VMM.parseJSON = function(the_json) {
		if( typeof( jQuery ) != 'undefined' ){
			return jQuery.parseJSON(the_json);
		}
	}
	
	// ADD ELEMENT AND RETURN IT
	VMM.appendAndGetElement = function(append_to_element, tag, cName, content) {
		var e,
			_tag		= "<div>",
			_class		= "",
			_content	= "",
			_id			= "";
		
		if (tag != null && tag != "") {
			_tag = tag;
		}
		
		if (cName != null && cName != "") {
			_class = cName;
		}
		
		if (content != null && content != "") {
			_content = content;
		}
		
		if( typeof( jQuery ) != 'undefined' ){
			
			e = jQuery(tag);
			
			e.addClass(_class);
			e.html(_content);
			
			jQuery(append_to_element).append(e);
			
		}
		
		return e;
		
	};
	
	VMM.Lib = {
		
		init: function() {
			return this;
		},
		
		hide: function(element, duration) {
			if (duration != null && duration != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).hide(duration);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).hide();
				}
			}
			
		},
		
		remove: function(element) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).remove();
			}
		},
		
		detach: function(element) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).detach();
			}
		},
		
		append: function(element, value) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).append(value);
			}
		},
		
		prepend: function(element, value) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).prepend(value);
			}
		},
		
		show: function(element, duration) {
			if (duration != null && duration != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).show(duration);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).show();
				}
			}
			
		},
		
		load: function(element, callback_function, event_data) {
			var _event_data = {elem:element}; // return element by default
			if (_event_data != null && _event_data != "") {
				_event_data = event_data;
			}
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).load(_event_data, callback_function);
			}
		},
		
		addClass: function(element, cName) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).addClass(cName);
			}
		},
		
		removeClass: function(element, cName) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).removeClass(cName);
			}
		},
		
		attr: function(element, aName, value) {
			if (value != null && value != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).attr(aName, value);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					return jQuery(element).attr(aName);
				}
			}
		},
		
		prop: function(element, aName, value) {
			if (typeof jQuery == 'undefined' || !/[1-9]\.[3-9].[1-9]/.test(jQuery.fn.jquery)) {
			    VMM.Lib.attribute(element, aName, value);
			} else {
				jQuery(element).prop(aName, value);
			}
		},
		
		attribute: function(element, aName, value) {
			
			if (value != null && value != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).attr(aName, value);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					return jQuery(element).attr(aName);
				}
			}
		},
		
		visible: function(element, show) {
			if (show != null) {
				if( typeof( jQuery ) != 'undefined' ){
					if (show) {
						jQuery(element).show(0);
					} else {
						jQuery(element).hide(0);
					}
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					if ( jQuery(element).is(':visible')){
						return true;
					} else {
						return false;
					}
				}
			}
		},
		
		css: function(element, prop, value) {

			if (value != null && value != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).css(prop, value);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					return jQuery(element).css(prop);
				}
			}
		},
		
		cssmultiple: function(element, propval) {

			if( typeof( jQuery ) != 'undefined' ){
				return jQuery(element).css(propval);
			}
		},
		
		offset: function(element) {
			var p;
			if( typeof( jQuery ) != 'undefined' ){
				p = jQuery(element).offset();
			}
			return p;
		},
		
		position: function(element) {
			var p;
			if( typeof( jQuery ) != 'undefined' ){
				p = jQuery(element).position();
			}
			return p;
		},
		
		width: function(element, s) {
			if (s != null && s != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).width(s);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					return jQuery(element).width();
				}
			}
		},
		
		height: function(element, s) {
			if (s != null && s != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).height(s);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					return jQuery(element).height();
				}
			}
		},
		
		toggleClass: function(element, cName) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).toggleClass(cName);
			}
		},
		
		each:function(element, return_function) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).each(return_function);
			}
			
		},
		
		html: function(element, str) {
			var e;
			if( typeof( jQuery ) != 'undefined' ){
				e = jQuery(element).html();
				return e;
			}
			
			if (str != null && str != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).html(str);
				}
			} else {
				var e;
				if( typeof( jQuery ) != 'undefined' ){
					e = jQuery(element).html();
					return e;
				}
			}

		},
		
		find: function(element, selec) {
			if( typeof( jQuery ) != 'undefined' ){
				return jQuery(element).find(selec);
			}
		},
		
		stop: function(element) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).stop();
			}
		},
		
		delay_animate: function(delay, element, duration, ease, att, callback_function) {
			if (VMM.Browser.device == "mobile" || VMM.Browser.device == "tablet") {
				var _tdd		= Math.round((duration/1500)*10)/10,
					__duration	= _tdd + 's';
					
				VMM.Lib.css(element, '-webkit-transition', 'all '+ __duration + ' ease');
				VMM.Lib.css(element, '-moz-transition', 'all '+ __duration + ' ease');
				VMM.Lib.css(element, '-o-transition', 'all '+ __duration + ' ease');
				VMM.Lib.css(element, '-ms-transition', 'all '+ __duration + ' ease');
				VMM.Lib.css(element, 'transition', 'all '+ __duration + ' ease');
				VMM.Lib.cssmultiple(element, _att);
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).delay(delay).animate(att, {duration:duration, easing:ease} );
				}
			}
			
		},
		
		animate: function(element, duration, ease, att, que, callback_function) {
			
			var _ease		= "easein",
				_que		= false,
				_duration	= 1000,
				_att		= {};
			
			if (duration != null) {
				if (duration < 1) {
					_duration = 1;
				} else {
					_duration = Math.round(duration);
				}
				
			}
			
			if (ease != null && ease != "") {
				_ease = ease;
			}
			
			if (que != null && que != "") {
				_que = que;
			}
			
			
			if (att != null) {
				_att = att
			} else {
				_att = {opacity: 0}
			}
			
			
			if (VMM.Browser.device == "mobile" || VMM.Browser.device == "tablet") {
				
				var _tdd		= Math.round((_duration/1500)*10)/10,
					__duration	= _tdd + 's';
					
				_ease = " cubic-bezier(0.33, 0.66, 0.66, 1)";
				//_ease = " ease-in-out";
				for (x in _att) {
					if (Object.prototype.hasOwnProperty.call(_att, x)) {
						trace(x + " to " + _att[x]);
						VMM.Lib.css(element, '-webkit-transition',  x + ' ' + __duration + _ease);
						VMM.Lib.css(element, '-moz-transition', x + ' ' + __duration + _ease);
						VMM.Lib.css(element, '-o-transition', x + ' ' + __duration + _ease);
						VMM.Lib.css(element, '-ms-transition', x + ' ' + __duration + _ease);
						VMM.Lib.css(element, 'transition', x + ' ' + __duration + _ease);
					}
				}
				
				VMM.Lib.cssmultiple(element, _att);
				
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					if (callback_function != null && callback_function != "") {
						jQuery(element).animate(_att, {queue:_que, duration:_duration, easing:_ease, complete:callback_function} );
					} else {
						jQuery(element).animate(_att, {queue:_que, duration:_duration, easing:_ease} );
					}
				}
			}
			
		}
		
	}
}

if( typeof( jQuery ) != 'undefined' ){
	
	/*	XDR AJAX EXTENTION FOR jQuery
		https://github.com/jaubourg/ajaxHooks/blob/master/src/ajax/xdr.js
	================================================== */
	(function( jQuery ) {
		if ( window.XDomainRequest ) {
			jQuery.ajaxTransport(function( s ) {
				if ( s.crossDomain && s.async ) {
					if ( s.timeout ) {
						s.xdrTimeout = s.timeout;
						delete s.timeout;
					}
					var xdr;
					return {
						send: function( _, complete ) {
							function callback( status, statusText, responses, responseHeaders ) {
								xdr.onload = xdr.onerror = xdr.ontimeout = jQuery.noop;
								xdr = undefined;
								complete( status, statusText, responses, responseHeaders );
							}
							xdr = new XDomainRequest();
							xdr.open( s.type, s.url );
							xdr.onload = function() {
								callback( 200, "OK", { text: xdr.responseText }, "Content-Type: " + xdr.contentType );
							};
							xdr.onerror = function() {
								callback( 404, "Not Found" );
							};
							if ( s.xdrTimeout ) {
								xdr.ontimeout = function() {
									callback( 0, "timeout" );
								};
								xdr.timeout = s.xdrTimeout;
							}
							xdr.send( ( s.hasContent && s.data ) || null );
						},
						abort: function() {
							if ( xdr ) {
								xdr.onerror = jQuery.noop();
								xdr.abort();
							}
						}
					};
				}
			});
		}
	})( jQuery );
	
	/*	jQuery Easing v1.3
		http://gsgd.co.uk/sandbox/jquery/easing/
	================================================== */
	jQuery.easing['jswing'] = jQuery.easing['swing'];

	jQuery.extend( jQuery.easing, {
		def: 'easeOutQuad',
		swing: function (x, t, b, c, d) {
			//alert(jQuery.easing.default);
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		},
		easeInExpo: function (x, t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOutExpo: function (x, t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOutExpo: function (x, t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInQuad: function (x, t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function (x, t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOutQuad: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	});
}


/*********************************************** 
     Begin VMM.Browser.js 
***********************************************/ 

/*	* DEVICE AND BROWSER DETECTION
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.Browser == 'undefined') {
	
	VMM.Browser = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
			this.device = this.searchDevice(navigator.userAgent);
			this.orientation = this.searchOrientation(window.orientation);
		},
		searchOrientation: function(orientation) {
			var orient = "";
			if ( orientation == 0  || orientation == 180) {  
				orient = "portrait";
			} else if ( orientation == 90 || orientation == -90) {  
				orient = "landscape";
			} else {
				orient = "normal";
			}
			return orient;
		},
		searchDevice: function(d) {
			var device = "";
			if (d.match(/Android/i) || d.match(/iPhone|iPod/i)) {
				device = "mobile";
			} else if (d.match(/iPad/i)) {
				device = "tablet";
			} else if (d.match(/BlackBerry/i) || d.match(/IEMobile/i)) {
				device = "other mobile";
			} else {
				device = "desktop";
			}
			return device;
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString	= data[i].string,
					dataProp	= data[i].prop;
					
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1) {
						return data[i].identity;
					}
				} else if (dataProp) {
					return data[i].identity;
				}
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera",
				versionSearch: "Version"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				string: navigator.userAgent,
				subString: "iPhone",
				identity: "iPhone/iPod"
		    },
			{
				string: navigator.userAgent,
				subString: "iPad",
				identity: "iPad"
		    },
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]

	}
	VMM.Browser.init();
}

/*********************************************** 
     Begin VMM.FileExtention.js 
***********************************************/ 

/*	* File Extention
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.FileExtention == 'undefined') {
	VMM.FileExtention = {
		googleDocType: function(url) {
			var fileName			= url,
				fileExtension		= "",
				validFileExtensions = ["DOC","DOCX","XLS","XLSX","PPT","PPTX","PDF","PAGES","AI","PSD","TIFF","DXF","SVG","EPS","PS","TTF","XPS","ZIP","RAR"],
				flag				= false;
				
			fileExtension = fileName.substr(fileName.length - 5, 5);
			
			for (var i = 0; i < validFileExtensions.length; i++) {
				if (fileExtension.toLowerCase().match(validFileExtensions[i].toString().toLowerCase()) || fileName.match("docs.google.com") ) {
					flag = true;
				}
			}
			return flag;
		}
	}
}

/*********************************************** 
     Begin VMM.Util.js 
***********************************************/ 

/*	* Utilities and Useful Functions
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.Util == 'undefined') {
	
	VMM.Util = ({
		
		init: function() {
			return this;
		},
		
		/*	* CORRECT PROTOCOL (DOES NOT WORK)
		================================================== */
		correctProtocol: function(url) {
			var loc = (window.parent.location.protocol).toString(),
				prefix = "",
				the_url = url.split("://", 2);
			
			if (loc.match("http")) {
				prefix = loc;
			} else {
				prefix = "https";
			}
			
			return prefix + "://" + the_url[1];
			
		},
		
		/*	* MERGE CONFIG
		================================================== */
		mergeConfig: function(config_main, config_to_merge) {
			var x;
			for (x in config_to_merge) {
				if (Object.prototype.hasOwnProperty.call(config_to_merge, x)) {
					config_main[x] = config_to_merge[x];
				}
			}
			return config_main;
		},
		
		/*	* GET OBJECT ATTRIBUTE BY INDEX
		================================================== */
		getObjectAttributeByIndex: function(obj, index) {
			if(typeof obj != 'undefined') {
				var i = 0;
				for (var attr in obj){
					if (index === i){
						return obj[attr];
					}
					i++;
				}
				return "";
			} else {
				return "";
			}
			
		},
		
		/*	* ORDINAL
		================================================== */
		ordinal: function(n) {
		    return ["th","st","nd","rd"][(!( ((n%10) >3) || (Math.floor(n%100/10)==1)) ) * (n%10)]; 
		},
		
		/*	* RANDOM BETWEEN
		================================================== */
		//VMM.Util.randomBetween(1, 3)
		randomBetween: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		
		/*	* AVERAGE
			* http://jsfromhell.com/array/average
			* var x = VMM.Util.average([2, 3, 4]);
			* VMM.Util.average([2, 3, 4]).mean
		================================================== */
		average: function(a) {
		    var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
		    for(var m, s = 0, l = t; l--; s += a[l]);
		    for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
		    return r.deviation = Math.sqrt(r.variance = s / t), r;
		},
		
		/*	* CUSTOM SORT
		================================================== */
		customSort: function(a, b) {
			var a1= a, b1= b;
			if(a1== b1) return 0;
			return a1> b1? 1: -1;
		},
		
		/*	* Remove Duplicates from Array
		================================================== */
		deDupeArray: function(arr) {
			var i,
				len=arr.length,
				out=[],
				obj={};

			for (i=0;i<len;i++) {
				obj[arr[i]]=0;
			}
			for (i in obj) {
				out.push(i);
			}
			return out;
		},
		
		/*	* Given an int or decimal, turn that into string in $xxx,xxx.xx format.
		================================================== */
		number2money: function(n, symbol, padding) {
			var symbol = (symbol !== null) ? symbol : true; // add $
			var padding = (padding !== null) ? padding : false; //pad with .00
			var number = VMM.Math2.floatPrecision(n,2); // rounded correctly to two digits, if decimals passed
			var formatted = this.niceNumber(number);
			// no decimal and padding is enabled
			if (!formatted.split(/\./g)[1] && padding) formatted = formatted + ".00";
			// add money sign
			if (symbol) formatted = "$"+formatted;
			return formatted;
		},
		
		/*	* Returns a word count number
		================================================== */
		wordCount: function(s) {
			var fullStr = s + " ";
			var initial_whitespace_rExp = /^[^A-Za-z0-9\'\-]+/gi;
			var left_trimmedStr = fullStr.replace(initial_whitespace_rExp, "");
			var non_alphanumerics_rExp = /[^A-Za-z0-9\'\-]+/gi;
			var cleanedStr = left_trimmedStr.replace(non_alphanumerics_rExp, " ");
			var splitString = cleanedStr.split(" ");
			var word_count = splitString.length -1;
			if (fullStr.length <2) {
				word_count = 0;
			}
			return word_count;
		},
		
		ratio: {
			fit: function(w, h, ratio_w, ratio_h) {
				//VMM.Util.ratio.fit(w, h, ratio_w, ratio_h).width;
				var _fit = {width:0,height:0};
				// TRY WIDTH FIRST
				_fit.width = w;
				//_fit.height = Math.round((h / ratio_h) * ratio_w);
				_fit.height = Math.round((w / ratio_w) * ratio_h);
				if (_fit.height > h) {
					_fit.height = h;
					//_fit.width = Math.round((w / ratio_w) * ratio_h);
					_fit.width = Math.round((h / ratio_h) * ratio_w);
					
					if (_fit.width > w) {
						trace("FIT: DIDN'T FIT!!! ")
					}
				}
				
				return _fit;
				
			},
			r16_9: function(w,h) {
				//VMM.Util.ratio.r16_9(w, h) // Returns corresponding number
				if (w !== null && w !== "") {
					return Math.round((h / 16) * 9);
				} else if (h !== null && h !== "") {
					return Math.round((w / 9) * 16);
				}
			},
			r4_3: function(w,h) {
				if (w !== null && w !== "") {
					return Math.round((h / 4) * 3);
				} else if (h !== null && h !== "") {
					return Math.round((w / 3) * 4);
				}
			}
		},
		
		doubledigit: function(n) {
			return (n < 10 ? '0' : '') + n;
		},
		
		/*	* Returns a truncated segement of a long string of between min and max words. If possible, ends on a period (otherwise goes to max).
		================================================== */
		truncateWords: function(s, min, max) {
			
			if (!min) min = 30;
			if (!max) max = min;
			
			var initial_whitespace_rExp = /^[^A-Za-z0-9\'\-]+/gi;
			var left_trimmedStr = s.replace(initial_whitespace_rExp, "");
			var words = left_trimmedStr.split(" ");
			
			var result = [];
			
			min = Math.min(words.length, min);
			max = Math.min(words.length, max);
			
			for (var i = 0; i<min; i++) {
				result.push(words[i]);
			}		
			
			for (var j = min; i<max; i++) {
				var word = words[i];
				
				result.push(word);
				
				if (word.charAt(word.length-1) == '.') {
					break;
				}
			}		
			
			return (result.join(' '));
		},
		
		/*	* Turns plain text links into real links
		================================================== */
		linkify: function(text,targets,is_touch) {
			
			// http://, https://, ftp://
			var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

			// www. sans http:// or https://
			var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

			// Email addresses
			var emailAddressPattern = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
			

			return text
				.replace(urlPattern, "<a target='_blank' href='$&' onclick='void(0)'>$&</a>")
				.replace(pseudoUrlPattern, "$1<a target='_blank' onclick='void(0)' href='http://$2'>$2</a>")
				.replace(emailAddressPattern, "<a target='_blank' onclick='void(0)' href='mailto:$1'>$1</a>");
		},
		
		linkify_with_twitter: function(text,targets,is_touch) {
			
			// http://, https://, ftp://
			var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
			var url_pattern = /(\()((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\))|(\[)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\])|(\{)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\})|(<|&(?:lt|#60|#x3c);)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(>|&(?:gt|#62|#x3e);)|((?:^|[^=\s'"\]])\s*['"]?|[^=\s]\s+)(\b(?:ht|f)tps?:\/\/[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]+(?:(?!&(?:gt|#0*62|#x0*3e);|&(?:amp|apos|quot|#0*3[49]|#x0*2[27]);[.!&',:?;]?(?:[^a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]|$))&[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]*)*[a-z0-9\-_~$()*+=\/#[\]@%])/img;
			var url_replace = '$1$4$7$10$13<a href="$2$5$8$11$14" class="hyphenate">$2$5$8$11$14</a>$3$6$9$12';
			
			// www. sans http:// or https://
			var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
			function replaceURLWithHTMLLinks(text) {
			    var exp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
			    return text.replace(exp, "<a href='$1' target='_blank'>$3</a>");
			}
			// Email addresses
			var emailAddressPattern = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;
			
			//var twitterHandlePattern = /(@([\w]+))/g;
			var twitterHandlePattern = /\B@([\w-]+)/gm;
			var twitterSearchPattern = /(#([\w]+))/g;

			return text
				//.replace(urlPattern, "<a target='_blank' href='$&' onclick='void(0)'>$&</a>")
				.replace(url_pattern, url_replace)
				.replace(pseudoUrlPattern, "$1<a target='_blank' class='hyphenate' onclick='void(0)' href='http://$2'>$2</a>")
				.replace(emailAddressPattern, "<a target='_blank' onclick='void(0)' href='mailto:$1'>$1</a>")
				.replace(twitterHandlePattern, "<a href='http://twitter.com/$1' target='_blank' onclick='void(0)'>@$1</a>")
				.replace(twitterSearchPattern, "<a href='http://twitter.com/#search?q=%23$2' target='_blank' 'void(0)'>$1</a>");
		},
		
		linkify_wikipedia: function(text) {
			
			var urlPattern = /<i[^>]*>(.*?)<\/i>/gim;
			return text
				.replace(urlPattern, "<a target='_blank' href='http://en.wikipedia.org/wiki/$&' onclick='void(0)'>$&</a>")
				.replace(/<i\b[^>]*>/gim, "")
				.replace(/<\/i>/gim, "")
				.replace(/<b\b[^>]*>/gim, "")
				.replace(/<\/b>/gim, "");
		},
		
		/*	* Turns plain text links into real links
		================================================== */
		// VMM.Util.unlinkify();
		unlinkify: function(text) {
			if(!text) return text;
			text = text.replace(/<a\b[^>]*>/i,"");
			text = text.replace(/<\/a>/i, "");
			return text;
		},
		
		untagify: function(text) {
			if (!text) {
				return text;
			}
			text = text.replace(/<\s*\w.*?>/g,"");
			return text;
		},
		
		/*	* TK
		================================================== */
		nl2br: function(text) {
			return text.replace(/(\r\n|[\r\n]|\\n|\\r)/g,"<br/>");
		},
		
		/*	* Generate a Unique ID
		================================================== */
		// VMM.Util.unique_ID(size);
		unique_ID: function(size) {
			
			var getRandomNumber = function(range) {
				return Math.floor(Math.random() * range);
			};

			var getRandomChar = function() {
				var chars = "abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
				return chars.substr( getRandomNumber(62), 1 );
			};

			var randomID = function(size) {
				var str = "";
				for(var i = 0; i < size; i++) {
					str += getRandomChar();
				}
				return str;
			};
			
			return randomID(size);
		},
		/*	* Tells you if a number is even or not
		================================================== */
		// VMM.Util.isEven(n)
		isEven: function(n){
			return (n%2 === 0) ? true : false;
		},
		/*	* Get URL Variables
		================================================== */
		//	var somestring = VMM.Util.getUrlVars(str_url)["varname"];
		getUrlVars: function(string) {
			
			var str = string.toString();
			
			if (str.match('&#038;')) { 
				str = str.replace("&#038;", "&");
			} else if (str.match('&#38;')) {
				str = str.replace("&#38;", "&");
			} else if (str.match('&amp;')) {
				str = str.replace("&amp;", "&");
			}
			
			var vars = [], hash;
			var hashes = str.slice(str.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			
			
			return vars;
		},

		/*	* Cleans up strings to become real HTML
		================================================== */
		toHTML: function(text) {
			
			text = this.nl2br(text);
			text = this.linkify(text);
			
			return text.replace(/\s\s/g,"&nbsp;&nbsp;");
		},
		
		/*	* Returns text strings as CamelCase
		================================================== */
		toCamelCase: function(s,forceLowerCase) {
			
			if(forceLowerCase !== false) forceLowerCase = true;
			
			var sps = ((forceLowerCase) ? s.toLowerCase() : s).split(" ");
			
			for(var i=0; i<sps.length; i++) {
				
				sps[i] = sps[i].substr(0,1).toUpperCase() + sps[i].substr(1);
			}
			
			return sps.join(" ");
		},
		
		/*	* Replaces dumb quote marks with smart ones
		================================================== */
		properQuotes: function(str) {
			return str.replace(/\"([^\"]*)\"/gi,"&#8220;$1&#8221;");
		},
		/*	* Add Commas to numbers
		================================================== */
		niceNumber: function(nStr){
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		},
		/*	* Transform text to Title Case
		================================================== */
		toTitleCase: function(t){
			if ( VMM.Browser.browser == "Explorer" && parseInt(VMM.Browser.version, 10) >= 7) {
				return t.replace("_", "%20");
			} else {
				var __TitleCase = {
					__smallWords: ['a', 'an', 'and', 'as', 'at', 'but','by', 'en', 'for', 'if', 'in', 'of', 'on', 'or','the', 'to', 'v[.]?', 'via', 'vs[.]?'],

					init: function() {
						this.__smallRE = this.__smallWords.join('|');
						this.__lowerCaseWordsRE = new RegExp('\\b(' + this.__smallRE + ')\\b', 'gi');
						this.__firstWordRE = new RegExp('^([^a-zA-Z0-9 \\r\\n\\t]*)(' + this.__smallRE + ')\\b', 'gi');
						this.__lastWordRE = new RegExp('\\b(' + this.__smallRE + ')([^a-zA-Z0-9 \\r\\n\\t]*)$', 'gi');
					},

					toTitleCase: function(string) {
						var line = '';

						var split = string.split(/([:.;?!][ ]|(?:[ ]|^)["“])/);

						for (var i = 0; i < split.length; ++i) {
							var s = split[i];

							s = s.replace(/\b([a-zA-Z][a-z.'’]*)\b/g,this.__titleCaseDottedWordReplacer);

			 				// lowercase the list of small words
							s = s.replace(this.__lowerCaseWordsRE, this.__lowerReplacer);

							// if the first word in the title is a small word then capitalize it
							s = s.replace(this.__firstWordRE, this.__firstToUpperCase);

							// if the last word in the title is a small word, then capitalize it
							s = s.replace(this.__lastWordRE, this.__firstToUpperCase);

							line += s;
						}

						// special cases
						line = line.replace(/ V(s?)\. /g, ' v$1. ');
						line = line.replace(/(['’])S\b/g, '$1s');
						line = line.replace(/\b(AT&T|Q&A)\b/ig, this.__upperReplacer);

						return line;
					},

					__titleCaseDottedWordReplacer: function (w) {
						return (w.match(/[a-zA-Z][.][a-zA-Z]/)) ? w : __TitleCase.__firstToUpperCase(w);
					},

					__lowerReplacer: function (w) { return w.toLowerCase() },

					__upperReplacer: function (w) { return w.toUpperCase() },

					__firstToUpperCase: function (w) {
						var split = w.split(/(^[^a-zA-Z0-9]*[a-zA-Z0-9])(.*)$/);
						if (split[1]) {
							split[1] = split[1].toUpperCase();
						}
					
						return split.join('');
					
					
					}
				};

				__TitleCase.init();
			
				t = t.replace(/_/g," ");
				t = __TitleCase.toTitleCase(t);
			
				return t;
				
			}
			
		}
		
	}).init();
}

/*********************************************** 
     Begin VMM.LoadLib.js 
***********************************************/ 

/*	* LoadLib Based on LazyLoad by Ryan Grove
	* https://github.com/rgrove/lazyload/ 
	* Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
	* All rights reserved.

	* Permission is hereby granted, free of charge, to any person obtaining a copy of
	* this software and associated documentation files (the 'Software'), to deal in
	* the Software without restriction, including without limitation the rights to
	* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
	* the Software, and to permit persons to whom the Software is furnished to do so,
	* subject to the following conditions:

	* The above copyright notice and this permission notice shall be included in all
	* copies or substantial portions of the Software.

================================================== */
window.loadedJS = [];


if(typeof VMM != 'undefined' && typeof VMM.LoadLib == 'undefined') {
	//VMM.LoadLib.js('http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', onJQueryLoaded);
	//VMM.LoadLib.css('http://someurl.css', onCSSLoaded);
	
	
	
	VMM.LoadLib = (function (doc) {
		var env,
		head,
		pending = {},
		pollCount = 0,
		queue = {css: [], js: []},
		styleSheets = doc.styleSheets;
	
		var loaded_Array = [];
	
		function isLoaded(url) {
			var has_been_loaded = false;
			for(var i=0; i<loaded_Array.length; i++) {
				if (loaded_Array[i] == url) {
					has_been_loaded = true;
				}
			}
			if (!has_been_loaded) {
				loaded_Array.push(url);
			}
			return has_been_loaded;
		}

		function createNode(name, attrs) {
			var node = doc.createElement(name), attr;

			for (attr in attrs) {
				if (attrs.hasOwnProperty(attr)) {
					node.setAttribute(attr, attrs[attr]);
				}
			}

			return node;
		}

	  function finish(type) {
	    var p = pending[type],
	        callback,
	        urls;

	    if (p) {
	      callback = p.callback;
	      urls     = p.urls;
	      urls.shift();
	      pollCount = 0;
	      if (!urls.length) {
	        callback && callback.call(p.context, p.obj);
	        pending[type] = null;
	        queue[type].length && load(type);
	      }
	    }
	  }

	  function getEnv() {
	    var ua = navigator.userAgent;

	    env = {

	      async: doc.createElement('script').async === true
	    };

	    (env.webkit = /AppleWebKit\//.test(ua))
	      || (env.ie = /MSIE/.test(ua))
	      || (env.opera = /Opera/.test(ua))
	      || (env.gecko = /Gecko\//.test(ua))
	      || (env.unknown = true);
	  }

	  function load(type, urls, callback, obj, context) {
	    var _finish = function () { finish(type); },
	        isCSS   = type === 'css',
	        nodes   = [],
	        i, len, node, p, pendingUrls, url;

	    env || getEnv();

	    if (urls) {

	      urls = typeof urls === 'string' ? [urls] : urls.concat();

	      if (isCSS || env.async || env.gecko || env.opera) {

	        queue[type].push({
	          urls    : urls,
	          callback: callback,
	          obj     : obj,
	          context : context
	        });
	      } else {
	        for (i = 0, len = urls.length; i < len; ++i) {
	          queue[type].push({
	            urls    : [urls[i]],
	            callback: i === len - 1 ? callback : null,
	            obj     : obj,
	            context : context
	          });
	        }
	      }
	    }

	    if (pending[type] || !(p = pending[type] = queue[type].shift())) {
	      return;
	    }

	    head || (head = doc.head || doc.getElementsByTagName('head')[0]);
	    pendingUrls = p.urls;

	    for (i = 0, len = pendingUrls.length; i < len; ++i) {
	      url = pendingUrls[i];

	      if (isCSS) {
	          node = env.gecko ? createNode('style') : createNode('link', {
	            href: url,
	            rel : 'stylesheet'
	          });
	      } else {
	        node = createNode('script', {src: url});
	        node.async = false;
	      }

	      node.className = 'lazyload';
	      node.setAttribute('charset', 'utf-8');

	      if (env.ie && !isCSS) {
	        node.onreadystatechange = function () {
	          if (/loaded|complete/.test(node.readyState)) {
	            node.onreadystatechange = null;
	            _finish();
	          }
	        };
	      } else if (isCSS && (env.gecko || env.webkit)) {
	        if (env.webkit) {
	          p.urls[i] = node.href; 
	          pollWebKit();
	        } else {
	          node.innerHTML = '@import "' + url + '";';
	          pollGecko(node);
	        }
	      } else {
	        node.onload = node.onerror = _finish;
	      }

	      nodes.push(node);
	    }

	    for (i = 0, len = nodes.length; i < len; ++i) {
	      head.appendChild(nodes[i]);
	    }
	  }

	  function pollGecko(node) {
	    var hasRules;

	    try {

	      hasRules = !!node.sheet.cssRules;
	    } catch (ex) {
	      pollCount += 1;

	      if (pollCount < 200) {
	        setTimeout(function () { pollGecko(node); }, 50);
	      } else {

	        hasRules && finish('css');
	      }

	      return;
	    }

	    finish('css');
	  }

	  function pollWebKit() {
	    var css = pending.css, i;

	    if (css) {
	      i = styleSheets.length;

	      while (--i >= 0) {
	        if (styleSheets[i].href === css.urls[0]) {
	          finish('css');
	          break;
	        }
	      }

	      pollCount += 1;

	      if (css) {
	        if (pollCount < 200) {
	          setTimeout(pollWebKit, 50);
	        } else {

	          finish('css');
	        }
	      }
	    }
	  }

	  return {

		css: function (urls, callback, obj, context) {
			if (isLoaded(urls)) {
				return callback;
			} else {
				load('css', urls, callback, obj, context);
			}
		},

		js: function (urls, callback, obj, context) {
			if (isLoaded(urls)) {
				return callback;
			} else {
				load('js', urls, callback, obj, context);
			}
		}

	  };
	})(this.document);
}



/*********************************************** 
     Begin VMM.Chart.js 
***********************************************/ 

/* Charts
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.Chart == 'undefined') {
	
	VMM.Chart = {
		google: {
			image: {
				chart: function(conf) {
					var chart = {
							element:		"<img src='",
							url:			"https://chart.googleapis.com/chart",
							type:			"?cht=",
							data:			"&chd=t:",
							label:			"&chdl=",
							color:			"&chco=",
							size:			"&chs="
						},
						i = 0,
						chart_config = {
							type:			"",
							width:			125,
							height:			60,
							data: [
								{
									label:	"Test",
									value:	2,
									color:	"c43c35"
								},
								{
									label:	"Test 2",
									value:	4,
									color:	"E5E5E5"
								}
							]
						};
				
					chart_config	= VMM.Util.mergeConfig(chart_config, conf);
				
					chart.type		+= chart_config.type;
					chart.size		+= chart_config.width + "x" + chart_config.height;
				
					for (i = 0; i < conf.data.length; i++) {
						
						chart.color	+= conf.data[i].color;
						if (conf.data[i].label != "") {
							chart.label	+= conf.data[i].label;
						}
						chart.data	+= conf.data[i].value;
						
						if (i+1 != conf.data.length) {
							chart.color	+= ",";
							if (conf.data[i+1].label != "") {
								chart.label	+= "|";
							}
							chart.data	+= "|";
						}
					}
				
					chart.url		+= chart.type + chart.size + chart.color + chart.data + chart.label;
					chart.element	+= chart.url + "' width='" + chart.width + "px' height='" + chart.height + "px' />";
				
					return chart.element;
				
				},
			
				concentric: function(data_set, label_set) {
					var chart = "https://chart.googleapis.com/chart?cht=pc";
					chart		+= "&chs=250x150"; // Size
					chart		+= "&chco="; // Series Color
					//chart = chart + "&chco=c43c35|CCCCCC"; // Series Color
		
					for (var j = 0; j < data_set.length; j++) {
						if (j==0) {
							chart = chart + "c43c35|CCCCCC";	
						} else {
							chart = chart + ",c43c35|CCCCCC";	
						}
					}
		
					chart = chart + "&chd=t:" //chart data
					for (var l = 0; l < data_set.length; l++) {
						if (l==0) {
				
						} else {
							chart = chart + "|";
						}
						chart = chart + data_set[l] + "," + (100 - data_set[l]);
					}
		
					//chart = chart + "&chdl=" // Labels SIDE
					chart = chart + "&chl=" // Labels arm
		
					for (var i = 0; i < label_set.length; i++) {
						if (i==0) {
				
						} else {
							chart = chart + "|";
						}
						chart = chart + label_set[i] + "|";
					}
		
					//chart = chart + "&chd=t:" + v1 + "," + v2; // chart data
					//chart = chart + "&chdl=" + t1;// + "|" + t2; // Labels SIDE

					chart = "<img src='" + chart + "' width='250px' height='150px'/>";
					return chart;
				
				},
			
				venn: function(data_set, label_set) {
					var chart	= "";
				
					chart		+= "&chs=250x200"; // Size
					chart		+= "&chd=t:100"; //chart data
				
					for (var l = 0; l < data_set.length; l++) {
						if (l==0) {
							chart	+= ",";
						} else {
							chart	+= ",";
						}
						chart		+= data_set[l];
					}
				
					chart = "<img src='https://chart.googleapis.com/chart?cht=v" + chart + "' width='250px' height='200px'/>";
					return chart;
				
				}
				
			},
			
			interactive: {
				chart: function(element, conf) {
					var chart		= new google.visualization.PieChart(document.getElementById(element)),
						data		= new google.visualization.DataTable(),
						options = {
							title:	'How Much Pizza I Ate Last Night',
							width:	400,
							height:	300
						}
					data.addColumn('string', 'Topping');
					data.addColumn('number', 'Slices');
					data.addRows([
						['Mushrooms', 3],
						['Onions', 1],
						['Olives', 1], 
						['Zucchini', 1],
						['Pepperoni', 2]
					]);
					
					chart.draw(data, options);
				}
			}
		},
		googlestatic: {
			
			get: function(url, id) {
				var doc = {url: url, id: id};
				VMM.master_config.googledocs.que.push(doc);
				VMM.master_config.googledocs.active = true;
			},
			
			create: function(doc) {
				var mediaElem = ""; 
				if (doc.url.match(/docs.google.com/i)) {
					mediaElem	=	"<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + doc.url + "&amp;embedded=true'></iframe>";
				} else {
					mediaElem	=	"<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + "http://docs.google.com/viewer?url=" + doc.url + "&amp;embedded=true'></iframe>";
				}
				VMM.attachElement("#"+doc.id, mediaElem);
			},
			
			pushQue: function() {
				
			}
		
		}
	}
	
}

/*********************************************** 
     Begin Leaflet.js 
***********************************************/ 

/*
 Copyright (c) 2010-2011, CloudMade, Vladimir Agafonkin
 Leaflet is a modern open-source JavaScript library for interactive maps.
 http://leaflet.cloudmade.com
*/

(function (root) {
	root.L = {
		VERSION: '0.3',

		ROOT_URL: root.L_ROOT_URL || (function () {
			var scripts = document.getElementsByTagName('script'),
				leafletRe = /\/?leaflet[\-\._]?([\w\-\._]*)\.js\??/;

			var i, len, src, matches;

			for (i = 0, len = scripts.length; i < len; i++) {
				src = scripts[i].src;
				matches = src.match(leafletRe);

				if (matches) {
					if (matches[1] === 'include') {
						return '../../dist/';
					}
					return src.split(leafletRe)[0] + '/';
				}
			}
			return '';
		}()),

		noConflict: function () {
			root.L = this._originalL;
			return this;
		},

		_originalL: root.L
	};
}(this));


/*
 * L.Util is a namespace for various utility functions.
 */

L.Util = {
	extend: function (/*Object*/ dest) /*-> Object*/ {	// merge src properties into dest
		var sources = Array.prototype.slice.call(arguments, 1);
		for (var j = 0, len = sources.length, src; j < len; j++) {
			src = sources[j] || {};
			for (var i in src) {
				if (src.hasOwnProperty(i)) {
					dest[i] = src[i];
				}
			}
		}
		return dest;
	},

	bind: function (/*Function*/ fn, /*Object*/ obj) /*-> Object*/ {
		return function () {
			return fn.apply(obj, arguments);
		};
	},

	stamp: (function () {
		var lastId = 0, key = '_leaflet_id';
		return function (/*Object*/ obj) {
			obj[key] = obj[key] || ++lastId;
			return obj[key];
		};
	}()),

	requestAnimFrame: (function () {
		function timeoutDefer(callback) {
			window.setTimeout(callback, 1000 / 60);
		}

		var requestFn = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			timeoutDefer;

		return function (callback, context, immediate, contextEl) {
			callback = context ? L.Util.bind(callback, context) : callback;
			if (immediate && requestFn === timeoutDefer) {
				callback();
			} else {
				requestFn(callback, contextEl);
			}
		};
	}()),

	limitExecByInterval: function (fn, time, context) {
		var lock, execOnUnlock, args;
		function exec() {
			lock = false;
			if (execOnUnlock) {
				args.callee.apply(context, args);
				execOnUnlock = false;
			}
		}
		return function () {
			args = arguments;
			if (!lock) {
				lock = true;
				setTimeout(exec, time);
				fn.apply(context, args);
			} else {
				execOnUnlock = true;
			}
		};
	},

	falseFn: function () {
		return false;
	},

	formatNum: function (num, digits) {
		var pow = Math.pow(10, digits || 5);
		return Math.round(num * pow) / pow;
	},

	setOptions: function (obj, options) {
		obj.options = L.Util.extend({}, obj.options, options);
	},

	getParamString: function (obj) {
		var params = [];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				params.push(i + '=' + obj[i]);
			}
		}
		return '?' + params.join('&');
	},

	template: function (str, data) {
		return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
			var value = data[key];
			if (!data.hasOwnProperty(key)) {
				throw new Error('No value provided for variable ' + str);
			}
			return value;
		});
	}
};


/*
 * Class powers the OOP facilities of the library. Thanks to John Resig and Dean Edwards for inspiration!
 */

L.Class = function () {};

L.Class.extend = function (/*Object*/ props) /*-> Class*/ {

	// extended class with the new prototype
	var NewClass = function () {
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}
	};

	// instantiate class without calling constructor
	var F = function () {};
	F.prototype = this.prototype;
	var proto = new F();

	proto.constructor = NewClass;
	NewClass.prototype = proto;

	// add superclass access
	NewClass.superclass = this.prototype;

	// add class name
	//proto.className = props;

	//inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype' && i !== 'superclass') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if (props.statics) {
		L.Util.extend(NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	if (props.includes) {
		L.Util.extend.apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	if (props.options && proto.options) {
		props.options = L.Util.extend({}, proto.options, props.options);
	}

	// mix given properties into the prototype
	L.Util.extend(proto, props);

	// allow inheriting further
	NewClass.extend = L.Class.extend;

	// method for adding properties to prototype
	NewClass.include = function (props) {
		L.Util.extend(this.prototype, props);
	};

	return NewClass;
};


/*
 * L.Mixin.Events adds custom events functionality to Leaflet classes
 */

L.Mixin = {};

L.Mixin.Events = {
	addEventListener: function (/*String*/ type, /*Function*/ fn, /*(optional) Object*/ context) {
		var events = this._leaflet_events = this._leaflet_events || {};
		events[type] = events[type] || [];
		events[type].push({
			action: fn,
			context: context || this
		});
		return this;
	},

	hasEventListeners: function (/*String*/ type) /*-> Boolean*/ {
		var k = '_leaflet_events';
		return (k in this) && (type in this[k]) && (this[k][type].length > 0);
	},

	removeEventListener: function (/*String*/ type, /*Function*/ fn, /*(optional) Object*/ context) {
		if (!this.hasEventListeners(type)) {
			return this;
		}

		for (var i = 0, events = this._leaflet_events, len = events[type].length; i < len; i++) {
			if (
				(events[type][i].action === fn) &&
				(!context || (events[type][i].context === context))
			) {
				events[type].splice(i, 1);
				return this;
			}
		}
		return this;
	},

	fireEvent: function (/*String*/ type, /*(optional) Object*/ data) {
		if (!this.hasEventListeners(type)) {
			return this;
		}

		var event = L.Util.extend({
			type: type,
			target: this
		}, data);

		var listeners = this._leaflet_events[type].slice();

		for (var i = 0, len = listeners.length; i < len; i++) {
			listeners[i].action.call(listeners[i].context || this, event);
		}

		return this;
	}
};

L.Mixin.Events.on = L.Mixin.Events.addEventListener;
L.Mixin.Events.off = L.Mixin.Events.removeEventListener;
L.Mixin.Events.fire = L.Mixin.Events.fireEvent;


(function () {
	var ua = navigator.userAgent.toLowerCase(),
		ie = !!window.ActiveXObject,
		webkit = ua.indexOf("webkit") !== -1,
		mobile = typeof orientation !== 'undefined' ? true : false,
		android = ua.indexOf("android") !== -1,
		opera = window.opera;

	L.Browser = {
		ie: ie,
		ie6: ie && !window.XMLHttpRequest,

		webkit: webkit,
		webkit3d: webkit && ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()),

		gecko: ua.indexOf("gecko") !== -1,

		opera: opera,

		android: android,
		mobileWebkit: mobile && webkit,
		mobileOpera: mobile && opera,

		mobile: mobile,
		touch: (function () {
			var touchSupported = false,
				startName = 'ontouchstart';

			// WebKit, etc
			if (startName in document.documentElement) {
				return true;
			}

			// Firefox/Gecko
			var e = document.createElement('div');

			// If no support for basic event stuff, unlikely to have touch support
			if (!e.setAttribute || !e.removeAttribute) {
				return false;
			}

			e.setAttribute(startName, 'return;');
			if (typeof e[startName] === 'function') {
				touchSupported = true;
			}

			e.removeAttribute(startName);
			e = null;

			return touchSupported;
		}())
	};
}());


/*
 * L.Point represents a point with x and y coordinates.
 */

L.Point = function (/*Number*/ x, /*Number*/ y, /*Boolean*/ round) {
	this.x = (round ? Math.round(x) : x);
	this.y = (round ? Math.round(y) : y);
};

L.Point.prototype = {
	add: function (point) {
		return this.clone()._add(point);
	},

	_add: function (point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	},

	subtract: function (point) {
		return this.clone()._subtract(point);
	},

	// destructive subtract (faster)
	_subtract: function (point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},

	divideBy: function (num, round) {
		return new L.Point(this.x / num, this.y / num, round);
	},

	multiplyBy: function (num) {
		return new L.Point(this.x * num, this.y * num);
	},

	distanceTo: function (point) {
		var x = point.x - this.x,
			y = point.y - this.y;
		return Math.sqrt(x * x + y * y);
	},

	round: function () {
		return this.clone()._round();
	},

	// destructive round
	_round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},

	clone: function () {
		return new L.Point(this.x, this.y);
	},

	toString: function () {
		return 'Point(' +
				L.Util.formatNum(this.x) + ', ' +
				L.Util.formatNum(this.y) + ')';
	}
};


/*
 * L.Bounds represents a rectangular area on the screen in pixel coordinates.
 */

L.Bounds = L.Class.extend({
	initialize: function (min, max) {	//(Point, Point) or Point[]
		if (!min) {
			return;
		}
		var points = (min instanceof Array ? min : [min, max]);
		for (var i = 0, len = points.length; i < len; i++) {
			this.extend(points[i]);
		}
	},

	// extend the bounds to contain the given point
	extend: function (/*Point*/ point) {
		if (!this.min && !this.max) {
			this.min = new L.Point(point.x, point.y);
			this.max = new L.Point(point.x, point.y);
		} else {
			this.min.x = Math.min(point.x, this.min.x);
			this.max.x = Math.max(point.x, this.max.x);
			this.min.y = Math.min(point.y, this.min.y);
			this.max.y = Math.max(point.y, this.max.y);
		}
	},

	getCenter: function (round)/*->Point*/ {
		return new L.Point(
				(this.min.x + this.max.x) / 2,
				(this.min.y + this.max.y) / 2, round);
	},

	contains: function (/*Bounds or Point*/ obj)/*->Boolean*/ {
		var min, max;

		if (obj instanceof L.Bounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
				(max.x <= this.max.x) &&
				(min.y >= this.min.y) &&
				(max.y <= this.max.y);
	},

	intersects: function (/*Bounds*/ bounds) {
		var min = this.min,
			max = this.max,
			min2 = bounds.min,
			max2 = bounds.max;

		var xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
			yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	}

});


/*
 * L.Transformation is an utility class to perform simple point transformations through a 2d-matrix.
 */

L.Transformation = L.Class.extend({
	initialize: function (/*Number*/ a, /*Number*/ b, /*Number*/ c, /*Number*/ d) {
		this._a = a;
		this._b = b;
		this._c = c;
		this._d = d;
	},

	transform: function (point, scale) {
		return this._transform(point.clone(), scale);
	},

	// destructive transform (faster)
	_transform: function (/*Point*/ point, /*Number*/ scale) /*-> Point*/ {
		scale = scale || 1;
		point.x = scale * (this._a * point.x + this._b);
		point.y = scale * (this._c * point.y + this._d);
		return point;
	},

	untransform: function (/*Point*/ point, /*Number*/ scale) /*-> Point*/ {
		scale = scale || 1;
		return new L.Point(
			(point.x / scale - this._b) / this._a,
			(point.y / scale - this._d) / this._c);
	}
});


/*
 * L.DomUtil contains various utility functions for working with DOM
 */

L.DomUtil = {
	get: function (id) {
		return (typeof id === 'string' ? document.getElementById(id) : id);
	},

	getStyle: function (el, style) {
		var value = el.style[style];
		if (!value && el.currentStyle) {
			value = el.currentStyle[style];
		}
		if (!value || value === 'auto') {
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		}
		return (value === 'auto' ? null : value);
	},

	getViewportOffset: function (element) {
		var top = 0,
			left = 0,
			el = element,
			docBody = document.body;

		do {
			top += el.offsetTop || 0;
			left += el.offsetLeft || 0;

			if (el.offsetParent === docBody &&
					L.DomUtil.getStyle(el, 'position') === 'absolute') {
				break;
			}
			el = el.offsetParent;
		} while (el);

		el = element;

		do {
			if (el === docBody) {
				break;
			}

			top -= el.scrollTop || 0;
			left -= el.scrollLeft || 0;

			el = el.parentNode;
		} while (el);

		return new L.Point(left, top);
	},

	create: function (tagName, className, container) {
		var el = document.createElement(tagName);
		el.className = className;
		if (container) {
			container.appendChild(el);
		}
		return el;
	},

	disableTextSelection: function () {
		if (document.selection && document.selection.empty) {
			document.selection.empty();
		}
		if (!this._onselectstart) {
			this._onselectstart = document.onselectstart;
			document.onselectstart = L.Util.falseFn;
		}
	},

	enableTextSelection: function () {
		document.onselectstart = this._onselectstart;
		this._onselectstart = null;
	},

	hasClass: function (el, name) {
		return (el.className.length > 0) &&
				new RegExp("(^|\\s)" + name + "(\\s|$)").test(el.className);
	},

	addClass: function (el, name) {
		if (!L.DomUtil.hasClass(el, name)) {
			el.className += (el.className ? ' ' : '') + name;
		}
	},

	removeClass: function (el, name) {
		el.className = el.className.replace(/(\S+)\s*/g, function (w, match) {
			if (match === name) {
				return '';
			}
			return w;
		}).replace(/^\s+/, '');
	},

	setOpacity: function (el, value) {
		if (L.Browser.ie) {
			el.style.filter = 'alpha(opacity=' + Math.round(value * 100) + ')';
		} else {
			el.style.opacity = value;
		}
	},

	//TODO refactor away this ugly translate/position mess

	testProp: function (props) {
		var style = document.documentElement.style;

		for (var i = 0; i < props.length; i++) {
			if (props[i] in style) {
				return props[i];
			}
		}
		return false;
	},

	getTranslateString: function (point) {
		return L.DomUtil.TRANSLATE_OPEN +
				point.x + 'px,' + point.y + 'px' +
				L.DomUtil.TRANSLATE_CLOSE;
	},

	getScaleString: function (scale, origin) {
		var preTranslateStr = L.DomUtil.getTranslateString(origin),
			scaleStr = ' scale(' + scale + ') ',
			postTranslateStr = L.DomUtil.getTranslateString(origin.multiplyBy(-1));

		return preTranslateStr + scaleStr + postTranslateStr;
	},

	setPosition: function (el, point) {
		el._leaflet_pos = point;
		if (L.Browser.webkit3d) {
			el.style[L.DomUtil.TRANSFORM] =  L.DomUtil.getTranslateString(point);

			if (L.Browser.android) {
				el.style['-webkit-perspective'] = '1000';
				el.style['-webkit-backface-visibility'] = 'hidden';
			}
		} else {
			el.style.left = point.x + 'px';
			el.style.top = point.y + 'px';
		}
	},

	getPosition: function (el) {
		return el._leaflet_pos;
	}
};

L.Util.extend(L.DomUtil, {
	TRANSITION: L.DomUtil.testProp(['transition', 'webkitTransition', 'OTransition', 'MozTransition', 'msTransition']),
	TRANSFORM: L.DomUtil.testProp(['transformProperty', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']),

	TRANSLATE_OPEN: 'translate' + (L.Browser.webkit3d ? '3d(' : '('),
	TRANSLATE_CLOSE: L.Browser.webkit3d ? ',0)' : ')'
});


/*
	CM.LatLng represents a geographical point with latitude and longtitude coordinates.
*/

L.LatLng = function (/*Number*/ rawLat, /*Number*/ rawLng, /*Boolean*/ noWrap) {
	var lat = parseFloat(rawLat),
		lng = parseFloat(rawLng);

	if (isNaN(lat) || isNaN(lng)) {
		throw new Error('Invalid LatLng object: (' + rawLat + ', ' + rawLng + ')');
	}

	if (noWrap !== true) {
		lat = Math.max(Math.min(lat, 90), -90);					// clamp latitude into -90..90
		lng = (lng + 180) % 360 + ((lng < -180 || lng === 180) ? 180 : -180);	// wrap longtitude into -180..180
	}

	//TODO change to lat() & lng()
	this.lat = lat;
	this.lng = lng;
};

L.Util.extend(L.LatLng, {
	DEG_TO_RAD: Math.PI / 180,
	RAD_TO_DEG: 180 / Math.PI,
	MAX_MARGIN: 1.0E-9 // max margin of error for the "equals" check
});

L.LatLng.prototype = {
	equals: function (/*LatLng*/ obj) {
		if (!(obj instanceof L.LatLng)) {
			return false;
		}

		var margin = Math.max(Math.abs(this.lat - obj.lat), Math.abs(this.lng - obj.lng));
		return margin <= L.LatLng.MAX_MARGIN;
	},

	toString: function () {
		return 'LatLng(' +
				L.Util.formatNum(this.lat) + ', ' +
				L.Util.formatNum(this.lng) + ')';
	},

	// Haversine distance formula, see http://en.wikipedia.org/wiki/Haversine_formula
	distanceTo: function (/*LatLng*/ other)/*->Double*/ {
		var R = 6378137, // earth radius in meters
			d2r = L.LatLng.DEG_TO_RAD,
			dLat = (other.lat - this.lat) * d2r,
			dLon = (other.lng - this.lng) * d2r,
			lat1 = this.lat * d2r,
			lat2 = other.lat * d2r,
			sin1 = Math.sin(dLat / 2),
			sin2 = Math.sin(dLon / 2);

		var a = sin1 * sin1 + sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2);

		return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	}
};


/*
 * L.LatLngBounds represents a rectangular area on the map in geographical coordinates.
 */

L.LatLngBounds = L.Class.extend({
	initialize: function (southWest, northEast) {	// (LatLng, LatLng) or (LatLng[])
		if (!southWest) {
			return;
		}
		var latlngs = (southWest instanceof Array ? southWest : [southWest, northEast]);
		for (var i = 0, len = latlngs.length; i < len; i++) {
			this.extend(latlngs[i]);
		}
	},

	// extend the bounds to contain the given point
	extend: function (/*LatLng*/ latlng) {
		if (!this._southWest && !this._northEast) {
			this._southWest = new L.LatLng(latlng.lat, latlng.lng, true);
			this._northEast = new L.LatLng(latlng.lat, latlng.lng, true);
		} else {
			this._southWest.lat = Math.min(latlng.lat, this._southWest.lat);
			this._southWest.lng = Math.min(latlng.lng, this._southWest.lng);
			this._northEast.lat = Math.max(latlng.lat, this._northEast.lat);
			this._northEast.lng = Math.max(latlng.lng, this._northEast.lng);
		}
	},

	getCenter: function () /*-> LatLng*/ {
		return new L.LatLng(
				(this._southWest.lat + this._northEast.lat) / 2,
				(this._southWest.lng + this._northEast.lng) / 2);
	},

	getSouthWest: function () {
		return this._southWest;
	},

	getNorthEast: function () {
		return this._northEast;
	},

	getNorthWest: function () {
		return new L.LatLng(this._northEast.lat, this._southWest.lng, true);
	},

	getSouthEast: function () {
		return new L.LatLng(this._southWest.lat, this._northEast.lng, true);
	},

	contains: function (/*LatLngBounds or LatLng*/ obj) /*-> Boolean*/ {
		var sw = this._southWest,
			ne = this._northEast,
			sw2, ne2;

		if (obj instanceof L.LatLngBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
				(sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	},

	intersects: function (/*LatLngBounds*/ bounds) {
		var sw = this._southWest,
			ne = this._northEast,
			sw2 = bounds.getSouthWest(),
			ne2 = bounds.getNorthEast();

		var latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
			lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

		return latIntersects && lngIntersects;
	},

	toBBoxString: function () {
		var sw = this._southWest,
			ne = this._northEast;
		return [sw.lng, sw.lat, ne.lng, ne.lat].join(',');
	}
});

//TODO International date line?


/*
 * L.Projection contains various geographical projections used by CRS classes.
 */

L.Projection = {};



L.Projection.SphericalMercator = {
	MAX_LATITUDE: 85.0511287798,

	project: function (/*LatLng*/ latlng) /*-> Point*/ {
		var d = L.LatLng.DEG_TO_RAD,
			max = this.MAX_LATITUDE,
			lat = Math.max(Math.min(max, latlng.lat), -max),
			x = latlng.lng * d,
			y = lat * d;
		y = Math.log(Math.tan((Math.PI / 4) + (y / 2)));

		return new L.Point(x, y);
	},

	unproject: function (/*Point*/ point, /*Boolean*/ unbounded) /*-> LatLng*/ {
		var d = L.LatLng.RAD_TO_DEG,
			lng = point.x * d,
			lat = (2 * Math.atan(Math.exp(point.y)) - (Math.PI / 2)) * d;

		return new L.LatLng(lat, lng, unbounded);
	}
};



L.Projection.LonLat = {
	project: function (latlng) {
		return new L.Point(latlng.lng, latlng.lat);
	},

	unproject: function (point, unbounded) {
		return new L.LatLng(point.y, point.x, unbounded);
	}
};



L.CRS = {
	latLngToPoint: function (/*LatLng*/ latlng, /*Number*/ scale)/*-> Point*/ {
		var projectedPoint = this.projection.project(latlng);
		return this.transformation._transform(projectedPoint, scale);
	},

	pointToLatLng: function (/*Point*/ point, /*Number*/ scale, /*(optional) Boolean*/ unbounded)/*-> LatLng*/ {
		var untransformedPoint = this.transformation.untransform(point, scale);
		return this.projection.unproject(untransformedPoint, unbounded);
		//TODO get rid of 'unbounded' everywhere
	},

	project: function (latlng) {
		return this.projection.project(latlng);
	}
};



L.CRS.EPSG3857 = L.Util.extend({}, L.CRS, {
	code: 'EPSG:3857',

	projection: L.Projection.SphericalMercator,
	transformation: new L.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),

	project: function (/*LatLng*/ latlng)/*-> Point*/ {
		var projectedPoint = this.projection.project(latlng),
			earthRadius = 6378137;
		return projectedPoint.multiplyBy(earthRadius);
	}
});

L.CRS.EPSG900913 = L.Util.extend({}, L.CRS.EPSG3857, {
	code: 'EPSG:900913'
});



L.CRS.EPSG4326 = L.Util.extend({}, L.CRS, {
	code: 'EPSG:4326',

	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
});


/*
 * L.Map is the central class of the API - it is used to create a map.
 */

L.Map = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		// projection
		crs: L.CRS.EPSG3857 || L.CRS.EPSG4326,
		scale: function (zoom) {
			return 256 * Math.pow(2, zoom);
		},

		// state
		center: null,
		zoom: null,
		layers: [],

		// interaction
		dragging: true,
		touchZoom: L.Browser.touch && !L.Browser.android,
		scrollWheelZoom: !L.Browser.touch,
		doubleClickZoom: true,
		boxZoom: true,

		// controls
		zoomControl: true,
		attributionControl: true,

		// animation
		fadeAnimation: L.DomUtil.TRANSITION && !L.Browser.android,
		zoomAnimation: L.DomUtil.TRANSITION && !L.Browser.android && !L.Browser.mobileOpera,

		// misc
		trackResize: true,
		closePopupOnClick: true,
		worldCopyJump: true
	},


	// constructor

	initialize: function (id, options) { // (HTMLElement or String, Object)
		L.Util.setOptions(this, options);

		this._container = L.DomUtil.get(id);

		if (this._container._leaflet) {
			throw new Error("Map container is already initialized.");
		}
		this._container._leaflet = true;

		this._initLayout();

		if (L.DomEvent) {
			this._initEvents();
			if (L.Handler) {
				this._initInteraction();
			}
			if (L.Control) {
				this._initControls();
			}
		}

		if (this.options.maxBounds) {
			this.setMaxBounds(this.options.maxBounds);
		}

		var center = this.options.center,
			zoom = this.options.zoom;

		if (center !== null && zoom !== null) {
			this.setView(center, zoom, true);
		}

		var layers = this.options.layers;
		layers = (layers instanceof Array ? layers : [layers]);
		this._tileLayersNum = 0;
		this._initLayers(layers);
	},


	// public methods that modify map state

	// replaced by animation-powered implementation in Map.PanAnimation.js
	setView: function (center, zoom) {
		// reset the map view
		this._resetView(center, this._limitZoom(zoom));
		return this;
	},

	setZoom: function (zoom) { // (Number)
		return this.setView(this.getCenter(), zoom);
	},

	zoomIn: function () {
		return this.setZoom(this._zoom + 1);
	},

	zoomOut: function () {
		return this.setZoom(this._zoom - 1);
	},

	fitBounds: function (bounds) { // (LatLngBounds)
		var zoom = this.getBoundsZoom(bounds);
		return this.setView(bounds.getCenter(), zoom);
	},

	fitWorld: function () {
		var sw = new L.LatLng(-60, -170),
			ne = new L.LatLng(85, 179);
		return this.fitBounds(new L.LatLngBounds(sw, ne));
	},

	panTo: function (center) { // (LatLng)
		return this.setView(center, this._zoom);
	},

	panBy: function (offset) { // (Point)
		// replaced with animated panBy in Map.Animation.js
		this.fire('movestart');

		this._rawPanBy(offset);

		this.fire('move');
		this.fire('moveend');

		return this;
	},

	setMaxBounds: function (bounds) {
		this.options.maxBounds = bounds;

		if (!bounds) {
			this._boundsMinZoom = null;
			return this;
		}

		var minZoom = this.getBoundsZoom(bounds, true);

		this._boundsMinZoom = minZoom;

		if (this._loaded) {
			if (this._zoom < minZoom) {
				this.setView(bounds.getCenter(), minZoom);
			} else {
				this.panInsideBounds(bounds);
			}
		}
		return this;
	},

	panInsideBounds: function (bounds) {
		var viewBounds = this.getBounds(),
			viewSw = this.project(viewBounds.getSouthWest()),
			viewNe = this.project(viewBounds.getNorthEast()),
			sw = this.project(bounds.getSouthWest()),
			ne = this.project(bounds.getNorthEast()),
			dx = 0,
			dy = 0;

		if (viewNe.y < ne.y) { // north
			dy = ne.y - viewNe.y;
		}
		if (viewNe.x > ne.x) { // east
			dx = ne.x - viewNe.x;
		}
		if (viewSw.y > sw.y) { // south
			dy = sw.y - viewSw.y;
		}
		if (viewSw.x < sw.x) { // west
			dx = sw.x - viewSw.x;
		}

		return this.panBy(new L.Point(dx, dy, true));
	},

	addLayer: function (layer, insertAtTheTop) {
		var id = L.Util.stamp(layer);

		if (this._layers[id]) {
			return this;
		}

		this._layers[id] = layer;

		if (layer.options && !isNaN(layer.options.maxZoom)) {
			this._layersMaxZoom = Math.max(this._layersMaxZoom || 0, layer.options.maxZoom);
		}
		if (layer.options && !isNaN(layer.options.minZoom)) {
			this._layersMinZoom = Math.min(this._layersMinZoom || Infinity, layer.options.minZoom);
		}
		//TODO getMaxZoom, getMinZoom in ILayer (instead of options)

		if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
			this._tileLayersNum++;
			layer.on('load', this._onTileLayerLoad, this);
		}
		if (this.attributionControl && layer.getAttribution) {
			this.attributionControl.addAttribution(layer.getAttribution());
		}

		var onMapLoad = function () {
			layer.onAdd(this, insertAtTheTop);
			this.fire('layeradd', {layer: layer});
		};

		if (this._loaded) {
			onMapLoad.call(this);
		} else {
			this.on('load', onMapLoad, this);
		}

		return this;
	},

	removeLayer: function (layer) {
		var id = L.Util.stamp(layer);

		if (this._layers[id]) {
			layer.onRemove(this);
			delete this._layers[id];

			if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
				this._tileLayersNum--;
				layer.off('load', this._onTileLayerLoad, this);
			}
			if (this.attributionControl && layer.getAttribution) {
				this.attributionControl.removeAttribution(layer.getAttribution());
			}

			this.fire('layerremove', {layer: layer});
		}
		return this;
	},

	hasLayer: function (layer) {
		var id = L.Util.stamp(layer);
		return this._layers.hasOwnProperty(id);
	},

	invalidateSize: function () {
		var oldSize = this.getSize();

		this._sizeChanged = true;

		if (this.options.maxBounds) {
			this.setMaxBounds(this.options.maxBounds);
		}

		if (!this._loaded) {
			return this;
		}

		this._rawPanBy(oldSize.subtract(this.getSize()).divideBy(2, true));

		this.fire('move');

		clearTimeout(this._sizeTimer);
		this._sizeTimer = setTimeout(L.Util.bind(function () {
			this.fire('moveend');
		}, this), 200);

		return this;
	},


	// public methods for getting map state

	getCenter: function (unbounded) { // (Boolean)
		var viewHalf = this.getSize().divideBy(2),
			centerPoint = this._getTopLeftPoint().add(viewHalf);
		return this.unproject(centerPoint, this._zoom, unbounded);
	},

	getZoom: function () {
		return this._zoom;
	},

	getBounds: function () {
		var bounds = this.getPixelBounds(),
			sw = this.unproject(new L.Point(bounds.min.x, bounds.max.y), this._zoom, true),
			ne = this.unproject(new L.Point(bounds.max.x, bounds.min.y), this._zoom, true);
		return new L.LatLngBounds(sw, ne);
	},

	getMinZoom: function () {
		var z1 = this.options.minZoom || 0,
			z2 = this._layersMinZoom || 0,
			z3 = this._boundsMinZoom || 0;

		return Math.max(z1, z2, z3);
	},

	getMaxZoom: function () {
		var z1 = isNaN(this.options.maxZoom) ? Infinity : this.options.maxZoom,
			z2 = this._layersMaxZoom || Infinity;

		return Math.min(z1, z2);
	},

	getBoundsZoom: function (bounds, inside) { // (LatLngBounds)
		var size = this.getSize(),
			zoom = this.options.minZoom || 0,
			maxZoom = this.getMaxZoom(),
			ne = bounds.getNorthEast(),
			sw = bounds.getSouthWest(),
			boundsSize,
			nePoint,
			swPoint,
			zoomNotFound = true;

		if (inside) {
			zoom--;
		}

		do {
			zoom++;
			nePoint = this.project(ne, zoom);
			swPoint = this.project(sw, zoom);
			boundsSize = new L.Point(nePoint.x - swPoint.x, swPoint.y - nePoint.y);

			if (!inside) {
				zoomNotFound = (boundsSize.x <= size.x) && (boundsSize.y <= size.y);
			} else {
				zoomNotFound = (boundsSize.x < size.x) || (boundsSize.y < size.y);
			}
		} while (zoomNotFound && (zoom <= maxZoom));

		if (zoomNotFound && inside) {
			return null;
		}

		return inside ? zoom : zoom - 1;
	},

	getSize: function () {
		if (!this._size || this._sizeChanged) {
			this._size = new L.Point(this._container.clientWidth, this._container.clientHeight);
			this._sizeChanged = false;
		}
		return this._size;
	},

	getPixelBounds: function () {
		var topLeftPoint = this._getTopLeftPoint(),
			size = this.getSize();
		return new L.Bounds(topLeftPoint, topLeftPoint.add(size));
	},

	getPixelOrigin: function () {
		return this._initialTopLeftPoint;
	},

	getPanes: function () {
		return this._panes;
	},


	// conversion methods

	mouseEventToContainerPoint: function (e) { // (MouseEvent)
		return L.DomEvent.getMousePosition(e, this._container);
	},

	mouseEventToLayerPoint: function (e) { // (MouseEvent)
		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	},

	mouseEventToLatLng: function (e) { // (MouseEvent)
		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
	},

	containerPointToLayerPoint: function (point) { // (Point)
		return point.subtract(L.DomUtil.getPosition(this._mapPane));
	},

	layerPointToContainerPoint: function (point) { // (Point)
		return point.add(L.DomUtil.getPosition(this._mapPane));
	},

	layerPointToLatLng: function (point) { // (Point)
		return this.unproject(point.add(this._initialTopLeftPoint));
	},

	latLngToLayerPoint: function (latlng) { // (LatLng)
		return this.project(latlng)._round()._subtract(this._initialTopLeftPoint);
	},

	project: function (latlng, zoom) { // (LatLng[, Number]) -> Point
		zoom = (typeof zoom === 'undefined' ? this._zoom : zoom);
		return this.options.crs.latLngToPoint(latlng, this.options.scale(zoom));
	},

	unproject: function (point, zoom, unbounded) { // (Point[, Number, Boolean]) -> LatLng
		zoom = (typeof zoom === 'undefined' ? this._zoom : zoom);
		return this.options.crs.pointToLatLng(point, this.options.scale(zoom), unbounded);
	},


	// private methods that modify map state

	_initLayout: function () {
		var container = this._container;

		container.innerHTML = '';

		container.className += ' leaflet-container';

		if (this.options.fadeAnimation) {
			container.className += ' leaflet-fade-anim';
		}

		var position = L.DomUtil.getStyle(container, 'position');
		if (position !== 'absolute' && position !== 'relative') {
			container.style.position = 'relative';
		}

		this._initPanes();

		if (this._initControlPos) {
			this._initControlPos();
		}
	},

	_initPanes: function () {
		var panes = this._panes = {};

		this._mapPane = panes.mapPane = this._createPane('leaflet-map-pane', this._container);

		this._tilePane = panes.tilePane = this._createPane('leaflet-tile-pane', this._mapPane);
		this._objectsPane = panes.objectsPane = this._createPane('leaflet-objects-pane', this._mapPane);

		panes.shadowPane = this._createPane('leaflet-shadow-pane');
		panes.overlayPane = this._createPane('leaflet-overlay-pane');
		panes.markerPane = this._createPane('leaflet-marker-pane');
		panes.popupPane = this._createPane('leaflet-popup-pane');
	},

	_createPane: function (className, container) {
		return L.DomUtil.create('div', className, container || this._objectsPane);
	},

	_resetView: function (center, zoom, preserveMapOffset, afterZoomAnim) {
		var zoomChanged = (this._zoom !== zoom);

		if (!afterZoomAnim) {
			this.fire('movestart');

			if (zoomChanged) {
				this.fire('zoomstart');
			}
		}

		this._zoom = zoom;

		this._initialTopLeftPoint = this._getNewTopLeftPoint(center);

		if (!preserveMapOffset) {
			L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));
		} else {
			var offset = L.DomUtil.getPosition(this._mapPane);
			this._initialTopLeftPoint._add(offset);
		}

		this._tileLayersToLoad = this._tileLayersNum;
		this.fire('viewreset', {hard: !preserveMapOffset});

		this.fire('move');
		if (zoomChanged || afterZoomAnim) {
			this.fire('zoomend');
		}
		this.fire('moveend');

		if (!this._loaded) {
			this._loaded = true;
			this.fire('load');
		}
	},

	_initLayers: function (layers) {
		this._layers = {};

		var i, len;

		for (i = 0, len = layers.length; i < len; i++) {
			this.addLayer(layers[i]);
		}
	},

	_initControls: function () {
		if (this.options.zoomControl) {
			this.addControl(new L.Control.Zoom());
		}
		if (this.options.attributionControl) {
			this.attributionControl = new L.Control.Attribution();
			this.addControl(this.attributionControl);
		}
	},

	_rawPanBy: function (offset) {
		var mapPaneOffset = L.DomUtil.getPosition(this._mapPane);
		L.DomUtil.setPosition(this._mapPane, mapPaneOffset.subtract(offset));
	},


	// map events

	_initEvents: function () {
		L.DomEvent.addListener(this._container, 'click', this._onMouseClick, this);

		var events = ['dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'contextmenu'];

		var i, len;

		for (i = 0, len = events.length; i < len; i++) {
			L.DomEvent.addListener(this._container, events[i], this._fireMouseEvent, this);
		}

		if (this.options.trackResize) {
			L.DomEvent.addListener(window, 'resize', this._onResize, this);
		}
	},

	_onResize: function () {
		L.Util.requestAnimFrame(this.invalidateSize, this, false, this._container);
	},

	_onMouseClick: function (e) {
		if (!this._loaded || (this.dragging && this.dragging.moved())) {
			return;
		}

		this.fire('pre' + e.type);
		this._fireMouseEvent(e);
	},

	_fireMouseEvent: function (e) {
		if (!this._loaded) {
			return;
		}

		var type = e.type;
		type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));

		if (!this.hasEventListeners(type)) {
			return;
		}

		if (type === 'contextmenu') {
			L.DomEvent.preventDefault(e);
		}
		
		this.fire(type, {
			latlng: this.mouseEventToLatLng(e),
			layerPoint: this.mouseEventToLayerPoint(e)
		});
	},

	_initInteraction: function () {
		var handlers = {
			dragging: L.Map.Drag,
			touchZoom: L.Map.TouchZoom,
			doubleClickZoom: L.Map.DoubleClickZoom,
			scrollWheelZoom: L.Map.ScrollWheelZoom,
			boxZoom: L.Map.BoxZoom
		};

		var i;
		for (i in handlers) {
			if (handlers.hasOwnProperty(i) && handlers[i]) {
				this[i] = new handlers[i](this);
				if (this.options[i]) {
					this[i].enable();
				}
				// TODO move enabling to handler contructor
			}
		}
	},

	_onTileLayerLoad: function () {
		// clear scaled tiles after all new tiles are loaded (for performance)
		this._tileLayersToLoad--;
		if (this._tileLayersNum && !this._tileLayersToLoad && this._tileBg) {
			clearTimeout(this._clearTileBgTimer);
			this._clearTileBgTimer = setTimeout(L.Util.bind(this._clearTileBg, this), 500);
		}
	},


	// private methods for getting map state

	_getTopLeftPoint: function () {
		if (!this._loaded) {
			throw new Error('Set map center and zoom first.');
		}

		var offset = L.DomUtil.getPosition(this._mapPane);
		return this._initialTopLeftPoint.subtract(offset);
	},

	_getNewTopLeftPoint: function (center) {
		var viewHalf = this.getSize().divideBy(2);
		return this.project(center).subtract(viewHalf).round();
	},

	_limitZoom: function (zoom) {
		var min = this.getMinZoom();
		var max = this.getMaxZoom();
		return Math.max(min, Math.min(max, zoom));
	}
});



L.Projection.Mercator = {
	MAX_LATITUDE: 85.0840591556,

	R_MINOR: 6356752.3142,
	R_MAJOR: 6378137,

	project: function (/*LatLng*/ latlng) /*-> Point*/ {
		var d = L.LatLng.DEG_TO_RAD,
			max = this.MAX_LATITUDE,
			lat = Math.max(Math.min(max, latlng.lat), -max),
			r = this.R_MAJOR,
			r2 = this.R_MINOR,
			x = latlng.lng * d * r,
			y = lat * d,
			tmp = r2 / r,
			eccent = Math.sqrt(1.0 - tmp * tmp),
			con = eccent * Math.sin(y);

		con = Math.pow((1 - con) / (1 + con), eccent * 0.5);

		var ts = Math.tan(0.5 * ((Math.PI * 0.5) - y)) / con;
		y = -r2 * Math.log(ts);

		return new L.Point(x, y);
	},

	unproject: function (/*Point*/ point, /*Boolean*/ unbounded) /*-> LatLng*/ {
		var d = L.LatLng.RAD_TO_DEG,
			r = this.R_MAJOR,
			r2 = this.R_MINOR,
			lng = point.x * d / r,
			tmp = r2 / r,
			eccent = Math.sqrt(1 - (tmp * tmp)),
			ts = Math.exp(- point.y / r2),
			phi = (Math.PI / 2) - 2 * Math.atan(ts),
			numIter = 15,
			tol = 1e-7,
			i = numIter,
			dphi = 0.1,
			con;

		while ((Math.abs(dphi) > tol) && (--i > 0)) {
			con = eccent * Math.sin(phi);
			dphi = (Math.PI / 2) - 2 * Math.atan(ts * Math.pow((1.0 - con) / (1.0 + con), 0.5 * eccent)) - phi;
			phi += dphi;
		}

		return new L.LatLng(phi * d, lng, unbounded);
	}
};



L.CRS.EPSG3395 = L.Util.extend({}, L.CRS, {
	code: 'EPSG:3395',

	projection: L.Projection.Mercator,
	transformation: (function () {
		var m = L.Projection.Mercator,
			r = m.R_MAJOR,
			r2 = m.R_MINOR;

		return new L.Transformation(0.5 / (Math.PI * r), 0.5, -0.5 / (Math.PI * r2), 0.5);
	}())
});


/*
 * L.TileLayer is used for standard xyz-numbered tile layers.
 */

L.TileLayer = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		minZoom: 0,
		maxZoom: 18,
		tileSize: 256,
		subdomains: 'abc',
		errorTileUrl: '',
		attribution: '',
		opacity: 1,
		scheme: 'xyz',
		continuousWorld: false,
		noWrap: false,
		zoomOffset: 0,
		zoomReverse: false,

		unloadInvisibleTiles: L.Browser.mobile,
		updateWhenIdle: L.Browser.mobile,
		reuseTiles: false
	},

	initialize: function (url, options, urlParams) {
		L.Util.setOptions(this, options);

		this._url = url;
		this._urlParams = urlParams;

		if (typeof this.options.subdomains === 'string') {
			this.options.subdomains = this.options.subdomains.split('');
		}
	},

	onAdd: function (map, insertAtTheBottom) {
		this._map = map;
		this._insertAtTheBottom = insertAtTheBottom;

		// create a container div for tiles
		this._initContainer();

		// create an image to clone for tiles
		this._createTileProto();

		// set up events
		map.on('viewreset', this._resetCallback, this);

		if (this.options.updateWhenIdle) {
			map.on('moveend', this._update, this);
		} else {
			this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this);
			map.on('move', this._limitedUpdate, this);
		}

		this._reset();
		this._update();
	},

	onRemove: function (map) {
		this._map.getPanes().tilePane.removeChild(this._container);
		this._container = null;

		this._map.off('viewreset', this._resetCallback, this);

		if (this.options.updateWhenIdle) {
			this._map.off('moveend', this._update, this);
		} else {
			this._map.off('move', this._limitedUpdate, this);
		}
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		this._setOpacity(opacity);

		// stupid webkit hack to force redrawing of tiles
		if (L.Browser.webkit) {
			for (var i in this._tiles) {
				if (this._tiles.hasOwnProperty(i)) {
					this._tiles[i].style.webkitTransform += ' translate(0,0)';
				}
			}
		}
	},

	_setOpacity: function (opacity) {
		if (opacity < 1) {
			L.DomUtil.setOpacity(this._container, opacity);
		}
	},

	_initContainer: function () {
		var tilePane = this._map.getPanes().tilePane,
			first = tilePane.firstChild;

		if (!this._container || tilePane.empty) {
			this._container = L.DomUtil.create('div', 'leaflet-layer');

			if (this._insertAtTheBottom && first) {
				tilePane.insertBefore(this._container, first);
			} else {
				tilePane.appendChild(this._container);
			}

			this._setOpacity(this.options.opacity);
		}
	},

	_resetCallback: function (e) {
		this._reset(e.hard);
	},

	_reset: function (clearOldContainer) {
		var key;
		for (key in this._tiles) {
			if (this._tiles.hasOwnProperty(key)) {
				this.fire("tileunload", {tile: this._tiles[key]});
			}
		}
		this._tiles = {};

		if (this.options.reuseTiles) {
			this._unusedTiles = [];
		}

		if (clearOldContainer && this._container) {
			this._container.innerHTML = "";
		}
		this._initContainer();
	},

	_update: function () {
		var bounds = this._map.getPixelBounds(),
			zoom = this._map.getZoom(),
			tileSize = this.options.tileSize;

		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			return;
		}

		var nwTilePoint = new L.Point(
				Math.floor(bounds.min.x / tileSize),
				Math.floor(bounds.min.y / tileSize)),
			seTilePoint = new L.Point(
				Math.floor(bounds.max.x / tileSize),
				Math.floor(bounds.max.y / tileSize)),
			tileBounds = new L.Bounds(nwTilePoint, seTilePoint);

		this._addTilesFromCenterOut(tileBounds);

		if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
			this._removeOtherTiles(tileBounds);
		}
	},

	_addTilesFromCenterOut: function (bounds) {
		var queue = [],
			center = bounds.getCenter();

		for (var j = bounds.min.y; j <= bounds.max.y; j++) {
			for (var i = bounds.min.x; i <= bounds.max.x; i++) {
				if ((i + ':' + j) in this._tiles) {
					continue;
				}
				queue.push(new L.Point(i, j));
			}
		}

		// load tiles in order of their distance to center
		queue.sort(function (a, b) {
			return a.distanceTo(center) - b.distanceTo(center);
		});

		var fragment = document.createDocumentFragment();

		this._tilesToLoad = queue.length;
		for (var k = 0, len = this._tilesToLoad; k < len; k++) {
			this._addTile(queue[k], fragment);
		}

		this._container.appendChild(fragment);
	},

	_removeOtherTiles: function (bounds) {
		var kArr, x, y, key, tile;

		for (key in this._tiles) {
			if (this._tiles.hasOwnProperty(key)) {
				kArr = key.split(':');
				x = parseInt(kArr[0], 10);
				y = parseInt(kArr[1], 10);

				// remove tile if it's out of bounds
				if (x < bounds.min.x || x > bounds.max.x || y < bounds.min.y || y > bounds.max.y) {

					tile = this._tiles[key];
					this.fire("tileunload", {tile: tile, url: tile.src});

					if (tile.parentNode === this._container) {
						this._container.removeChild(tile);
					}
					if (this.options.reuseTiles) {
						this._unusedTiles.push(this._tiles[key]);
					}
					tile.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

					delete this._tiles[key];
				}
			}
		}
	},

	_addTile: function (tilePoint, container) {
		var tilePos = this._getTilePos(tilePoint),
			zoom = this._map.getZoom(),
			key = tilePoint.x + ':' + tilePoint.y,
			tileLimit = Math.pow(2, this._getOffsetZoom(zoom));

		// wrap tile coordinates
		if (!this.options.continuousWorld) {
			if (!this.options.noWrap) {
				tilePoint.x = ((tilePoint.x % tileLimit) + tileLimit) % tileLimit;
			} else if (tilePoint.x < 0 || tilePoint.x >= tileLimit) {
				this._tilesToLoad--;
				return;
			}

			if (tilePoint.y < 0 || tilePoint.y >= tileLimit) {
				this._tilesToLoad--;
				return;
			}
		}

		// get unused tile - or create a new tile
		var tile = this._getTile();
		L.DomUtil.setPosition(tile, tilePos);

		this._tiles[key] = tile;

		if (this.options.scheme === 'tms') {
			tilePoint.y = tileLimit - tilePoint.y - 1;
		}

		this._loadTile(tile, tilePoint, zoom);

		container.appendChild(tile);
	},

	_getOffsetZoom: function (zoom) {
		zoom = this.options.zoomReverse ? this.options.maxZoom - zoom : zoom;
		return zoom + this.options.zoomOffset;
	},

	_getTilePos: function (tilePoint) {
		var origin = this._map.getPixelOrigin(),
			tileSize = this.options.tileSize;

		return tilePoint.multiplyBy(tileSize).subtract(origin);
	},

	// image-specific code (override to implement e.g. Canvas or SVG tile layer)

	getTileUrl: function (tilePoint, zoom) {
		var subdomains = this.options.subdomains,
			s = this.options.subdomains[(tilePoint.x + tilePoint.y) % subdomains.length];

		return L.Util.template(this._url, L.Util.extend({
			s: s,
			z: this._getOffsetZoom(zoom),
			x: tilePoint.x,
			y: tilePoint.y
		}, this._urlParams));
	},

	_createTileProto: function () {
		this._tileImg = L.DomUtil.create('img', 'leaflet-tile');
		this._tileImg.galleryimg = 'no';

		var tileSize = this.options.tileSize;
		this._tileImg.style.width = tileSize + 'px';
		this._tileImg.style.height = tileSize + 'px';
	},

	_getTile: function () {
		if (this.options.reuseTiles && this._unusedTiles.length > 0) {
			var tile = this._unusedTiles.pop();
			this._resetTile(tile);
			return tile;
		}
		return this._createTile();
	},

	_resetTile: function (tile) {
		// Override if data stored on a tile needs to be cleaned up before reuse
	},

	_createTile: function () {
		var tile = this._tileImg.cloneNode(false);
		tile.onselectstart = tile.onmousemove = L.Util.falseFn;
		return tile;
	},

	_loadTile: function (tile, tilePoint, zoom) {
		tile._layer = this;
		tile.onload = this._tileOnLoad;
		tile.onerror = this._tileOnError;
		tile.src = this.getTileUrl(tilePoint, zoom);
	},

	_tileOnLoad: function (e) {
		var layer = this._layer;

		this.className += ' leaflet-tile-loaded';

		layer.fire('tileload', {tile: this, url: this.src});

		layer._tilesToLoad--;
		if (!layer._tilesToLoad) {
			layer.fire('load');
		}
	},

	_tileOnError: function (e) {
		var layer = this._layer;

		layer.fire('tileerror', {tile: this, url: this.src});

		var newUrl = layer.options.errorTileUrl;
		if (newUrl) {
			this.src = newUrl;
		}
	}
});


L.TileLayer.WMS = L.TileLayer.extend({
	defaultWmsParams: {
		service: 'WMS',
		request: 'GetMap',
		version: '1.1.1',
		layers: '',
		styles: '',
		format: 'image/jpeg',
		transparent: false
	},

	initialize: function (/*String*/ url, /*Object*/ options) {
		this._url = url;

		this.wmsParams = L.Util.extend({}, this.defaultWmsParams);
		this.wmsParams.width = this.wmsParams.height = this.options.tileSize;

		for (var i in options) {
			// all keys that are not TileLayer options go to WMS params
			if (!this.options.hasOwnProperty(i)) {
				this.wmsParams[i] = options[i];
			}
		}

		L.Util.setOptions(this, options);
	},

	onAdd: function (map) {
		var projectionKey = (parseFloat(this.wmsParams.version) >= 1.3 ? 'crs' : 'srs');
		this.wmsParams[projectionKey] = map.options.crs.code;

		L.TileLayer.prototype.onAdd.call(this, map);
	},

	getTileUrl: function (/*Point*/ tilePoint, /*Number*/ zoom)/*-> String*/ {
		var tileSize = this.options.tileSize,
			nwPoint = tilePoint.multiplyBy(tileSize),
			sePoint = nwPoint.add(new L.Point(tileSize, tileSize)),
			nwMap = this._map.unproject(nwPoint, this._zoom, true),
			seMap = this._map.unproject(sePoint, this._zoom, true),
			nw = this._map.options.crs.project(nwMap),
			se = this._map.options.crs.project(seMap),
			bbox = [nw.x, se.y, se.x, nw.y].join(',');

		return this._url + L.Util.getParamString(this.wmsParams) + "&bbox=" + bbox;
	}
});


L.TileLayer.Canvas = L.TileLayer.extend({
	options: {
		async: false
	},

	initialize: function (options) {
		L.Util.setOptions(this, options);
	},

	redraw: function () {
		for (var i in this._tiles) {
			var tile = this._tiles[i];
			this._redrawTile(tile);
		}
	},

	_redrawTile: function (tile) {
		this.drawTile(tile, tile._tilePoint, tile._zoom);
	},

	_createTileProto: function () {
		this._canvasProto = L.DomUtil.create('canvas', 'leaflet-tile');

		var tileSize = this.options.tileSize;
		this._canvasProto.width = tileSize;
		this._canvasProto.height = tileSize;
	},

	_createTile: function () {
		var tile = this._canvasProto.cloneNode(false);
		tile.onselectstart = tile.onmousemove = L.Util.falseFn;
		return tile;
	},

	_loadTile: function (tile, tilePoint, zoom) {
		tile._layer = this;
		tile._tilePoint = tilePoint;
		tile._zoom = zoom;

		this.drawTile(tile, tilePoint, zoom);

		if (!this.options.async) {
			this.tileDrawn(tile);
		}
	},

	drawTile: function (tile, tilePoint, zoom) {
		// override with rendering code
	},

	tileDrawn: function (tile) {
		this._tileOnLoad.call(tile);
	}
});


L.ImageOverlay = L.Class.extend({
	includes: L.Mixin.Events,

	initialize: function (/*String*/ url, /*LatLngBounds*/ bounds) {
		this._url = url;
		this._bounds = bounds;
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._image) {
			this._initImage();
		}

		map.getPanes().overlayPane.appendChild(this._image);

		map.on('viewreset', this._reset, this);
		this._reset();
	},

	onRemove: function (map) {
		map.getPanes().overlayPane.removeChild(this._image);
		map.off('viewreset', this._reset, this);
	},

	_initImage: function () {
		this._image = L.DomUtil.create('img', 'leaflet-image-layer');

		this._image.style.visibility = 'hidden';
		//TODO opacity option

		//TODO createImage util method to remove duplication
		L.Util.extend(this._image, {
			galleryimg: 'no',
			onselectstart: L.Util.falseFn,
			onmousemove: L.Util.falseFn,
			onload: L.Util.bind(this._onImageLoad, this),
			src: this._url
		});
	},

	_reset: function () {
		var topLeft = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
			bottomRight = this._map.latLngToLayerPoint(this._bounds.getSouthEast()),
			size = bottomRight.subtract(topLeft);

		L.DomUtil.setPosition(this._image, topLeft);

		this._image.style.width = size.x + 'px';
		this._image.style.height = size.y + 'px';
	},

	_onImageLoad: function () {
		this._image.style.visibility = '';
		this.fire('load');
	}
});


L.Icon = L.Class.extend({
	iconUrl: L.ROOT_URL + 'images/marker.png',
	shadowUrl: L.ROOT_URL + 'images/marker-shadow.png',

	iconSize: new L.Point(25, 41),
	shadowSize: new L.Point(41, 41),

	iconAnchor: new L.Point(13, 41),
	popupAnchor: new L.Point(0, -33),

	initialize: function (iconUrl) {
		if (iconUrl) {
			this.iconUrl = iconUrl;
		}
	},

	createIcon: function () {
		return this._createIcon('icon');
	},

	createShadow: function () {
		return this._createIcon('shadow');
	},

	_createIcon: function (name) {
		var size = this[name + 'Size'],
			src = this[name + 'Url'];
		if (!src && name === 'shadow') {
			return null;
		}

		var img;
		if (!src) {
			img = this._createDiv();
		}
		else {
			img = this._createImg(src);
		}

		img.className = 'leaflet-marker-' + name;

		img.style.marginLeft = (-this.iconAnchor.x) + 'px';
		img.style.marginTop = (-this.iconAnchor.y) + 'px';

		if (size) {
			img.style.width = size.x + 'px';
			img.style.height = size.y + 'px';
		}

		return img;
	},

	_createImg: function (src) {
		var el;
		if (!L.Browser.ie6) {
			el = document.createElement('img');
			el.src = src;
		} else {
			el = document.createElement('div');
			el.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + src + '")';
		}
		return el;
	},

	_createDiv: function () {
		return document.createElement('div');
	}
});


/*
 * L.Marker is used to display clickable/draggable icons on the map.
 */

L.Marker = L.Class.extend({

	includes: L.Mixin.Events,

	options: {
		icon: new L.Icon(),
		title: '',
		clickable: true,
		draggable: false,
		zIndexOffset: 0
	},

	initialize: function (latlng, options) {
		L.Util.setOptions(this, options);
		this._latlng = latlng;
	},

	onAdd: function (map) {
		this._map = map;

		this._initIcon();

		map.on('viewreset', this._reset, this);
		this._reset();
	},

	onRemove: function (map) {
		this._removeIcon();

		// TODO move to Marker.Popup.js
		if (this.closePopup) {
			this.closePopup();
		}

		this._map = null;

		map.off('viewreset', this._reset, this);
	},

	getLatLng: function () {
		return this._latlng;
	},

	setLatLng: function (latlng) {
		this._latlng = latlng;
		if (this._icon) {
			this._reset();

			if (this._popup) {
				this._popup.setLatLng(this._latlng);
			}
		}
	},

	setZIndexOffset: function (offset) {
		this.options.zIndexOffset = offset;
		if (this._icon) {
			this._reset();
		}
	},

	setIcon: function (icon) {
		if (this._map) {
			this._removeIcon();
		}

		this.options.icon = icon;

		if (this._map) {
			this._initIcon();
			this._reset();
		}
	},

	_initIcon: function () {
		if (!this._icon) {
			this._icon = this.options.icon.createIcon();

			if (this.options.title) {
				this._icon.title = this.options.title;
			}

			this._initInteraction();
		}
		if (!this._shadow) {
			this._shadow = this.options.icon.createShadow();
		}

		this._map._panes.markerPane.appendChild(this._icon);
		if (this._shadow) {
			this._map._panes.shadowPane.appendChild(this._shadow);
		}
	},

	_removeIcon: function () {
		this._map._panes.markerPane.removeChild(this._icon);
		if (this._shadow) {
			this._map._panes.shadowPane.removeChild(this._shadow);
		}
		this._icon = this._shadow = null;
	},

	_reset: function () {
		var pos = this._map.latLngToLayerPoint(this._latlng).round();

		L.DomUtil.setPosition(this._icon, pos);
		if (this._shadow) {
			L.DomUtil.setPosition(this._shadow, pos);
		}

		this._icon.style.zIndex = pos.y + this.options.zIndexOffset;
	},

	_initInteraction: function () {
		if (this.options.clickable) {
			this._icon.className += ' leaflet-clickable';

			L.DomEvent.addListener(this._icon, 'click', this._onMouseClick, this);

			var events = ['dblclick', 'mousedown', 'mouseover', 'mouseout'];
			for (var i = 0; i < events.length; i++) {
				L.DomEvent.addListener(this._icon, events[i], this._fireMouseEvent, this);
			}
		}

		if (L.Handler.MarkerDrag) {
			this.dragging = new L.Handler.MarkerDrag(this);

			if (this.options.draggable) {
				this.dragging.enable();
			}
		}
	},

	_onMouseClick: function (e) {
		L.DomEvent.stopPropagation(e);
		if (this.dragging && this.dragging.moved()) { return; }
		this.fire(e.type);
	},

	_fireMouseEvent: function (e) {
		this.fire(e.type);
		L.DomEvent.stopPropagation(e);
	}
});



L.Popup = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		minWidth: 50,
		maxWidth: 300,
		autoPan: true,
		closeButton: true,
		offset: new L.Point(0, 2),
		autoPanPadding: new L.Point(5, 5),
		className: ''
	},

	initialize: function (options, source) {
		L.Util.setOptions(this, options);

		this._source = source;
	},

	onAdd: function (map) {
		this._map = map;
		if (!this._container) {
			this._initLayout();
		}
		this._updateContent();

		this._container.style.opacity = '0';

		this._map._panes.popupPane.appendChild(this._container);
		this._map.on('viewreset', this._updatePosition, this);

		if (this._map.options.closePopupOnClick) {
			this._map.on('preclick', this._close, this);
		}

		this._update();

		this._container.style.opacity = '1'; //TODO fix ugly opacity hack

		this._opened = true;
	},

	onRemove: function (map) {
		map._panes.popupPane.removeChild(this._container);
		L.Util.falseFn(this._container.offsetWidth);

		map.off('viewreset', this._updatePosition, this);
		map.off('click', this._close, this);

		this._container.style.opacity = '0';

		this._opened = false;
	},

	setLatLng: function (latlng) {
		this._latlng = latlng;
		if (this._opened) {
			this._update();
		}
		return this;
	},

	setContent: function (content) {
		this._content = content;
		if (this._opened) {
			this._update();
		}
		return this;
	},

	_close: function () {
		if (this._opened) {
			this._map.closePopup();
		}
	},

	_initLayout: function () {
		this._container = L.DomUtil.create('div', 'leaflet-popup ' + this.options.className);

		if (this.options.closeButton) {
			this._closeButton = L.DomUtil.create('a', 'leaflet-popup-close-button', this._container);
			this._closeButton.href = '#close';
			L.DomEvent.addListener(this._closeButton, 'click', this._onCloseButtonClick, this);
		}

		this._wrapper = L.DomUtil.create('div', 'leaflet-popup-content-wrapper', this._container);
		L.DomEvent.disableClickPropagation(this._wrapper);
		this._contentNode = L.DomUtil.create('div', 'leaflet-popup-content', this._wrapper);

		this._tipContainer = L.DomUtil.create('div', 'leaflet-popup-tip-container', this._container);
		this._tip = L.DomUtil.create('div', 'leaflet-popup-tip', this._tipContainer);
	},

	_update: function () {
		this._container.style.visibility = 'hidden';

		this._updateContent();
		this._updateLayout();
		this._updatePosition();

		this._container.style.visibility = '';

		this._adjustPan();
	},

	_updateContent: function () {
		if (!this._content) {
			return;
		}

		if (typeof this._content === 'string') {
			this._contentNode.innerHTML = this._content;
		} else {
			this._contentNode.innerHTML = '';
			this._contentNode.appendChild(this._content);
		}
	},

	_updateLayout: function () {
		this._container.style.width = '';
		this._container.style.whiteSpace = 'nowrap';

		var width = this._container.offsetWidth;

		this._container.style.width = (width > this.options.maxWidth ?
				this.options.maxWidth : (width < this.options.minWidth ? this.options.minWidth : width)) + 'px';
		this._container.style.whiteSpace = '';

		this._containerWidth = this._container.offsetWidth;
	},

	_updatePosition: function () {
		var pos = this._map.latLngToLayerPoint(this._latlng);

		this._containerBottom = -pos.y - this.options.offset.y;
		this._containerLeft = pos.x - Math.round(this._containerWidth / 2) + this.options.offset.x;

		this._container.style.bottom = this._containerBottom + 'px';
		this._container.style.left = this._containerLeft + 'px';
	},

	_adjustPan: function () {
		if (!this.options.autoPan) {
			return;
		}

		var containerHeight = this._container.offsetHeight,
			layerPos = new L.Point(
				this._containerLeft,
				-containerHeight - this._containerBottom),
			containerPos = this._map.layerPointToContainerPoint(layerPos),
			adjustOffset = new L.Point(0, 0),
			padding = this.options.autoPanPadding,
			size = this._map.getSize();

		if (containerPos.x < 0) {
			adjustOffset.x = containerPos.x - padding.x;
		}
		if (containerPos.x + this._containerWidth > size.x) {
			adjustOffset.x = containerPos.x + this._containerWidth - size.x + padding.x;
		}
		if (containerPos.y < 0) {
			adjustOffset.y = containerPos.y - padding.y;
		}
		if (containerPos.y + containerHeight > size.y) {
			adjustOffset.y = containerPos.y + containerHeight - size.y + padding.y;
		}

		if (adjustOffset.x || adjustOffset.y) {
			this._map.panBy(adjustOffset);
		}
	},

	_onCloseButtonClick: function (e) {
		this._close();
		L.DomEvent.stop(e);
	}
});


/*
 * Popup extension to L.Marker, adding openPopup & bindPopup methods.
 */

L.Marker.include({
	openPopup: function () {
		this._popup.setLatLng(this._latlng);
		if (this._map) {
			this._map.openPopup(this._popup);
		}

		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	bindPopup: function (content, options) {
		options = L.Util.extend({offset: this.options.icon.popupAnchor}, options);

		if (!this._popup) {
			this.on('click', this.openPopup, this);
		}

		this._popup = new L.Popup(options, this);
		this._popup.setContent(content);

		return this;
	},

	unbindPopup: function () {
		if (this._popup) {
			this._popup = null;
			this.off('click', this.openPopup);
		}
		return this;
	}
});



L.Map.include({
	openPopup: function (popup) {
		this.closePopup();
		this._popup = popup;
		this.addLayer(popup);
		this.fire('popupopen', { popup: this._popup });
	
		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this.removeLayer(this._popup);
			this.fire('popupclose', { popup: this._popup });
			this._popup = null;
		}
		return this;
	}
});


/*
 * L.LayerGroup is a class to combine several layers so you can manipulate the group (e.g. add/remove it) as one layer.
 */

L.LayerGroup = L.Class.extend({
	initialize: function (layers) {
		this._layers = {};

		if (layers) {
			for (var i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		}
	},

	addLayer: function (layer) {
		var id = L.Util.stamp(layer);
		this._layers[id] = layer;

		if (this._map) {
			this._map.addLayer(layer);
		}
		return this;
	},

	removeLayer: function (layer) {
		var id = L.Util.stamp(layer);
		delete this._layers[id];

		if (this._map) {
			this._map.removeLayer(layer);
		}
		return this;
	},

	clearLayers: function () {
		this._iterateLayers(this.removeLayer, this);
		return this;
	},

	invoke: function (methodName) {
		var args = Array.prototype.slice.call(arguments, 1),
			i, layer;

		for (i in this._layers) {
			if (this._layers.hasOwnProperty(i)) {
				layer = this._layers[i];

				if (layer[methodName]) {
					layer[methodName].apply(layer, args);
				}
			}
		}
		return this;
	},

	onAdd: function (map) {
		this._map = map;
		this._iterateLayers(map.addLayer, map);
	},

	onRemove: function (map) {
		this._iterateLayers(map.removeLayer, map);
		delete this._map;
	},

	_iterateLayers: function (method, context) {
		for (var i in this._layers) {
			if (this._layers.hasOwnProperty(i)) {
				method.call(context, this._layers[i]);
			}
		}
	}
});


/*
 * L.FeatureGroup extends L.LayerGroup by introducing mouse events and bindPopup method shared between a group of layers.
 */

L.FeatureGroup = L.LayerGroup.extend({
	includes: L.Mixin.Events,

	addLayer: function (layer) {
		this._initEvents(layer);
		L.LayerGroup.prototype.addLayer.call(this, layer);

		if (this._popupContent && layer.bindPopup) {
			layer.bindPopup(this._popupContent);
		}
	},

	bindPopup: function (content) {
		this._popupContent = content;

		return this.invoke('bindPopup', content);
	},

	setStyle: function (style) {
		return this.invoke('setStyle', style);
	},

	_events: ['click', 'dblclick', 'mouseover', 'mouseout'],

	_initEvents: function (layer) {
		for (var i = 0, len = this._events.length; i < len; i++) {
			layer.on(this._events[i], this._propagateEvent, this);
		}
	},

	_propagateEvent: function (e) {
		e.layer = e.target;
		e.target = this;
		this.fire(e.type, e);
	}
});


/*
 * L.Path is a base class for rendering vector paths on a map. It's inherited by Polyline, Circle, etc.
 */

L.Path = L.Class.extend({
	includes: [L.Mixin.Events],

	statics: {
		// how much to extend the clip area around the map view
		// (relative to its size, e.g. 0.5 is half the screen in each direction)
		CLIP_PADDING: 0.5
	},

	options: {
		stroke: true,
		color: '#0033ff',
		weight: 5,
		opacity: 0.5,

		fill: false,
		fillColor: null, //same as color by default
		fillOpacity: 0.2,

		clickable: true,

		// TODO remove this, as all paths now update on moveend
		updateOnMoveEnd: true
	},

	initialize: function (options) {
		L.Util.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		this._initElements();
		this._initEvents();
		this.projectLatlngs();
		this._updatePath();

		map.on('viewreset', this.projectLatlngs, this);

		this._updateTrigger = this.options.updateOnMoveEnd ? 'moveend' : 'viewreset';
		map.on(this._updateTrigger, this._updatePath, this);
	},

	onRemove: function (map) {
		this._map = null;

		map._pathRoot.removeChild(this._container);

		map.off('viewreset', this.projectLatlngs, this);
		map.off(this._updateTrigger, this._updatePath, this);
	},

	projectLatlngs: function () {
		// do all projection stuff here
	},

	setStyle: function (style) {
		L.Util.setOptions(this, style);
		if (this._container) {
			this._updateStyle();
		}
		return this;
	},

	_redraw: function () {
		if (this._map) {
			this.projectLatlngs();
			this._updatePath();
		}
	}
});

L.Map.include({
	_updatePathViewport: function () {
		var p = L.Path.CLIP_PADDING,
			size = this.getSize(),
			//TODO this._map._getMapPanePos()
			panePos = L.DomUtil.getPosition(this._mapPane),
			min = panePos.multiplyBy(-1).subtract(size.multiplyBy(p)),
			max = min.add(size.multiplyBy(1 + p * 2));

		this._pathViewport = new L.Bounds(min, max);
	}
});


L.Path.SVG_NS = 'http://www.w3.org/2000/svg';

L.Browser.svg = !!(document.createElementNS && document.createElementNS(L.Path.SVG_NS, 'svg').createSVGRect);

L.Path = L.Path.extend({
	statics: {
		SVG: L.Browser.svg,
		_createElement: function (name) {
			return document.createElementNS(L.Path.SVG_NS, name);
		}
	},

	getPathString: function () {
		// form path string here
	},

	_initElements: function () {
		this._map._initPathRoot();
		this._initPath();
		this._initStyle();
	},

	_initPath: function () {
		this._container = L.Path._createElement('g');

		this._path = L.Path._createElement('path');
		this._container.appendChild(this._path);

		this._map._pathRoot.appendChild(this._container);
	},

	_initStyle: function () {
		if (this.options.stroke) {
			this._path.setAttribute('stroke-linejoin', 'round');
			this._path.setAttribute('stroke-linecap', 'round');
		}
		if (this.options.fill) {
			this._path.setAttribute('fill-rule', 'evenodd');
		} else {
			this._path.setAttribute('fill', 'none');
		}
		this._updateStyle();
	},

	_updateStyle: function () {
		if (this.options.stroke) {
			this._path.setAttribute('stroke', this.options.color);
			this._path.setAttribute('stroke-opacity', this.options.opacity);
			this._path.setAttribute('stroke-width', this.options.weight);
		}
		if (this.options.fill) {
			this._path.setAttribute('fill', this.options.fillColor || this.options.color);
			this._path.setAttribute('fill-opacity', this.options.fillOpacity);
		}
	},

	_updatePath: function () {
		var str = this.getPathString();
		if (!str) {
			// fix webkit empty string parsing bug
			str = 'M0 0';
		}
		this._path.setAttribute('d', str);
	},

	// TODO remove duplication with L.Map
	_initEvents: function () {
		if (this.options.clickable) {
			if (!L.Browser.vml) {
				this._path.setAttribute('class', 'leaflet-clickable');
			}

			L.DomEvent.addListener(this._container, 'click', this._onMouseClick, this);

			var events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'mousemove'];
			for (var i = 0; i < events.length; i++) {
				L.DomEvent.addListener(this._container, events[i], this._fireMouseEvent, this);
			}
		}
	},

	_onMouseClick: function (e) {
		if (this._map.dragging && this._map.dragging.moved()) {
			return;
		}
		this._fireMouseEvent(e);
	},

	_fireMouseEvent: function (e) {
		if (!this.hasEventListeners(e.type)) {
			return;
		}
		this.fire(e.type, {
			latlng: this._map.mouseEventToLatLng(e),
			layerPoint: this._map.mouseEventToLayerPoint(e)
		});
		L.DomEvent.stopPropagation(e);
	}
});

L.Map.include({
	_initPathRoot: function () {
		if (!this._pathRoot) {
			this._pathRoot = L.Path._createElement('svg');
			this._panes.overlayPane.appendChild(this._pathRoot);

			this.on('moveend', this._updateSvgViewport);
			this._updateSvgViewport();
		}
	},

	_updateSvgViewport: function () {
		this._updatePathViewport();

		var vp = this._pathViewport,
			min = vp.min,
			max = vp.max,
			width = max.x - min.x,
			height = max.y - min.y,
			root = this._pathRoot,
			pane = this._panes.overlayPane;

		// Hack to make flicker on drag end on mobile webkit less irritating
		// Unfortunately I haven't found a good workaround for this yet
		if (L.Browser.webkit) {
			pane.removeChild(root);
		}

		L.DomUtil.setPosition(root, min);
		root.setAttribute('width', width);
		root.setAttribute('height', height);
		root.setAttribute('viewBox', [min.x, min.y, width, height].join(' '));

		if (L.Browser.webkit) {
			pane.appendChild(root);
		}
	}
});


/*
 * Popup extension to L.Path (polylines, polygons, circles), adding bindPopup method.
 */

L.Path.include({
	bindPopup: function (content, options) {
		if (!this._popup || this._popup.options !== options) {
			this._popup = new L.Popup(options, this);
		}
		this._popup.setContent(content);

		if (!this._openPopupAdded) {
			this.on('click', this._openPopup, this);
			this._openPopupAdded = true;
		}

		return this;
	},

	_openPopup: function (e) {
		this._popup.setLatLng(e.latlng);
		this._map.openPopup(this._popup);
	}
});


/*
 * Vector rendering for IE6-8 through VML.
 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
 */

L.Browser.vml = (function () {
	var d = document.createElement('div'), s;
	d.innerHTML = '<v:shape adj="1"/>';
	s = d.firstChild;
	s.style.behavior = 'url(#default#VML)';

	return (s && (typeof s.adj === 'object'));
}());

L.Path = L.Browser.svg || !L.Browser.vml ? L.Path : L.Path.extend({
	statics: {
		VML: true,
		CLIP_PADDING: 0.02,
		_createElement: (function () {
			try {
				document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
				return function (name) {
					return document.createElement('<lvml:' + name + ' class="lvml">');
				};
			} catch (e) {
				return function (name) {
					return document.createElement('<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
				};
			}
		}())
	},

	_initPath: function () {
		this._container = L.Path._createElement('shape');
		this._container.className += ' leaflet-vml-shape' +
				(this.options.clickable ? ' leaflet-clickable' : '');
		this._container.coordsize = '1 1';

		this._path = L.Path._createElement('path');
		this._container.appendChild(this._path);

		this._map._pathRoot.appendChild(this._container);
	},

	_initStyle: function () {
		if (this.options.stroke) {
			this._stroke = L.Path._createElement('stroke');
			this._stroke.endcap = 'round';
			this._container.appendChild(this._stroke);
		} else {
			this._container.stroked = false;
		}
		if (this.options.fill) {
			this._container.filled = true;
			this._fill = L.Path._createElement('fill');
			this._container.appendChild(this._fill);
		} else {
			this._container.filled = false;
		}
		this._updateStyle();
	},

	_updateStyle: function () {
		if (this.options.stroke) {
			this._stroke.weight = this.options.weight + 'px';
			this._stroke.color = this.options.color;
			this._stroke.opacity = this.options.opacity;
		}
		if (this.options.fill) {
			this._fill.color = this.options.fillColor || this.options.color;
			this._fill.opacity = this.options.fillOpacity;
		}
	},

	_updatePath: function () {
		this._container.style.display = 'none';
		this._path.v = this.getPathString() + ' '; // the space fixes IE empty path string bug
		this._container.style.display = '';
	}
});

L.Map.include(L.Browser.svg || !L.Browser.vml ? {} : {
	_initPathRoot: function () {
		if (!this._pathRoot) {
			this._pathRoot = document.createElement('div');
			this._pathRoot.className = 'leaflet-vml-container';
			this._panes.overlayPane.appendChild(this._pathRoot);

			this.on('moveend', this._updatePathViewport);
			this._updatePathViewport();
		}
	}
});


/*
 * Vector rendering for all browsers that support canvas.
 */

L.Browser.canvas = (function () {
	return !!document.createElement('canvas').getContext;
}());

L.Path = (L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? L.Path : L.Path.extend({
	statics: {
		//CLIP_PADDING: 0.02, // not sure if there's a need to set it to a small value
		CANVAS: true,
		SVG: false
	},

	options: {
		updateOnMoveEnd: true
	},

	_initElements: function () {
		this._map._initPathRoot();
		this._ctx = this._map._canvasCtx;
	},

	_updateStyle: function () {
		if (this.options.stroke) {
			this._ctx.lineWidth = this.options.weight;
			this._ctx.strokeStyle = this.options.color;
		}
		if (this.options.fill) {
			this._ctx.fillStyle = this.options.fillColor || this.options.color;
		}
	},

	_drawPath: function () {
		var i, j, len, len2, point, drawMethod;

		this._ctx.beginPath();

		for (i = 0, len = this._parts.length; i < len; i++) {
			for (j = 0, len2 = this._parts[i].length; j < len2; j++) {
				point = this._parts[i][j];
				drawMethod = (j === 0 ? 'move' : 'line') + 'To';

				this._ctx[drawMethod](point.x, point.y);
			}
			// TODO refactor ugly hack
			if (this instanceof L.Polygon) {
				this._ctx.closePath();
			}
		}
	},

	_checkIfEmpty: function () {
		return !this._parts.length;
	},

	_updatePath: function () {
		if (this._checkIfEmpty()) {
			return;
		}

		this._drawPath();

		this._ctx.save();

		this._updateStyle();

		var opacity = this.options.opacity,
			fillOpacity = this.options.fillOpacity;

		if (this.options.fill) {
			if (fillOpacity < 1) {
				this._ctx.globalAlpha = fillOpacity;
			}
			this._ctx.fill();
		}

		if (this.options.stroke) {
			if (opacity < 1) {
				this._ctx.globalAlpha = opacity;
			}
			this._ctx.stroke();
		}

		this._ctx.restore();

		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
	},

	_initEvents: function () {
		if (this.options.clickable) {
			// TODO hand cursor
			// TODO mouseover, mouseout, dblclick
			this._map.on('click', this._onClick, this);
		}
	},

	_onClick: function (e) {
		if (this._containsPoint(e.layerPoint)) {
			this.fire('click', e);
		}
	},

    onRemove: function (map) {
        map.off('viewreset', this._projectLatlngs, this);
        map.off(this._updateTrigger, this._updatePath, this);
        map.fire(this._updateTrigger);
    }
});

L.Map.include((L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? {} : {
	_initPathRoot: function () {
		var root = this._pathRoot,
			ctx;

		if (!root) {
			root = this._pathRoot = document.createElement("canvas");
			root.style.position = 'absolute';
			ctx = this._canvasCtx = root.getContext('2d');

			ctx.lineCap = "round";
			ctx.lineJoin = "round";

			this._panes.overlayPane.appendChild(root);

			this.on('moveend', this._updateCanvasViewport);
			this._updateCanvasViewport();
		}
	},

	_updateCanvasViewport: function () {
		this._updatePathViewport();

		var vp = this._pathViewport,
			min = vp.min,
			size = vp.max.subtract(min),
			root = this._pathRoot;

		//TODO check if it's works properly on mobile webkit
		L.DomUtil.setPosition(root, min);
		root.width = size.x;
		root.height = size.y;
		root.getContext('2d').translate(-min.x, -min.y);
	}
});


/*
 * L.LineUtil contains different utility functions for line segments
 * and polylines (clipping, simplification, distances, etc.)
 */

L.LineUtil = {

	// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	// Improves rendering performance dramatically by lessening the number of points to draw.

	simplify: function (/*Point[]*/ points, /*Number*/ tolerance) {
		if (!tolerance || !points.length) {
			return points.slice();
		}

		var sqTolerance = tolerance * tolerance;

		// stage 1: vertex reduction
		points = this._reducePoints(points, sqTolerance);

		// stage 2: Douglas-Peucker simplification
		points = this._simplifyDP(points, sqTolerance);

		return points;
	},

	// distance from a point to a segment between two points
	pointToSegmentDistance:  function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return Math.sqrt(this._sqClosestPointOnSegment(p, p1, p2, true));
	},

	closestPointOnSegment: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return this._sqClosestPointOnSegment(p, p1, p2);
	},

	// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	_simplifyDP: function (points, sqTolerance) {

		var len = points.length,
			ArrayConstructor = typeof Uint8Array !== 'undefined' ? Uint8Array : Array,
			markers = new ArrayConstructor(len);

		markers[0] = markers[len - 1] = 1;

		this._simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

		var i,
			newPoints = [];

		for (i = 0; i < len; i++) {
			if (markers[i]) {
				newPoints.push(points[i]);
			}
		}

		return newPoints;
	},

	_simplifyDPStep: function (points, markers, sqTolerance, first, last) {

		var maxSqDist = 0,
			index, i, sqDist;

		for (i = first + 1; i <= last - 1; i++) {
			sqDist = this._sqClosestPointOnSegment(points[i], points[first], points[last], true);

			if (sqDist > maxSqDist) {
				index = i;
				maxSqDist = sqDist;
			}
		}

		if (maxSqDist > sqTolerance) {
			markers[index] = 1;

			this._simplifyDPStep(points, markers, sqTolerance, first, index);
			this._simplifyDPStep(points, markers, sqTolerance, index, last);
		}
	},

	// reduce points that are too close to each other to a single point
	_reducePoints: function (points, sqTolerance) {
		var reducedPoints = [points[0]];

		for (var i = 1, prev = 0, len = points.length; i < len; i++) {
			if (this._sqDist(points[i], points[prev]) > sqTolerance) {
				reducedPoints.push(points[i]);
				prev = i;
			}
		}
		if (prev < len - 1) {
			reducedPoints.push(points[len - 1]);
		}
		return reducedPoints;
	},

	/*jshint bitwise:false */ // temporarily allow bitwise oprations

	// Cohen-Sutherland line clipping algorithm.
	// Used to avoid rendering parts of a polyline that are not currently visible.

	clipSegment: function (a, b, bounds, useLastCode) {
		var min = bounds.min,
			max = bounds.max;

		var codeA = useLastCode ? this._lastCode : this._getBitCode(a, bounds),
			codeB = this._getBitCode(b, bounds);

		// save 2nd code to avoid calculating it on the next segment
		this._lastCode = codeB;

		while (true) {
			// if a,b is inside the clip window (trivial accept)
			if (!(codeA | codeB)) {
				return [a, b];
			// if a,b is outside the clip window (trivial reject)
			} else if (codeA & codeB) {
				return false;
			// other cases
			} else {
				var codeOut = codeA || codeB,
					p = this._getEdgeIntersection(a, b, codeOut, bounds),
					newCode = this._getBitCode(p, bounds);

				if (codeOut === codeA) {
					a = p;
					codeA = newCode;
				} else {
					b = p;
					codeB = newCode;
				}
			}
		}
	},

	_getEdgeIntersection: function (a, b, code, bounds) {
		var dx = b.x - a.x,
			dy = b.y - a.y,
			min = bounds.min,
			max = bounds.max;

		if (code & 8) { // top
			return new L.Point(a.x + dx * (max.y - a.y) / dy, max.y);
		} else if (code & 4) { // bottom
			return new L.Point(a.x + dx * (min.y - a.y) / dy, min.y);
		} else if (code & 2) { // right
			return new L.Point(max.x, a.y + dy * (max.x - a.x) / dx);
		} else if (code & 1) { // left
			return new L.Point(min.x, a.y + dy * (min.x - a.x) / dx);
		}
	},

	_getBitCode: function (/*Point*/ p, bounds) {
		var code = 0;

		if (p.x < bounds.min.x) { // left
			code |= 1;
		} else if (p.x > bounds.max.x) { // right
			code |= 2;
		}
		if (p.y < bounds.min.y) { // bottom
			code |= 4;
		} else if (p.y > bounds.max.y) { // top
			code |= 8;
		}

		return code;
	},

	/*jshint bitwise:true */

	// square distance (to avoid unnecessary Math.sqrt calls)
	_sqDist: function (p1, p2) {
		var dx = p2.x - p1.x,
			dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	},

	// return closest point on segment or distance to that point
	_sqClosestPointOnSegment: function (p, p1, p2, sqDist) {
		var x = p1.x,
			y = p1.y,
			dx = p2.x - x,
			dy = p2.y - y,
			dot = dx * dx + dy * dy,
			t;

		if (dot > 0) {
			t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

			if (t > 1) {
				x = p2.x;
				y = p2.y;
			} else if (t > 0) {
				x += dx * t;
				y += dy * t;
			}
		}

		dx = p.x - x;
		dy = p.y - y;

		return sqDist ? dx * dx + dy * dy : new L.Point(x, y);
	}
};



L.Polyline = L.Path.extend({
	initialize: function (latlngs, options) {
		L.Path.prototype.initialize.call(this, options);
		this._latlngs = latlngs;
	},

	options: {
		// how much to simplify the polyline on each zoom level
		// more = better performance and smoother look, less = more accurate
		smoothFactor: 1.0,
		noClip: false,

		updateOnMoveEnd: true
	},

	projectLatlngs: function () {
		this._originalPoints = [];

		for (var i = 0, len = this._latlngs.length; i < len; i++) {
			this._originalPoints[i] = this._map.latLngToLayerPoint(this._latlngs[i]);
		}
	},

	getPathString: function () {
		for (var i = 0, len = this._parts.length, str = ''; i < len; i++) {
			str += this._getPathPartStr(this._parts[i]);
		}
		return str;
	},

	getLatLngs: function () {
		return this._latlngs;
	},

	setLatLngs: function (latlngs) {
		this._latlngs = latlngs;
		this._redraw();
		return this;
	},

	addLatLng: function (latlng) {
		this._latlngs.push(latlng);
		this._redraw();
		return this;
	},

	spliceLatLngs: function (index, howMany) {
		var removed = [].splice.apply(this._latlngs, arguments);
		this._redraw();
		return removed;
	},

	closestLayerPoint: function (p) {
		var minDistance = Infinity, parts = this._parts, p1, p2, minPoint = null;

		for (var j = 0, jLen = parts.length; j < jLen; j++) {
			var points = parts[j];
			for (var i = 1, len = points.length; i < len; i++) {
				p1 = points[i - 1];
				p2 = points[i];
				var point = L.LineUtil._sqClosestPointOnSegment(p, p1, p2);
				if (point._sqDist < minDistance) {
					minDistance = point._sqDist;
					minPoint = point;
				}
			}
		}
		if (minPoint) {
			minPoint.distance = Math.sqrt(minDistance);
		}
		return minPoint;
	},

	getBounds: function () {
		var b = new L.LatLngBounds();
		var latLngs = this.getLatLngs();
		for (var i = 0, len = latLngs.length; i < len; i++) {
			b.extend(latLngs[i]);
		}
		return b;
	},

	_getPathPartStr: function (points) {
		var round = L.Path.VML;

		for (var j = 0, len2 = points.length, str = '', p; j < len2; j++) {
			p = points[j];
			if (round) {
				p._round();
			}
			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
		}
		return str;
	},

	_clipPoints: function () {
		var points = this._originalPoints,
			len = points.length,
			i, k, segment;

		if (this.options.noClip) {
			this._parts = [points];
			return;
		}

		this._parts = [];

		var parts = this._parts,
			vp = this._map._pathViewport,
			lu = L.LineUtil;

		for (i = 0, k = 0; i < len - 1; i++) {
			segment = lu.clipSegment(points[i], points[i + 1], vp, i);
			if (!segment) {
				continue;
			}

			parts[k] = parts[k] || [];
			parts[k].push(segment[0]);

			// if segment goes out of screen, or it's the last one, it's the end of the line part
			if ((segment[1] !== points[i + 1]) || (i === len - 2)) {
				parts[k].push(segment[1]);
				k++;
			}
		}
	},

	// simplify each clipped part of the polyline
	_simplifyPoints: function () {
		var parts = this._parts,
			lu = L.LineUtil;

		for (var i = 0, len = parts.length; i < len; i++) {
			parts[i] = lu.simplify(parts[i], this.options.smoothFactor);
		}
	},

	_updatePath: function () {
		this._clipPoints();
		this._simplifyPoints();

		L.Path.prototype._updatePath.call(this);
	}
});


/*
 * L.PolyUtil contains utilify functions for polygons (clipping, etc.).
 */

/*jshint bitwise:false */ // allow bitwise oprations here

L.PolyUtil = {};

/*
 * Sutherland-Hodgeman polygon clipping algorithm.
 * Used to avoid rendering parts of a polygon that are not currently visible.
 */
L.PolyUtil.clipPolygon = function (points, bounds) {
	var min = bounds.min,
		max = bounds.max,
		clippedPoints,
		edges = [1, 4, 2, 8],
		i, j, k,
		a, b,
		len, edge, p,
		lu = L.LineUtil;

	for (i = 0, len = points.length; i < len; i++) {
		points[i]._code = lu._getBitCode(points[i], bounds);
	}

	// for each edge (left, bottom, right, top)
	for (k = 0; k < 4; k++) {
		edge = edges[k];
		clippedPoints = [];

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			a = points[i];
			b = points[j];

			// if a is inside the clip window
			if (!(a._code & edge)) {
				// if b is outside the clip window (a->b goes out of screen)
				if (b._code & edge) {
					p = lu._getEdgeIntersection(b, a, edge, bounds);
					p._code = lu._getBitCode(p, bounds);
					clippedPoints.push(p);
				}
				clippedPoints.push(a);

			// else if b is inside the clip window (a->b enters the screen)
			} else if (!(b._code & edge)) {
				p = lu._getEdgeIntersection(b, a, edge, bounds);
				p._code = lu._getBitCode(p, bounds);
				clippedPoints.push(p);
			}
		}
		points = clippedPoints;
	}

	return points;
};

/*jshint bitwise:true */


/*
 * L.Polygon is used to display polygons on a map.
 */

L.Polygon = L.Polyline.extend({
	options: {
		fill: true
	},

	initialize: function (latlngs, options) {
		L.Polyline.prototype.initialize.call(this, latlngs, options);

		if (latlngs && (latlngs[0] instanceof Array)) {
			this._latlngs = latlngs[0];
			this._holes = latlngs.slice(1);
		}
	},

	projectLatlngs: function () {
		L.Polyline.prototype.projectLatlngs.call(this);

		// project polygon holes points
		// TODO move this logic to Polyline to get rid of duplication
		this._holePoints = [];

		if (!this._holes) {
			return;
		}

		for (var i = 0, len = this._holes.length, hole; i < len; i++) {
			this._holePoints[i] = [];

			for (var j = 0, len2 = this._holes[i].length; j < len2; j++) {
				this._holePoints[i][j] = this._map.latLngToLayerPoint(this._holes[i][j]);
			}
		}
	},

	_clipPoints: function () {
		var points = this._originalPoints,
			newParts = [];

		this._parts = [points].concat(this._holePoints);

		if (this.options.noClip) {
			return;
		}

		for (var i = 0, len = this._parts.length; i < len; i++) {
			var clipped = L.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
			if (!clipped.length) {
				continue;
			}
			newParts.push(clipped);
		}

		this._parts = newParts;
	},

	_getPathPartStr: function (points) {
		var str = L.Polyline.prototype._getPathPartStr.call(this, points);
		return str + (L.Browser.svg ? 'z' : 'x');
	}
});


/*
 * Contains L.MultiPolyline and L.MultiPolygon layers.
 */

(function () {
	function createMulti(Klass) {
		return L.FeatureGroup.extend({
			initialize: function (latlngs, options) {
				this._layers = {};
				this._options = options;
				this.setLatLngs(latlngs);
			},

			setLatLngs: function (latlngs) {
				var i = 0, len = latlngs.length;

				this._iterateLayers(function (layer) {
					if (i < len) {
						layer.setLatLngs(latlngs[i++]);
					} else {
						this.removeLayer(layer);
					}
				}, this);

				while (i < len) {
					this.addLayer(new Klass(latlngs[i++], this._options));
				}
			}
		});
	}

	L.MultiPolyline = createMulti(L.Polyline);
	L.MultiPolygon = createMulti(L.Polygon);
}());


/*
 * L.Circle is a circle overlay (with a certain radius in meters).
 */

L.Circle = L.Path.extend({
	initialize: function (latlng, radius, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlng = latlng;
		this._mRadius = radius;
	},

	options: {
		fill: true
	},

	setLatLng: function (latlng) {
		this._latlng = latlng;
		this._redraw();
		return this;
	},

	setRadius: function (radius) {
		this._mRadius = radius;
		this._redraw();
		return this;
	},

	projectLatlngs: function () {
		var equatorLength = 40075017,
			hLength = equatorLength * Math.cos(L.LatLng.DEG_TO_RAD * this._latlng.lat);

		var lngSpan = (this._mRadius / hLength) * 360,
			latlng2 = new L.LatLng(this._latlng.lat, this._latlng.lng - lngSpan, true),
			point2 = this._map.latLngToLayerPoint(latlng2);

		this._point = this._map.latLngToLayerPoint(this._latlng);
		this._radius = Math.round(this._point.x - point2.x);
	},

	getPathString: function () {
		var p = this._point,
			r = this._radius;

		if (this._checkIfEmpty()) {
			return '';
		}

		if (L.Browser.svg) {
			return "M" + p.x + "," + (p.y - r) +
					"A" + r + "," + r + ",0,1,1," +
					(p.x - 0.1) + "," + (p.y - r) + " z";
		} else {
			p._round();
			r = Math.round(r);
			return "AL " + p.x + "," + p.y + " " + r + "," + r + " 0," + (65535 * 360);
		}
	},

	_checkIfEmpty: function () {
		var vp = this._map._pathViewport,
			r = this._radius,
			p = this._point;

		return p.x - r > vp.max.x || p.y - r > vp.max.y ||
			p.x + r < vp.min.x || p.y + r < vp.min.y;
	}
});


/*
 * L.CircleMarker is a circle overlay with a permanent pixel radius.
 */

L.CircleMarker = L.Circle.extend({
	options: {
		radius: 10,
		weight: 2
	},

	initialize: function (latlng, options) {
		L.Circle.prototype.initialize.call(this, latlng, null, options);
		this._radius = this.options.radius;
	},

	projectLatlngs: function () {
		this._point = this._map.latLngToLayerPoint(this._latlng);
	},

	setRadius: function (radius) {
		this._radius = radius;
		this._redraw();
		return this;
	}
});



L.Polyline.include(!L.Path.CANVAS ? {} : {
	_containsPoint: function (p, closed) {
		var i, j, k, len, len2, dist, part,
			w = this.options.weight / 2;

		if (L.Browser.touch) {
			w += 10; // polyline click tolerance on touch devices
		}

		for (i = 0, len = this._parts.length; i < len; i++) {
			part = this._parts[i];
			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
				if (!closed && (j === 0)) {
					continue;
				}

				dist = L.LineUtil.pointToSegmentDistance(p, part[k], part[j]);

				if (dist <= w) {
					return true;
				}
			}
		}
		return false;
	}
});



L.Polygon.include(!L.Path.CANVAS ? {} : {
	_containsPoint: function (p) {
		var inside = false,
			part, p1, p2,
			i, j, k,
			len, len2;

		// TODO optimization: check if within bounds first

		if (L.Polyline.prototype._containsPoint.call(this, p, true)) {
			// click on polygon border
			return true;
		}

		// ray casting algorithm for detecting if point is in polygon

		for (i = 0, len = this._parts.length; i < len; i++) {
			part = this._parts[i];

			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
				p1 = part[j];
				p2 = part[k];

				if (((p1.y > p.y) !== (p2.y > p.y)) &&
						(p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
					inside = !inside;
				}
			}
		}

		return inside;
	}
});


/*
 * Circle canvas specific drawing parts.
 */

L.Circle.include(!L.Path.CANVAS ? {} : {
	_drawPath: function () {
		var p = this._point;
		this._ctx.beginPath();
		this._ctx.arc(p.x, p.y, this._radius, 0, Math.PI * 2);
	},

	_containsPoint: function (p) {
		var center = this._point,
			w2 = this.options.stroke ? this.options.weight / 2 : 0;

		return (p.distanceTo(center) <= this._radius + w2);
	}
});



L.GeoJSON = L.FeatureGroup.extend({
	initialize: function (geojson, options) {
		L.Util.setOptions(this, options);
		this._geojson = geojson;
		this._layers = {};

		if (geojson) {
			this.addGeoJSON(geojson);
		}
	},

	addGeoJSON: function (geojson) {
		if (geojson.features) {
			for (var i = 0, len = geojson.features.length; i < len; i++) {
				this.addGeoJSON(geojson.features[i]);
			}
			return;
		}

		var isFeature = (geojson.type === 'Feature'),
			geometry = (isFeature ? geojson.geometry : geojson),
			layer = L.GeoJSON.geometryToLayer(geometry, this.options.pointToLayer);

		this.fire('featureparse', {
			layer: layer,
			properties: geojson.properties,
			geometryType: geometry.type,
			bbox: geojson.bbox,
			id: geojson.id
		});

		this.addLayer(layer);
	}
});

L.Util.extend(L.GeoJSON, {
	geometryToLayer: function (geometry, pointToLayer) {
		var coords = geometry.coordinates,
			latlng, latlngs,
			i, len,
			layer,
			layers = [];

		switch (geometry.type) {
		case 'Point':
			latlng = this.coordsToLatLng(coords);
			return pointToLayer ? pointToLayer(latlng) : new L.Marker(latlng);

		case 'MultiPoint':
			for (i = 0, len = coords.length; i < len; i++) {
				latlng = this.coordsToLatLng(coords[i]);
				layer = pointToLayer ? pointToLayer(latlng) : new L.Marker(latlng);
				layers.push(layer);
			}
			return new L.FeatureGroup(layers);

		case 'LineString':
			latlngs = this.coordsToLatLngs(coords);
			return new L.Polyline(latlngs);

		case 'Polygon':
			latlngs = this.coordsToLatLngs(coords, 1);
			return new L.Polygon(latlngs);

		case 'MultiLineString':
			latlngs = this.coordsToLatLngs(coords, 1);
			return new L.MultiPolyline(latlngs);

		case "MultiPolygon":
			latlngs = this.coordsToLatLngs(coords, 2);
			return new L.MultiPolygon(latlngs);

		case "GeometryCollection":
			for (i = 0, len = geometry.geometries.length; i < len; i++) {
				layer = this.geometryToLayer(geometry.geometries[i], pointToLayer);
				layers.push(layer);
			}
			return new L.FeatureGroup(layers);

		default:
			throw new Error('Invalid GeoJSON object.');
		}
	},

	coordsToLatLng: function (/*Array*/ coords, /*Boolean*/ reverse)/*: LatLng*/ {
		var lat = parseFloat(coords[reverse ? 0 : 1]),
			lng = parseFloat(coords[reverse ? 1 : 0]);
		return new L.LatLng(lat, lng, true);
	},

	coordsToLatLngs: function (/*Array*/ coords, /*Number*/ levelsDeep, /*Boolean*/ reverse)/*: Array*/ {
		var latlng, latlngs = [],
			i, len = coords.length;

		for (i = 0; i < len; i++) {
			latlng = levelsDeep ?
					this.coordsToLatLngs(coords[i], levelsDeep - 1, reverse) :
					this.coordsToLatLng(coords[i], reverse);
			latlngs.push(latlng);
		}
		return latlngs;
	}
});


/*
 * L.DomEvent contains functions for working with DOM events.
 */

L.DomEvent = {
	/* inpired by John Resig, Dean Edwards and YUI addEvent implementations */
	addListener: function (/*HTMLElement*/ obj, /*String*/ type, /*Function*/ fn, /*Object*/ context) {
		var id = L.Util.stamp(fn),
			key = '_leaflet_' + type + id;

		if (obj[key]) {
			return;
		}

		var handler = function (e) {
			return fn.call(context || obj, e || L.DomEvent._getEvent());
		};

		if (L.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
			this.addDoubleTapListener(obj, handler, id);
		} else if ('addEventListener' in obj) {
			if (type === 'mousewheel') {
				obj.addEventListener('DOMMouseScroll', handler, false);
				obj.addEventListener(type, handler, false);
			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				var originalHandler = handler,
					newType = (type === 'mouseenter' ? 'mouseover' : 'mouseout');
				handler = function (e) {
					if (!L.DomEvent._checkMouse(obj, e)) {
						return;
					}
					return originalHandler(e);
				};
				obj.addEventListener(newType, handler, false);
			} else {
				obj.addEventListener(type, handler, false);
			}
		} else if ('attachEvent' in obj) {
			obj.attachEvent("on" + type, handler);
		}

		obj[key] = handler;
	},

	removeListener: function (/*HTMLElement*/ obj, /*String*/ type, /*Function*/ fn) {
		var id = L.Util.stamp(fn),
			key = '_leaflet_' + type + id,
			handler = obj[key];

		if (!handler) {
			return;
		}

		if (L.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
			this.removeDoubleTapListener(obj, id);
		} else if ('removeEventListener' in obj) {
			if (type === 'mousewheel') {
				obj.removeEventListener('DOMMouseScroll', handler, false);
				obj.removeEventListener(type, handler, false);
			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				obj.removeEventListener((type === 'mouseenter' ? 'mouseover' : 'mouseout'), handler, false);
			} else {
				obj.removeEventListener(type, handler, false);
			}
		} else if ('detachEvent' in obj) {
			obj.detachEvent("on" + type, handler);
		}
		obj[key] = null;
	},

	_checkMouse: function (el, e) {
		var related = e.relatedTarget;

		if (!related) {
			return true;
		}

		try {
			while (related && (related !== el)) {
				related = related.parentNode;
			}
		} catch (err) {
			return false;
		}

		return (related !== el);
	},

	/*jshint noarg:false */ // evil magic for IE
	_getEvent: function () {
		var e = window.event;
		if (!e) {
			var caller = arguments.callee.caller;
			while (caller) {
				e = caller['arguments'][0];
				if (e && window.Event === e.constructor) {
					break;
				}
				caller = caller.caller;
			}
		}
		return e;
	},
	/*jshint noarg:false */

	stopPropagation: function (/*Event*/ e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	},

	disableClickPropagation: function (/*HTMLElement*/ el) {
		L.DomEvent.addListener(el, L.Draggable.START, L.DomEvent.stopPropagation);
		L.DomEvent.addListener(el, 'click', L.DomEvent.stopPropagation);
		L.DomEvent.addListener(el, 'dblclick', L.DomEvent.stopPropagation);
	},

	preventDefault: function (/*Event*/ e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},

	stop: function (e) {
		L.DomEvent.preventDefault(e);
		L.DomEvent.stopPropagation(e);
	},

	getMousePosition: function (e, container) {
		var x = e.pageX ? e.pageX : e.clientX +
				document.body.scrollLeft + document.documentElement.scrollLeft,
			y = e.pageY ? e.pageY : e.clientY +
					document.body.scrollTop + document.documentElement.scrollTop,
			pos = new L.Point(x, y);
		return (container ?
					pos.subtract(L.DomUtil.getViewportOffset(container)) : pos);
	},

	getWheelDelta: function (e) {
		var delta = 0;
		if (e.wheelDelta) {
			delta = e.wheelDelta / 120;
		}
		if (e.detail) {
			delta = -e.detail / 3;
		}
		return delta;
	}
};



/*
 * L.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
 */

L.Draggable = L.Class.extend({
	includes: L.Mixin.Events,

	statics: {
		START: L.Browser.touch ? 'touchstart' : 'mousedown',
		END: L.Browser.touch ? 'touchend' : 'mouseup',
		MOVE: L.Browser.touch ? 'touchmove' : 'mousemove',
		TAP_TOLERANCE: 15
	},

	initialize: function (element, dragStartTarget) {
		this._element = element;
		this._dragStartTarget = dragStartTarget || element;
	},

	enable: function () {
		if (this._enabled) {
			return;
		}
		L.DomEvent.addListener(this._dragStartTarget, L.Draggable.START, this._onDown, this);
		this._enabled = true;
	},

	disable: function () {
		if (!this._enabled) {
			return;
		}
		L.DomEvent.removeListener(this._dragStartTarget, L.Draggable.START, this._onDown);
		this._enabled = false;
	},

	_onDown: function (e) {
		if ((!L.Browser.touch && e.shiftKey) || ((e.which !== 1) && (e.button !== 1) && !e.touches)) {
			return;
		}

		if (e.touches && e.touches.length > 1) {
			return;
		}

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
			el = first.target;

		L.DomEvent.preventDefault(e);

		if (L.Browser.touch && el.tagName.toLowerCase() === 'a') {
			el.className += ' leaflet-active';
		}

		this._moved = false;
		if (this._moving) {
			return;
		}

		if (!L.Browser.touch) {
			L.DomUtil.disableTextSelection();
			this._setMovingCursor();
		}

		this._startPos = this._newPos = L.DomUtil.getPosition(this._element);
		this._startPoint = new L.Point(first.clientX, first.clientY);

		L.DomEvent.addListener(document, L.Draggable.MOVE, this._onMove, this);
		L.DomEvent.addListener(document, L.Draggable.END, this._onUp, this);
	},

	_onMove: function (e) {
		if (e.touches && e.touches.length > 1) {
			return;
		}

		L.DomEvent.preventDefault(e);

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e);

		if (!this._moved) {
			this.fire('dragstart');
			this._moved = true;
		}
		this._moving = true;

		var newPoint = new L.Point(first.clientX, first.clientY);
		this._newPos = this._startPos.add(newPoint).subtract(this._startPoint);

		L.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
	},

	_updatePosition: function () {
		this.fire('predrag');
		L.DomUtil.setPosition(this._element, this._newPos);
		this.fire('drag');
	},

	_onUp: function (e) {
		if (e.changedTouches) {
			var first = e.changedTouches[0],
				el = first.target,
				dist = (this._newPos && this._newPos.distanceTo(this._startPos)) || 0;

			if (el.tagName.toLowerCase() === 'a') {
				el.className = el.className.replace(' leaflet-active', '');
			}

			if (dist < L.Draggable.TAP_TOLERANCE) {
				this._simulateEvent('click', first);
			}
		}

		if (!L.Browser.touch) {
			L.DomUtil.enableTextSelection();
			this._restoreCursor();
		}

		L.DomEvent.removeListener(document, L.Draggable.MOVE, this._onMove);
		L.DomEvent.removeListener(document, L.Draggable.END, this._onUp);

		if (this._moved) {
			this.fire('dragend');
		}
		this._moving = false;
	},

	_setMovingCursor: function () {
		this._bodyCursor = document.body.style.cursor;
		document.body.style.cursor = 'move';
	},

	_restoreCursor: function () {
		document.body.style.cursor = this._bodyCursor;
	},

	_simulateEvent: function (type, e) {
		var simulatedEvent = document.createEvent('MouseEvents');

		simulatedEvent.initMouseEvent(
				type, true, true, window, 1,
				e.screenX, e.screenY,
				e.clientX, e.clientY,
				false, false, false, false, 0, null);

		e.target.dispatchEvent(simulatedEvent);
	}
});


/*
 * L.Handler classes are used internally to inject interaction features to classes like Map and Marker.
 */

L.Handler = L.Class.extend({
	initialize: function (map) {
		this._map = map;
	},

	enable: function () {
		if (this._enabled) {
			return;
		}
		this._enabled = true;
		this.addHooks();
	},

	disable: function () {
		if (!this._enabled) {
			return;
		}
		this._enabled = false;
		this.removeHooks();
	},

	enabled: function () {
		return !!this._enabled;
	}
});


/*
 * L.Handler.MapDrag is used internally by L.Map to make the map draggable.
 */

L.Map.Drag = L.Handler.extend({
	addHooks: function () {
		if (!this._draggable) {
			this._draggable = new L.Draggable(this._map._mapPane, this._map._container);

			this._draggable
				.on('dragstart', this._onDragStart, this)
				.on('drag', this._onDrag, this)
				.on('dragend', this._onDragEnd, this);

			var options = this._map.options;

			if (options.worldCopyJump && !options.continuousWorld) {
				this._draggable.on('predrag', this._onPreDrag, this);
				this._map.on('viewreset', this._onViewReset, this);
			}
		}
		this._draggable.enable();
	},

	removeHooks: function () {
		this._draggable.disable();
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		this._map
			.fire('movestart')
			.fire('dragstart');
	},

	_onDrag: function () {
		this._map
			.fire('move')
			.fire('drag');
	},

	_onViewReset: function () {
		var pxCenter = this._map.getSize().divideBy(2),
			pxWorldCenter = this._map.latLngToLayerPoint(new L.LatLng(0, 0));

		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter);
	},

	_onPreDrag: function () {
		var map = this._map,
			worldWidth = map.options.scale(map.getZoom()),
			halfWidth = Math.round(worldWidth / 2),
			dx = this._initialWorldOffset.x,
			x = this._draggable._newPos.x,
			newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
			newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
			newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

		this._draggable._newPos.x = newX;
	},

	_onDragEnd: function () {
		var map = this._map;

		map
			.fire('moveend')
			.fire('dragend');

		if (map.options.maxBounds) {
			// TODO predrag validation instead of animation
			L.Util.requestAnimFrame(this._panInsideMaxBounds, map, true, map._container);
		}
	},

	_panInsideMaxBounds: function () {
		this.panInsideBounds(this.options.maxBounds);
	}
});


/*
 * L.Handler.DoubleClickZoom is used internally by L.Map to add double-click zooming.
 */

L.Map.DoubleClickZoom = L.Handler.extend({
	addHooks: function () {
		this._map.on('dblclick', this._onDoubleClick);
		// TODO remove 3d argument?
	},

	removeHooks: function () {
		this._map.off('dblclick', this._onDoubleClick);
	},

	_onDoubleClick: function (e) {
		this.setView(e.latlng, this._zoom + 1);
	}
});


/*
 * L.Handler.ScrollWheelZoom is used internally by L.Map to enable mouse scroll wheel zooming on the map.
 */

L.Map.ScrollWheelZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.addListener(this._map._container, 'mousewheel', this._onWheelScroll, this);
		this._delta = 0;
	},

	removeHooks: function () {
		L.DomEvent.removeListener(this._map._container, 'mousewheel', this._onWheelScroll);
	},

	_onWheelScroll: function (e) {
		var delta = L.DomEvent.getWheelDelta(e);
		this._delta += delta;
		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

		clearTimeout(this._timer);
		this._timer = setTimeout(L.Util.bind(this._performZoom, this), 50);

		L.DomEvent.preventDefault(e);
	},

	_performZoom: function () {
		var map = this._map,
			delta = Math.round(this._delta),
			zoom = map.getZoom();

		delta = Math.max(Math.min(delta, 4), -4);
		delta = map._limitZoom(zoom + delta) - zoom;

		this._delta = 0;

		if (!delta) {
			return;
		}

		var newCenter = this._getCenterForScrollWheelZoom(this._lastMousePos, delta),
			newZoom = zoom + delta;

		map.setView(newCenter, newZoom);
	},

	_getCenterForScrollWheelZoom: function (mousePos, delta) {
		var map = this._map,
			centerPoint = map.getPixelBounds().getCenter(),
			viewHalf = map.getSize().divideBy(2),
			centerOffset = mousePos.subtract(viewHalf).multiplyBy(1 - Math.pow(2, -delta)),
			newCenterPoint = centerPoint.add(centerOffset);

		return map.unproject(newCenterPoint, map._zoom, true);
	}
});


L.Util.extend(L.DomEvent, {
	// inspired by Zepto touch code by Thomas Fuchs
	addDoubleTapListener: function (obj, handler, id) {
		var last,
			doubleTap = false,
			delay = 250,
			touch,
			pre = '_leaflet_',
			touchstart = 'touchstart',
			touchend = 'touchend';

		function onTouchStart(e) {
			if (e.touches.length !== 1) {
				return;
			}

			var now = Date.now(),
				delta = now - (last || now);

			touch = e.touches[0];
			doubleTap = (delta > 0 && delta <= delay);
			last = now;
		}
		function onTouchEnd(e) {
			if (doubleTap) {
				touch.type = 'dblclick';
				handler(touch);
				last = null;
			}
		}
		obj[pre + touchstart + id] = onTouchStart;
		obj[pre + touchend + id] = onTouchEnd;

		obj.addEventListener(touchstart, onTouchStart, false);
		obj.addEventListener(touchend, onTouchEnd, false);
	},

	removeDoubleTapListener: function (obj, id) {
		var pre = '_leaflet_';
		obj.removeEventListener(obj, obj[pre + 'touchstart' + id], false);
		obj.removeEventListener(obj, obj[pre + 'touchend' + id], false);
	}
});


/*
 * L.Handler.TouchZoom is used internally by L.Map to add touch-zooming on Webkit-powered mobile browsers.
 */

L.Map.TouchZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.addListener(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	removeHooks: function () {
		L.DomEvent.removeListener(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	_onTouchStart: function (e) {
		if (!e.touches || e.touches.length !== 2 || this._map._animatingZoom) {
			return;
		}

		var p1 = this._map.mouseEventToLayerPoint(e.touches[0]),
			p2 = this._map.mouseEventToLayerPoint(e.touches[1]),
			viewCenter = this._map.containerPointToLayerPoint(this._map.getSize().divideBy(2));

		this._startCenter = p1.add(p2).divideBy(2, true);
		this._startDist = p1.distanceTo(p2);
		//this._startTransform = this._map._mapPane.style.webkitTransform;

		this._moved = false;
		this._zooming = true;

		this._centerOffset = viewCenter.subtract(this._startCenter);

		L.DomEvent.addListener(document, 'touchmove', this._onTouchMove, this);
		L.DomEvent.addListener(document, 'touchend', this._onTouchEnd, this);

		L.DomEvent.preventDefault(e);
	},

	_onTouchMove: function (e) {
		if (!e.touches || e.touches.length !== 2) {
			return;
		}

		if (!this._moved) {
			this._map._mapPane.className += ' leaflet-zoom-anim';

			this._map
				.fire('zoomstart')
				.fire('movestart')
				._prepareTileBg();

			this._moved = true;
		}

		var p1 = this._map.mouseEventToLayerPoint(e.touches[0]),
			p2 = this._map.mouseEventToLayerPoint(e.touches[1]);

		this._scale = p1.distanceTo(p2) / this._startDist;
		this._delta = p1.add(p2).divideBy(2, true).subtract(this._startCenter);

		// Used 2 translates instead of transform-origin because of a very strange bug -
		// it didn't count the origin on the first touch-zoom but worked correctly afterwards

		this._map._tileBg.style.webkitTransform = [
            L.DomUtil.getTranslateString(this._delta),
            L.DomUtil.getScaleString(this._scale, this._startCenter)
        ].join(" ");

		L.DomEvent.preventDefault(e);
	},

	_onTouchEnd: function (e) {
		if (!this._moved || !this._zooming) {
			return;
		}
		this._zooming = false;

		var oldZoom = this._map.getZoom(),
			floatZoomDelta = Math.log(this._scale) / Math.LN2,
			roundZoomDelta = (floatZoomDelta > 0 ? Math.ceil(floatZoomDelta) : Math.floor(floatZoomDelta)),
			zoom = this._map._limitZoom(oldZoom + roundZoomDelta),
			zoomDelta = zoom - oldZoom,
			centerOffset = this._centerOffset.subtract(this._delta).divideBy(this._scale),
			centerPoint = this._map.getPixelOrigin().add(this._startCenter).add(centerOffset),
			center = this._map.unproject(centerPoint);

		L.DomEvent.removeListener(document, 'touchmove', this._onTouchMove);
		L.DomEvent.removeListener(document, 'touchend', this._onTouchEnd);

		var finalScale = Math.pow(2, zoomDelta);

		this._map._runAnimation(center, zoom, finalScale / this._scale, this._startCenter.add(centerOffset));
	}
});


/*
 * L.Handler.ShiftDragZoom is used internally by L.Map to add shift-drag zoom (zoom to a selected bounding box).
 */

L.Map.BoxZoom = L.Handler.extend({
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
	},

	addHooks: function () {
		L.DomEvent.addListener(this._container, 'mousedown', this._onMouseDown, this);
	},

	removeHooks: function () {
		L.DomEvent.removeListener(this._container, 'mousedown', this._onMouseDown);
	},

	_onMouseDown: function (e) {
		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) {
			return false;
		}

		L.DomUtil.disableTextSelection();

		this._startLayerPoint = this._map.mouseEventToLayerPoint(e);

		this._box = L.DomUtil.create('div', 'leaflet-zoom-box', this._pane);
		L.DomUtil.setPosition(this._box, this._startLayerPoint);

		//TODO move cursor to styles
		this._container.style.cursor = 'crosshair';

		L.DomEvent.addListener(document, 'mousemove', this._onMouseMove, this);
		L.DomEvent.addListener(document, 'mouseup', this._onMouseUp, this);

		L.DomEvent.preventDefault(e);
	},

	_onMouseMove: function (e) {
		var layerPoint = this._map.mouseEventToLayerPoint(e),
			dx = layerPoint.x - this._startLayerPoint.x,
			dy = layerPoint.y - this._startLayerPoint.y;

		var newX = Math.min(layerPoint.x, this._startLayerPoint.x),
			newY = Math.min(layerPoint.y, this._startLayerPoint.y),
			newPos = new L.Point(newX, newY);

		L.DomUtil.setPosition(this._box, newPos);

		this._box.style.width = (Math.abs(dx) - 4) + 'px';
		this._box.style.height = (Math.abs(dy) - 4) + 'px';
	},

	_onMouseUp: function (e) {
		this._pane.removeChild(this._box);
		this._container.style.cursor = '';

		L.DomUtil.enableTextSelection();

		L.DomEvent.removeListener(document, 'mousemove', this._onMouseMove);
		L.DomEvent.removeListener(document, 'mouseup', this._onMouseUp);

		var layerPoint = this._map.mouseEventToLayerPoint(e);

		var bounds = new L.LatLngBounds(
				this._map.layerPointToLatLng(this._startLayerPoint),
				this._map.layerPointToLatLng(layerPoint));

		this._map.fitBounds(bounds);
	}
});


/*
 * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
 */

L.Handler.MarkerDrag = L.Handler.extend({
	initialize: function (marker) {
		this._marker = marker;
	},

	addHooks: function () {
		var icon = this._marker._icon;
		if (!this._draggable) {
			this._draggable = new L.Draggable(icon, icon);

			this._draggable
				.on('dragstart', this._onDragStart, this)
				.on('drag', this._onDrag, this)
				.on('dragend', this._onDragEnd, this);
		}
		this._draggable.enable();
	},

	removeHooks: function () {
		this._draggable.disable();
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function (e) {
		this._marker
			.closePopup()
			.fire('movestart')
			.fire('dragstart');
	},

	_onDrag: function (e) {
		// update shadow position
		var iconPos = L.DomUtil.getPosition(this._marker._icon);
		if (this._marker._shadow) {
			L.DomUtil.setPosition(this._marker._shadow, iconPos);
		}

		this._marker._latlng = this._marker._map.layerPointToLatLng(iconPos);

		this._marker
			.fire('move')
			.fire('drag');
	},

	_onDragEnd: function () {
		this._marker
			.fire('moveend')
			.fire('dragend');
	}
});



L.Control = {};

L.Control.Position = {
	TOP_LEFT: 'topLeft',
	TOP_RIGHT: 'topRight',
	BOTTOM_LEFT: 'bottomLeft',
	BOTTOM_RIGHT: 'bottomRight'
};


L.Map.include({
	addControl: function (control) {
		control.onAdd(this);

		var pos = control.getPosition(),
			corner = this._controlCorners[pos],
			container = control.getContainer();

		L.DomUtil.addClass(container, 'leaflet-control');

		if (pos.indexOf('bottom') !== -1) {
			corner.insertBefore(container, corner.firstChild);
		} else {
			corner.appendChild(container);
		}
		return this;
	},

	removeControl: function (control) {
		var pos = control.getPosition(),
			corner = this._controlCorners[pos],
			container = control.getContainer();

		corner.removeChild(container);

		if (control.onRemove) {
			control.onRemove(this);
		}
		return this;
	},

	_initControlPos: function () {
		var corners = this._controlCorners = {},
			classPart = 'leaflet-',
			top = classPart + 'top',
			bottom = classPart + 'bottom',
			left = classPart + 'left',
			right = classPart + 'right',
			controlContainer = L.DomUtil.create('div', classPart + 'control-container', this._container);

		if (L.Browser.touch) {
			controlContainer.className += ' ' + classPart + 'big-buttons';
		}

		corners.topLeft = L.DomUtil.create('div', top + ' ' + left, controlContainer);
		corners.topRight = L.DomUtil.create('div', top + ' ' + right, controlContainer);
		corners.bottomLeft = L.DomUtil.create('div', bottom + ' ' + left, controlContainer);
		corners.bottomRight = L.DomUtil.create('div', bottom + ' ' + right, controlContainer);
	}
});



L.Control.Zoom = L.Class.extend({
	onAdd: function (map) {
		this._map = map;
		this._container = L.DomUtil.create('div', 'leaflet-control-zoom');

		this._zoomInButton = this._createButton(
				'Zoom in', 'leaflet-control-zoom-in', this._map.zoomIn, this._map);
		this._zoomOutButton = this._createButton(
				'Zoom out', 'leaflet-control-zoom-out', this._map.zoomOut, this._map);

		this._container.appendChild(this._zoomInButton);
		this._container.appendChild(this._zoomOutButton);
	},

	getContainer: function () {
		return this._container;
	},

	getPosition: function () {
		return L.Control.Position.TOP_LEFT;
	},

	_createButton: function (title, className, fn, context) {
		var link = document.createElement('a');
		link.href = '#';
		link.title = title;
		link.className = className;

		if (!L.Browser.touch) {
			L.DomEvent.disableClickPropagation(link);
		}
		L.DomEvent.addListener(link, 'click', L.DomEvent.preventDefault);
		L.DomEvent.addListener(link, 'click', fn, context);

		return link;
	}
});


L.Control.Attribution = L.Class.extend({
	initialize: function (prefix) {
		this._prefix = prefix || 'Powered by <a href="http://leaflet.cloudmade.com">Leaflet</a>';
		this._attributions = {};
	},

	onAdd: function (map) {
		this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
		L.DomEvent.disableClickPropagation(this._container);
		this._map = map;
		this._update();
	},

	getPosition: function () {
		return L.Control.Position.BOTTOM_RIGHT;
	},

	getContainer: function () {
		return this._container;
	},

	setPrefix: function (prefix) {
		this._prefix = prefix;
		this._update();
	},

	addAttribution: function (text) {
		if (!text) {
			return;
		}
		if (!this._attributions[text]) {
			this._attributions[text] = 0;
		}
		this._attributions[text]++;
		this._update();
	},

	removeAttribution: function (text) {
		if (!text) {
			return;
		}
		this._attributions[text]--;
		this._update();
	},

	_update: function () {
		if (!this._map) {
			return;
		}

		var attribs = [];

		for (var i in this._attributions) {
			if (this._attributions.hasOwnProperty(i)) {
				attribs.push(i);
			}
		}

		var prefixAndAttribs = [];
		if (this._prefix) {
			prefixAndAttribs.push(this._prefix);
		}
		if (attribs.length) {
			prefixAndAttribs.push(attribs.join(', '));
		}

		this._container.innerHTML = prefixAndAttribs.join(' &mdash; ');
	}
});



L.Control.Layers = L.Class.extend({
	options: {
		collapsed: true
	},

	initialize: function (baseLayers, overlays, options) {
		L.Util.setOptions(this, options);

		this._layers = {};

		for (var i in baseLayers) {
			if (baseLayers.hasOwnProperty(i)) {
				this._addLayer(baseLayers[i], i);
			}
		}

		for (i in overlays) {
			if (overlays.hasOwnProperty(i)) {
				this._addLayer(overlays[i], i, true);
			}
		}
	},

	onAdd: function (map) {
		this._map = map;

		this._initLayout();
		this._update();
	},

	getContainer: function () {
		return this._container;
	},

	getPosition: function () {
		return L.Control.Position.TOP_RIGHT;
	},

	addBaseLayer: function (layer, name) {
		this._addLayer(layer, name);
		this._update();
		return this;
	},

	addOverlay: function (layer, name) {
		this._addLayer(layer, name, true);
		this._update();
		return this;
	},

	removeLayer: function (layer) {
		var id = L.Util.stamp(layer);
		delete this._layers[id];
		this._update();
		return this;
	},

	_initLayout: function () {
		this._container = L.DomUtil.create('div', 'leaflet-control-layers');
		if (!L.Browser.touch) {
			L.DomEvent.disableClickPropagation(this._container);
		}

		this._form = L.DomUtil.create('form', 'leaflet-control-layers-list');

		if (this.options.collapsed) {
			L.DomEvent.addListener(this._container, 'mouseover', this._expand, this);
			L.DomEvent.addListener(this._container, 'mouseout', this._collapse, this);

			var link = this._layersLink = L.DomUtil.create('a', 'leaflet-control-layers-toggle');
			link.href = '#';
			link.title = 'Layers';

			if (L.Browser.touch) {
				L.DomEvent.addListener(link, 'click', this._expand, this);
				//L.DomEvent.disableClickPropagation(link);
			} else {
				L.DomEvent.addListener(link, 'focus', this._expand, this);
			}
			this._map.on('movestart', this._collapse, this);
			// TODO keyboard accessibility

			this._container.appendChild(link);
		} else {
			this._expand();
		}

		this._baseLayersList = L.DomUtil.create('div', 'leaflet-control-layers-base', this._form);
		this._separator = L.DomUtil.create('div', 'leaflet-control-layers-separator', this._form);
		this._overlaysList = L.DomUtil.create('div', 'leaflet-control-layers-overlays', this._form);

		this._container.appendChild(this._form);
	},

	_addLayer: function (layer, name, overlay) {
		var id = L.Util.stamp(layer);
		this._layers[id] = {
			layer: layer,
			name: name,
			overlay: overlay
		};
	},

	_update: function () {
		if (!this._container) {
			return;
		}

		this._baseLayersList.innerHTML = '';
		this._overlaysList.innerHTML = '';

		var baseLayersPresent = false,
			overlaysPresent = false;

		for (var i in this._layers) {
			if (this._layers.hasOwnProperty(i)) {
				var obj = this._layers[i];
				this._addItem(obj);
				overlaysPresent = overlaysPresent || obj.overlay;
				baseLayersPresent = baseLayersPresent || !obj.overlay;
			}
		}

		this._separator.style.display = (overlaysPresent && baseLayersPresent ? '' : 'none');
	},

	_addItem: function (obj, onclick) {
		var label = document.createElement('label');

		var input = document.createElement('input');
		if (!obj.overlay) {
			input.name = 'leaflet-base-layers';
		}
		input.type = obj.overlay ? 'checkbox' : 'radio';
		input.checked = this._map.hasLayer(obj.layer);
		input.layerId = L.Util.stamp(obj.layer);

		L.DomEvent.addListener(input, 'click', this._onInputClick, this);

		var name = document.createTextNode(' ' + obj.name);

		label.appendChild(input);
		label.appendChild(name);

		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
		container.appendChild(label);
	},

	_onInputClick: function () {
		var i, input, obj,
			inputs = this._form.getElementsByTagName('input'),
			inputsLen = inputs.length;

		for (i = 0; i < inputsLen; i++) {
			input = inputs[i];
			obj = this._layers[input.layerId];

			if (input.checked) {
				this._map.addLayer(obj.layer, !obj.overlay);
			} else {
				this._map.removeLayer(obj.layer);
			}
		}
	},

	_expand: function () {
		L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
	},

	_collapse: function () {
		this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '');
	}
});


L.Transition = L.Class.extend({
	includes: L.Mixin.Events,

	statics: {
		CUSTOM_PROPS_SETTERS: {
			position: L.DomUtil.setPosition
			//TODO transform custom attr
		},

		implemented: function () {
			return L.Transition.NATIVE || L.Transition.TIMER;
		}
	},

	options: {
		easing: 'ease',
		duration: 0.5
	},

	_setProperty: function (prop, value) {
		var setters = L.Transition.CUSTOM_PROPS_SETTERS;
		if (prop in setters) {
			setters[prop](this._el, value);
		} else {
			this._el.style[prop] = value;
		}
	}
});


/*
 * L.Transition native implementation that powers Leaflet animation
 * in browsers that support CSS3 Transitions
 */

L.Transition = L.Transition.extend({
	statics: (function () {
		var transition = L.DomUtil.TRANSITION,
			transitionEnd = (transition === 'webkitTransition' || transition === 'OTransition' ?
				transition + 'End' : 'transitionend');

		return {
			NATIVE: !!transition,

			TRANSITION: transition,
			PROPERTY: transition + 'Property',
			DURATION: transition + 'Duration',
			EASING: transition + 'TimingFunction',
			END: transitionEnd,

			// transition-property value to use with each particular custom property
			CUSTOM_PROPS_PROPERTIES: {
				position: L.Browser.webkit ? L.DomUtil.TRANSFORM : 'top, left'
			}
		};
	}()),

	options: {
		fakeStepInterval: 100
	},

	initialize: function (/*HTMLElement*/ el, /*Object*/ options) {
		this._el = el;
		L.Util.setOptions(this, options);

		L.DomEvent.addListener(el, L.Transition.END, this._onTransitionEnd, this);
		this._onFakeStep = L.Util.bind(this._onFakeStep, this);
	},

	run: function (/*Object*/ props) {
		var prop,
			propsList = [],
			customProp = L.Transition.CUSTOM_PROPS_PROPERTIES;

		for (prop in props) {
			if (props.hasOwnProperty(prop)) {
				prop = customProp[prop] ? customProp[prop] : prop;
				prop = this._dasherize(prop);
				propsList.push(prop);
			}
		}

		this._el.style[L.Transition.DURATION] = this.options.duration + 's';
		this._el.style[L.Transition.EASING] = this.options.easing;
		this._el.style[L.Transition.PROPERTY] = propsList.join(', ');

		for (prop in props) {
			if (props.hasOwnProperty(prop)) {
				this._setProperty(prop, props[prop]);
			}
		}

		this._inProgress = true;

		this.fire('start');

		if (L.Transition.NATIVE) {
			clearInterval(this._timer);
			this._timer = setInterval(this._onFakeStep, this.options.fakeStepInterval);
		} else {
			this._onTransitionEnd();
		}
	},

	_dasherize: (function () {
		var re = /([A-Z])/g;

		function replaceFn(w) {
			return '-' + w.toLowerCase();
		}

		return function (str) {
			return str.replace(re, replaceFn);
		};
	}()),

	_onFakeStep: function () {
		this.fire('step');
	},

	_onTransitionEnd: function () {
		if (this._inProgress) {
			this._inProgress = false;
			clearInterval(this._timer);

			this._el.style[L.Transition.PROPERTY] = 'none';

			this.fire('step');
			this.fire('end');
		}
	}
});


/*
 * L.Transition fallback implementation that powers Leaflet animation
 * in browsers that don't support CSS3 Transitions
 */

L.Transition = L.Transition.NATIVE ? L.Transition : L.Transition.extend({
	statics: {
		getTime: Date.now || function () {
			return +new Date();
		},

		TIMER: true,

		EASINGS: {
			'ease': [0.25, 0.1, 0.25, 1.0],
			'linear': [0.0, 0.0, 1.0, 1.0],
			'ease-in': [0.42, 0, 1.0, 1.0],
			'ease-out': [0, 0, 0.58, 1.0],
			'ease-in-out': [0.42, 0, 0.58, 1.0]
		},

		CUSTOM_PROPS_GETTERS: {
			position: L.DomUtil.getPosition
		},

		//used to get units from strings like "10.5px" (->px)
		UNIT_RE: /^[\d\.]+(\D*)$/
	},

	options: {
		fps: 50
	},

	initialize: function (el, options) {
		this._el = el;
		L.Util.extend(this.options, options);

		var easings = L.Transition.EASINGS[this.options.easing] || L.Transition.EASINGS.ease;

		this._p1 = new L.Point(0, 0);
		this._p2 = new L.Point(easings[0], easings[1]);
		this._p3 = new L.Point(easings[2], easings[3]);
		this._p4 = new L.Point(1, 1);

		this._step = L.Util.bind(this._step, this);
		this._interval = Math.round(1000 / this.options.fps);
	},

	run: function (props) {
		this._props = {};

		var getters = L.Transition.CUSTOM_PROPS_GETTERS,
			re = L.Transition.UNIT_RE;

		this.fire('start');

		for (var prop in props) {
			if (props.hasOwnProperty(prop)) {
				var p = {};
				if (prop in getters) {
					p.from = getters[prop](this._el);
				} else {
					var matches = this._el.style[prop].match(re);
					p.from = parseFloat(matches[0]);
					p.unit = matches[1];
				}
				p.to = props[prop];
				this._props[prop] = p;
			}
		}

		clearInterval(this._timer);
		this._timer = setInterval(this._step, this._interval);
		this._startTime = L.Transition.getTime();
	},

	_step: function () {
		var time = L.Transition.getTime(),
			elapsed = time - this._startTime,
			duration = this.options.duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._cubicBezier(elapsed / duration));
		} else {
			this._runFrame(1);
			this._complete();
		}
	},

	_runFrame: function (percentComplete) {
		var setters = L.Transition.CUSTOM_PROPS_SETTERS,
			prop, p, value;

		for (prop in this._props) {
			if (this._props.hasOwnProperty(prop)) {
				p = this._props[prop];
				if (prop in setters) {
					value = p.to.subtract(p.from).multiplyBy(percentComplete).add(p.from);
					setters[prop](this._el, value);
				} else {
					this._el.style[prop] =
							((p.to - p.from) * percentComplete + p.from) + p.unit;
				}
			}
		}
		this.fire('step');
	},

	_complete: function () {
		clearInterval(this._timer);
		this.fire('end');
	},

	_cubicBezier: function (t) {
		var a = Math.pow(1 - t, 3),
			b = 3 * Math.pow(1 - t, 2) * t,
			c = 3 * (1 - t) * Math.pow(t, 2),
			d = Math.pow(t, 3),
			p1 = this._p1.multiplyBy(a),
			p2 = this._p2.multiplyBy(b),
			p3 = this._p3.multiplyBy(c),
			p4 = this._p4.multiplyBy(d);

		return p1.add(p2).add(p3).add(p4).y;
	}
});


L.Map.include(!(L.Transition && L.Transition.implemented()) ? {} : {
	setView: function (center, zoom, forceReset) {
		zoom = this._limitZoom(zoom);
		var zoomChanged = (this._zoom !== zoom);

		if (this._loaded && !forceReset && this._layers) {
			// difference between the new and current centers in pixels
			var offset = this._getNewTopLeftPoint(center).subtract(this._getTopLeftPoint());

			center = new L.LatLng(center.lat, center.lng);

			var done = (zoomChanged ?
						!!this._zoomToIfCenterInView && this._zoomToIfCenterInView(center, zoom, offset) :
						this._panByIfClose(offset));

			// exit if animated pan or zoom started
			if (done) {
				return this;
			}
		}

		// reset the map view
		this._resetView(center, zoom);

		return this;
	},

	panBy: function (offset) {
		if (!(offset.x || offset.y)) {
			return this;
		}

		if (!this._panTransition) {
			this._panTransition = new L.Transition(this._mapPane, {duration: 0.3});

			this._panTransition.on('step', this._onPanTransitionStep, this);
			this._panTransition.on('end', this._onPanTransitionEnd, this);
		}
		this.fire('movestart');

		this._panTransition.run({
			position: L.DomUtil.getPosition(this._mapPane).subtract(offset)
		});

		return this;
	},

	_onPanTransitionStep: function () {
		this.fire('move');
	},

	_onPanTransitionEnd: function () {
		this.fire('moveend');
	},

	_panByIfClose: function (offset) {
		if (this._offsetIsWithinView(offset)) {
			this.panBy(offset);
			return true;
		}
		return false;
	},

	_offsetIsWithinView: function (offset, multiplyFactor) {
		var m = multiplyFactor || 1,
			size = this.getSize();
		return (Math.abs(offset.x) <= size.x * m) &&
				(Math.abs(offset.y) <= size.y * m);
	}
});


L.Map.include(!L.DomUtil.TRANSITION ? {} : {
	_zoomToIfCenterInView: function (center, zoom, centerOffset) {

		if (this._animatingZoom) {
			return true;
		}
		if (!this.options.zoomAnimation) {
			return false;
		}

		var zoomDelta = zoom - this._zoom,
			scale = Math.pow(2, zoomDelta),
			offset = centerOffset.divideBy(1 - 1 / scale);

		//if offset does not exceed half of the view
		if (!this._offsetIsWithinView(offset, 1)) {
			return false;
		}

		this._mapPane.className += ' leaflet-zoom-anim';

        this
			.fire('movestart')
			.fire('zoomstart');

		var centerPoint = this.containerPointToLayerPoint(this.getSize().divideBy(2)),
			origin = centerPoint.add(offset);

		this._prepareTileBg();

		this._runAnimation(center, zoom, scale, origin);

		return true;
	},


	_runAnimation: function (center, zoom, scale, origin) {
		this._animatingZoom = true;

		this._animateToCenter = center;
		this._animateToZoom = zoom;

		var transform = L.DomUtil.TRANSFORM;

		clearTimeout(this._clearTileBgTimer);

		//dumb FireFox hack, I have no idea why this magic zero translate fixes the scale transition problem
		if (L.Browser.gecko || window.opera) {
			this._tileBg.style[transform] += ' translate(0,0)';
		}

		var scaleStr;

		// Android doesn't like translate/scale chains, transformOrigin + scale works better but
		// it breaks touch zoom which Anroid doesn't support anyway, so that's a really ugly hack
		// TODO work around this prettier
		if (L.Browser.android) {
			this._tileBg.style[transform + 'Origin'] = origin.x + 'px ' + origin.y + 'px';
			scaleStr = 'scale(' + scale + ')';
		} else {
			scaleStr = L.DomUtil.getScaleString(scale, origin);
		}

		L.Util.falseFn(this._tileBg.offsetWidth); //hack to make sure transform is updated before running animation

		var options = {};
		options[transform] = this._tileBg.style[transform] + ' ' + scaleStr;
		this._tileBg.transition.run(options);
	},

	_prepareTileBg: function () {
		if (!this._tileBg) {
			this._tileBg = this._createPane('leaflet-tile-pane', this._mapPane);
			this._tileBg.style.zIndex = 1;
		}

		var tilePane = this._tilePane,
			tileBg = this._tileBg;

		// prepare the background pane to become the main tile pane
		//tileBg.innerHTML = '';
		tileBg.style[L.DomUtil.TRANSFORM] = '';
		tileBg.style.visibility = 'hidden';

		// tells tile layers to reinitialize their containers
		tileBg.empty = true;
		tilePane.empty = false;

		this._tilePane = this._panes.tilePane = tileBg;
		this._tileBg = tilePane;

		if (!this._tileBg.transition) {
			this._tileBg.transition = new L.Transition(this._tileBg, {duration: 0.3, easing: 'cubic-bezier(0.25,0.1,0.25,0.75)'});
			this._tileBg.transition.on('end', this._onZoomTransitionEnd, this);
		}

		this._stopLoadingBgTiles();
	},

	// stops loading all tiles in the background layer
	_stopLoadingBgTiles: function () {
		var tiles = [].slice.call(this._tileBg.getElementsByTagName('img'));

		for (var i = 0, len = tiles.length; i < len; i++) {
			if (!tiles[i].complete) {
				tiles[i].onload = L.Util.falseFn;
				tiles[i].onerror = L.Util.falseFn;
				tiles[i].src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

				tiles[i].parentNode.removeChild(tiles[i]);
				tiles[i] = null;
			}
		}
	},

	_onZoomTransitionEnd: function () {
		this._restoreTileFront();

		L.Util.falseFn(this._tileBg.offsetWidth);
		this._resetView(this._animateToCenter, this._animateToZoom, true, true);

		this._mapPane.className = this._mapPane.className.replace(' leaflet-zoom-anim', ''); //TODO toggleClass util
		this._animatingZoom = false;
	},

	_restoreTileFront: function () {
		this._tilePane.innerHTML = '';
		this._tilePane.style.visibility = '';
		this._tilePane.style.zIndex = 2;
		this._tileBg.style.zIndex = 1;
	},

	_clearTileBg: function () {
		if (!this._animatingZoom && !this.touchZoom._zooming) {
			this._tileBg.innerHTML = '';
		}
	}
});


/*
 * Provides L.Map with convenient shortcuts for W3C geolocation.
 */

L.Map.include({
	locate: function (/*Object*/ options) {

		this._locationOptions = options = L.Util.extend({
			watch: false,
			setView: false,
			maxZoom: Infinity,
			timeout: 10000,
			maximumAge: 0,
			enableHighAccuracy: false
		}, options);

		if (!navigator.geolocation) {
			return this.fire('locationerror', {
				code: 0,
				message: "Geolocation not supported."
			});
		}

		var onResponse = L.Util.bind(this._handleGeolocationResponse, this),
			onError = L.Util.bind(this._handleGeolocationError, this);

		if (options.watch) {
			this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
		} else {
			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
		}
		return this;
	},

	stopLocate: function () {
		if (navigator.geolocation) {
			navigator.geolocation.clearWatch(this._locationWatchId);
		}
	},

	locateAndSetView: function (maxZoom, options) {
		options = L.Util.extend({
			maxZoom: maxZoom || Infinity,
			setView: true
		}, options);
		return this.locate(options);
	},

	_handleGeolocationError: function (error) {
		var c = error.code,
			message = (c === 1 ? "permission denied" :
				(c === 2 ? "position unavailable" : "timeout"));

		if (this._locationOptions.setView && !this._loaded) {
			this.fitWorld();
		}

		this.fire('locationerror', {
			code: c,
			message: "Geolocation error: " + message + "."
		});
	},

	_handleGeolocationResponse: function (pos) {
		var latAccuracy = 180 * pos.coords.accuracy / 4e7,
			lngAccuracy = latAccuracy * 2,
			lat = pos.coords.latitude,
			lng = pos.coords.longitude,
			latlng = new L.LatLng(lat, lng);

		var sw = new L.LatLng(lat - latAccuracy, lng - lngAccuracy),
			ne = new L.LatLng(lat + latAccuracy, lng + lngAccuracy),
			bounds = new L.LatLngBounds(sw, ne);

		if (this._locationOptions.setView) {
			var zoom = Math.min(this.getBoundsZoom(bounds), this._locationOptions.maxZoom);
			this.setView(latlng, zoom);
		}

		this.fire('locationfound', {
			latlng: latlng,
			bounds: bounds,
			accuracy: pos.coords.accuracy
		});
	}
});




/*********************************************** 
     Begin VMM.DataMap.js 
***********************************************/ 

/* Data Map
================================================== */

/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */
// @codekit-prepend "Lib/Leaflet.js";

if(typeof VMM != 'undefined' && typeof VMM.DataMap == 'undefined') {
	
	VMM.DataMap = function(parent, parent_config) {
		
		var events			= {},
			config			= {},
			locations		= [],
			data,
			map,
			map_layer,
			map_image		=  new L.LayerGroup(),
			map_group		=  new L.LayerGroup(),
			popup_array		= [],
			silent_popup	= false,
			unique_id		= "datamap-" + VMM.Util.unique_ID(5),
			map_pos = {
				normal:	"",
				current:	"",
				previous:	""
			},
			current_poly	= {},
			$layout			= parent,
			$datamap,
			$datamap_mask,
			$datamap_container;
			
		// CONFIG
		if(typeof parent_config != 'undefined' && typeof parent_config == 'object') {
		    var x;
			for (x in parent_config) {
				if (Object.prototype.hasOwnProperty.call(parent_config, x)) {
					config[x] = parent_config[x];
				}
			}
			
		} else {
			config = {
				events: {
					data_ready:			"DATAREADY",
					map_ready:			"MAPREADY",
					list_update:		"UPDATELIST",
					map_update:			"UPDATEMAP",
					map_popup_open:		"MAPPOPUPOPEN",
					map_popup_close:	"MAPPOPUPCLOSE",
					map_poly_over:		"MAPPOLYOVER",
					map_poly_out:		"MAPPOLYOUT",
					messege:			"MESSEGE",
					headline:			"HEADLINE",
					resize:				"resize"
				},
				map: {
					view:				[41.830033,-87.7200523],
					zoom: {
						normal:			11,
						max:			14,
						min:			10
					},
					style_id:			"48820",
					style:				"toner-background",
					width:				700,
					height:				750
				},
				colors: {
					map: {
						fill:			"#C43C35",
						stroke:			"#FFFFFF",
						rollover:		"#217077",
						active:			"#0B484E"
					},
					communities: {
						fill:			"#C43C35",
						stroke:			"#FFFFFF",
						rollover:		"#217077",
						active:			"#0B484E"
					},
					race: {
						white:		"E900B6",
						black:		"04A4E0",
						asian:		"9BFB15",
						hispanic:	"FAAF08",
						other:		"999999"
					}
				}
				
			}
		}
		
		/* PUBLIC FUNCTIONS
		================================================== */
		this.init = function(d) {
			data = d;
			build();
		};
		
		this.updateLayers = function() {
			//buildMapLayers(d);
			//updatePopups();
			updatePolys();
		}
		
		this.openPopup = function(d, silent) {
			if (silent) {
				silent_popup = true;
			}
			for(var i = 0; i < popup_array.length; i++) {
				if (popup_array[i].name == d) {
					goToPoly(popup_array[i]);
				}
			}
		}
		
		this.rollOverHighlight = function(d, silent) {
			for(var i = 0; i < popup_array.length; i++) {
				if (popup_array[i].name == d) {
					polyOver(popup_array[i]);
				}
			}
			
		}
		
		this.rollOutHighlight = function(d, silent) {
			for(var i = 0; i < popup_array.length; i++) {
				if (popup_array[i].name == d) {
					polyOut(popup_array[i]);
				}
			}
			
		}
		
		this.createCommunity = function(array) {
			//createPoly(poly_array, fill_opacity, popup, fill, stroke_color, stroke_opacity, n) 
		}
		
		/* PRIVATE FUNCTIONS
		================================================== */
		
		/* EVENTS
		================================================== */
		function onPopupOpen(e) {
			map_layer.setOpacity(.3);
			
			trace("onPopupOpen");
			if (silent_popup) {
				trace("SILENT")
				silent_popup = false;
			} else {
				VMM.fireEvent($layout, config.events.map_popup_open, e.popup.name);
			}
		}
		
		function onPopupClose(e) {
			trace("onPopupClose");
			map_layer.setOpacity(.99);
			trace(e.popup.name);
			
			for(var i = 0; i < popup_array.length; i++) {
				if (popup_array[i].name == e.popup.name) {
					trace("FOUND IT");
					popup_array[i].polygon.setStyle({fillColor:config.colors.communities.fill});
				}
			}
			
			//resetPolyColors();
			//current_poly.polygon.setStyle({fillColor:config.colors.communities.fill});
			
			if (Math.round(map_pos.normal.lat * 10) == Math.round(map.getCenter().lat * 10) && Math.round(map_pos.normal.lng * 10) == Math.round(map.getCenter().lng * 10) ){
				trace("MAP CENTERED");
				//map.panBy(new L.Point(1,1));
			} else {
				trace("MAP NOT CENTERED");
				if (map.getZoom() == 10 || map.getZoom() == 11) {
					map.panTo(map_pos.normal);
				} else {
					//map.panBy(new L.Point(1,1));
				}
			}
			VMM.fireEvent($layout, config.events.map_popup_close, e.popup.name);
		}
		
		function onLayerAdd(e) {
			trace("onLayerAdd");
			map_pos.previous = map_pos.current;
			map_pos.current = map.getCenter();
		}
		
		function onPolyClick(poly) {
			trace("onPolyClick");
			goToPoly(poly);
		}
		
		function onPolyOver(poly) {
			if (!poly.active) {
				polyOver(poly);
			}
			VMM.fireEvent($layout, config.events.map_poly_over, poly.name);
		}
		
		function onPolyOut(poly) {
			if (!poly.active) {
				polyOut(poly);
			}
			VMM.fireEvent($layout, config.events.map_poly_out, poly.name);
		}
		
		/*
		map.on('popupremoved', function(e) {
			trace(e.target);
			current_popup = e.target._popup.community;
			trace("CURRENT POPUP " + current_popup);
		    trace("CLOSE EVENT");
		
			if (update) {
			
			} else {
				popup_open = false;
			}
		
			if (Math.round(default_latlng.lat * 10) == Math.round(map.getCenter().lat * 10) && Math.round(default_latlng.lng * 10) == Math.round(map.getCenter().lng * 10) ){
				trace("already centered");
				map.panBy(new L.Point(1,1));
			} else {
				trace("move it")
				trace(default_latlng.lat + " " + map.getCenter().lat)
				//map.panTo(current_latlng);
				trace("ZOOM " + map.getZoom());
				if (map.getZoom() == 10 || map.getZoom() == 11) {
					map.panTo(default_latlng);
				} else {
					map.panBy(new L.Point(1,1));
				}
			
			}
		

		});
		*/
		
		/* POLY
		================================================== */
		function polyOver(poly) {
			if (!poly.active) {
				poly.polygon.setStyle({fillColor:config.colors.communities.rollover});
			}
		}
		
		function polyOut(poly) {
			if (!poly.active) {
				poly.polygon.setStyle({fillColor:config.colors.communities.fill});
			}
		}
		
		function goToPoly(poly) {
			trace("goToPoly");
			current_poly = poly;
			resetPolyColors();
			poly.active = true;
			poly.polygon.setStyle({fillColor:config.colors.communities.active});
			map.openPopup(poly.popup);
			
		}
		
		function resetPolyColors() {
			for(var i = 0; i < popup_array.length; i++) {
				if (popup_array[i].active) {
					trace("SET STYLE")
					popup_array[i].polygon.setStyle({fillColor:config.colors.communities.fill});
				}
				popup_array[i].active = false;
			}
		}
		
		function updatePolys() {
			var i	= 0;
			
			for(i = 0; i < data.communities.length; i++) {
				
				// POLY OPACITY
				var opacity_num = 1 - (i/data.communities.length);
				if (opacity_num < .1) {
					opacity_num = .1;
				}
				data.communities[i].community.poly.polygon.setStyle({fillOpacity:opacity_num});
				
				// POPUP
				data.communities[i].community.poly.popup.setContent(data.communities[i].community.popup);
			}
		}
		/* UPDATE
		================================================== */
		function updatePopups() {
			var i	= 0;
			
			for(i = 0; i < data.communities.length; i++) {
				data.communities[i].community.poly.popup.setContent(data.communities[i].community.popup);
			}
			
		}
		
		/* BUILD
		================================================== */
		function buildMap() {
			var SUBDOMAINS = " a. b. c. d.".split(" "),
				MAKE_PROVIDER = function(layer, type, minZoom, maxZoom) {
					return {
						"url":			["http://{S}tile.stamen.com/", layer, "/{Z}/{X}/{Y}.", type].join(""),
						"type":			type,
						"subdomains":	SUBDOMAINS.slice(),
						"minZoom":		minZoom,
						"maxZoom":		maxZoom
					};
				},
				PROVIDERS =  {
					"toner":		MAKE_PROVIDER("toner", "png", 0, 20),
					"terrain":		MAKE_PROVIDER("terrain", "jpg", 4, 18),
					"watercolor":	MAKE_PROVIDER("watercolor", "jpg", 3, 16)
			    },
				ATTRIBUTION = [
					'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ',
					'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ',
					'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, ',
					'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
				].join("");
				
			function getProvider(name) {
				if (name in PROVIDERS) {
					return PROVIDERS[name];
				} else {
					throw 'No such provider (' + name + ')';
				}
			}
			
			function setupFlavors(base, flavors, type) {
			    var provider = getProvider(base);
			    for (var i = 0; i < flavors.length; i++) {
			        var flavor = [base, flavors[i]].join("-");
			        PROVIDERS[flavor] = MAKE_PROVIDER(flavor, type || provider.type, provider.minZoom, provider.maxZoom);
			    }
			}
			
			setupFlavors("toner", ["hybrid", "labels", "lines", "background", "lite"]);
			setupFlavors("toner", ["2010"]);
			setupFlavors("toner", ["2011", "2011-lines", "2011-labels", "2011-lite"]);
			setupFlavors("terrain", ["background"]);
			setupFlavors("terrain", ["labels", "lines"], "png");
			
			if (typeof L === "object") {
				L.StamenTileLayer = L.TileLayer.extend({
					initialize: function(name) {
						var provider = getProvider(name),
							url = provider.url.replace(/({[A-Z]})/g, function(s) {
								return s.toLowerCase();
							});
						L.TileLayer.prototype.initialize.call(this, url, {
							minZoom:		provider.minZoom,
							maxZoom:		provider.maxZoom,
							subdomains:		SUBDOMAINS,
							scheme:			"xyz",
							attribution:	ATTRIBUTION
						});
					}
				});
			}
			
			map = new L.Map(unique_id, {
				maxZoom:			config.map.zoom.max, 
				minZoom:			config.map.zoom.min,
				zoom:				config.map.zoom.normal,
				center:				new L.LatLng(41.830033,-87.7200523),
				scrollWheelZoom:	false,
				closePopupOnClick:	false
			});
			
			map_layer = new L.StamenTileLayer(config.map.style);
			
			// ADD LAYERS TO MAP
			map.addLayer(map_layer);
			map.addLayer(map_image);
			map.addLayer(map_group);
			
			// MAP OPACITY
			//map_layer.setOpacity(1);
			
			// MAP POSITION
			map_pos.normal		= map.getCenter();
			map_pos.current		= map_pos.normal;
			map_pos.previous	= map_pos.current;
			
			// MAP EVENTS
			map.on('popupopen', onPopupOpen);
			map.on('layeradd', onLayerAdd);
			map.on('popupclose', onPopupClose);
			
			VMM.fireEvent($layout, config.events.map_ready);
			//map.setZoom(config.map.zoom.normal);
		}
		
		function buildMapLayers() {
			for(var i = 0; i < data.communities.length; i++) {
				var community = data.communities[i].community;
				
				community.poly = createPoly({
					poly_array:		community.poly_array,
					stroke_color:	config.colors.communities.stroke,
					stroke_weight:	2,
					stroke_opacity:	1,
					fill:			config.colors.communities.fill,
					fill_opacity:	.75,
					popup:			community.popup,
					number:			i,
					name:			community.name
				});
				
			}
		}
		
		
		function createPoly(pconfig) {
			var poly = {
					polygon:		{},
					number:			pconfig.number,
					name:			pconfig.name,
					popup:			{},
					active:			false
				},
				polygon = new L.Polygon(pconfig.poly_array, {
					color:			pconfig.stroke_color,
					weight:			pconfig.stroke_weight,
					opacity:		pconfig.stroke_opacity,
					fillColor:		pconfig.fill,
					fillOpacity:	pconfig.fill_opacity
				}),
				popup = new L.Popup({maxWidth:350});
			
			poly.polygon	= polygon;
			poly.popup		= popup;
			/* POPUP
			================================================== */
			if (pconfig.popup.length > 0) {
				//poly.polygon.bindPopup(pconfig.popup);
				poly.popup.setContent(pconfig.popup);
				poly.polygon.on("click", function() {
					onPolyClick(poly);
				});
				poly.polygon.on("mouseover", function() {
					onPolyOver(poly);
				});
				poly.polygon.on("mouseout", function() {
					onPolyOut(poly);
				});
				
			}
			poly.popup.name = pconfig.name;
			
			map_group.addLayer(poly.polygon);
			
			poly.popup.setLatLng(poly.polygon.getBounds().getCenter());
			
			popup_array.push(poly);
			
			return poly;
		}
		
		var build = function() {
			
			VMM.attachElement($layout, "");
			$datamap			= $layout
			//$datamap			= VMM.appendAndGetElement($layout, "<div>", "datamap");
			$datamap_mask		= VMM.appendAndGetElement($layout, "<div>", "datamap-container-mask");
			$datamap_container	= VMM.appendAndGetElement($datamap_mask, "<div>", "datamap-container");
			
			VMM.Lib.attr($datamap_container, "id", unique_id);
			VMM.Lib.width($datamap, config.map.width - 2);
			VMM.Lib.height($datamap, config.map.height - 2);
			
			buildMap();
			buildMapLayers();
		
		}
		
	};
	
}


/*********************************************** 
     Begin VMM.DataList.js 
***********************************************/ 

/* Data Map
================================================== */

/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */

if(typeof VMM != 'undefined' && typeof VMM.DataList == 'undefined') {
	
	VMM.DataList = function(parent, parent_config) {
		
		var events		= {},
			config		= {},
			listitems	= [],
			sorted_list	= [],
			meta		= {
				title:	"",
				note:	""
			},
			data,
			constraint	= false,
			unique_id	= "datalist-" + VMM.Util.unique_ID(5),
			$layout		= parent,
			$datalist,
			$list,
			$datalist_mask,
			$list_container;
			
		// CONFIG
		if(typeof parent_config != 'undefined' && typeof parent_config == 'object') {
			config = VMM.Util.mergeConfig(config, parent_config);
		} else {
			config = {
				events: {
					data_ready:			"DATAREADY",
					map_ready:			"MAPREADY",
					list_update:		"UPDATELIST",
					list_over:			"UPDATEOVER",
					list_out:			"UPDATEOUT",
					map_update:			"UPDATEMAP",
					messege:			"MESSEGE",
					headline:			"HEADLINE",
					resize:				"resize"
				},
				colors: {
					map: {
						fill:			"#C43C35",
						stroke:			"#999999"
					},
					communities: {
						fill:			"#FF0000",
						stroke:			"#000000",
					},
					race: {
						white:		"E900B6",
						black:		"04A4E0",
						asian:		"9BFB15",
						hispanic:	"FAAF08",
						other:		"999999"
					}
				}
				
			}
		}
		
		/* PUBLIC FUNCTIONS
		================================================== */
		this.init = function(d, c, m) {
			if ( c != null && c != "") {
				if (c > 0) {
					constraint = c;
				}
			}
			if ( m != null && m != "") {
				meta = m;
			}
			
			data = d;
			build();
		}
		
		this.updateList = function() {
			buildList();
		}
		
		this.setActive = function(d) {
			setActiveItem(d);
		}
		
		this.setMouseOver = function(elem) {
			for(var i = 0; i < listitems.length; i++) {
				if (listitems[i].community.name == elem) {
					VMM.Lib.addClass(listitems[i].element, "mouse-hover");
				}
			}
			
		}
		
		this.setMouseOut = function(elem) {
			for(var i = 0; i < listitems.length; i++) {
				if (listitems[i].community.name == elem) {
					VMM.Lib.removeClass(listitems[i].element, "mouse-hover");
				}
			}
		}
		
		/* PRIVATE FUNCTIONS
		================================================== */
		function buildList() {
			var in_range	= true,
				meta_text	= "";
			
			listitems		= [];
			
			if (meta.title != "") {
				meta_text	+= "<h3>" + meta.title + "</h3>";
			}
			if (meta.note != "") {
				meta_text	+= "<div class='datalist-note'>" + meta.note + "</div>";
			}
			
			VMM.attachElement($layout, "");
			$list_container	= VMM.appendAndGetElement($layout, "<div>", "datalist");
			VMM.appendElement($list_container, meta_text);
			$list			= VMM.appendAndGetElement($list_container, "<ul>", "");
			
			for(var i = 0; i < data.communities.length; i++) {
				if (constraint) {
					if (i >= constraint) {
						in_range = false;
					} 
				}
				
				if (in_range) {
					var item = {
							element:	VMM.appendAndGetElement($list, "<li>", "datalist-item"),
							community:	data.communities[i].community,
							uniqueid:	VMM.Util.unique_ID(5)
						},
						element		= "",
						item_class	= "";
						
					if ((i+1) <= 10) {
						item_class += " top-rank";
					}
					//item_class	= "label";
					//element		+= "<span class='" + item_class + "'>" + (i+1) + "<span class='ordinal'>" + VMM.Util.ordinal((i+1)) + "</span></span>";

					
					
					element		+= "<div class='datalist-item-container'>";
					
					// TITLE
					element		+= "<div class='datalist-item-title" + item_class + "'>";
					element		+= "<span class='label'>" + (i+1) + "<span class='ordinal'>" + VMM.Util.ordinal((i+1)) + "</span></span>";
					element		+= VMM.Util.toTitleCase(item.community.name);
					element		+= "</div>";
					
					//GRAPH
					//element		+= "<div class='datalist-item-graph' style='width:50px'>";
					element		+= "<div class='datalist-item-graph'>";
					element		+= "<div class='bar-graph' style='height:24px'>";
					element		+= "<span class='race-white' style='width:"		+ Math.round(parseInt(item.community.fusion.percent_white,		10)) + "%'></span>";
					element		+= "<span class='race-black' style='width:"		+ Math.round(parseInt(item.community.fusion.percent_black,		10)) + "%'></span>";
					element		+= "<span class='race-hispanic' style='width:"	+ Math.round(parseInt(item.community.fusion.percent_latino,		10)) + "%'></span>";
					element		+= "<span class='race-asian' style='width:"		+ Math.round(parseInt(item.community.fusion.percent_asian,		10)) + "%'></span>";
					element		+= "<span class='race-other' style='width:"		+ Math.round(parseInt(item.community.fusion.percent_other,		10)) + "%'></span>";
					element		+= "</div>";
					element		+= "</div>";
					
					
					element		+= "</div>";
					element		+= "</div>";
				
					VMM.attachElement(item.element, element);
					VMM.Lib.attr(item.element, "id", item.uniqueid);
					
					listitems.push(item);
					
					VMM.bindEvent(item.element, onItemClick, "click", {number: i, name: item.community.name, uniqueid: item.uniqueid});
					VMM.bindEvent(item.element, onItemMouseOver, "mouseenter", {number: i, name: item.community.name, uniqueid: item.uniqueid});
					VMM.bindEvent(item.element, onItemMouseOut, "mouseleave", {number: i, name: item.community.name, uniqueid: item.uniqueid});
				}
			}
			
			
			//VMM.fireEvent($layout, config.events.map_ready);
		}
		
		
		/* ITEM EVENTS
		================================================== */
		function onItemClick(e) {
			VMM.fireEvent($layout, config.events.list_update, e.data);
		}
		
		function onItemMouseOver(e) {
			VMM.fireEvent($layout, config.events.list_over, e.data);
		}
		
		function onItemMouseOut(e) {
			VMM.fireEvent($layout, config.events.list_out, e.data);
		}
		
		function setActiveItem(d) {
			
			for(var i = 0; i < listitems.length; i++) {
				if (d != null) {
					if (listitems[i].community.name == d) {
						VMM.Lib.addClass(listitems[i].element, "active");
					} else {
						VMM.Lib.removeClass(listitems[i].element, "active");
					}
				} else {
					VMM.Lib.removeClass(listitems[i].element, "active");
				}
			}
		}
		/* BUILD
		================================================== */
		function build() {
			
			VMM.attachElement($layout, "");
			$datalist			= $layout;
			//$datamap			= VMM.appendAndGetElement($layout, "<div>", "datamap");
			//$datamap_mask		= VMM.appendAndGetElement($layout, "<div>", "datamap-container-mask");
			//$datamap_container	= VMM.appendAndGetElement($datamap_mask, "<div>", "datamap-container");
			
			//VMM.Lib.attr($datamap_container, "id", unique_id);
			//VMM.Lib.width($datamap_container, config.map.width);
			//VMM.Lib.height($datamap_container, config.map.height);
			
			buildList();
		
		}
		
	};
	
}


/*********************************************** 
     Begin VMM.DataNav.js 
***********************************************/ 

/* Disparity Map Nav
================================================== */

/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */

if(typeof VMM != 'undefined' && typeof VMM.DataNav == 'undefined') {
	
	VMM.DataNav = function(parent, parent_config) {
		trace("DataNav");
		var events		= {},
			config		= {},
			data		= [],
			navitems	= [],
			meta = {
				title:	"",
				note:	""
			},
			constraint	= false,
			unique_id	= "datanav-" + VMM.Util.unique_ID(5),
			$layout		= parent,
			$nav_container,
			$nav_list;
			
		// CONFIG
		if(typeof parent_config != 'undefined' && typeof parent_config == 'object') {
			config = VMM.Util.mergeConfig(config, parent_config);
		} else {
			config = {
				events: {
					data_ready:			"DATAREADY",
					map_ready:			"MAPREADY",
					list_update:		"UPDATELIST",
					nav_update:			"UPDATENAV",
					map_update:			"UPDATEMAP",
					map_popup_open:		"MAPPOPUPOPEN",
					messege:			"MESSEGE",
					headline:			"HEADLINE",
					resize:				"resize"
				},
				colors: {
					map: {
						fill:			"#C43C35",
						stroke:			"#999999"
					},
					communities: {
						fill:			"#FF0000",
						stroke:			"#000000",
					},
					race: {
						white:		"E900B6",
						black:		"04A4E0",
						asian:		"9BFB15",
						hispanic:	"FAAF08",
						other:		"999999"
					}
				},
				columns: [
					{
						title:			"People in Poverty",
						column_name:	"people_in_poverty",
						active:			false,
						uniqueid:		"people_in_poverty"
					},
					{
						title:			"Vacant Housing",
						column_name:	"vacant_housing",
						active:			false,
						uniqueid:		"vacant_housing"
					}
				]
				
			}
		}
		
		/* PUBLIC FUNCTIONS
		================================================== */
		this.init = function(m) {
			if ( m != null && m != "") {
				meta = m;
			}
			build();
		}
		this.updateNav = function(d) {
			buildNav(d);
		}
		this.setActive = function(d) {
			updateActiveItems();
		}
		/* PRIVATE FUNCTIONS
		================================================== */
		
		var buildNav = function(d) {
			var meta_title	= "",
				meta_note	= "";
			
			if (meta.title != "") {
				meta_title	+= "<h3>" + meta.title + "</h3>";
			}
			if (meta.note != "") {
				meta_note	+= "<div class='datanav-note'>" + meta.note + "</div>";
			}
			VMM.attachElement($layout, "");
			$nav_container		= VMM.appendAndGetElement($layout, "<div>", "datanav-container");
			VMM.appendElement($nav_container, meta_title);
			VMM.appendElement($nav_container, meta_note);
			$nav_list			= VMM.appendAndGetElement($nav_container, "<ul>", "");
			
			for(var i = 0; i < d.length; i++) {
				var item = {
						element:	VMM.appendAndGetElement($nav_list, "<li>", "datanav-item"),
						uniqueid:	d[i].uniqueid
					};
					
				VMM.Lib.attr(item.element, "data-toggle", d[i].column_name);
				VMM.Lib.attr(item.element, "id", d[i].uniqueid);
				
				VMM.attachElement(item.element, "<div class='datanav-button'>" + d[i].title + "</div>");
					
				navitems.push(item);
					
				VMM.bindEvent(item.element, onItemClick, "click", {number: i, column_name:d[i].column_name, uniqueid:item.uniqueid});
				VMM.bindEvent(item.element, onItemHover, "mouseenter mouseleave", {number: i, column_name:d[i].column_name, uniqueid:item.uniqueid});
			}
			
			
			//VMM.fireEvent($layout, config.events.map_ready);
		}
		
		/* ITEM EVENTS
		================================================== */
		function onItemClick(e) {
			trace("onItemClick");
			VMM.fireEvent($layout, config.events.nav_update, e.data);
			//setActiveItem(e.data.uniqueid);
		}
		
		function onItemHover(e) {
			//VMM.Lib.toggleClass(e.data.elem, "zFront");
		}
		function updateActiveItems() {
			var i	= 0;
			
			for(i = 0; i < config.columns.length; i++) {
				if (config.columns[i].active) {
					VMM.Lib.addClass("#" + config.columns[i].uniqueid, "active");
				} else {
					VMM.Lib.removeClass("#" + config.columns[i].uniqueid, "active");
				}
			}
			
		}
		
		/* BUILD
		================================================== */
		var build = function() {
			trace("BUILD NAV")
			VMM.attachElement($layout, "test");
			VMM.Lib.attr($layout, "id", unique_id);
			
			buildNav(config.columns);
			updateActiveItems();
		}
		
	};
	
}


/*********************************************** 
     Begin VMM.DisparityMap.js 
***********************************************/ 

/**
	* Disparity Map
	* Designed and built by Zach Wise at VéritéCo
*/  

/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */

// @codekit-prepend "Core/VMM.js";
// @codekit-prepend "Core/VMM.Library.js";
// @codekit-prepend "Core/VMM.Browser.js";
// @codekit-prepend "Core/VMM.FileExtention.js";
// @codekit-prepend "Core/VMM.Util.js";
// @codekit-prepend "Core/VMM.LoadLib.js";

// @codekit-prepend "Chart/VMM.Chart.js";

// @codekit-prepend "VMM.DataMap.js";
// @codekit-prepend "VMM.DataList.js";
// @codekit-prepend "VMM.DataNav.js";


/* Disparity Map
================================================== */

if(typeof VMM != 'undefined' && typeof VMM.DisparityMap == 'undefined') {
	
	VMM.DisparityMap = function(w, h, conf, _map_id) {
		
		var $main,
			$grid_top,
			$grid_bottom,
			$feedback,
			$map,
			$main_list,
			$nav_container,
			$nav,
			$nav_list,
			$nav_key,
			datamap,
			datanav,
			list_main,
			list_nav,
			version,
			map_id,
			needs_rank			= [],
			data = {
				communities:	[]
			},
			current = {
				popup:			"",
				filters:		""
			},
			config				= {},
			ie7					= false;
		
		if (type.of(_map_id) == "string") {
			map_id = 			_map_id;
		} else {
			map_id = 			"#disparitymap";
		}
		
		version = 					"2.0";
		
		trace("DISPARITY MAP VERSION " + version);
		
		VMM.debug = true;
		
		/* CONFIG
		================================================== */
		config = {
			embed:					false,
			events: {
				data_ready:			"DATAREADY",
				map_ready:			"MAPREADY",
				list_update:		"UPDATELIST",
				list_over:			"UPDATEOVER",
				list_out:			"UPDATEOUT",
				nav_update:			"UPDATENAV",
				map_update:			"UPDATEMAP",
				map_popup_open:		"MAPPOPUPOPEN",
				map_popup_close:	"MAPPOPUPCLOSE",
				map_poly_over:		"MAPPOLYOVER",
				map_poly_out:		"MAPPOLYOUT",
				messege:			"MESSEGE",
				headline:			"HEADLINE",
				resize:				"resize"
			},
			loaded: {
				fusion:				false,
				communities:		false
			},
			id: 					map_id,
			fusion_id:				2295945,
			shape_source:			"communities.json",
			columns: [
				{
					title:			"People in Poverty",
					column_name:	"people_in_poverty",
					note:			"",
					active:			false
				},
				{
					title:			"Vacant Housing",
					column_name:	"vacant_housing",
					note:			"",
					active:			false
				}
			],
			infobox: [
				{
					title:			"Per Capita Income",
					column_name:	"per_capita_income",
					note:			""
				}
			],
			data: {
				fusion:				{},
				communities:		{},
				columns:			[],
				infobox:			[]
			},
			type: 					"disparitymap",
			touch:					false,
			colors: {
				map: {
					fill:			"#C43C35",
					stroke:			"#FFFFFF",
					rollover:		"#666666", //"#217077",
					active:			"#333333" //"#0B484E"
				},
				communities: {
					fill:			"#C43C35",
					stroke:			"#FFFFFF",
					rollover:		"#666666", //"#217077",
					active:			"#333333" //"#0B484E"
				},
				race: {
					white:		"E900B6",
					black:		"04A4E0",
					asian:		"9BFB15",
					hispanic:	"FAAF08",
					other:		"999999"
				}
			},
			map: {
				view:				[41.830033,-87.7200523],
				zoom: {
					normal:			11,
					max:			14,
					min:			10
				},
				style_id:			"48820",
				style:				"toner-lines",
				width:				700,
				height:				750
			},
			nav: {
				width:				260,
				height:				"100%",
				title:				"Ranked By",
				note:				"Note: Ranked by filters above from most disadvantaged to least <br />"
			},
			map_key:				"<ul class='disparitymap-key'><li class='label race-white'>white</li><li class='label race-black'>black</li><li class='label race-hispanic'>hispanic</li><li class='label race-asian'>asian</li><li class='label race-other'>other</li></ul>",
			list: {
				nav: {
					title:			"Most Disadvantaged",
					note:			"Note: Ranked by your selected criteria."
				},
				main: {
					title:			"Community Rank",
					note:			"Note: Ranked by your selected criteria, from most to least disadvantaged."
				}	
			},
			hash_bookmark:			false,
			api_keys: {
				leaflet:			"f5d9e22a178b4b2cb7ff16422a0a7666",
				google:				"",
				flickr:				"",
				twitter:			""
			},
			width: 					960,
			height: 				540,
			spacing: 				15,
			ease: 					"easeInOutExpo",
			duration: 				1000
		};
		
		if ( w != null && w != "") {
			config.width = w;
			has_width = true;
		} 

		if ( h != null && h != "") {
			config.height = h;
			has_height = true;
		}
		
		
		
		window.onhashchange = function () {
			var hash					=	window.location.hash.substring(1);
		}
		
		/* CREATE CONFIG
		================================================== */
		var createConfig = function(conf) {
			
			// APPLY SUPPLIED CONFIG TO TIMELINE CONFIG
			if (typeof map_config == 'object') {
				trace("HAS DISPARITY MAP CONFIG");
				config = VMM.Util.mergeConfig(config, map_config);
			} else if (typeof conf == 'object') {
				config = VMM.Util.mergeConfig(config, conf);
			}
			
			if (VMM.Browser.device == "mobile" || VMM.Browser.device == "tablet") {
				config.touch = true;
			}
			
			//config.map.width	= config.width - config.nav.width;
			config.map.width	= Math.floor((config.width/4) * 3) - 2;
			config.nav.width	= Math.floor(config.width/4);
			config.data.columns	= config.columns;
			config.data.infobox	= config.infobox;
			
			config.list.nav.note = config.list.nav.note + config.map_key;
			
			
			VMM.master_config.DisparityMap	= config;
			this.events						= config.events;
		}
		
		/* CHECK HASH STATE
		================================================== */
		function checkHash() {
			var has_filter		= false;
			if(window.location.hash) {
				var hash,
					hash_filters	= [],
					i				= 0,
					j				= 0;
				 
				hash = getUrlVars();
				trace("HASH");
				trace(hash);
				
				if (typeof hash.popup != 'undefined') {
					current.popup = hash.popup;
					list_main.setActive(current.popup);
					list_nav.setActive(current.popup);
					datamap.openPopup(current.popup);
				}
				if (typeof hash.filters != 'undefined') {
					hash_filters = hash.filters.split('|');
					
					for(i = 0; i < hash_filters.length; i++) {
						for(j = 0; j < config.columns.length; j++) {
							if (hash_filters[i] == config.columns[j].column_name) {
								config.columns[j].active = true;
							}
						}
					}
					
					datanav.setActive();
			
					// update popups
					communityData.update();
					datamap.updateLayers();
					list_main.updateList();
					list_nav.updateList();
					
				}
				
				setHash();
			}
			
			// Make sure a filter is enabled
			for(j = 0; j < config.columns.length; j++) {
				if (config.columns[j].active) {
					has_filter = true;
				}
			}
			
			if (!has_filter) {
				trace("NEEDS FILTER");
				config.columns[0].active = true;
				datanav.setActive();
				// update popups
				communityData.update();
				datamap.updateLayers();
				list_main.updateList();
				list_nav.updateList();
			} else {
				trace("HAS FILTER");
			}
			
		}
		
		var getUrlVars = function() {
			var varobj = {}, url_vars = [], uv ;
		
			//url_vars = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			url_vars = window.location.href.slice(window.location.href.indexOf('#') + 1);
	
			if (url_vars.match('#')) {
				//url_vars = url_vars.split('#')[0];
			}
			url_vars = url_vars.split('&');
		
			for(var i = 0; i < url_vars.length; i++) {
				uv = url_vars[i].split('=');
				varobj[uv[0]] = uv[1];
			}
		
			return varobj;
		};
		
		/* CREATE STRUCTURE
		================================================== */
		var createStructure = function(w, h) {
			
			$main		= VMM.getElement(map_id);
			
			VMM.Lib.addClass(map_id, "vmm-disparitymap");
			
			if (config.touch) {
				VMM.Lib.addClass(map_id, "vmm-touch");
			} else {
				VMM.Lib.addClass(map_id, "vmm-notouch");
			}
			
			$grid_top		= VMM.appendAndGetElement($main, "<div>", "vmm-grid-row", "");
			$grid_bottom	= VMM.appendAndGetElement($main, "<div>", "vmm-grid-row", "");
			$feedback		= VMM.appendAndGetElement($main, "<div>", "feedback", "");
			
			$map			= VMM.appendAndGetElement($grid_top, "<div>", "datamap vmm-grid-column", "");
			$nav_container	= VMM.appendAndGetElement($grid_top, "<div>", "disparitymap-nav vmm-grid-column", "");
			$nav			= VMM.appendAndGetElement($nav_container, "<div>", "datanav", "");
			//$nav_key		= VMM.appendAndGetElement($nav_container, "<div>", "navkey", "");
			$nav_list		= VMM.appendAndGetElement($nav_container, "<div>", "navlist", "");
			
			
			$main_list		= VMM.appendAndGetElement($grid_bottom, "<div>", "mainlist", "");
			
			//config.list.nav.note	= config.list.nav.note + config.map_key;
			//config.list.main.note	= config.list.main.note + config.map_key;
			
			//VMM.attachElement($nav_key, "<h3>Key</h3>" + config.map_key);
			
			VMM.Lib.width($main, config.width);
			VMM.Lib.height($main, config.height);
			VMM.Lib.width($nav_container, config.nav.width);
			
		}
		
		/* ON EVENT
		================================================== */
		function setHash() {
			var the_hash	= "#",
				i			= 0,
				_first		= true;
			
			the_hash			+= "popup=" + current.popup;
			the_hash			+= "&filters=";
			
			for(i = 0; i < config.columns.length; i++) {
				if (config.columns[i].active) {
					if (_first) {
						_first		= false;
					} else {
						the_hash	+= "|";
					}
					the_hash	+= config.columns[i].column_name;
				}
			}
			
			window.location.hash = the_hash;
		}
		
		/* PUBLIC FUNCTIONS
		================================================== */
		this.init = function(conf, _map_id) {
			
			trace('DISPARITYMAP INIT');
			
			if (type.of(_map_id) == "string") {
				if (_map_id.match("#")) {
					map_id = _map_id;
				} else {
					map_id = "#" + _map_id;
				}
			}
			
			createConfig(conf);
			createStructure(w,h);
			
			/* EVENTS
			================================================== */
			VMM.bindEvent($main, showMessege, config.events.messege);
			VMM.bindEvent($main, onDataReady, config.events.data_ready);
			
			VMM.bindEvent($map, onMapReady, config.events.map_ready);
			VMM.bindEvent($map, onMapPopupOpen, config.events.map_popup_open);
			VMM.bindEvent($map, onMapPopupClose, config.events.map_popup_close);
			VMM.bindEvent($map, onMapPolyOver, config.events.map_poly_over);
			VMM.bindEvent($map, onMapPolyOut, config.events.map_poly_out);
			
			VMM.bindEvent($main_list, onListUpdate, config.events.list_update);
			VMM.bindEvent($main_list, onListOver, config.events.list_over);
			VMM.bindEvent($main_list, onListOut, config.events.list_out);
			
			VMM.bindEvent($nav_list, onListOver, config.events.list_over);
			VMM.bindEvent($nav_list, onListOut, config.events.list_out);
			VMM.bindEvent($nav_list, onListUpdate, config.events.list_update);
			
			VMM.bindEvent($nav, onNavUpdate, config.events.nav_update);
			
			config.events.list_update
			/* GET DATA
			================================================== */
			if (VMM.Browser.browser == "Explorer" || VMM.Browser.browser == "MSIE") {
				if ( parseInt(VMM.Browser.version, 10) <= 7 ) {
					ie7 = true;
				}
			}
			
			
			getData();
		};
		
		
		/* DATA 
		================================================== */
		function getData() {
			trace("GET DATA");
			
			var fusion_url = 'http://tables.googlelabs.com/api/query?sql=SELECT * FROM ' + config.fusion_id +  '&jsonCallback=?';

			VMM.getJSON(config.shape_source, function(d) {
				trace("COMMUNITY DATA LOADED");
				
				VMM.fireEvent(global, config.events.messege, "Loaded Community Data");
				data.communities = d.communities;
				config.loaded.communities = true;
				
				for(var i = 0; i < data.communities.length; i++) {
					data.communities[i].community.number = parseInt(data.communities[i].community.number, 10);
				}
				
				// LOAD FUSION DATA
				VMM.getJSON(fusion_url, function(fusion_data) {
					trace("FUSION DATA LOADED");
					VMM.fireEvent($main, config.events.messege, "Loaded Fusion Data");
					config.loaded.fusion = true;
					for(var k = 0; k < fusion_data.table.rows.length; k++) {
						var community	= {},
							num			= 0,
							j			= 0;
							
						for(j = 0; j < fusion_data.table.cols.length; j++) {
							community[fusion_data.table.cols[j].toLowerCase()] = fusion_data.table.rows[k][j];
						}
						num = [parseFloat(community.community_area) - 1];
						data.communities[num].community.fusion = community;
					}
					VMM.fireEvent($main, config.events.data_ready);
				});
				
			});
		};
		
		function prepareData() {
			var i	= 0,
				j	= 0;
				
			for(i = 0; i < config.columns.length; i++) {
				config.columns[i].uniqueid = "datanav-item-" + VMM.Util.unique_ID(5);
				
				if (data.communities[0].community.fusion[config.columns[i].column_name + "_rank"] > 0) {
					trace("EXISTS");
				} else {
					trace("NEEDS RANK");
					needs_rank.push(config.columns[i].column_name);
				}
			}
			
			communityData.createRanks();
			
			for(i = 0; i < data.communities.length; i++) {
				var community = data.communities[i].community;
				
				community.rank_average = i;
			}
		}
		
		function sortData(sort_array, sort_by) {
			function sortby(a, b) {
				var a1= a[sort_by], b1= b[sort_by];
			    if(a1== b1) return 0;
			    return a1> b1? 1: -1;
			}
			sort_array.sort(sortby);
		}
		
		/* On Events 
		================================================== */
		var onDataReady = function() {
			trace("checkDataLoad");
			if (config.loaded.fusion && config.loaded.communities) {
				prepareData();
				build();
			}
		}
		
		var onMapReady = function() {
			trace("onMapReady");
			
		}
		
		var onMapPopupOpen = function(e, d) {
			trace("onMapPopupOpen");
			current.popup = d;
			list_main.setActive(d);
			list_nav.setActive(d);
			setHash();
			VMM.smoothScrollTo($map, config.duration, config.ease);
		}
		
		var onMapPopupClose = function() {
			trace("onMapPopupClose");
			list_main.setActive();
			list_nav.setActive();
		}
		
		var onMapPolyOver = function(e, d) {
			list_main.setMouseOver(d);
			list_nav.setMouseOver(d);
		}
		
		var onMapPolyOut = function(e, d) {
			list_main.setMouseOut(d);
			list_nav.setMouseOut(d);
		}
		
		var onListUpdate = function(e, d) {
			list_main.setActive(d.name);
			list_nav.setActive(d.name);
			datamap.openPopup(d.name);
			
			VMM.smoothScrollTo($map, config.duration, config.ease);
		}
		
		var onListOver = function(e, d) {
			datamap.rollOverHighlight(d.name);
			
		}
		
		var onListOut = function(e, d) {
			datamap.rollOutHighlight(d.name);
			
		}
		
		var onNavUpdate = function(e, d) {
			var i	= 0;
			
			trace("onNavUpdate");
			
			for(i = 0; i < config.columns.length; i++) {
				if (config.columns[i].uniqueid == d.uniqueid) {
					if (config.columns[i].active) {
						config.columns[i].active = false;
					} else {
						config.columns[i].active = true;
					}
				}
			}
			
			datanav.setActive();
			
			// update popups
			communityData.update();
			datamap.updateLayers();
			list_main.updateList();
			list_nav.updateList();
			
			setHash();
		}
		
		var onBarGraphOver = function() {
			trace("GRAPH ROLLOVER OR OUT");
		}
		
		/* Community Data
		================================================== */
		var communityData = {
			
			createRanks: function(d) {
				trace("CREATE RANKS");
				var i	= 0,
					j	= 0;
					
				for(i = 0; i < needs_rank.length; i++) {
					
					
					function sortbyrank(a, b) {
						var a1= a.community.fusion[needs_rank[i]], b1= b.community.fusion[needs_rank[i]];
					    if(a1== b1) return 0;
					    return a1> b1? 1: -1;
					}
					
					data.communities.sort(sortbyrank);
					
					for(j = 0; j < data.communities.length; j++) {
						var community = data.communities[j].community;
						community.fusion[needs_rank[i] + "_rank"] = (j + 1);
						//trace("RANK " + community.fusion[needs_rank[i] + "_rank"]);
					}
					
				}
			},
			
			buildshapes: function(d) {
				for(var i = 0; i < d.length; i++) {
				
					/* POLYS 
					================================================== */
					var poly_array	= [],
						j			= 0;
					
					for(j = 0; j < d[i].community.geometry.length; j++) {
						var p = new L.LatLng(
							parseFloat(d[i].community.geometry[j].lat),
							parseFloat(d[i].community.geometry[j].lon)
						);
						poly_array.push(p);
					}
				
					d[i].community.geometry = [];
					d[i].community.poly_array = poly_array;
				
					/* POPUPS 
					================================================== */
					d[i].community.popup = "popup";
				
				}
			},
			
			update: function(d) {
				var i	= 0,
					j	= 0;
					
				/* RANK
				================================================== */
				for(i = 0; i < data.communities.length; i++) {
					var rank_total		= 0,
						ranks			= 0;
					
					for(j = 0; j < config.columns.length; j++) {
						var r = parseInt(data.communities[i].community.fusion[config.columns[j].column_name + "_rank"], 10);
						if (isNaN(r)) {
							r = 0;
						}
						if (config.columns[j].active) {
							ranks++;
							rank_total += r;
						}
					}
					data.communities[i].rank_average = rank_total/ranks;
				}
				
				/* RANK SORT
				================================================== */
				sortData(data.communities, "rank_average");
				
				/* POPUP CONTENT
				================================================== */
				for(i = 0; i < data.communities.length; i++) {
					data.communities[i].rank_average = i + 1;
					data.communities[i].community.popup = communityData.popup(data.communities[i]);
					
				}
			},
			
			popupItem: function(community, column) {
				var item			= "",
					has_percent		= false,
					item_value		= "",
					item_rank		= Math.round(parseInt(community.fusion[column.column_name + "_rank"], 10)),
					item_rank_class = "";
				
						
				if(typeof community.fusion[column.column_name + "_percent"] != 'undefined') {
					has_percent		= true;
					item_value		= Math.round(parseInt(community.fusion[column.column_name + "_percent"], 10));
				} else {
					item_value		= community.fusion[column.column_name]
				}
						
				if (isNaN(item_rank)) {
					item_rank		= 0;
				}
						
				if (item_rank <= 10) {
					item_rank_class += " top-rank";
				}
				item			+=  "<div class='popup-box-item" + item_rank_class + "'>";
				item			+=  "<div class='popup-item-container'>";	
				//TITLE
				item			+= "<div class='item-title'>";
				item			+= "<div class='label-column'>";
				item			+= "<span class='label rank" + item_rank_class + "'>" + item_rank + "<span class='ordinal'>" + VMM.Util.ordinal(item_rank) + "</span></span>";
				item			+= "</div>";
				item			+= "<div class='title-column'>";
				item			+= "<h4>" + column.title + "<small> " + column.note + "</small></h4>";
				item			+= "</div>";
				item			+= "</div>";
						
				// BAR CHART
				if (has_percent) {
					item		+= "<div class='bar-graph'>";
					item		+= "<span class='bar-main' style='width:" + item_value + "%'>";
					item		+= "<span class='bar-text'>";
					item		+= "<p>";
					item		+= item_value + "%";
					item		+= "</p>";
					item		+= "</span>";
					item		+= "</span>";
					item		+= "</div>";
				} else {
					item		+= "<div class='filter-number'>";
					item		+= VMM.Util.niceNumber(Math.round(parseInt((item_value * 100), 10)) / 100);
					item		+= "</div>";
				}
						
						
						
				item			+= "</div></div>";
						
						
				return item;
				
			},
			
			popup: function(c) {
				var community			= c.community,
					popup				= "<div class='popup-info'>",
					chart = {
						race:			"",
						other:			""
					},
					info_box			= "",
					info_box_column_a	= "",
					info_box_column_b	= "",
					filter_box			= "",
					filter_box_column_a	= "",
					filter_box_column_b	= "",
					number_of_columns	= 0,
					name				= "",
					rank_average_class = "label rank";
					i					= 0;
					
				if (c.rank_average <= 10) {
					rank_average_class += " top-rank";
				}
				
				// NAME
				name =  "<h3>";
				name += community.name;
				name += "<span class='" + rank_average_class + "'>" + Math.round(c.rank_average) + "<span class='ordinal'>" + VMM.Util.ordinal(Math.round(c.rank_average)) + "</span></span>";
				name += "</h3>";
				
				// CHART RACE
				chart.race = communityData.charts.race(
					Math.round(parseInt(community.fusion.percent_white,		10)), 
					Math.round(parseInt(community.fusion.percent_black,		10)), 
					Math.round(parseInt(community.fusion.percent_asian,		10)), 
					Math.round(parseInt(community.fusion.percent_latino,	10)), 
					Math.round(parseInt(community.fusion.percent_other,		10))
				);
				
				// INFO BOX
				number_of_columns		= 0;
				info_box				= "<div class='popup-infobox'>";
				info_box_column_a		= "<div class='popup-box-column'>";
				info_box_column_b		= "<div class='popup-box-column'>";
				
				for(i = 0; i < config.data.infobox.length; i++) {
					var item	= "";
					item = communityData.popupItem(community, config.data.infobox[i]);
					number_of_columns++;
						
					if (VMM.Util.isEven(number_of_columns)) {
						info_box_column_b	+= item;
					} else {
						info_box_column_a	+= item;
					}
				}
				
				info_box_column_a	+= "</div>";
				info_box_column_b	+= "</div>";
				info_box			+= info_box_column_a + info_box_column_b + "</div>";
				
				// FILTER BOX
				number_of_columns		= 0;
				filter_box				= "<div class='popup-filterbox'>";
				filter_box				+= "<h4>Ranked By</h4>";
				filter_box_column_a		= "<div class='popup-box-column'>";
				filter_box_column_b		= "<div class='popup-box-column'>";
				
				for(i = 0; i < config.columns.length; i++) {
					var item	= "";
					if (config.columns[i].active) {
						
						item = communityData.popupItem(community, config.columns[i]);
						number_of_columns++;
						
						if (VMM.Util.isEven(number_of_columns)) {
							filter_box_column_b	+= item;
						} else {
							filter_box_column_a	+= item;
						}
						
					}
					
				}
				
				filter_box_column_a	+= "</div>";
				filter_box_column_b	+= "</div>";
				filter_box			+= filter_box_column_a + filter_box_column_b + "</div>";
				
				
				popup += name + chart.race + info_box + filter_box + "</div>";
				return popup;
			},
			
			charts: {
				race: function(white, black, asian, hispanic, other) {
					
					var chart	=  "";
					chart		+= "<div class='bar-graph-tooltip'>";
					chart		+= "<div class='bar-graph' style='height:24px; width:300px;'>";
					chart		+= "<span class='race-white' rel='tooltip' title='white' style='width:"			+ (parseInt(white,		10)) + "%'></span>";
					chart		+= "<span class='race-black' rel='tooltip' title='black' style='width:"			+ (parseInt(black,		10)) + "%'></span>";
					chart		+= "<span class='race-hispanic' rel='tooltip' title='hispanic' style='width:"	+ (parseInt(hispanic,		10)) + "%'></span>";
					chart		+= "<span class='race-asian' rel='tooltip' title='asian' style='width:"			+ (parseInt(asian,		10)) + "%'></span>";
					chart		+= "<span class='race-other' rel='tooltip' title='other' style='width:"			+ (parseInt(other,		10)) + "%'></span>";
					chart		+= "</div>";
					
					// TOOLTIP
					chart		+= "<div class='tooltip' >";
					chart		+= "<ul class='disparitymap-key'>";
					chart		+= "<li class='label race-white'>white " + Math.round(parseInt(white,		10)) + "%</li>";
					chart		+= "<li class='label race-black'>black " + Math.round(parseInt(black,		10)) + "%</li>";
					chart		+= "<li class='label race-hispanic'>hispanic " + Math.round(parseInt(hispanic,		10)) + "%</li>";
					chart		+= "<li class='label race-asian'>asian " + Math.round(parseInt(asian,		10)) + "%</li>";
					chart		+= "<li class='label race-other'>other " + Math.round(parseInt(other,		10)) + "%</li>";
					chart		+= "</ul>";
					chart		+= "</div>";
					
					
					chart		+= "</div>";
					
					//$('#foo').bind('mouseenter mouseleave', function() {
					 // $(this).toggleClass('entered');
					//});
					
					/*
					var chart =  "<img src='https://chart.googleapis.com/chart?cht=p";
					// Size
					chart	+= "&chs=300x100";
					// COLOR
					chart	+= "&chco=";
					chart	+= config.colors.race.white + "|";
					chart	+= config.colors.race.black + "|";
					chart	+= config.colors.race.asian + "|";
					chart	+= config.colors.race.hispanic + "|";
					chart	+= config.colors.race.other;
					// DATA
					chart	+= "&chd=t:" + white + "," + black + "," + asian + "," + hispanic + "," + other;
					// LABELS SIDE
					chart	+= "&chl=white|black|asian|hispanic|other";
					chart	+= "' width='300px' height='100px'/>";
					*/
					
					return chart;
					
				}
			}
		}
		
		/* MESSEGES 
		================================================== */
		
		var showMessege = function(e, msg) {
			trace("showMessege " + msg);
			//VMM.attachElement($messege, msg);
			VMM.attachElement($feedback, loadingmessage(msg)); 
		}
		
		var hideMessege = function() {
			VMM.Lib.animate($feedback, config.duration, config.ease*4, {"opacity": 0}, detachMessege);
		}
		
		var detachMessege = function() {
			VMM.Lib.detach($feedback);
		}
		
		var loadingmessage = function(m) {
			return "<div class='loading'><div class='loading-container'><div class='loading-icon'></div>" + "<div class='message'><p>" + m + "</p></div></div></div>";
		}
		
		/* BUILD DISPLAY
		================================================== */
		var build = function() {
			trace("BUILD");
			hideMessege();
			communityData.buildshapes(data.communities);
			communityData.update();
			
			datamap = new VMM.DataMap($map, config);
			datamap.init(data);
			
			datanav = new VMM.DataNav($nav, config);
			datanav.init(config.nav);
			
			list_main = new VMM.DataList($main_list, config);
			list_main.init(data, 0, config.list.main);
			
			list_nav = new VMM.DataList($nav_list, config);
			list_nav.init(data, 10, config.list.nav);
			
			
			datamap.updateLayers();
			
			checkHash();
			
		};
		
	};
	
}