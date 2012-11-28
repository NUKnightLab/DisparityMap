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
		
		version = 					"2.5";
		
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
			titles_notes: {
				nav: {
					title:			"Ranked By",
					note:			"Note: Select filters to rank community areas from most to least disadvantaged."
				},
				list: {
					title:			"Most Disadvantaged",
					note:			"Note: Ranked by your selected criteria."
				},
				popup_rank: {
					title:			"Ranked By",
					note:			"Note: Scale represents how disadvantaged the community is."
				}
			},
			columns: [
				{
					title:			"People in Poverty",
					column_name:	"people_in_poverty",
					note:			"",
					active:			false,
					high: 			0,
					low: 			0
				},
				{
					title:			"Vacant Housing",
					column_name:	"vacant_housing",
					note:			"",
					active:			false,
					high: 			0,
					low: 			0
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
				infobox:			[],
				total_ranks: 		77
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
				style:				"toner-lite",
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
			
			config.titles_notes.nav.note = config.titles_notes.nav.note + config.map_key;
			config.titles_notes.list.note = config.titles_notes.list.note + config.map_key;
			
			VMM.master_config.DisparityMap	= config;
			this.events						= config.events;
			
			if (config.debug) {
				VMM.debug = true;
			}
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
			$grid_middle	= VMM.appendAndGetElement($main, "<div>", "vmm-grid-row", "");
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
				if ( parseInt(VMM.Browser.version, 10) <= 8 ) {
					ie7 = true;
				}
			}
			
			if (!ie7) {
				getData();
			} else {
				VMM.fireEvent($main, config.events.messege, "Internet Explorer 8 and below is not supported. Please use a modern browser.");
			}
			
		};
		
		
		/* DATA 
		================================================== */
		function getData() {
			trace("GET DATA");
			
			var fusion_url = 'http://tables.googlelabs.com/api/query?sql=SELECT * FROM ' + config.fusion_id +  '&jsonCallback=?';
			
			function getGVar(v) {
				if (typeof v != 'undefined') {
					return v;
				} else {
					return "";
				}
			}
			
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
							
						//trace(fusion_data.table.rows[k]);
						for(j = 0; j < fusion_data.table.cols.length; j++) {
							community[fusion_data.table.cols[j].toLowerCase()] = fusion_data.table.rows[k][j];
						}
						
						num = [parseFloat(getGVar(community.community_area)) - 1]; 
						
						if (num == "" || num > data.communities.length || isNaN(num)) {
							trace("NO COMMUNITY AREA NUMBER OR NO CORRESPONDING COMMUNITY NUMBER IN shape_source json file")
						} else {
							
							trace(isNaN(num));
							data.communities[num].community.fusion = community;
						}
						
						//num = [parseFloat(community.community_area) - 1];
						
						//data.communities[num].community.fusion = community;
					}
					VMM.fireEvent($main, config.events.data_ready);
				});
				
			});
		};
		
		function prepareData() {
			var i	= 0,
				j	= 0,
				k	= 0,
				m	= 0;
				
			for(i = 0; i < config.columns.length; i++) {
				config.columns[i].uniqueid = "datanav-item-" + VMM.Util.unique_ID(5);
				if (data.communities[0].community.fusion[config.columns[i].column_name + "_rank"] > 0) {
					trace("EXISTS");
				} else {
					trace("NEEDS RANK");
					needs_rank.push(config.columns[i]);
				}
			}
			
			// Cleanup numbers
			for(k = 0; k < data.communities.length; k++) {
				var community = data.communities[k].community,
					prop;
				
				// Make Strings with Percentages to Numbers
				for (prop in community.fusion) {
					if (Object.prototype.hasOwnProperty.call(community.fusion, prop)) {
						if (type.of(community.fusion[prop]) == "string") {
							if (community.fusion[prop].match("%")) {
								community.fusion[prop + "_percent"] = community.fusion[prop];
								community.fusion[prop] = parseFloat(community.fusion[prop].replace("%", ""), 10);
								
							}
						}
					}
				}
			}
			
			communityData.createRanks();
			
			for(i = 0; i < data.communities.length; i++) {
				var community = data.communities[i].community;
				
				community.rank_average = i;
			}
			
			
			// GET HIGH AND LOWS
			trace("HIGH AND LOW");
			for(i = 0; i < config.columns.length; i++) {
				
				config.columns[i].high	= data.communities[0].community.fusion[config.columns[i].column_name];
				config.columns[i].low	= data.communities[0].community.fusion[config.columns[i].column_name];
				
				for(k = 0; k < data.communities.length; k++) {
					var item_value = 0;
					
					if(typeof data.communities[k].community.fusion[config.columns[i].column_name + "_percent"] != 'undefined') {
						item_value		= Math.round(parseInt(data.communities[k].community.fusion[config.columns[i].column_name + "_percent"], 10));
					} else {
						item_value		= data.communities[k].community.fusion[config.columns[i].column_name];
					}
					
					item_value = parseInt(item_value);
					
					if (item_value < config.columns[i].low) {
						config.columns[i].low = item_value;
					}
					if (item_value > config.columns[i].high) {
						config.columns[i].high = item_value;
					}
					
				}
				
				trace(config.columns[i].high);
				trace(config.columns[i].low);
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
					j	= 0,
					k	= 0;
					
				for(i = 0; i < needs_rank.length; i++) {
					var is_rank_percent = false,
						is_money		= false,
						is_inverse		= false;
					
					function sortby_rank(a, b) {
						var a1= a.community.fusion[needs_rank[i].column_name], b1= b.community.fusion[needs_rank[i].column_name];
					    if(a1== b1) return 0;
					    return a1> b1? 1: -1;
					}
					function sortby_percentrank(a, b) {
						var a1= a.community.fusion[needs_rank[i].column_name + "_percentrank"], b1= b.community.fusion[needs_rank[i].column_name + "_percentrank"];
					    if(a1== b1) return 0;
					    return a1> b1? 1: -1;
					}
					
					function sortby_moneyrank(a, b) {
						var a1= a.community.fusion[needs_rank[i].column_name + "_moneyrank"], b1= b.community.fusion[needs_rank[i].column_name + "_moneyrank"];
					    if(a1== b1) return 0;
					    return a1> b1? 1: -1;
					}
					
					// Fix numbers if it's a percentage to make sure sort is correct
					for(k = 0; k < data.communities.length; k++) {
						var community = data.communities[k].community;
						if(typeof community.fusion[needs_rank[i].column_name + "_percent"] != 'undefined') {
							is_rank_percent = true;
							community.fusion[needs_rank[i].column_name + "_percentrank"] = 100 - community.fusion[needs_rank[i].column_name];
						} else if (type.of(community.fusion[needs_rank[i].column_name]) == "string") {
							if (community.fusion[needs_rank[i].column_name].match("$")) {
								is_money = true;
								community.fusion[needs_rank[i].column_name + "_moneyrank"] = parseFloat(community.fusion[needs_rank[i].column_name].replace("$", "").replace(",", ""));
							}
						}
					}
					
					if(typeof needs_rank[i].inverse != 'undefined') {
						is_inverse = needs_rank[i].inverse;
					}
					
					trace(needs_rank[i].column_name);
					if (is_rank_percent) {
						trace("SORT BY PERCENT RANK");
						data.communities.sort(sortby_percentrank);
					} else if (is_inverse) {
						trace("IS INVERSE");
						data.communities.sort(sortby_rank);
						//data.communities.reverse();
					} else if (is_money) {
						trace("SORT BY MONEY");
						data.communities.sort(sortby_moneyrank);
						data.communities.reverse();
					}  else {
						trace("NORMAL SORT");
						data.communities.sort(sortby_rank);
					}
					
					
					for(j = 0; j < data.communities.length; j++) {
						var community = data.communities[j].community;
						community.fusion[needs_rank[i].column_name + "_rank"] = (j + 1);
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
			
			popupItem: function(community, column, needs_graph) {
				var item			= "",
					has_percent		= false,
					item_value		= "",
					item_display_value = "",
					item_rank		= Math.round(parseInt(community.fusion[column.column_name + "_rank"], 10)),
					item_rank_class = "",
					is_money		= false,
					inverse			= false,
					rank_size		= "";
				
				if(typeof community.fusion[column.column_name + "_percent"] != 'undefined') {
					has_percent		= true;
					item_value		= Math.round(parseInt(community.fusion[column.column_name + "_percent"], 10));
				} else {
					item_value		= community.fusion[column.column_name];
					//trace(item_value);
					if (type.of(item_value) == "string") {
						trace("IS STRING");
						//trace(item_value);
						if (item_value.match("$")) {
							is_money = true;
							trace("IS MONEY");
							//item_value = parseInt(item_value.replace("$", "").replace(",", ""));
							
						}
					}
					
				}
				
				if(typeof column.money != 'undefined') {
					is_money = true;
				}
				
				if(typeof column.inverse != 'undefined') {
					inverse = column.inverse;
				}
				
				if (isNaN(item_rank)) {
					item_rank		= 0;
				}
						
				if (item_rank <= 10) {
					item_rank_class += " top-rank";
				}
				item			+=  "<div class='popup-box-item" + item_rank_class + "'>";
				item			+=  	"<div class='popup-item-container'>";	
				//TITLE
				item			+= 			"<div class='item-title'>";
				//item			+= 				"<h4>" + column.title + "</h4>";
				item			+= 				"<h4>" + column.title + "<small> " + column.note + "</small></h4>";
				/*
				item			+= 				"<div class='label-column'>";
				item			+= 					"<span class='label rank" + item_rank_class + "'>" + item_rank + "<span class='ordinal'>" + VMM.Util.ordinal(item_rank) + "</span></span>";
				item			+= 				"</div>";
				item			+= 				"<div class='title-column'>";
				//item			+= 					"<h4>" + column.title + "<small> " + column.note + "</small></h4>";
				item			+= 					"<h4>" + column.title + "</h4>";
				item			+= 				"</div>";
				*/
				item			+= 			"</div>";
					
				// NUMBER VALUE
				if (has_percent) {
					item_display_value		= item_value + "%";
					
				} else {
					if (is_money) {
						trace("IS MONEY $$$$")
						item_display_value	= "$" + VMM.Util.niceNumber(Math.round(parseInt((item_value * 100), 10)) / 100);
						trace(item_display_value);
					} else {
						item_display_value	= VMM.Util.niceNumber(Math.round(parseInt((item_value * 100), 10)) / 100);
					}
				}
				
				// RANK STAT
				if (needs_graph) {
					// RANK SIZE BY RANK
					//rank_size	= 100 - ((item_rank / config.data.total_ranks) * 100);
					
					// RANK SIZE BY VALUE
					if (inverse) {
						rank_size	= ((column.high - item_value) / (column.high - column.low)) * 100;
					} else {
						rank_size	= ((item_value - column.low) / (column.high - column.low)) * 100;
					}
					
					
					// IF ITS INVERSE
					
				
					item		+= "<div class='bar-graph'>";
					item		+= 		"<div class='bar-main' style='width:" + rank_size + "%'>";
					/*
					item		+= 			"<span class='bar-text'>";
					item		+= 				"<p>";
					item		+= 					item_display_value;
					//item		+= 					item_rank + "<span class='ordinal'>" + VMM.Util.ordinal(item_rank) + "</span>";
					item		+= 				"</p>";
					item		+= 			"</span>";
					*/
					if (rank_size < 33) {
						item		+= 		"<div class='bar-range-value-left' style='left:" + rank_size + "%'>";
						item		+= 			item_display_value;
						//item		+= 			item_rank + "<span class='ordinal'>" + VMM.Util.ordinal(item_rank) + "</span>";
						item		+= 		"</div>";
					} else {
						item		+= 		"<div class='bar-range-value-right' style='right:" + (100-rank_size) + "%'>";
						item		+= 			item_display_value;
						//item		+= 			item_rank + "<span class='ordinal'>" + VMM.Util.ordinal(item_rank) + "</span>";
						item		+= 		"</div>";
					}
					item		+= 		"</div>";
					item		+= "</div>";
					
					item		+= "<div class='bar-range'>";
					item		+= 		"<div class='bar-range-start'>";
					if (inverse) {
						item	+= 			column.high;
					} else {
						item	+= 			column.low;
					}
					if (has_percent) {
						item	+= 			"%";
					} 
					item		+= 		"</div>";
					item		+= 		"<div class='bar-range-end'>";
					if (inverse) {
						item	+= 			column.low;
					} else {
						item	+= 			column.high;
					}
					if (has_percent) {
						item	+= 			"%";
					} 
					item		+= 		"</div>";
					
					item		+= "</div>";
					
				} else {
					item		+= "<div class='filter-number'>"
					item		+= 		item_display_value
					item		+= "</div>";
				}
				
				// CLOSE DIV		
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
				filter_box				+= "<h4>" + config.titles_notes.popup_rank.title + "</h4>";
				filter_box				+= "<div class='popup-box-note'>" + config.titles_notes.popup_rank.note + "</div>";
				filter_box_column_a		= "<div class='popup-box-column'>";
				filter_box_column_b		= "<div class='popup-box-column'>";
				
				for(i = 0; i < config.columns.length; i++) {
					var item	= "";
					if (config.columns[i].active) {
						
						item = communityData.popupItem(community, config.columns[i], true);
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
					chart		+= "<div class='popup-infobox'>";
					chart		+= "<div class='bar-graph-tooltip'>";
					chart		+= "<div class='bar-graph' style='width:300px;'>";
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
			list_main.init(data, 0, config.titles_notes.list);
			
			list_nav = new VMM.DataList($nav_list, config);
			list_nav.init(data, 10, config.titles_notes.list);
			
			
			datamap.updateLayers();
			
			checkHash();
			
		};
		
	};
	
}