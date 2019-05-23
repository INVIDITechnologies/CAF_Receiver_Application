# VMAP Parameters

The `vmapParameters` object is a combination of `pulseHost`, `contentMetadata`, and `requestSettings` that need to be passed in to make an ad request and to filter ads.

-   `pulseHost` (string): Required, full hostname of your Pulse account.
-   `contentMetadata` (object): An object containing the parameters related to the specific video content's rules, targeting options, and metadata. Parameter details are described below under **contentMetadata**.
-   `requestSettings` (object): An object containing the parameters related to the environment in which the requested ad will play. Parameter details are described below under **requestSettings**.

## contentMetadata

-   `tags` (string): Pulse content tags, used for targeting purposes.
-   `flags` (string): Pulse flags, used to apply special rules and conditions to an ad request. Flags override Pulse's ad insertion policy, so they should be used with caution. For more information, talk to your contact at INVIDI. Supported flags are: 

    - `nocom`: No ads are returned at all
    - `noprerolls`: No pre-rolls are returned
    - `nomidrolls`: No mid-rolls are returned 
    - `nopostrolls`: No post-rolls are returned
    - `nooverlays`: No overlays are returned

-   `category` (string): Pulse content category, used to associate content with a category that has been defined for your account in the Pulse UI, and determine the ad insertion policy. The content category is represented either by its unique ID or one of its aliases set in Pulse.
-   `contentPartner` (string): Pulse content partner, used for targeting purposes. The content partner is represented either by its unique ID or one of its aliases set in Pulse.
-   `contentForm` (string): Content form indicates whether the video content is short or long. Depending on this value, different ad insertion policies may apply to the ad request. Possible values are:
    -  `shortForm`(string): Short form content. Typically used for news summaries, game highlights and similar.
    -  `longForm`(string): Long form content. Typically used for feature films, TV series, complete games and similar.
-   `id` (string):  Pulse content ID, used for forwarding the ID of the video content to third party trackers. 
-   `duration` (number):  The total duration of the video content selected by the viewer. This value cannot be negative.
-   `customParameters` (object): The custom parameters to add to the session request. Parameters with names containing invalid characters are omitted. These custom parameters are added to the ad request URL in the form of "cp.[parameter_name]=[parameter_value]".

## requestSettings

-   `width` (number):  The width of the video player, in pixels. This is used to determine the best size of the delivered media files.
-   `height` (number): The height of the video player, in pixels. This is used to determine the best size of the delivered media files.
-   `maxBitRate` (number): The maximum bitrate in kbps of the media files in the ad response.
-   `linearSlotSize` (number): This overrides the number of linear ads per slot.
-   `insertionPointFilter` (string): This is the point, in relation to the main content, where the ad spot should be inserted. If not set, the request is for every kind of insertion point. If set, only the types provided are requested. Possible values are:
    -  `onBeforeContent` (string): Request linear ads that are played before the main content starts (pre-rolls).
    -  `playbackPosition` (string): Request linear ads that are to be displayed at a certain point during the main content (mid-rolls). This value requires that you also set the playback position in the `linearPlaybackPositions` field.
    -  `onContentEnd` (string): Request linear ads that are played after the main content ends (post-rolls).
-   `linearPlaybackPositions` (number): An array of numbers which defines at what points in time linear ads should be shown.
-   `maxLinearBreakDuration` (number): The maximum duration for a linear ad break in seconds.
-   `persistentId` (string): Pulse persistent identifier, used for unique user tracking.
-   `deviceContainer` (string): Pulse device container.
-   `enableGdpr` (boolean): This parameter indicates whether an ad request is subject to GDRP regulations. See [IAB Europe Transparency and Consent Framework Implementation Guidelines](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/v1.1 Implementation Guidelines.md) for more information.
-   `gdprConsentString` (string): Set this parameter to the user's URL safe and base64 encoded consent string, which you retrieve from the Consent Management Provider (CMP) JS API. The consent string is built up according to the following specification: [Consent String and Vendor List Format](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/Consent string and vendor list formats v1.1 Final.md). For more information on the API, see [Consent Management Provider JavaScript API v1.1](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP JS API v1.1 Final.md).
-   `gdprPersonalDataIncluded` (boolean): This parameter indicates whether the ad request's URL parameters contain any personal data. The only location where you can enter personal data in the request is through the custom parameters of the content metadata settings.
-   `startAdTimeout` (number): This parameter allows you to override the start ad timeout set by your Account Manager when first setting up your Pulse account, and indicates the maximum amount of time, in seconds, that the player or integration should wait for the ad to start playback before reporting inventory.
-   `thirdPartyTimeout` (number): This parameter allows you to override the third party timeout set by your Account Manager when first setting up your Pulse account, and indicates the maximum amount of time, in seconds, that the player or integration should wait to unwrap and load a third party ad before reporting inventory.
-   `totalPassbackTimeout` (number): This parameter allows you to override the total passback timeout set by your Account Manager when first setting up your Pulse account, and indicates the maximum amount of time, in seconds, that the passback player should wait to find a working ad in the passback chain before moving to the last ad in the chain or reporting inventory.

