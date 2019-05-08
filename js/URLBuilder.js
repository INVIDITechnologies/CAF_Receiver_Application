/**
 * All valid types you can pass in the insertionPointFilter list in requestSettings.
 * These will determine when the received ads are to be played.
 */
InsertionPointType = {
  /** Request ads to be played before the content, or 'preroll' ads. */
  ON_BEFORE_CONTENT: "onBeforeContent",
  /** Request ads to be played during the content, or 'midroll' ads; don't forget to specify which positions the ads are to be played at, in the linearPlaybackPositions field.
      Additionality, specifying positions in the nonLinearPlaybackPositions field will request overlay ads. */
  PLAYBACK_POSITION: "playbackPosition",
  /** Request ads to be played after the content, or 'postroll' ads. */
  ON_CONTENT_END: "onContentEnd",
  // /** Request ads to be played when the content is paused. */
  // ON_PAUSE: "onPause",
  // /** Request ads to be displayed based on the content duration. */
  // PLAYBACK_TIME: "playbackTime"
};
ContentForm = {
    /** Short form content. Typically used for news summaries, game highlights and the like. */
    SHORT_FORM: 'shortForm',
    /** Long form content. Typically used for feature films, TV series, complete games, and the like. */
    LONG_FORM: 'longForm'
};

function getVersion() {
//ToDo: Implement to get the Library version of caf_receiver
}

