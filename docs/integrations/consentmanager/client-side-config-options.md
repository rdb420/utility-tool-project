# Client-side configuration options

In order to change the behavior or design of the CMP you can set several JavaScript variables:

You can either implement the variables directly in your source code. In this case, please make sure that you place them **before** the CMP code.  
As an alternative, you can insert the variables in your consentmanager backend (**Menu > CMPs > General settings > Show advanced settings > Additional configuration variables**). In this case, please **omit** `window.cmp_` and only use the base name of the variable (e.g. `regulationkey=GDPR` instead of `window.cmp_regulationkey="GDPR"`).

## Variable Description

---

### Regulation Key

```js
window.cmp_regulationkey = "GDPR";
```

Set legislation/regulation for this user (overrides the automatic detection):  

- `GDPR`
- `GDPRUK`
- `DSGLPD`
- `CCPA`
- `PIPEDA`
- `LGPD`
- `LFPDPPP`
- `PDPA`
- `NDPR`
- `POPIA`
- `PIPA`
- `PDPL`
- `PPA`
- `RPDL`
- `PIPL`
- `PDPAT`
- `ROW` (RestOfTheWorld)

---

### Basic Links and Branding

```js
window.cmp_privacyurl   = "<https://www>....";  // Override the URL for the privacy policy link.
window.cmp_imprinturl   = "<https://www>....";  // Override the URL for the imprint link.
window.cmp_tacurl       = "<https://www>....";  // Override the URL for the T&C link.
window.cmp_target       = "_blank";             // Override the target window for privacy policy, imprint and T&C link
window.cmp_logo         = "<https://www>...";   // Override the logo shown in the consent layer.
```

---

### Language and Translation

```js
window.cmp_setlang = "FR"; // Override the default language.
```

```js
window.cmp_textmacros = {
  "macroname": "value",
  "macroname2": "value",
  ...
};
```

Set macros that can appear in any translated text of the consent layer.  
To use a macro, set `[mymacro]` in the text under **Menu > Texts** and set the value via JS on the website using  
`window.cmp_textmacros = {"mymacro":"replaced text"};`

---

### Iframe & Loading Controls

```js
window.cmp_stayiniframe     = 1;                             // Show the consent layer within the iframe
window.cmp_iframecallback   = function (){...};              // Callback when loaded in non-friendly iframe
window.cmp_dontloadiniframe = true;                          // CMP allowed to load in iframe (default true)
window.cmp_noscreen         = true;                          // Do not show consent screen automatically (default false)
window.cmp_disable_recall   = true;                          // Do not show recall icon in the footer (default false)
window.cmp_proto            = "https:";                      // Override protocol (default "https:")
window.cmp_params           = "...";                         // Extra parameters (e.g. '&usedesign=1234')
```

---

### Vendor/Tag Manager Integration

```js
window.cmp_nogam      = true;
window.cmp_notealium  = true;
window.cmp_nofacebook = true;
```

Set to true to disable automatic creation of datalayer / passing consent information to Google TagManager, Tealium TagManager, or Facebook.

```js
window.cmp_datalayername = "..."; // Name for the dataLayer variable (default "dataLayer")
```

---

### Automatic Script/Resource Blocking

```js
window.cmp_block_inline     = true;  // Block/not block inline scripts with document.cookie (default: true)
window.cmp_block_unkown     = true;  // Block/not block unknown scripts/iframes/images (default: true)
window.cmp_block_sync       = true;  // Block/not block synchronous scripts (default: true)
window.cmp_block_img        = false; // Block/not block images (default: false)
window.cmp_block_samedomain = false; // Block/not block same domain resources (default: false)

window.cmp_block_ignoredomains = [
  "domain1.com", "domain2.net", "domain3.org"
]; // Do not block scripts/iframes/images from these domains

window.cmp_block_ignorepaths = [
  "domain1.com/path/to/ignore", "domain2.com/path"
]; // Do not block from these domains/paths
```

---

### Preview (Dynamic Content Blocking)

