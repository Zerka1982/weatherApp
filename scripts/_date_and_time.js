// Moments
var $moment = moment().utc();
var $momentLocal;
var $momentRemote;
var $momentAppointed;

// Timezones
var $localTimezone = jstz.determine().name();
var $remoteTimezone = "Globuzzer";

// Offsets
var $localOffset;
var $remoteOffset;

// Parameters from URL
var $remoteDateURL;
var $remoteTimeURL;

// Operational parameters
var $dateFormat = "YYYY-MM-DD";
var $timeFormat = "HH:mm";

// Add "Globuzzer" as an alias to timezone "Europe/Stockholm"
moment.tz.link('Globuzzer|Europe/Stockholm');


$( document ).ready( function() {

	// Initialise datepickers
	$( '[data-toggle="datepicker"]' ).datepicker({
		format: $dateFormat,
		autoHide: true,
	});

	// Initialise timepickers
	$('.timepicker').timepicker({
		timeFormat: $timeFormat,
		interval: 60,
	});

	// Determine offsets
	$localOffset = $moment.tz( $localTimezone ).format( "Z" );
	$( "#localOffsetDebug" ).html( $localOffset );

	$remoteOffset = $moment.tz( $remoteTimezone ).format( "Z" );
	$( "#remoteOffsetDebug" ).html( $remoteOffset );

	$momentLocal = moment( $moment ).utcOffset( String( $localOffset ));
	$momentRemote = moment( $moment ).utcOffset( String( $remoteOffset ));

	// Pre-populate local fields
	// Auto-detect local place name
	$localLocation = $localTimezone
	// Find the city part of the timezone
	if( $localLocation.indexOf('/') != -1 ) {
		$localLocation = $localLocation.substring( 1 + $localLocation.indexOf('/'));
	}
	$( "#localPlaceSearch" ).val( $localLocation );
	$( "#localDateInput" ).val( $momentLocal.format( $dateFormat ));
	$( "#localTimeInput" ).val( $momentLocal.format( $timeFormat ));

	// Testing: the update local location button
	$( "#updateLocalLocation" ).click( function() {
		$updateLocalLocation();
	});

	// Testing: print debug info
	$( "#localTimezoneDebug" ).html( $localTimezone );
	$( "#remoteTimezoneDebug" ).html( $remoteTimezone );

	// When the user clicks the local "Recalculate Local" button
	$( "#localRecalculate" ).click( function() {
		recalculateLocal();
	});

	// Any change in local date or time triggers an update of the remote
	$( ".localInput" ).change( function() {
		alert( 'Local change' );
	});

	// When the user clicks the remote "Recalculate Remote" button
	$( "#remoteRecalculate" ).click( function() {
		recalculateRemote();
	});

	// Any change in remote date or time triggers an update of the local
	$( ".remoteInput" ).change( function() {
		alert( 'Remote change' );
	});

});


var recalculateLocal = function() {
	$input = $( "#remoteDateInput" ).val() + " " + $( "#remoteTimeInput" ).val() + $localOffset;
	$momentAppointed = moment( $input ).utcOffset( String( $localOffset ));
	$( "#localDateInput" ).val( $momentAppointed.format( $dateFormat ));
	$( "#localTimeInput" ).val( $momentAppointed.format( $timeFormat ));
}


var recalculateRemote = function() {
	$input = $( "#localDateInput" ).val() + " " + $( "#localTimeInput" ).val() + $remoteOffset;
	$momentAppointed = moment( $input ).utcOffset( String( $remoteOffset ));
	$( "#remoteDateInput" ).val( $momentAppointed.format( $dateFormat ));
	$( "#remoteTimeInput" ).val( $momentAppointed.format( $timeFormat ));
}


var $updateLocalLocation = function() {
	var timeZone = new XMLHttpRequest();
	var url = "http://api.timezonedb.com/v2/list-time-zone?key=9OMIDMSCMG7D&format=json";
	var data = '{ "countryName":"Sweden" }';
	var callback = function( result, status, xhr ) {
		$( "#localPlaceDebug" ).html( result.zones[0].countryName );
	};

	$.getJSON( url, data, callback );

}


// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&language=pt_BR&key=AIzaSyDwkHUAgNRZt2ct0FBw4V8EM_t
