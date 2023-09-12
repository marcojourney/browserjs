# Using the `getAttributes` Function

The `getAttributes` function is used to retrieve a set of attributes related to the user's browser or environment. This function returns a Promise that resolves to a `BuiltinComponents` object containing various attributes. Each attribute provides information about a specific aspect of the user's environment.

## Usage

To use the `getAttributes` function in your project, follow these steps:

1. Import the `getAttributes` function into your JavaScript/TypeScript code:

   ```javascript
   import { getAttributes } from 'browserjs';

   const attributesPromise = getAttributes();

    attributesPromise.then((attributes) => {
        // Handle the attributes here
        console.log(attributes);
    }).catch((error) => {
        // Handle any errors that occur during attribute retrieval
        console.error(error);
    });
    ```
2. Response Payload:

<ol>
  <li>The <code>getAttributes</code> function returns a Promise that resolves to a BuiltinComponents object.</li>
</ol>

<h2>Response Payload</h2>
<p>The BuiltinComponents object contains various attributes, each providing information about a specific aspect of the user's environment. Here's a description of some of the attributes included in the response:</p>

<ul>
  <li><span class="bold">applePay:</span> Information related to Apple Pay.</li>
  <li><span class="bold">architecture:</span> Architecture information.</li>
  <li><span class="bold">audio:</span> Audio-related information.</li>
  <li><span class="bold">canvas:</span> Canvas-related information.</li>
  <li><span class="bold">colorDepth:</span> Color depth of the user's display.</li>
  <li><span class="bold">colorGamut:</span> Color gamut information.</li>
  <li><span class="bold">contrast:</span> Contrast information.</li>
  <li><span class="bold">cookiesEnabled:</span> Indicates if cookies are enabled.</li>
  <li><span class="bold">deviceMemory:</span> Amount of device memory.</li>
  <li><span class="bold">domBlockers:</span> Information about DOM blockers.</li>
  <li><span class="bold">fontPreferences:</span> Font preferences.</li>
  <li><span class="bold">fonts:</span> Array of fonts installed on the device.</li>
  <li><span class="bold">forcedColors:</span> Indicates if forced colors are enabled.</li>
  <li><span class="bold">hardwareConcurrency:</span> Number of hardware threads.</li>
  <li><span class="bold">hdr:</span> Indicates if HDR is supported.</li>
  <li><span class="bold">indexedDB:</span> Indicates if IndexedDB is supported.</li>
  <li><span class="bold">languages:</span> Array of supported languages.</li>
  <li><span class="bold">localStorage:</span> Indicates if local storage is supported.</li>
  <li><span class="bold">math:</span> Mathematical function information.</li>
  <li><span class="bold">monochrome:</span> Monochrome information.</li>
  <li><span class="bold">openDatabase:</span> Indicates if the open database is supported.</li>
  <li><span class="bold">osCpu:</span> Operating system CPU information.</li>
  <li><span class="bold">pdfViewerEnabled:</span> Indicates if the PDF viewer is enabled.</li>
  <li><span class="bold">platform:</span> User's platform (e.g., 'Win32').</li>
  <li><span class="bold">plugins:</span> Array of installed plugins.</li>
  <li><span class="bold">privateClickMeasurement:</span> Private click measurement information.</li>
  <li><span class="bold">reducedMotion:</span> Indicates if reduced motion is enabled.</li>
  <li><span class="bold">screenFrame:</span> Array of screen frame information.</li>
</ul>
