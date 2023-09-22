# Using the `getAttributes` Function

The `getAttributes` function is used to retrieve a set of attributes related to the user's browser or environment. This function returns a Promise that resolves to a `BuiltinComponents` object containing various attributes. Each attribute provides information about a specific aspect of the user's environment.

## Usage

To use the `getAttributes` function in your project, follow these steps:

1. Import the `getAttributes` function into your JavaScript/TypeScript code:

   ```javascript
   import { getAttributes } from 'fingerlockjs';

   const attributesPromise = getAttributes();

    attributesPromise.then((attributes) => {
        // Handle the attributes here
        console.log(attributes);
    }).catch((error) => {
        // Handle any errors that occur during attribute retrieval
        console.error(error);
    });
    ```
Response Payload:

<ol>
  <li>The <code>getAttributes</code> function returns a Promise that resolves to a BuiltinComponents object.</li>
</ol>

<h2>Response Payload</h2>
<p>The BuiltinComponents object contains various attributes, each providing information about a specific aspect of the user's environment. Here's a description of some of the attributes included in the response:</p>

<ul>
  <li><span style="font-weight: bold">applePay:</span> Information related to Apple Pay.</li>
  <li><span style="font-weight: bold">architecture:</span> Architecture information.</li>
  <li><span style="font-weight: bold">audio:</span> Audio-related information.</li>
  <li><span style="font-weight: bold">canvas:</span> Canvas-related information.</li>
  <li><span style="font-weight: bold">colorDepth:</span> Color depth of the user's display.</li>
  <li><span style="font-weight: bold">colorGamut:</span> Color gamut information.</li>
  <li><span style="font-weight: bold">contrast:</span> Contrast information.</li>
  <li><span style="font-weight: bold">cookiesEnabled:</span> Indicates if cookies are enabled.</li>
  <li><span style="font-weight: bold">deviceMemory:</span> Amount of device memory.</li>
  <li><span style="font-weight: bold">domBlockers:</span> Information about DOM blockers.</li>
  <li><span style="font-weight: bold">fontPreferences:</span> Font preferences.</li>
  <li><span style="font-weight: bold">fonts:</span> Array of fonts installed on the device.</li>
  <li><span style="font-weight: bold">forcedColors:</span> Indicates if forced colors are enabled.</li>
  <li><span style="font-weight: bold">hardwareConcurrency:</span> Number of hardware threads.</li>
  <li><span style="font-weight: bold">hdr:</span> Indicates if HDR is supported.</li>
  <li><span style="font-weight: bold">indexedDB:</span> Indicates if IndexedDB is supported.</li>
  <li><span style="font-weight: bold">languages:</span> Array of supported languages.</li>
  <li><span style="font-weight: bold">localStorage:</span> Indicates if local storage is supported.</li>
  <li><span style="font-weight: bold">math:</span> Mathematical function information.</li>
  <li><span style="font-weight: bold">monochrome:</span> Monochrome information.</li>
  <li><span style="font-weight: bold">openDatabase:</span> Indicates if the open database is supported.</li>
  <li><span style="font-weight: bold">osCpu:</span> Operating system CPU information.</li>
  <li><span style="font-weight: bold">pdfViewerEnabled:</span> Indicates if the PDF viewer is enabled.</li>
  <li><span style="font-weight: bold">platform:</span> User's platform (e.g., 'Win32').</li>
  <li><span style="font-weight: bold">plugins:</span> Array of installed plugins.</li>
  <li><span style="font-weight: bold">privateClickMeasurement:</span> Private click measurement information.</li>
  <li><span style="font-weight: bold">reducedMotion:</span> Indicates if reduced motion is enabled.</li>
  <li><span style="font-weight: bold">screenFrame:</span> Array of screen frame information.</li>
</ul>
