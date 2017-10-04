$( document ).ready( function() {
  // Moments
  var $moment = moment().utc();
  var $momentLocal;
  var $momentRemote;
  var $momentAppointed;

  // Timezones
  var $localTimezone = jstz.determine().name();
  var $remoteTimezone = 'Europe/Stockholm';

  // Offsets
  var $localOffset;
  var $remoteOffset;

  // Parameters from URL
  var $remoteDateURL;
  var $remoteTimeURL;

  // Operational parameters
  var $dateFormat = "YYYY-MM-DD";
  var $timeFormat = "HH:mm";
  var $defaultRemoteLocation = 'Stockholm, Sweden, Globuzzer';
  var $defaultLocalLocation = $localTimezone
  // Find the city part of the timezone
	if( $defaultLocalLocation.indexOf('/') != -1 ) {
		$defaultLocalLocation = $defaultLocalLocation.substring( 1 + $defaultLocalLocation.indexOf('/'));
	}
	
  var handleTimePickerChange = function($element) {
    if ($element.attr('id') == "localTimeInput") {
      recalculateRemote()
    } else {
      recalculateLocal()
    }
  }

  var recalculateLocal = function() {
    $input = $( "#remoteDateInput" ).val() + " " + $( "#remoteTimeInput" ).val()
    remoteTime =  moment.tz($input, $remoteTimezone);
    localTime = remoteTime.clone().tz($localTimezone);

    $( "#localDateInput" ).val( localTime.format( $dateFormat ));
    $( "#localTimeInput" ).val( localTime.format( $timeFormat ));
  }

  var recalculateRemote = function() {
    $input = $( "#localDateInput" ).val() + " " + $( "#localTimeInput" ).val()
    localTime =  moment.tz($input, $localTimezone);
    remoteTime = localTime.clone().tz($remoteTimezone);

    $( "#remoteDateInput" ).val( remoteTime.format( $dateFormat ));
    $( "#remoteTimeInput" ).val( remoteTime.format( $timeFormat ));
  }

  // Initialise datepickers
  $( '[data-toggle="datepicker"]' ).datepicker({
    format: $dateFormat,
    autoHide: true,
  });

  // Initialise timepickers
  $('.timepicker').timepicker({
    timeFormat: $timeFormat,
    interval: 60,
    change: function() {
      handleTimePickerChange($(this));
    }
  });

  // Determine offsets
  $localOffset = $moment.tz( $localTimezone ).format( "Z" );
  $remoteOffset = $moment.tz( $remoteTimezone ).format( "Z" );

  $momentLocal = moment( $moment ).utcOffset( String( $localOffset ));
  $momentRemote = moment( $moment ).utcOffset( String( $remoteOffset ));

  $( "#localPlaceSearch" ).val( $defaultLocalLocation );
  $( "#localDateInput" ).val( $momentLocal.format( $dateFormat ));
  $( "#localTimeInput" ).val( $momentLocal.format( $timeFormat ));

  $( "#remotePlaceSearch" ).val( $defaultRemoteLocation );
  $( "#remoteDateInput" ).val( $momentRemote.format( $dateFormat ));
  $( "#remoteTimeInput" ).val( $momentRemote.format( $timeFormat ));

  // initialize the autocomplete inputs
  var localInputText = document.getElementById("localPlaceSearch");
  var localAutocomplete = new google.maps.places.Autocomplete(localInputText);
  var remoteInputText = document.getElementById("remotePlaceSearch");
  var remoteAutocomplete = new google.maps.places.Autocomplete(remoteInputText);

  google.maps.event.addListener(localAutocomplete, 'place_changed', function() {
    console.log('updated local location')
    cityName = $('#localPlaceSearch').val()

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': cityName
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        Lat = results[0].geometry.location.lat();
        Lng = results[0].geometry.location.lng();

        $.ajax({
          url: 'https://maps.googleapis.com/maps/api/timezone/json?location='+ Lat +',' + Lng + '&timestamp=1458000000&key=AIzaSyBMQkiW65aW0trfzj7nvECxI4b7ajXAs7I',
          method: 'POST',
          success: function(result) {
            $localTimezone = result.timeZoneId
            console.log($localTimezone);
            $localOffset = $moment.tz( $localTimezone ).format( "Z" );
            $momentLocal = moment( $moment ).utcOffset( String( $localOffset ));

            $( "#localDateInput" ).val( $momentLocal.format( $dateFormat ));
            $( "#localTimeInput" ).val( $momentLocal.format( $timeFormat ));
            recalculateRemote();
          },
          error: function(error) {
            alert('something went wrong');
          },
        });

      } else {
        alert("Something got wrong " + status);
      }
    });

  });

  google.maps.event.addListener(remoteAutocomplete, 'place_changed', function() {
    console.log('updated remote location')
    cityName = $('#remotePlaceSearch').val()

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': cityName
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        Lat = results[0].geometry.location.lat();
        Lng = results[0].geometry.location.lng();

        $.ajax({
          url: 'https://maps.googleapis.com/maps/api/timezone/json?location='+ Lat +',' + Lng + '&timestamp=1458000000&key=AIzaSyBMQkiW65aW0trfzj7nvECxI4b7ajXAs7I',
          method: 'POST',
          success: function(result) {
            $remoteTimezone = result.timeZoneId
            console.log($remoteTimezone);
            $remoteOffset = $moment.tz( $remoteTimezone ).format( "Z" );
            $momentRemote = moment( $moment ).utcOffset( String( $remoteOffset ));

            $( "#remoteDateInput" ).val( $momentRemote.format( $dateFormat ));
            $( "#remoteTimeInput" ).val( $momentRemote.format( $timeFormat ));
            recalculateLocal();
          },
          error: function(error) {
            alert('something went wrong');
          },
        });

      } else {
        alert("Something got wrong " + status);
      }
    });
  });


  $( "#localPlaceSearch, #remotePlaceSearch" ).on('click', function() {
    $(this).val('');
  });

  // Any change in local date or time triggers an update of the remote
  $( ".localInput" ).on('change', function() {
    recalculateRemote()
  });

  // Any change in remote date or time triggers an update of the local
  $( ".remoteInput" ).on('change', function() {
    recalculateLocal()
  });
  
  // The Calendar Add button
  $( ".calendar" ).icalendar({
  	start: new Date( $momentLocal.utc().format() ), 
    end: new Date( moment( $momentLocal.utc()).add(1, 'h') ), 
    title: 'Globuzzer example event!'
  });
    
});
