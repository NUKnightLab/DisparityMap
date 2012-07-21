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