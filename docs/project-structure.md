## Project Structure
#### [index.html](../index.html)

1. Load the Google's Cast receiver framework: `<script type="text/javascript" src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"></script>`
2. Add `cast-media-player` element that represents the built-in player UI provided with CAF.
3. Link [style.css](../css/style.css) for the `cast-media-player` element to style various UI elements, such as background-image, splash-image, etc.
   See https://developers.google.com/cast/docs/caf_receiver/customize_ui for more information on the available customization parameters.
4. Pass in the VMAP parameters: `pulseHost`, `contentMetadata`, and `requestSettings`. See [VMAP Parameters](vmap-parameters.md) for all the possible options you can set.

#### [URLBuilder.js](../src/URLBuilder.js)

Use the `createPulseVmapRequestUrl` method to create a VMAP request to Pulse backend. We append `pf=cast` in the request URL to indicate that Chromecast is the platform/device requesting the ads. 
This information is helpful for asset filtering and tracking purposes. The `pf` value filters out assets according to the encoding profiles linked to the device containers set up for your account.

**Note**: If you are not using our URL builder helper script, you need to pass in the `pf` parameter accordingly.

#### [CafReceiver.js](../src/CafReceiver.js)

* Code to customize receiver app by intercepting messages and handling events.
* Call to initialize the CAF receiver SDK.
