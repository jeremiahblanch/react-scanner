# React QR Scanner

Forked from `@alzera/react-scanner`. [https://github.com/alzera/react-scanner.git]

Differences within this fork:
1. Prettier camera (device) chooser. Only shows when there are multiple devices. Use the HTML `<select>` element which displays nicely on phones. Probably doesn't look great on desktop but most desktops do not have multiple cameras.
1. When the user chooses their camera (device), the choice is stored in localStorage and retrieved the next time. This makes better UX for using the tool over and over again.
1. Removes the components `DropZone` (for uploading an image instead of using the camera) and `BarcodeScanner` (a wrapper for `Scanner` that uses the `DropZone`). Now you can just use `Scanner`.