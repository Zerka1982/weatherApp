// Moments
var $moment;
var $momentLocal;
var $momentRemote;

// Timezones
var $localTimezone = jstz.determine().name();
var $remoteTimezone = "Europe/Stockholm";

// Offsets
var $localOffset;
var $remoteOffset;

// Operational parameters
var $format = "HH:mm:ss";

// Add "Globuzzer" as an alias to timezone "Europe/Stockholm"
moment.tz.link('Globuzzer|Europe/Stockholm');

// Array with offsets
// This should include all offsets that could possibly be used, including those only used for DST in certain time zones.
var $offsets = [
	"-12:00", "-11:00", "-10:00", "-09:30", "-09:00", "-08:00", "-07:00", "-06:00", "-05:00", "-04:00", "-03:30", "-03:00", "-02:30", "-02:00", "-01:00", "+00:00", "+01:00", "+02:00", "+03:00", "+03:30", "+04:00", "+04:30", "+05:00", "+05:30", "+05:45", "+06:00", "+06:30", "+07:00", "+08:00", "+08:30", "+08:45", "+09:00", "+09:30", "+10:00", "+10:30", "+11:00", "+12:00", "+12:45", "+13:00", "+14:00"
];

// Array with time zones
var $cities = [
	"UTC",
	"Atlantic/Reykjavik",
	"Europe/London",
	"Africa/Algiers",
	"Europe/Stockholm",
	"Africa/Cairo",
	"Pacific/Kiritimati",
	"Atlantic/Cape_Verde",
	"Asia/Jakarta",
	"Asia/Tehran",
	"Asia/Kathmandu",
	"Europe/Helsinki",
	"Europe/Moscow",
	"Asia/Riyadh",
	"Africa/Nairobi",
	"Asia/Kabul",
	"America/Vancouver",
	"America/Los_Angeles",
	"Mexico/BajaNorte",
	"America/Anchorage",
	"Pacific/Pitcairn",
	"America/Winnipeg",
	"America/Chicago",
	"America/Mexico_City",
	"Chile/Continental",
	"America/New_York",
	"America/Toronto",
	"America/Havana",
	"America/Lima",
	"America/Bogota",
	"America/Halifax",
	"Canada/Newfoundland",
	"Asia/Tbilisi",
	"Asia/Karachi",
	"Australia/Eucla",
	"Atlantic/Azores",
	"Asia/Tokyo",
	"Globuzzer",
];

// Associative array for offsets and cities
var $offsetsAndCities = [];

// Function to populate the array of offsets and principal cities
var $generateOffsetsAndCities = function() {
	$now = moment().utc();
	
	// Put all the offsets in the associative array
	$.each( $offsets, function( $i, $offset ) {
		$offsetsAndCities.push({
			offset: $offset,
			cities: ""
		});
	});

	// Loop through cities and assign them to their respective offsets
	$.each( $cities, function( $i, $city ) {
		$.each( $offsetsAndCities, function( $j, $offsetAndCity ) {
			if( $offsetAndCity.offset == $now.tz( $city ).format( "Z" ) ) {
				if( $offsetAndCity.cities != "" ) {
					$offsetAndCity.cities += ", ";
				}
				$cityName = String( $city );
				
				// Remove slashes from city names
				if( $cityName.indexOf('/') != -1 ) {
					$cityName = $cityName.substring( 1 + $cityName.indexOf('/'));
				}
				
				// Replace underscores with spaces
				$cityName = $cityName.replace( /_/g, " " );
				
				// Change some city names for cosmetic reasons
				if( $cityName == "Pitcairn" ) { $cityName = "Pitcairn Islands"; }
				if( $cityName == "Continental" ) { $cityName = "Chile Continental"; }
				
				$offsetAndCity.cities += $cityName;
				
				// Break out of the loop on success
				return false;
			}
		});
	});
}


$( document ).ready( function() {
	$setup();
	$updateClocks();
	setInterval( $updateClocks, 1000 );

	$( "#localTimeSelect" ).val( $localTimezone );
	
	$( "#localTimezone" ).html( $localTimezone + " (from jstz)" );
	$( "#localOffset" ).html( $localOffset );
	
	$( "#remoteTimezone" ).html( $remoteTimezone );
	$( "#remoteOffset" ).html( $remoteOffset );
	
	$generateTimeSelects();
	
	// Set default dropdown options
	$( "#localTimeSelect" ).val( $momentLocal.tz( $localTimezone ).format( "Z" ));
	$( "#remoteTimeSelect" ).val( $momentRemote.tz( $remoteTimezone ).format( "Z" ));
		
	// Test: output cities array
	$.each( $cities, function( $i, $city ) {
		if( $( "#cities" ).html() != "" ){
			$( "#cities" ).append( ", " );
		}
		$( "#cities" ).append( "[" + $i + "] " + $city );
	});
	
	// Test: offsets and cities array
	$.each( $offsetsAndCities, function( $i, $value ) {
		$("#offsetsAndCities").append( $value.offset + ' ' +  $value.cities + '<br>' );
	});
	
	// Dump all the time zones
	$.each( moment.tz.names(), function( $i, $timezone ) {
		$( "#allTimeZones" ).append( "[" + $i + "] " +$timezone + ", " );
	});
	
	// When the user chooses an option from the local offset dropdown
	$( "#localTimeSelect" ).change( function() {
		$localOffset = $( "#localTimeSelect" ).val();
		$( "#localTimezone" ).html( "N/A" );
		$( "#localOffset" ).html( $localOffset );
		$updateClocks();
	});
	
	// When the user chooses an option from the remote offset dropdown
	$( "#remoteTimeSelect" ).change( function() {
		$remoteOffset = $( "#remoteTimeSelect" ).val();
		$( "#remoteTimezone" ).html( "N/A" );
		$( "#remoteOffset" ).html( $remoteOffset );
		$updateClocks();
	});
});


var $setup = function() {
	$moment = moment().utc();
	$localOffset = $moment.tz( $localTimezone ).format( "Z" );
	$remoteOffset = $moment.tz( $remoteTimezone ).format( "Z" );
}


var $updateClocks = function() {
	// Update the moment variables
	$moment 		= moment().utc();
	$momentLocal 	= moment( $moment ).utcOffset( String( $localOffset ));
	$momentRemote 	= moment( $moment ).utcOffset( String( $remoteOffset ));
	
	// Update the clock displays
	$( "#localTime" ).html( $momentLocal.format( $format ));
	$( "#remoteTime" ).html( $momentRemote.format( $format ));
}


var $generateTimeSelects = function() {
	$generateOffsetsAndCities();

	$.each( $offsetsAndCities, function( $i, $row ) {
		// Skip offsets without cities
		if( $row.cities == "" ) { return true; }
		
		// Display the offset "+00:00" cosmetically as "+/-00:00"
		var $cosmeticOffset = $row.offset
		if ( $cosmeticOffset == "+00:00" ) { $cosmeticOffset = "&pm;00:00"; }
		
		$option = '<option value="' + $row.offset + '">' + $cosmeticOffset + ' ' + $row.cities + '</option>';
		$( "#localTimeSelect" ).append( $option );
		$( "#remoteTimeSelect" ).append( $option );
	});
}