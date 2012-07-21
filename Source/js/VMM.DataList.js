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
