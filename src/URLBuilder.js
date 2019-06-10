var packageVersion = 'NODE_PKG_VERSION_PLACEHOLDER';

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
};

ContentForm = {
  /** Short form content. Typically used for news summaries, game highlights and the like. */
  SHORT_FORM: 'shortForm',
  /** Long form content. Typically used for feature films, TV series, complete games, and the like. */
  LONG_FORM: 'longForm'
};

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
  uri += '&cv=cast_' + packageVersion;

  if (contentMetadata) {
    //start contentMetadata stuff

    //Flags
    if (contentMetadata.hasOwnProperty('flags') && validateArray('contentMetadata.flags', contentMetadata.flags)) {
      uri += '&f=' + encodeURIComponent(contentMetadata.flags);
    }

    //Tags
    if (contentMetadata.hasOwnProperty('tags') && validateArray('contentMetadata.tags', contentMetadata.tags)) {
      uri += '&t=' + encodeURIComponent(contentMetadata.tags);
    }

    //start shares stuff
    var shares = '';
    if (contentMetadata.hasOwnProperty('category') && validateString('contentMetadata.category', contentMetadata.category)) {
      shares += contentMetadata.category;
    }
    if (contentMetadata.hasOwnProperty('contentPartner') && validateString('contentMetadata.contentPartner', contentMetadata.contentPartner)) {
      shares = (shares) ? shares += ',' + contentMetadata.contentPartner : contentMetadata.contentPartner;
    }
    if (shares) {
      uri += '&s=' + encodeURIComponent(shares);
    }
    //end shares stuff

    if (contentMetadata.hasOwnProperty('contentForm') && validateContentForm('contentMetadata.contentForm', contentMetadata.contentForm)) {

      uri += '&cf=' + translateContentForm(contentMetadata.contentForm);
    }

    if (contentMetadata.hasOwnProperty('id') && validateString('contentMetadata.id', contentMetadata.id)) {
      uri += '&ci=' + encodeURIComponent(contentMetadata.id);
    }

    // TODO: Default value for duration is zero. In case user sends Zero or doesn't set the optionaly parameter we will not send the duration in the request. Check with product !!
    if (contentMetadata.hasOwnProperty('duration') && validateNumber('contentMetadata.duration', contentMetadata.duration)) {
      uri += '&cd=' + contentMetadata.duration;
    }

    if (contentMetadata.hasOwnProperty('customParameters') && Object.keys(contentMetadata.customParameters).length > 0) {
      validateCustomParameters('contentMetadata.customParameters',contentMetadata.customParameters);
      //				ALLOWED KEY CHARACTERS:
      //				abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_~-.
      var regex = /[^A-Za-z0-9_~\-.]/; //Finds not allowed characters

      for (var key in contentMetadata.customParameters) {
        if (contentMetadata.customParameters.hasOwnProperty(key) && !regex.test(key)) {
          uri += '&cp.' + key + '=' + encodeURIComponent(contentMetadata.customParameters[key]);
        }
      }
    }
    //end contentMetadata stuff
  }

  //CustomParameters validation
  function validateCustomParameters(key, value) {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      for (var prop in value) {

        // TODO: SYNC WITH PRODUCT on should we skip properties with empty key or throw ERROR
        if (prop) {
          if (typeof(prop) !== 'string') {
            console.warn("InvalidType of contentMetadata.customParameters property " + prop + ". Should be string but is " + typeof(contentMetadata.customParameters[prop]));
          }
        } else {
          console.log("Empty contentMetadata.customParameters key");
        }
      }
    } else {
      console.warn("InvalidType of contentMetadata.customParameters, should be Object but is " + Object.prototype.toString.call(contentMetadata.customParameters));
    }
  }

  if (requestSettings) {
    //start requestSettings stuff

    if (requestSettings.hasOwnProperty('width') && validateNumber('requestSettings.width', requestSettings.width)) {
      uri += '&vwt=' + requestSettings.width;
    }

    if (requestSettings.hasOwnProperty('height') && validateNumber('requestSettings.height', requestSettings.height)) {
      uri += '&vht=' + requestSettings.height;
    }

    if (requestSettings.hasOwnProperty('maxBitRate') && validateNumber('requestSettings.maxBitRate', requestSettings.maxBitRate)) {
      uri += '&vbw=' + requestSettings.maxBitRate;
    }

    if (requestSettings.hasOwnProperty('linearSlotSize') && validateNumber('requestSettings.linearSlotSize', requestSettings.linearSlotSize)) {
      uri += '&pp=' + requestSettings.linearSlotSize;
      uri += '&mp=' + requestSettings.linearSlotSize;
      uri += '&pop=' + requestSettings.linearSlotSize;
    }

    if (requestSettings.hasOwnProperty('insertionPointFilter') && validateArray('requestSettings.insertionPointFilter', requestSettings.insertionPointFilter)) {
      var ticketTypes = [];
      for (var i = 0; i < requestSettings.insertionPointFilter.length; i++) {
        if (validateInsertionPointFilter(requestSettings.insertionPointFilter[i], i)) {
          ticketTypes.push(translateInsertionPointType(requestSettings.insertionPointFilter[i]));
          if (requestSettings.insertionPointFilter[i] === InsertionPointType.PLAYBACK_POSITION) {
            addLinearPlaybackPosition();
          }
        }
      }

      // Remove duplicate insertion points
      ticketTypes = ticketTypes.filter(function(v, i, a) {
        return (a.indexOf(v) == i);
      });

      uri += '&tt=' + ticketTypes.join(',');
    }

    if (requestSettings.hasOwnProperty('maxLinearBreakDuration') && validateNumber('requestSettings.maxLinearBreakDuration', requestSettings.maxLinearBreakDuration)) {
      uri += '&tbbl=' + requestSettings.maxLinearBreakDuration;
    }

    if (requestSettings.hasOwnProperty('persistentId') && validateString('requestSettings.persistentId', requestSettings.persistentId)) {
      uri += '&pid=' + encodeURIComponent(requestSettings.persistentId);
    }

    if (requestSettings.hasOwnProperty('deviceContainer') && validateString('requestSettings.deviceContainer', requestSettings.deviceContainer)) {
      uri += '&dcid=' + encodeURIComponent(requestSettings.deviceContainer);
    }

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

    function addLinearPlaybackPosition() {
      if (requestSettings.hasOwnProperty('linearPlaybackPositions') && validateArray('requestSettings.linearPlaybackPositions', requestSettings.linearPlaybackPositions)) {
        var breakPoints = [];
        for (j = 0; j < requestSettings.linearPlaybackPositions.length; j++) {
          if (typeof(requestSettings.linearPlaybackPositions[j]) === 'number') {
            breakPoints.push(requestSettings.linearPlaybackPositions[j]);
          } else {
            console.warn("Invalid type of requestSettings.linearPlaybackPositions at index " + j + ". Should be of type number but is " + typeof(requestSettings.linearPlaybackPositions[j]))
            }
          }
          uri += '&bp=' + breakPoints.join(',');
        }
      }
  }
  //end requestSettings Stuff

  return uri + '&rnd=' + Math.floor(Math.random() * 10000);
}

  function validateArray(key, value) {
    if (Object.prototype.toString.call(value) === '[object Array]') {
      return (value.length > 0);
    } else {
      console.warn("Invalid type of " + key + " : should be 'Array'");
      return false;
    }
  }

  function validateNumber(key, value) {
    var isValid = false;
    if (typeof(value) === "number") {
      if (value >= 0) {
        isValid = true;
      } else {
        console.warn(key + " value must be 0 or greater, but is " + value);
      }
    } else {
      console.warn("Invalid type of " + key + " : should be 'Number'");
    }
    return isValid;
  }

  function validateString(key, value) {
    var isValid = false;
    if (typeof(value) === "string") {
      if (value.length > 0) {
        isValid = true;
      }
    } else {
      console.warn("Invalid type of " + key + " : should be 'String'");
    }
    return isValid;
  }

  function validateContentForm(key, value) {
    if (validateString(key, value)) {
      if (value === ContentForm.SHORT_FORM || value === ContentForm.LONG_FORM) {
        return true;
      } else {
        console.warn("Invalid value of contentMetadata.contentForm. Accepted values are longForm or shortForm");
      }
    }
    return false;
  }

  function validateInsertionPointFilter(value, index) {
    if (typeof(value) === 'string') {
      if (value === InsertionPointType.ON_BEFORE_CONTENT ||
        value === InsertionPointType.PLAYBACK_POSITION ||
        value === InsertionPointType.ON_CONTENT_END) {
        return true;
      } else {
        console.warn("Invalid Value of requestSettings.insertionPointFilter at index " + index + ". Accepted values are onBeforeContent, playbackPosition, onContentEnd, onPause or playbackTime, but is " + value);
      }
    } else {
      console.warn("Invalid type of requestSettings.insertionPointFilter at index " + index + ". Should be of type string but is " + typeof(value));
      return false;
    }
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
