/**
 * @param {!cast.framework.messages.MediaInformation} mediaInformation
 */
function addBreakToMedia(mediaInformation) {
  // VMAP Ads -
  // Note - If a vmapAdsRequest is made in conjunction with manual breakClip/break entries, then vmapAdsRequest will be ignored.
  mediaInformation.vmapAdsRequest = {
    adTagUrl: 'https://pulse-demo.videoplaza.tv/proxy/distributor/v2?rt=vmap_1.0&t=standard-linears,allSupportedAds&bp=10,30&xpb=1&rnd=' + Math.floor(Math.random() * 10000)
  }

  // // VAST Ads
  // mediaInformation.breakClips = [
  //   {
  //     id: 'bc1',
  //     vastAdsRequest: {
  //       adTagUrl: 'http://pulse-demo.videoplaza.tv/proxy/distributor/v2?s=b6df7f40-842a-4fd1-82fd-77c57159c9b5&tt=p&rt=vast_2.0&rnd=' + Math.floor(Math.random() * 10000) + '&xaid=41039f00-6127-418b-a22a-0d31c46f92a5'
  //     }
  //   },
  //   {
  //     id: 'bc2',
  //     vastAdsRequest: {
  //       adTagUrl: 'http://pulse-demo.videoplaza.tv/proxy/distributor/v2?s=b6df7f40-842a-4fd1-82fd-77c57159c9b5&tt=p&rt=vast_2.0&rnd=' + Math.floor(Math.random() * 10000) + '&xaid=b8986053-2695-4bb4-8ef4-63a458fcf2e4'
  //     }
  //   },
  //   {
  //     id: 'bc3',
  //     vastAdsRequest: {
  //       adTagUrl: 'http://pulse-demo.videoplaza.tv/proxy/distributor/v2?s=b6df7f40-842a-4fd1-82fd-77c57159c9b5&tt=m&rt=vast_2.0&rnd=' + Math.floor(Math.random() * 10000) + '&xaid=6e4ba7f6-6685-4991-a4f1-c89d2f1b3752'
  //     }
  //   },
  //   {
  //     id: 'bc4',
  //     vastAdsRequest: {
  //       adTagUrl: 'http://pulse-demo.videoplaza.tv/proxy/distributor/v2?s=b6df7f40-842a-4fd1-82fd-77c57159c9b5&tt=m&rt=vast_2.0&rnd=' + Math.floor(Math.random() * 10000) + '&xgid=adefeeae-9b51-49a2-be46-13d329119fbe'
  //     }
  //   },
  //   {
  //     id: 'bc5',
  //     vastAdsRequest: {
  //       adTagUrl: 'http://pulse-demo.videoplaza.tv/proxy/distributor/v2?s=b6df7f40-842a-4fd1-82fd-77c57159c9b5&tt=po&rt=vast_2.0&rnd=' + Math.floor(Math.random() * 10000) + '&xaid=71ea2584-95cc-4792-898c-213cf2632bd6'
  //     }
  //   },
  //   {
  //     id: 'bc6',
  //     vastAdsRequest: {
  //       adTagUrl: 'http://pulse-demo.videoplaza.tv/proxy/distributor/v2?s=b6df7f40-842a-4fd1-82fd-77c57159c9b5&tt=po&rt=vast_2.0&rnd=' + Math.floor(Math.random() * 10000) + '&xaid=a1c97f74-3749-4bc0-ad2d-5da49d25f506'
  //     }
  //   }
  // ];
  //
  // mediaInformation.breaks = [
  //   {
  //     id: 'b1',
  //     breakClipIds: ['bc1', 'bc2'],
  //     position: 0 //preroll position
  //   },
  //   {
  //     id: 'b2',
  //     breakClipIds: ['bc3', 'bc4'],
  //     position: 15 //midroll at 15 seconds
  //   },
  //   {
  //     id: 'b3',
  //     breakClipIds: ['bc5', 'bc6'],
  //     position: -1 //postroll position
  //   }
  // ];
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
