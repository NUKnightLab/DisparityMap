/* Data Map
================================================== */

/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */
// @codekit-prepend "Core/Library/Leaflet.js";

if(typeof VMM != 'undefined' && typeof VMM.DataMap == 'undefined') {
	
	VMM.DataMap = function(parent, parent_config) {
		
		var events			= {},
			hide_map		= false,
			map_opacity		= .99,
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
			$datamap_key,
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
					style:				"toner-lite",
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
		this.init = function(d, n) {
			data = d;
			build();
		};
		
		this.hideMap = function(d) {
			hide_map = d;
			if (hide_map) {
				map_layer.setOpacity(0);
			} else {
				map_layer.setOpacity(map_opacity);
			}
		}
		
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
			if (hide_map) {
				map_layer.setOpacity(0);
			} else {
				map_layer.setOpacity(.3);
			}
			
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
			if (hide_map) {
				map_layer.setOpacity(0);
			} else {
				map_layer.setOpacity(map_opacity);
			}
			
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
				var opacity_num;
				// POLY OPACITY
				opacity_num = 1 - (i/data.communities.length);
				
				if (opacity_num < .1) {
					opacity_num = .1;
				}
				
				// Group opacities into groups
				/*
				if (opacity_num < .3) {
					opacity_num = .1;
				} else if (opacity_num < .5) {
					opacity_num = .3;
				} else if (opacity_num < .7) {
					opacity_num = .5;
				} else if (opacity_num < .9) {
					opacity_num = .7;
				} else if (opacity_num > .9) {
					opacity_num = 1;
				}
				*/
				// Rank 1-10 1
				// Rank 11-40 .5
				// Rank 40-77 .1
				if (opacity_num < .48) {
					opacity_num = .1;
					trace(i + " .1");
				} else if (opacity_num < .88) {
					opacity_num = .5;
					trace(i + " .5");
				} else if (opacity_num >= .88) {
					opacity_num = 1;
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
			//map_layer.setOpacity(.5);
			if (hide_map) {
				map_layer.setOpacity(0);
			} else {
				map_layer.setOpacity(map_opacity);
			}
			
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
			$datamap_key		= "<div class='map-key'><div class='map-key-text'>Ranked by selected criteria.</div><div class='map-key-item'><div class='map-key-item-color map-key-low'>40-77</div><div class='map-key-item-color map-key-medium'>11-40</div><div class='map-key-item-color map-key-high'>1-10</div></div><div class='bar-graph'><div class='bar-main' style='width:100%'></div></div><div class='bar-range'><div class='bar-range-start'>Less Disadvantaged</div><div class='bar-range-end'>More Disadvantaged</div></div></div>";
			
			/*
			<div class='map-key-item'>
				<div class='map-key-item-color map-key-low'>
					Rank 40-77
				</div>
				<div class='map-key-item-color map-key-medium'>
					Rank 11-40
				</div>
				<div class='map-key-item-color map-key-high'>
					Rank 1-10
				</div>
			</div>
			*/
			// Rank 1-10 1
			// Rank 11-40 .5
			// Rank 40-77 .1
			VMM.appendElement($layout, $datamap_key);
			
			VMM.Lib.attr($datamap_container, "id", unique_id);
			VMM.Lib.width($datamap, config.map.width - 2);
			VMM.Lib.height($datamap, config.map.height - 2);
			
			buildMap();
			buildMapLayers();
		
		}
		
	};
	
}
