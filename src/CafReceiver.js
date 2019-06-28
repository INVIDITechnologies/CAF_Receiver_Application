// Acquiring a reference to CastReceiverContext, your primary entry point to the whole Receiver SDK
const context = cast.framework.CastReceiverContext.getInstance();
context.setLoggerLevel(cast.framework.LoggerLevel.DEBUG);

// Storing a reference to the PlayerManager, the object handling playback and providing you with all 
// the hooks you need to plug-in your own custom logic
const playerManager = context.getPlayerManager();

playerManager.setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD,
  loadRequestData => {
    console.log(loadRequestData);
    // If the sender app hasn't already provided a VMAP URL, do it here.
    if(!(loadRequestData.media.vmapAdsRequest && loadRequestData.media.vmapAdsRequest.adTagUrl)) {
      // Ad break information can also be provided on the sender side by setting 'vmapAdsRequest'
      // to your chrome.cast.media.MediaInfo object when starting the cast.
      const requestUrl = createPulseVmapRequestUrl(vmapParameters.pulseHost, vmapParameters.contentMetadata, vmapParameters.requestSettings);
      console.log("requestUrl: " + requestUrl);
      // VMAP Ads
      mediaInformation.vmapAdsRequest = {
        adTagUrl: requestUrl
      }
    }
    
    return loadRequestData;
  }
);

// Workaround to fix issue where user doesn't have control to play/pause ads or content video 
// if number of ads per session exceeds 6. (https://issuetracker.google.com/issues/132323230)
playerManager.setMessageInterceptor(cast.framework.messages.MessageType.MEDIA_STATUS,
  message => {
    if (message.media && message.media.breakClips) {
      let newMessage = {};
      Object.assign(newMessage, message);
      let newMedia = {};
      Object.assign(newMedia, message.media);
      newMedia.breakClips = [];
      for (let i = 0; i < message.media.breakClips.length; i++) {
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

context.start();
