## Project Structure:
#### [index.html](../index.html):
1. Load the google's cast receiver framework.
<script type="text/javascript" src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"></script>
2. Add cast-media-player element  that represents the built-in player UI provided with CAF.
3. Link stylesheet [style.css](../CSS/style.css) for the cast-media-player elements to style various UI elements such  as background-image, splash-image etc.
   See https://developers.google.com/cast/docs/caf_receiver/customize_ui to know more about available customization parameters.
4. Pass the vmap parameters i.e. pulseHost, contentMetadata, requestSettings. See [VMAP Parameters](docs/vmap-parameters.md) for all the possible options you can set.

#### [URLBuilder.js](../src/URLBuilder.js):
Have 'createPulseVmapRequestUrl' method to create VMAP request to Pulse backend using the vmap parameters.
we append pf=cast in the request url to indicate the platform/device that is requesting ad is "chromecast". This information is helpful for asset filtering and tracking purposes.
The pf value filters out assets according to the encoding profiles linked to the device containers set up for your account.

#### [CAFReceiver.js](../src/CAFReceiver.js):
1. code to customize receiver app by intercepting messages and handling events.
2. call to initialize the CAF reciever SDK.
