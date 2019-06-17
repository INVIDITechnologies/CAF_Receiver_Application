/**
 * @param {!cast.framework.messages.MediaInformation} mediaInformation
 */
function addBreakToMedia(mediaInformation) {
  // VMAP Ads -
  mediaInformation.vmapAdsRequest = {
    adTagUrl: createAdTagUrl(vmapParameters.pulseHost, vmapParameters.contentMetadata, vmapParameters.requestSettings)
  }

}

// acquiring a reference to CastReceiverContext, your primary entry point to the whole Receiver SDK
var context = cast.framework.CastReceiverContext.getInstance();
context.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

//storing a reference to the PlayerManager, the object handling playback and providing you with all the hooks you need to plug-in your own custom logic
var playerManager = context.getPlayerManager();

playerManager.setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD,
  loadRequestData => {
    addBreakToMedia(loadRequestData.media);
    return loadRequestData;
  }
);

//Workaround to fix issue where user doesn't have control to play/pause ads or content video if number of ads per session exceeds 6. (https://issuetracker.google.com/issues/132323230)
playerManager.setMessageInterceptor(cast.framework.messages.MessageType.MEDIA_STATUS,
  message => {
    if (message.media && message.media.breakClips) {
      let newMessage = {};
      Object.assign(newMessage, message);
      let newMedia = {}
      Object.assign(newMedia, message.media);
      newMedia.breakClips = [];
      for (i = 0; i < message.media.breakClips.length; i++) {
        let newClip = {};
        Object.assign(newClip, message.media.breakClips[i]);
        newClip.vastAdsRequest = undefined;
        newMedia.breakClips.push(newClip);
      }
      newMessage.media = newMedia;
      return newMessage;
    }
    return message;
  }
);

//Initializing the SDK by calling start() on CastReceiverContext
context.start();
