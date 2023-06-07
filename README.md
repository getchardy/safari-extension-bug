([Found this useful? Can we get a thumbs up?](https://github.com/getchardy/safari-extension-bug/issues/1))

## Introduction

This sample project illustrates a bug that we started noticing in Safari 15.4.

## Bug Summary

Under some circumstances, the `tabs.onUpdated` event stops getting fired by Safari.

## Bug Details

When the following conditions are true, then `tabs.onUpdated` handlers will not be called:

1. There is a content script defined in manifest.json.
2. The user has navigated to an extension page, e.g. `safari-web-extension://<uuid>/index.html`

## Demo Video

(Firefox: Right-click -> "Save Link As...")

Demo video here: [https://github.com/getchardy/safari-extension-bug/raw/main/demo.mov](https://github.com/getchardy/safari-extension-bug/raw/main/demo.mov)

## How to reproduce

Step 1: Using XCode 13.3, generate the Safari extension:

```
> scripts/generate.sh
```

Step 2: Build the Mac App target:

```
> scripts/build.sh
```

Alternatively, you can build it using XCode.

Step 3: Enable the Extension in Safari:

1. Open Safari
2. Allow Unsigned Extensions
3. Enable the "Test App" Extension in "Safari Preferences" -> "Extensions"
4. Click "Always Allow on Every Website..."

Step 4: Open background page console so you can monitor `tabs.onUpdated` events:

1. Open menu for "Web Extension Background Pages" -> "Test App - Background Page".
2. Click on the "Console" tab
3. Note the logged out value of the extension's index URI. You'll need this later. I.e. `safari-web-extension://<uuid>/index.html`

Step 5: Demonstrate `tabs.onUpdated` events are functioning

1. Navigate to different websites, e.g. `apple.com`, `anonyome.com`.
2. Notice that we're getting log message for `tabs.onUpdate` handler. This is normal and expected behavior.

Step 6: Demonstrate that `tabs.onUpdated` events will stop working

1. Navigate to the extension page, using the `safari-web-extension://` URL you noted in step 4.
2. => Notice there is no `tabs.onUpdated` event.
3. Navigate to different websites, e.g. `apple.com`, `anonyome.com`.
4. => Notice there are no further `tabs.onUpdated` events.
5. => Also notice this issue now affects all tabs in the browser.
