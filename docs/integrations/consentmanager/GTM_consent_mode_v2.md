# Working with GTM + Google Consent Mode v2

*Looking for a CMP that supports Google Consent Mode? See our Google Consent Mode v2 product page.*

The **Google Tag Manager** offers an integration of the **Google Consent Mode v2** signals that can be used to trigger events, e.g., the tracking of pageviews through Google Analytics. The Google Consent Mode differentiates between two modes:

- **Basic Implementation**
- **Advanced Implementation**

---

## Google Consent Mode v2 "Basic Implementation" via GTM

The *Basic Implementation* is the way in which the Google Analytics Tags or Google Ads Tags are **not fired if no consent is given.**  
This is usually also called "**hard blocking**".  
**Advantage:** Higher legal safety.  
**Downside:** Less accurate tracking (for users that did not give consent).

### To implement the Basic Implementation of either Google Analytics or Google Ads via GTM, please follow these steps

1. **Ensure Consent Mode is enabled**  
   *Menu > CMPs > Integrations > Google Consent Mode*

2. **Ensure Google Analytics, Google Ads, or other Google services are in your vendorlist**

3. **Install the consentmanager CMP Code** in your website (*either directly as automatic blocking code, semi-automatic block code, or indirectly via GTM template*).

4. **Enable Google Consent Mode in the CMP settings**

5. **Enable Google Consent Mode in your GTM account**

6. **In GTM, create variables as needed:**  
   - In GTM, go to `Variables > New` and click on configure.

   - Choose variable type:  
     `Page Variables > Data Layer Variable`, set the Variable Name to `cmpConsentVendors`:

7. **Go to Triggers > New and click on configure:**

   - Use event Name `cmpEvent` and add one custom event to it.

8. **For each event, at least one rule is necessary:**  
   - For Google Analytics tags use:  
     `cmpConsentVendors contains ,s26,` *(include the comma in the rule)*.
   - For Google Ads (AdWords tracking, remarketing, ...), use  
     `cmpConsentVendors contains ,s1,` **OR**  
     `cmpConsentVendors contains ,s1498,`  
     *(include the comma in the rule, use the vendor ID depending on which vendors you use in your vendor list)*

9. **Go to Tags > Edit > Triggers and assign the trigger to the tag:**  
   *(Ensure to remove system events such as pageview and only use the cmpEvent)*

> **Important:**  
> Ensure that the trigger is the *only trigger* for each tag you are using.  
> **Do not combine triggers with other triggers/events** like "All pages" or "On page load", and so on.

---

## Google Consent Mode v2 "Advanced Implementation" via GTM

The *Advanced Implementation* is the way in which the Google Analytics Tags or Google Ads Tags are **fired even if no consent is given.** In this case, the Consent Mode signals are used to tell Google Analytics or Google Ads to **limit the tracking**. This is usually also called "**soft blocking**".  
**Advantage:** Higher accuracy in tracking.  
**Downside:** Lower legal safety.

### To implement the Advanced Implementation of either Google Analytics or Google Ads via GTM, please follow these steps

1. **Ensure Consent Mode is enabled**  
   *Menu > CMPs > Integrations > Google Consent Mode*

2. **Ensure Google Analytics, Google Ads, or other Google services are in your vendorlist**

3. **Install the consentmanager CMP Code** in your website (*either direct as automatic blocking code, semi-automatic block code or indirect via GTM template*).

4. **Enable Google Consent Mode in the CMP settings**

5. **Enable Google Consent Mode in your GTM account**

6. **Decide whether you want to fire Google Analytics BEFORE or AFTER the user made a choice:**  
   - *If you want to fire Google Analytics before any choice is made (e.g., the consent layer is still open), you do not need to adjust the triggers in GTM. We recommend to fire the tags on event `cmpEvent` (instead of pageview or similar) and do not add more filters (skip step 5 in the below description). In addition, you can also adjust the setting in Menu > CMPs > Legal settings > Opt-Out Mode to "On page load" or "On layer show" in order to trigger certain events earlier.*  
   - *If you want to wait for the users' choice and fire Google Analytics after the choice is made (consent layer is closed), please include to add the filters (use step 5 in the below description). This triggers the tag also when the user rejected.*

7. **Adjust GTM triggers for Advanced Mode**  
   - In GTM, create variables as needed:  
     Go to `Variables > New` and click on configure.
   - Choose variable type:  
     `Page Variables > Data Layer Variable`, set the Variable Name to `userChoiceType`:

8. **Go to Triggers > New and click on configure:**

   - Create a *Custom Event* and use event Name `cmpEvent`:

   - For each Trigger at least one rule is necessary:  
     `userChoiceType` RegEx `"useraction|loaded|automatic"`

     > *Note: Skip this step if you want to fire the tags also before the user made a choice.*

9. **Go to Tags > Edit > Triggers and assign the trigger to the tag:**  
   *(Ensure to remove system events such as pageview and only use the cmpEvent)*

> **Important:**  
> Ensure that the trigger is the *only trigger* for each tag you are using.  
> **Do not combine triggers with other triggers/events** like "All pages" or "On page load", and so on.

---

## How to handle events that are triggered based on user action?

For events that are triggered based on user action (e.g., *add to basket*) we recommend:

- **Basic Implementation:**  
  Use your existing trigger (*the add-to-basket event*) and add a condition for the specific vendor, e.g.,  
  `cmpConsentVendors contains ,s26,`  
  Ensure that this trigger is always fired *after* consent is given.

- **Advanced Implementation:**  
  No adjustment to triggers is necessary.

---

## Displaying Consent Mode information in Google Tag Manager (GTM)

GTM also offers the possibility to work with Consent Mode in order to protect tags from triggering.  
To use this feature, you can use our *GTM Template* and/or you can manually implement the CMP into the page or the tag manager.

> **Please note:**  
> The Consent Mode feature for GTM is **ONLY a visual help and will not perform any actual blocking**.

### To enable the Consent Mode in GTM, please follow these steps

1. Login to your account and click on `Admin > Container Settings`
2. Check the box "**Enable consent overview**" and press **Save**
3. Once enabled, you will find a **shield icon** under Tags which will show you which Consent Mode settings are applied to which tag.
