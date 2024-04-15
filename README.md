# React QR Scanner

Forked from `@alzera/react-scanner`. [https://github.com/alzera/react-scanner.git]

Differences within this fork:
1. When the user chooses their camera (device), the choice is stored in localStorage and retrieved the next time. This mkaes better UX for using the tool over and over again.
2. Adds a CSS class `barcode-scanner__device-selector` on the `<select>` element for choosing the camera, so it can be styled with outside CSS.