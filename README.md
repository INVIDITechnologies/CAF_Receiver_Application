# Cast Application Framework (CAF) Receiver Application

## Introduction

This library allows you to serve VMAP ads from Pulse to a Chromecast device.

## Prerequisites

In order to use and test a CAF receiver application, you need the following:

1. Purchase and install a Chromecast device. 
2. Run the [Google Home](https://www.google.com/chromecast/setup/) app to set up the Chromecast device.
3. Register your Chromecast device as described at <https://developers.google.com/cast/docs/registration#devices>, so that you can use it for testing. 
4. Create a sender application which has the Cast button and user controls, such as play/pause, to control the content/ad that is playing on the Chromecast receiver. See <https://developers.google.com/cast/docs/developers#app_components> for more details.

## Getting Started

1.  Clone/Download this library.
2.  Open the [index.html](index.html) file and update the values for `vmapParameters`. `vmapParameters` is an object that contains the parameters needed to make an ad request and to filter the ads based on those parameters. The `pulseHost` parameter is mandatory. See [VMAP Parameters](docs/vmap-parameters.md) for all the possible options you can set.
3.  Build the project:
    -   npm install
    -   grunt
4.  Deploy:
    -   Host the CAF receiver application on your server in order to use it with the Chromecast device.
5. Register your application in order to run the CAF receiver on Chromecast devices. You can find the Cast developer license at <https://cast.google.com/publish/#/overview>. After registering your application, you receive an application ID that your sender application has to use to perform API calls, such as to launch a receiver application.
6. Put the receiver application ID into the sender application code. See <https://developers.google.com/cast/docs/downloads> for more details.

## Testing

1. Launch your sender application.
2. Click the Cast button in the application.
3. Select the Cast device that you registered for testing.
4. Choose which video content to play.

### Result

You should now see preroll/midroll/postroll ads, based on what you passed in the `vmapParameters`.


## Publishing the CAF Receiver Application

To publish your application, follow the steps described at <https://developers.google.com/cast/docs/registration#publish_your_application>.