# Working with Google Consent Mode v2 + Manual/Semiautomatic Blocking Code

Looking for a CMP that supports Google Consent Mode? See our [Google Consent Mode v2 product page](#).

The Google Consent Mode differentiates between two modes: **Basic Implementation** and **Advanced Implementation**.
When using manual or semiautomatic blocking some settings need to be done in order to achieve the implementations:

> **Note:**  
> This page describes the use case when you are using Manual/Semiautomatic Blocking Code and Google Analytics or Google Ads Tracking directly in the website (no GTM is used).  
> For GTM use cases please see [here](#).

---

## Google Consent Mode v2 "Basic Implementation" via Manual Blocking Code

If you are using the Manual Blocking Code in your website and want to achieve the "Basic Implementation" (also known as "hard blocking"), the advantage here is higher legal safety. The downside is less accurate tracking (for users that did not give consent).

You will not need to do any additional changes. Please make sure that you have the Manual Blocking Code correctly implemented:

- Ensure Consent Mode is enabled (`Menu > CMPs > Integrations > Google Consent Mode`)
- Ensure Google Analytics, Google Ads or the other Google services are in your vendorlist
- Ensure the Manual Blocking Code is placed as soon as possible in the page, preferably **before any Google Code**
- Ensure Google Analytics, Google Ads or other Google Codes are blocked by adjusting the Google Code.
  See [examples for manually blocking Google Analytics](#).

The following code should be inserted before the first Google Code:

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });

  dataLayer.push({
    'event': 'default_consent'
  });
</script>
```

The code example above sets the default status for `ad_storage`, `analytics_storage`, `ad_user_data`, and `ad_personalization` to `denied`.  
Please note that there are other status values you can set in order to fine-tune the behavior.

> **Important:**  
> The default status should (under GDPR) always be `denied`. All tags should then wait until a consent update is sent and the tags should only fire based on this update.  
> The reason is simple: The page does not know what the actual status of the user is.  
> If status is set to `granted`, Google will start counting for users that have rejected.  
> Hence, the only reliable way is `denied` (default) → `granted/denied` (update).

The EUUCP ([Google's User Policy](https://www.google.com/about/company/user-consent-policy/)) specifically says that consent must be granted for these consent purposes.  
Setting the defaults to `granted` would therefore not be valid for users in the EEA & UK.

Further information about region-specific behavior:  
<https://developers.google.com/tag-platform/security/guides/consent?hl=en&consentmode=advanced#region-specific-behavior>

---

## Google Consent Mode v2 "Advanced Implementation" via Manual Blocking Code

The Advanced Implementation is the way in which the Google Analytics Tags or Google Ads Tags are fired even if no consent is given. In this case, the Consent Mode signals are used to tell Google Analytics or Google Ads to limit the tracking.  
This is usually also called "soft blocking". The advantage here is a higher accuracy in tracking. The downside is a lower legal safety.

In order to implement the Advanced Implementation of either Google Analytics or Google Ads when Manual Blocking Code is used please follow these steps:

- Ensure Consent Mode is enabled (`Menu > CMPs > Integrations > Google Consent Mode`)
- Ensure Google Analytics, Google Ads or the other Google services are in your vendorlist
- Ensure the Manual Blocking Code is placed as soon as possible in the page, preferably **before any Google Code**
- **Do NOT manually block Google Analytics, Google Ads or other Google Codes** (do not change the Google Codes)

The following code **MUST** be inserted before the first Google Code:

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });

  dataLayer.push({
    'event': 'default_consent'
  });
</script>
```