//function createAdTagUrl(contentMetadata, uri) {
function createAdTagUrl(pulseHost, contentMetadata, requestSettings) {

  var uri = pulseHost;

  if (uri.indexOf('http://') === -1 && uri.indexOf('https://') === -1) {
      uri = 'http://' + uri;
  }

  if (uri.lastIndexOf('/') !== uri.length - 1) {
      uri += '/';
  }

  uri += 'proxy/distributor/v2?';
  uri += 'rt=vmap_1.0';
  uri += '&pf=cast';
  uri += '&cv=cast_' + getVersion();

  if (contentMetadata) {
    //start contentMetadata stuff
    if (contentMetadata.hasOwnProperty('flags') && contentMetadata.flags.length > 0) {
      uri += '&f=' + contentMetadata.flags;
    }

    if (contentMetadata.hasOwnProperty('tags') && contentMetadata.tags.length > 0) {
      uri += '&t=' + encodeURIComponent(contentMetadata.tags);
    }

    //start shares stuff
    var shares = '';
    if (contentMetadata.hasOwnProperty('category') && contentMetadata.category.length > 0) {
      shares += contentMetadata.category;
    }
    if (contentMetadata.hasOwnProperty('contentPartner') && contentMetadata.contentPartner) {
      shares = (shares) ? shares += ',' + contentMetadata.contentPartner : contentMetadata.contentPartner;
    }
    if (shares) {
      uri += '&s=' + encodeURIComponent(shares);
    }
    //end shares stuff

    if (contentMetadata.hasOwnProperty('contentForm') && contentMetadata.contentForm) {

      uri += '&cf=' + translateContentForm(contentMetadata.contentForm);
    }

    if (contentMetadata.hasOwnProperty('id') && contentMetadata.id) {
      uri += '&ci=' + encodeURIComponent(contentMetadata.id);
    }

    // TODO: Default value for duration is zero. In case user sends Zero or doesn't set the optionaly parameter we will not send the duration in the request. Check with product !!
    if (contentMetadata.hasOwnProperty('duration') && contentMetadata.duration) {
      uri += '&cd=' + contentMetadata.duration;
    }
    //end contentMetadata stuff
  }


  if (requestSettings) {
    //start requestSettings stuff
    if (typeof requestSettings.enableGdpr === "boolean") {
      uri += '&gdpr=' + (requestSettings.enableGdpr ? 1 : 0);
    }

    if (typeof requestSettings.gdprConsentString === "string" &&
      requestSettings.gdprConsentString.length > 0 &&
      requestSettings.gdprConsentString.indexOf(' ') === -1) {
      uri += '&gdpr_consent=' + encodeURIComponent(requestSettings.gdprConsentString);
    }

    if (typeof requestSettings.gdprPersonalDataIncluded === "boolean") {
      uri += '&gdpr_pd=' + (requestSettings.gdprPersonalDataIncluded ? 1 : 0);
    }

    if (requestSettings.hasOwnProperty('startAdTimeout') && requestSettings.startAdTimeout) {
      uri += '&sat=' + requestSettings.startAdTimeout;
    }

    if (requestSettings.hasOwnProperty('thirdPartyTimeout') && requestSettings.thirdPartyTimeout) {
      uri += '&tpt=' + requestSettings.thirdPartyTimeout;
    }

    if (requestSettings.hasOwnProperty('totalPassbackTimeout') && requestSettings.totalPassbackTimeout) {
      uri += '&tpat=' + requestSettings.totalPassbackTimeout;
    }

    // TODO: Check with product the behavior when Width is ZERO
    if (requestSettings.hasOwnProperty('width') && requestSettings.width) {
      uri += '&vwt=' + requestSettings.width;
    }

    // TODO: Check with product the behavior when Height is ZERO
    if (requestSettings.hasOwnProperty('height') && requestSettings.height) {
      uri += '&vht=' + requestSettings.height;
    }

    if (requestSettings.hasOwnProperty('maxBitRate') && requestSettings.maxBitRate) {
      uri += '&vbw=' + requestSettings.maxBitRate;
    }

    if (requestSettings.hasOwnProperty('linearSlotSize') && requestSettings.linearSlotSize) {
      uri += '&pp=' + requestSettings.linearSlotSize;
      uri += '&mp=' + requestSettings.linearSlotSize;
      uri += '&pop=' + requestSettings.linearSlotSize;
    }

    if (requestSettings.hasOwnProperty('insertionPointFilter') && requestSettings.insertionPointFilter.length > 0) {
      var ticketTypes = [];

      for (var i = 0; i < requestSettings.insertionPointFilter.length; i++) {
        try {
          ticketTypes.push(translateInsertionPointType(requestSettings.insertionPointFilter[i]));

          if (requestSettings.insertionPointFilter[i] === InsertionPointType.PLAYBACK_POSITION) {

            if (requestSettings.hasOwnProperty('linearPlaybackPositions') && requestSettings.linearPlaybackPositions) {
              uri += '&bp=' + encodeURIComponent(requestSettings.linearPlaybackPositions);
            }

          }
        } catch (e) {
          /* Don't request unknown insertion points */
        }
      }

      // Remove duplicate insertion points
      ticketTypes = ticketTypes.filter(function(v, i, a) {
        return (a.indexOf(v) == i);
      });

      uri += '&tt=' + ticketTypes.join(',');
    }

    if (requestSettings.hasOwnProperty('maxLinearBreakDuration') && requestSettings.maxLinearBreakDuration) {
      uri += '&tbbl=' + requestSettings.maxLinearBreakDuration;
    }

    if (requestSettings.hasOwnProperty('persistentId') && requestSettings.persistentId) {
        uri += '&pid=' + encodeURIComponent(requestSettings.persistentId);
    }
    if (requestSettings.hasOwnProperty('deviceContainer') && requestSettings.deviceContainer) {
        uri += '&dcid=' + encodeURIComponent(requestSettings.deviceContainer);
    }
  }
  //end requestSettings Stuff
  return uri + '&rnd=' + Math.floor(Math.random() * 10000);
}

function translateContentForm(cf) {
  switch (cf) {
    case ContentForm.LONG_FORM:
      return 'long_form';
    case ContentForm.SHORT_FORM:
      return 'short_form';
  }
}

function translateInsertionPointType(insertionPointType) {
  switch (insertionPointType) {
    case InsertionPointType.ON_BEFORE_CONTENT:
      return 'p';
    case InsertionPointType.PLAYBACK_POSITION:
      return 'm';
    case InsertionPointType.ON_CONTENT_END:
      return 'po';
      // case InsertionPointType.ON_PAUSE:   //Pause ads are not supported for VMAP format
      //     return 'pa';
      // case InsertionPointType.PLAYBACK_TIME:  //To check if google cast framework supports overlay ads in VMAP format. If, yes then we may support it later.
      //     return 'o';
    default:
      throw new Error('InvalidInsertionPointType passed');
  }
}
