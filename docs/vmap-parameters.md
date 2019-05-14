# VMAP Parameters

The vmapParameters object is a combination of pulseHost, contentMetadata and requestSettings that needs to be passed to ad request and filter ads:

* `pulseHost` (required): &lt;string> Full hostname of the Pulse account to use.
* `contentMetadata` : &lt;object> An object containing parameters that relate to what type of ad is returned. Parameters details are described below ([contentMetadata](#content-meta-data))
* `requestSettings` : &lt;object> An object containing parameters as described under section ([requestSettings](#request-settings))

## <a name="content-meta-data"></a>contentMetadata
* `tags` : &lt;string[]> Pulse content tags, used to target specific ads.
* `flags` : &lt;string[]> Pulse flags. Because flags override Pulse's ad insertion policy, they should be used with caution. For more information talk to your contact at INVIDI. Supported flags: nocom, noprerolls, nomidrolls, nopostrolls, nooverlays.
* `category` : &lt;string> Content category is used by Pulse to target ads and determine the ad insertion policy. The content category is represented by either its unique id or one of its aliases set in Pulse.
* `contentPartner` : &lt;string> Pulse content partner. Content partners can be used by Pulse to target ads. The content partner is represented by either its unique id or one of its aliases set in Pulse.
* `contentForm` : &lt;string> Content Form indicates if the video content is short or long. Depending on this value, different ad insertion policies may apply to the ad request. Possible values are :
 1. 'shortForm' [Short form content. Typically used for news summaries, game highlights and the like.]
 2. 'longForm' [Long form content. Typically used for feature films, TV series, complete games, and the like.]
* `id` : &lt;string>  Pulse content id. Id is used to identify the content to third parties.
* `duration` : &lt;number>  The duration of the content selected by the viewer. This value cannot be negative.
* `customParameters` : &lt;object>  The custom parameters to add to the session request. Parameters with names containing invalid characters are omitted. These custom parameters are added to the ad server request URL in the style of "cp.[parameter_name]=[parameter_value]".

## <a name="request-settings"></a>requestSettings
* `width` : &lt;number>  Width in pixels of the video area where ads should be shown.
* `height` : &lt;number>  Height in pixels of the video area where ads should be shown.
* `maxBitRate` : &lt;number>  The maximum bitrate of the media files in the ad response.
* `linearSlotSize` : &lt;number>  Overrides the number of linear ads per slot.
* `insertionPointFilter` : &lt;string[]> These will determine when the received ads are to be played.If not set, the request is for every kind of insertion point. If set, only the types provided are requested. Possible values are:
   1. 'onBeforeContent' [Request ads to be played before the content, or 'preroll' ads.]
   2. 'playbackPosition' [Request ads to be played during the content, or 'midroll' ads; don't forget to specify which positions the ads are to be played at, in the linearPlaybackPositions field.]
   3. 'onContentEnd' [Request ads to be played after the content, or 'postroll' ads.]
* `linearPlaybackPositions` : &lt;number[]> An array of numbers which defines at what points in time linear ads should be shown.
* `maxLinearBreakDuration` : &lt;number>  The maximum length (in seconds) of linear ad breaks.
* `persistentId` : &lt;string> Pulse persistent id; used for unique user tracking.
* `deviceContainer` : &lt;string> Pulse device container.
* `enableGdpr` : &lt;Boolean> Set to true if the ad request is subject to GDPR regulations. See [API Documentation](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/v1.1 Implementation Guidelines.md) for more information.
* `gdprConsentString` : &lt;string[]> Pass in the user's URL safe and base64 encoded consent string related to GDPR regulations, which may be obtained through the Consent Management Provider (CMP) JS API. This string is built up according to the data structure developed by the GDPR Consent Working Group under the auspices of IAB Europe. The data structure specification can be found at [Consent string and vendor list formats v1.1 Final](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/Consent string and vendor list formats v1.1 Final.md). For more information on the API, refer to [CMP JS API v1.1 Final](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP JS API v1.1 Final.md) .
* `gdprPersonalDataIncluded` : &lt;Boolean> Set to true if you are passing in personal information when creating the ad request to Pulse. The only location where it is possible to pass in personal information is in the ([customParameters](#custom-Parameters))
* `startAdTimeout` : &lt;number> The maximum amount of time the player or integration should wait for the ad to start playback before reporting inventory.
* `thirdPartyTimeout` : &lt;number> The maximum amount of time the player or integration should wait to unwrap and load a third party ad before reporting inventory.
* `totalPassbackTimeout` : &lt;number> The maximum amount of time the passback player should wait to find a working ad in the passback chain before moving to the last ad in the chain or reporting inventory.