```js
window.cmp_preview_accept      = true;        // Accepting preview auto-saves choice
window.cmp_preview_minheight   = 200;
window.cmp_preview_minwidth    = 100;         // Minimum size for previewable elements (default 300x300)
window.cmp_preview_vendor_XX   = "300x300";   // Enable previews for all blocked elements of given vendor (e.g., cmp_preview_vendor_s199)
```

This variable is usually used for enabling previews for `<script>` elements where the system cannot auto-detect size.

```js
window.cmp_preview_urlmatching = [
  {
    'match': 'mydomain.com',
    'preview': '300x300'
  },
  ...
];
```

Enables previews for all elements that include a URL (as src or href) that matches an entry from this list (array of objects).  
Each object has:

- `match`: The string to find in the URL of the element
- `preview`: The preview size instruction

#### Advanced Vendor Preview Customization

```js
window.cmp_preview_vendor_xx_class   = "..."; // CSS selector for preview placement
window.cmp_preview_vendor_xx_bgcolor = "..."; // Background color for vendor preview
window.cmp_preview_vendor_xx_image   = "..."; // Background image URL for vendor preview
```

---

### Import, Sub-Check, and Initialization

```js
window.cmp_waitforimport     = 3000;    // Maximum delay (ms) waiting for __cmp('importConsent',...)
window.cmp_disablesubchecks  = true;    // Stop watching for changing elements after page load (default: false)
```

---

### Custom Button Options

```js
window.cmp_custombutton         = true;  // Enable custom button
window.cmp_custombutton_name    = "..."; // Button label
window.cmp_custombutton_pos     = 0;     // Position (0 = first)
window.cmp_custombutton_screen  = 2;     // On which screen(s)
window.cmp_custombutton_vendors = [...]; // Vendors enabled on click
window.cmp_custombutton_purposes= [...]; // Purposes enabled on click
window.cmp_custombutton_logic   = 0;     // Button enable logic
```

Button screen values:

- `0` = Both welcome page and custom settings page
- `1` = Welcome page only (default)
- `2` = Custom settings page only

#### Custom button logic

- `0` - Always clickable
- `1` - Clickable if **all** purposes in `window.cmp_custombutton_purposes` are enabled
- `2` - Clickable if **all** vendors in `window.cmp_custombutton_vendors` are enabled
- `3` - Clickable if **all** purposes **and** all vendors in `window.cmp_custombutton_vendors` and `window.cmp_custombutton_purposes` are enabled
- `4` - Clickable if **at least one purpose** in `window.cmp_custombutton_purposes` is enabled
- `5` - Clickable if **at least one vendor** in `window.cmp_custombutton_vendors` is enabled
- `6` - Clickable if **at least one purpose OR one vendor** as above is enabled
- `7` - Clickable if **at least one purpose AND one vendor** as above is enabled

#### Behavior after click

```js
window.cmp_custombutton_behavior = ...; // Click behavior
```

- `0` - (default) Enable all vendors/purposes in `cmp_custombutton_purposes` and/or `cmp_custombutton_vendors`, including vendors for enabled purposes
- `1` - Same as 0 but do _not_ enable vendors based on purpose assignment
- `2` - Enable all vendors
- `3` - Enable all purposes
- `4` - Enable all vendors and all purposes
- `5` - Disable all listed vendors/purposes (also disables vendors assigned to listed purposes)
- `6` - Same as 5 but do _not_ disable vendors based on purpose assignment
- `7` - Disable all vendors
- `8` - Disable all purposes
- `9` - Disable all vendors and all purposes

```js
window.cmp_custombutton_stayopen = ...; // Keep the consent layer open after click? (false = default, closes layer; true = stays open)
```

---

### Google Consent Mode

```js
window.cmp_consentmode_timeout = 500; // Wait-for-update timeout (ms)
window.cmp_consentmode_xx      = "name"; // Custom matching for purpose ID xx
```

If purpose `xx` has consent, the system sets Google Consent Mode type `name` to `granted`; otherwise, `denied`.

---

