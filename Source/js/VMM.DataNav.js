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
