// acquiring a reference to CastReceiverContext, your primary entry point to the whole Receiver SDK
var context = cast.framework.CastReceiverContext.getInstance();
//storing a reference to the PlayerManager, the object handling playback and providing you with all the hooks you need to plug-in your own custom logic
var playerManager = context.getPlayerManager();
//Initializing the SDK by calling start() on CastReceiverContext
context.start();
