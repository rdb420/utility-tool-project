# JavaScript-API

The consentmanager.net CMP supports various JavaScript APIs in order to allow websites to retrieve consent information.

## Using the API

For all requests to the API, please always only use the public functions mentioned below. **Please do not access the internal `window.cmpmngr` object directly!**

In order to send or receive information from/to the API you can use the general public function `__cmp(...)`. This function can handle most generic requests.
In addition to this, the CMP also offers public functions `__tcfapi(...)` for IAB TCF v2 compliance and `__gpp(...)` for IAB GPP compliance.

**Example:**

```js
var x = __cmp('consentStatus');
if(x.consentExists){
  /* do something */
}
```

## API functions

The three API functions use different parameters due to the different specifications these functions are following. The API functions are:

- `__cmp( Command, Parameter, Callback, Async )`
- `__tcfapi( Command, Version, Callback, Parameter )`
- `__gpp( Command, Version, Callback, Parameter )`

**Removed:** Please be aware that the `__uspapi()` does not exist anymore and was replaced by the `__gpp()`.

> **Note:** For `__cmp()` all parameters except for Command are optional.

---

## Commands

The API supports the following commands:

> **Note:** Our API may return objects to TCF v1+v2 commands that are different from the standard. See [here](#) for more details.

| Command                  | Function                       | Description                                                                                                         |
|--------------------------|-------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `getTCData`              | `__tcfapi()`                  | Get consent data object according to IAB TCF v2.                                                                    |
| `noncompliant_getTCData` | `__tcfapi()`                  | Get consent data object according to IAB TCF v2 in case of a noncompliant setup of the CMP.                         |
| `ping`                   | `__cmp()`, `__tcfapi()`, `__gpp()` | Depending on used function: <br/> - `__cmp('ping')` returns false.<br/> - `__tcfapi('ping')` returns TCF v2 ping object.<br/> - `__gpp('ping',callback)` returns GPP ping object.         |
| `addEventListener`       | `__cmp()`, `__tcfapi()`       | Adds a new event listener. See details here.<br/>*Parameters depend on the used function.*                          |
| `removeEventListener`    | `__cmp()`, `__tcfapi()`       | Removes an event listener. See above.                                                                               |
| `getCMPData`             | `__cmp()`                     | Get an object that contains all relevant consent data:                         |

```js
{
  consentstring: "IAB TCF consent string",
  uspstring: "IAB US Privacy String",
  gdprApplies: true/false,
  hasGlobalScope: true/false,
  tcfversion: 0/1/2,
  tcfcompliant: true/false,
  regulation: 0/1/2 (none / GDPR / CCPA),
  purposeConsents: {},
  vendorConsents: {},
  purposeLI: {},
  vendorLI: {},
  googleVendorConsents: {}
}
```

- **`consentStatus __cmp()`:**  
  Get consent string and info if user choice is given. The returned status object will look like this:  
  `{'consentExists': true/false, 'consentData': '…'}`  
  *Please note that this does not signal consent, but only if the user made a choice.*

- **`setConsent __cmp()`:** Simulate a user click on accept all (Parameter = 1) or reject all (Parameter = 0).

- **`setVendorConsent __cmp()`:**  
  Sets consent status for a certain vendor. Vendor-ID and status need to be passed as array via parameter 2, e.g.  
  `__cmp('setVendorConsent',['s30', 1 ])` sets consent (accept) for vendor s30.  
  **Possible status values:**  

  ```
  0 = reject
  1 = accept
  2 = reject, don't count
  3 = accept, don't count
  ```

- **`setPurposeConsent __cmp()`:**  
  Sets consent status for a certain purpose. Purpose-ID and status need to be passed as array via parameter 2, e.g.  
  `__cmp('setPurposeConsent',[52, 1 ])` sets consent (accept) for purpose 52.  
  If you want to set consent for a purpose and *all* vendors that are assigned to this purpose, you can set the third field to `true`, e.g.  
  `__cmp('setPurposeConsent',[52, 1, true ])`

- **`exportConsent __cmp()`:** Exports consent info for cross device consent sharing.
- **`importConsent __cmp()`:** Imports consent info for this visitor.
- **`cancelwait __cmp()`:** Stop the CMP from waiting for incoming consent import calls.

- **`showScreen __cmp()`:** Show welcome screen (depending on visitors location/account setup).
- **`showScreenAdvanced __cmp()`:** Show preference manager (depending on visitors location/account setup). Note: You can use the second parameter to indicate which page should be opened (e.g. use "c52" in order to open the page for purpose c52).
- **`showCookies __cmp()`:** Show cookie table.
- **`close __cmp()`:** Close consent layer.

- **`setAgeCallback __cmp()`:** Set callback function for age verification.

- **`setUserID __cmp()`:**  
  Set external user ID 1.  
  `setUserID` sets the external ID (ID 2, ID 3) for which the user is known.  
  `getUserID` and `setUserID` both return a user-ID object:  
  `{'external': ..., 'external2': ..., 'external3': ..., 'internal': ...}`  
  *Note: The internal user ID is only available if enabled in CMP settings and after “settings” event is fired (see CMP events).*

- **`setUserID2 __cmp()`** Set external user ID 2  
- **`setUserID3 __cmp()`** Set external user ID 3  
- **`getUserID __cmp()`** Get all user IDs
- **`checkBlocking __cmp()`** Checks whether blocked elements can be unblocked and unblock them.
- **`checkShowScreen __cmp()`** Checks whether to show the consent layer (again).

- **`privacyLink __cmp()`** Redirects the visitor to the privacy policy page.
- **`tacLink __cmp()`** Redirects the visitor to the Terms&Conditions page.
- **`imprintLink __cmp()`** Redirects the visitor to the legal notice/imprint page.

---

## CMP Events

In order to get notifications when certain events occur, you can use the following JavaScript Methods:

```js
__cmp("addEventListener",["eventname",callableFunction,capture],null)
__cmp("removeEventListener",["eventname",callableFunction,capture],null)
__tcfapi("addEventListener",2, callableFunction)
__tcfapi("removeEventListener",2, callableFunction, listenerId)
```

The CMP can call the following events:

| Event            | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `init`           | CMP code is loaded and the stub code has been removed. At this stage the CMP has no information about the consent yet. |
| `settings`       | CMP finished loading its settings. If a consent string existed already, the consent data can now be read from the CMP. |
| `consentscreen`  | CMP shows the consent screen                                                |
| `consentscreenoff` | CMP removes the consent screen                                            |
| `consentscreencustom` | CMP shows the custom choices page                                      |
| `consent`        | CMP has gathered consent or a preexisting cookie was found. Consent data can now be read from the CMP. |
| `consentapproved` | Visitor gave positive consent to all vendors/purposes                      |
| `consentrejected` | Visitor rejected all vendors and purposes                                  |
| `consentcustom`   | Visitor gave custom consent (accepts and rejections)                       |
| `liestablished`   | Consent screen is shown, legitimate interest has been established for this visitor. |
| `vendorconsent`   | Visitor accepted an dynamic content item. Vendor ID of the accepted item can be found in subtype variable. |
| `gpp`            | Various events for the IAB GPP standard                                     |
| `tcfv2`          | Various events for the IAB TCF standard                                     |
| `loadShowing`    | Once loading is finished (see event settings) and the system has decided to show the consent layer. |
| `loadNotShowing` | Once loading is finished (see event settings) and the system has decided to not show the consent layer. |

Event handler are defined as:

```js
var handler = function (eventname, cmpobject, subtype){…}
```

> **Warning:** Do not use `cmpobject` anymore. The function is deprecated. Use API calls instead.

**Example:**

```html
<script>
  function getInfos(e,o)
  {
    var result = __cmp('getCMPData');
    /*... do something with result ...*/
  }
  __cmp("addEventListener",["consent",getInfos,false],null);
</script>
```

> Please note that the IAB TCF v2 `addEventListener` command will react only on a subset of events.

---

## Examples

### Redirecting the visitor to a different website if no consent is given

> Please note that this behavior is not recommended and might cause legal issues!

```html
<script>
  function getInfos(e,o)
  {
    location.href = "https://www.mywebsite.com/alternative-content.html";
  }
  __cmp("addEventListener",["consentrejected",getInfos,false],null);
</script>
```

### Showing a message if the visitor rejected

```html
<div id="mymessage" style="display:none; position:fixed; left:calc(50% - 300px); top:calc(50% - 200px); width:600px; height:400px; background-color: #fff0c7; padding: 20px; box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);">
  <b>Please consider</b><br>
  Our website is mainly financed by online advertising. Without consent we will not be able to show you tailored ads and our ad revenue will be much lower. As we respect your choice we like to ask you, if you maybe like to donate 1 EUR instead? This will help us keep the quality of our service up.<br>
  <br>
  <a href="donate.html"><b>Donate 1 EUR now!</b></a><br>
  <br>
  <a href="#" onclick="document.getElementById('mymessage').style.display = 'none';">No, thanks!</a>
</div>
<script>
  function getInfos(e,o){ document.getElementById('mymessage').style.display = 'block';}
  __cmp("addEventListener",["consentrejected",getInfos,false],null);
</script>
```

### Pushing the page content down when consent layer opens

```html
<script>
 var iscmpopen = false;

 function handleSize()
 {
  if(iscmpopen)
  {
   document.body.style.paddingTop = document.getElementById('cmpbox').offsetHeight + 'px';
  }
  else
  {
   document.body.style.paddingTop = 'inherit';
  }
 }

 function pushDown(e, o)
 {
  iscmpopen = true;
  handleSize();
 }

 function pushUp(e, o)
 {
  iscmpopen = false;
  handleSize();
 }

 window.addEventListener('resize', handleSize, false);
 window.addEventListener('load', handleSize, false);

 __cmp('addEventListener', ['consentscreen', pushDown, false], null);
 __cmp('addEventListener', ['consentscreenoff', pushUp, false], null);
</script>
```

---

## Changes to the IAB CMP Framework JS API

> **Important:** If CMP settings are used that are not compliant with the IAB TCF, the system will automatically disable some commands. The standard IAB TCF commands (e.g. `getVendorConsents`) will then only be available via prefixed command name (e.g. `noncompliant_getVendorConsents` instead of `getVendorConsents`). More information on TCF compliance can be found [here](#).

In order to allow more flexibility, we added some extensions to our implementation of the IAB CMP Framework JS API. These are:

| Command/Extension                               | Description                                                                                                         |
|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `__cmp(...)`                                    | The global `__cmp` function will always also return the object/result of the command instead of only passing it to the callback function. |
| `__cmp( … , … , …, async)`                      | The global `__cmp` function is extended by a fourth parameter. If present and set to false, the callback function will fire immediately and will not be queued. |
| `__cmp("addEventListener", …)` / `__cmp("removeEventListener", …)` | See section CMP Events.                                                             |
| `__cmp("getVendorConsents", …)`                 | Equal to IAB `getVendorConsents` but also returns `customPurposeConsents`, `customVendorConsents` and `googleVendorConsents` properties |
| `__tcfapi("getTCData", …)`                      | Equal to IAB `getTCData` but also returns `customPurposeConsents`, `customVendorConsents` and `googleVendorConsents` properties |

**Example:**

```html
<script>
  var vendorid = 3; //vendor number 3
  var purposeid = 1; //allow cookies
  var x = __cmp("consentStatus", null, null, false);
  if(typeof(x) == 'object' && "consentExists" in x && x.consentExists)
  {
    //consent data is present, check if consent for vendor is given
    var y = __cmp("getVendorConsents", new Array(vendorid), null, false);
    if(typeof(y) == 'object' && "gdprApplies" in y && (!y.gdprApplies || (y.vendorConsents[vendorid] && y.purposeConsents[purposeid])))
    {  
      //everything is fine!
    }
  }
</script>
```

(Please make sure to remove incorrect line breaks when copying the text above)

The example above shows a sample code on how you can check if the consent string is present and if consent is given for a certain vendor & purpose in a synchronous way.

---

## Checking Consent for a Vendor

In order to check if a certain vendor has consent, we recommend to use the global `__cmp` function and call command `getCMPData`:

```js
var x = __cmp('getCMPData');
if("vendorConsents" in x)
{
  if("s123" in x.vendorConsents && x.vendorConsents["s123"])
  {
    // Vendor s123 has consent
  }
  else
  {
    // Vendor s123 does not have consent
  }
}
```

For the example above, please be aware that you call `__cmp()` object only when it is already loaded. In case of doubt please use a callback in our events (e.g. "consent" or "settings" event):  
<https://help.consentmanager.net/books/cmp/page/cmp-events>

---

## Passing the Consent String to a Vendor

The IAB TCF specification is designed in a way so that vendors can automatically fetch the consent information from the CMP using the IAB TCF JS API. In case a vendor can not fetch the string (e.g. because only an `<img>` is implemented and not a `<script>` or `<iframe>`) you can use the following example script to fetch the relevant data:

```html
<script>
  var tcstring = "";
  __tcfapi('getTCData',2, function (x,s){
    if("tcString" in x)
    {
      tcstring = x.tcString;
    }
  });  

  document.write('<scr'+'ipt src="https://www.adserver.de/banner?gdpr_consent=' + tcstring +'&gdpr=1"></sc'+'ript>');
</script>
```

---