### Storage

```js
window.cmp_storage_name_default = "..."; // Default cookie/localStorage name
window.cmp_storage_name_cpc     = "..."; // Purpose consents storage name
window.cmp_storage_name_cvc     = "..."; // Vendor consents storage name
window.cmp_storage_name_ccc     = "..."; // Compressed consent storage name
window.cmp_cookie_path          = "/";   // Cookie path
```

---

### Pay-Or-Accept (Contentpass & Related)

```js
window.cmp_pur_enable    = true;  // Enable pay-or-accept mode (auto-set via contentpass)
window.cmp_pur_loggedin  = false; // User is logged in as paid user
window.cmp_pur_mode      = 0;     // How to treat visitors with existing choices
```

- `0` - Show consent layer again if not all vendors accepted
- `1` - Do not show consent layer again if not all vendors accepted
- `2` - Require at least certain vendors/purposes (see arrays)

```js
window.cmp_pur_optout_purposes = "*";
```

Defines which purposes get automatically deactivated when the user logs into an accept-or-pay account.  
Default `*` disables all; specify e.g. `"1,3,5,c51"` for selected.

```js
window.cmp_pur_optout_logic = 0;
```

- `0` - Purposes get deactivated (default)
- `1` - Purposes not deactivated; uses existing choices or defaults
- `2` - Only deactivates purposes if no existing choice

---

### Other Controls

```js
window.cmp_disable_spa = 1;           // Suppress URL change checks in SPAs
window.cmp_disable_escape_close = true; // Disable ESC as close on WCAG design
```

---

### Company and DPO Information

```js
window.cmp_company_name   = "...";
window.cmp_company_addr1  = "...";
window.cmp_company_addr2  = "...";
window.cmp_company_zip    = "...";
window.cmp_company_place  = "...";
window.cmp_company_country= "...";
window.cmp_company_tel    = "...";
window.cmp_company_mail   = "...";
window.cmp_company_url    = "...";
window.cmp_company_descr  = "...";
```

*Overrides controller (company) information._

```js
window.cmp_dpo_name = "...";
window.cmp_dpo_tel  = "...";
window.cmp_dpo_mail = "...";
window.cmp_dpo_url  = "...";
```

*Overrides DPO information._

---

### WebTV-SDK Only

```js
window.cmp_handleenter = true; // Enable handling of [Enter] key (keycode 13)
window.cmp_handletab   = true; // Enable handling of [Tab] key (keycode 9)
```

---

## AMP Integration

To override settings in AMP, add the variable names as parameters to the AMP consent URL  
(e.g. `&cmp_privacyurl=https%3A%2F%2Fwww.mywebsite.com%2Fprivacy`).  
**Example:**

```html
<amp-consent layout="nodisplay" id="consent-element">
  <script type="application/json">
  { "consents": { "consentmanager-consent": { "checkConsentHref": "https://delivery.consentmanager.net/delivery/amp.php?id=123456&type=check", "onUpdateHref": "https://delivery.consentmanager.net/delivery/amp.php?id=123456&type=update", "promptUI": "consent-ui"} } }
  </script>
  <amp-iframe id="consent-ui" height="200" width="600" resizable sandbox="allow-scripts allow-forms allow-same-origin"
              layout="responsive" frameborder="0"
              src="<https://delivery.consentmanager.net/delivery/amp.php?id=123456&type=consent&cmp_privacyurl=https%3A%2F%2Fwww.mywebsite.com%2Fprivacy">>
    <amp-img overflow src="https://cdn.consentmanager.net/images/logo.png" layout="nodisplay" width="0" height="0" placeholder></amp-img>
  </amp-iframe>
</amp-consent>
```

**Note:**  
`cmp_regulation`, `cmp_stayiniframe`, `cmp_proto`, and `cmp_textmacros` are **not supported for AMP**.  
To insert macros in AMP, use `&cmp_macro_name=value` (e.g. `&cmp_macro_websitename=myWebsite` to replace macro `[websitename]` with `myWebsite`).
