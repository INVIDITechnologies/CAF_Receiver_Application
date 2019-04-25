/**
 * @param {!cast.framework.messages.MediaInformation} mediaInformation
 */
function addBreakToMedia(mediaInformation) {
  mediaInformation.breakClips = [
  {
    id: 'bc1',
    vastAdsRequest:{
      adTagUrl: 'http://pulse-demo.videoplaza.tv/proxy/distributor/v2?s=b6df7f40-842a-4fd1-82fd-77c57159c9b5&tt=m&rt=vast_2.0&rnd=' + Math.floor(Math.random()* 10000) + '&xaid=6e4ba7f6-6685-4991-a4f1-c89d2f1b3752'
    }
  },
  {
    id: 'bc2',
    vastAdsRequest:{
      adTagUrl: 'http://pulse-demo.videoplaza.tv/proxy/distributor/v2?s=b6df7f40-842a-4fd1-82fd-77c57159c9b5&tt=m&rt=vast_2.0&rnd=' + Math.floor(Math.random()* 10000) + '&xgid=adefeeae-9b51-49a2-be46-13d329119fbe'
    }
  }];
  
  mediaInformation.breaks = [
  {
    id: 'b1',
    breakClipIds: ['bc1', 'bc2'],
    position: 15
  }];
}


// acquiring a reference to CastReceiverContext, your primary entry point to the whole Receiver SDK
var context = cast.framework.CastReceiverContext.getInstance();
//storing a reference to the PlayerManager, the object handling playback and providing you with all the hooks you need to plug-in your own custom logic
var playerManager = context.getPlayerManager();

playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    loadRequestData => {
        addBreakToMedia(loadRequestData.media);
        return loadRequestData;
    }
);

//Initializing the SDK by calling start() on CastReceiverContext
context.start();
