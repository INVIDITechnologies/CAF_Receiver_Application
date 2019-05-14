# CAF Receiver Application

## Introduction
This Library allows you to serve VMAP Ads from Pulse to chromecast device.

## Pre-requisite:
In order to use and test CAF receiver application, following are needed:
1. Purchase and install chromecast device.
2. Run Google Home app or chrome extension [Google Home](https://www.google.com/chromecast/setup/) to setup chromecast device.
3. Register your chromecast device as described [Here](https://developers.google.com/cast/docs/registration#devices) so that you can use it for testing.
4. Create a sender application which will have the cast button and user controls such as play/pause to control the content/ad that is playing on chromecast reciever.[See https://developers.google.com/cast/docs/developers#app_components for more details.]


## Getting started:
1. Clone/Download this Library.
2. Open index.html. Here, you'll need to update the values for vmapParameters. vmapParameters is an object containing parameters that are needed to make ad request and filter ads based on parameters passed.
The **pulseHost** parameter in the vmapParameters is mandatory. See [VMAP Parameters](docs/vmap-parameters.md) for all possible options you can set.
3. Build the project:
    `npm install`
    `grunt`
4. Deploy:
Host the CAF Receiver Application on your server to be able to use it with chromecast device.
5. Register your application to be able to run CAF receiver on Chromecast devices. The Cast developer license can be found at https://cast.google.com/publish/#/overview.
6. After you've registered your application, you'll receive an application ID that your sender application must use to perform API calls, such as to launch a receiver application.
7. Put the receiver application ID into the sender application code. See https://developers.google.com/cast/docs/downloads for how to add this to the sender application.

## How to Test:
1. Launch your Sender application
2. Click the cast button on application.
3. Select a cast device (the one you registered for testing)
4. choose video content to play.
5. You should see preroll/midroll/postroll ads as per what you passed in vmapParameters.

## Publish CAF Receiver Application:
See https://developers.google.com/cast/docs/registration#publish_your_application
