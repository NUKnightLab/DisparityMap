DisparityMap
============

Javascript based map showing racial disparity in Chicago.

##How to embed
Here's a simple example:
```html
<body>
	<!-- BEGIN Disparity Map Embed -->
	<div id="disparitymap-embed"></div>
	<script type="text/javascript">
	    var disparitymap_config = {
			width:			"960",
			height:			"600",
			debug:			false,
			fusion_id:		4495912, //2295945, // 4495912
			shape_source:	'communities.json',
			columns:	[
				{
					title:		"People in Poverty",
					column_name:"people_in_poverty",
					note:		"",
					active:		false
				},
				{
					title:		"High School Education or Less",
					column_name:"high_school_education_or_less",
					note:		"(of People 25 and Older)",
					active:		false
				},
				{
					title:		"Average Test Score (ISAT)",
					column_name:"isat_2010_average_composite_score",
					note:		"(average composite score)",
					active:		false
				},
				{
					title:		"Number of Jobs",
					column_name:"total_jobs",
					note:		"(per capita)",
					active:		false
				},
				{
					title:		"Cowded Housing",
					column_name:"housing_crowded",
					note:		"",
					active:		false
				},
				{
					title:		"Unemployment",
					column_name:"aged_16andup_unemployed",
					note:		"(ages 16 and up)",
					active:		false
				}
						
			],
			infobox: [
				{
					title:		"Population",
					column_name:"total_population",
					note:		""
				},
				{
					title:		"Per Capita Income",
					column_name:"per_capita_income",
					note:		"/per person"
				},
				{
					title:		"Aged under 18 or over 64",
					column_name:"aged_under_18_or_over_64",
					note:		"(people not in the workforce?)"
				}
			]
		}
	</script>
	<script type="text/javascript" src="js/disparitymap-embed.js?v2"></script>
	<!-- END Disparity Map Embed -->
</body>
```

## Config Options
Here are some of the options you can set in the config.

### Columns
Information that is used to rank disparity. Each column you define in the config needs the following:
* `title` The name that is displayed in the menu
* `column_name` The name of the Google Fusion column name
* `note` disclaimers or further discription. It's shown next to the title.
* `active` sets weither the category is active or not when the page first loads

### Infobox
Extra information that is displayed in the popup but is not a ranking factor
* `title` The name that is displayed in the menu
* `column_name` The name of the Google Fusion column name
* `note` disclaimers or further discription. It's shown next to the title.

### Google Fusion
* `fusion_id` The numberic id of the fusion table you want to load
You can find the numeric id under `file > about`
![File About](http://24p.co/screenshots/DisparityMap-Fusiontable-about.png)
![Numberic ID](http://24p.co/screenshots/DisparityMap-NumbericID.png)

#### Data Entry
* Data that is money needs to have a "$" and the column must be formatted as text.
* Data that is a percentage needs to have a "%" after the number and the column must be formatted as text
![Format as text](http://24p.co/screenshots/DisparityMap-FusionTable-FormatText.png)

### Shape Source
`shape_source` The json file that contains the shape data.