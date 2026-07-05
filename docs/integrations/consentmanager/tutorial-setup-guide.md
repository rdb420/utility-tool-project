# How-To Guide: Implement consentmanager with Google Tag Manager and Google Consent Mode

## 1. Decide your implementation architecture

Before touching settings, decide how consentmanager will be loaded.

There are two viable approaches:

### Option A — Load consentmanager through Google Tag Manager

Use this when:

* You already manage most marketing/tracking scripts through GTM.
* You want easier centralised deployment.
* You are comfortable using semi-automatic blocking.
* You want to use the consentmanager GTM Community Template.

Important limitation:

* If GTM is blocked by an ad blocker, consentmanager may not load.
* Blocking is not fully automatic.
* Embedded content outside GTM, such as YouTube videos, must still be manually adapted or handled through a CMS/plugin.

### Option B — Load consentmanager directly on the website

Use this when:

* You want the stronger compliance posture.
* You need automatic blocking.
* You use WordPress or another CMS plugin that can manage embedded scripts/content.
* You want consentmanager to load before GTM.

Recommended setup in most cases:

> Load consentmanager directly on the website or through the official CMS/plugin, then load Google Tag Manager and other tags only according to consent.

If using WordPress, prefer the consentmanager WordPress plugin over loading consentmanager via GTM.

---

# Part A — Implement consentmanager through Google Tag Manager

Use this section if you choose to deploy consentmanager via GTM.

## 2. Create the consentmanager tag in GTM

1. Open **Google Tag Manager**.

2. Select the relevant container.

3. Go to **Tags**.

4. Click **New**.

5. Name the tag:

   `consentmanager`

6. Click **Tag Configuration**.

7. Select **Discover more tag types in the Community Template Gallery**.

8. Search for:

   `consentmanager`

9. Select the consentmanager CMP template.

10. Accept and add the template.

GTM will now create both:

* A consentmanager template
* A consentmanager tag based on that template

---

## 3. Retrieve your consentmanager account values

In consentmanager:

1. Log in to your consentmanager account.
2. Open the relevant CMP/property.
3. Go to **Get Code**.
4. Look for the Google Tag Manager integration section.
5. Copy the required values:

   * CMP ID
   * Hostname
   * CDN

---

## 4. Configure the consentmanager GTM tag

Back in GTM:

1. Open the consentmanager tag.

2. Paste in the required consentmanager values:

   * CMP ID
   * Hostname
   * CDN

3. Leave the remaining settings unchanged for now unless you specifically need Consent Mode options.

4. Add a trigger.

5. Select:

   `Consent Initialization — All Pages`

6. Save the tag.

This ensures consentmanager loads as early as possible in the GTM lifecycle.

Do **not** use normal `Page View` as the consentmanager trigger unless you have a very specific reason. `Page View` may fire too late, allowing other tags to run before consentmanager has initialised.

---

## 5. Publish and test the basic consent layer

1. Click **Preview** in GTM.

2. Open your website through Tag Assistant.

3. Confirm that the consent layer appears.

4. Confirm that the consentmanager tag fires on:

   `Consent Initialization`

5. Do not publish yet unless the layer appears correctly.

At this stage, consentmanager may display correctly, but your tags are not necessarily blocked yet.

---

# Part B — Create data layer variables for consent-based blocking

You now need variables that allow GTM to read the consent status coming from consentmanager.

## 6. Create the CMP vendor consent variable

In GTM:

1. Go to **Variables**.

2. Under **User-Defined Variables**, click **New**.

3. Name the variable:

   `cmpConsentVendors`

4. Click **Variable Configuration**.

5. Select:

   `Data Layer Variable`

6. Set **Data Layer Variable Name** to:

   `cmpConsentVendors`

7. Save.

This variable contains the approved vendor/provider IDs.

---

## 7. Create the CMP purpose consent variable

1. Go to **Variables**.

2. Click **New**.

3. Name the variable:

   `cmpConsentPurposes`

4. Select:

   `Data Layer Variable`

5. Set **Data Layer Variable Name** to:

   `cmpConsentPurposes`

6. Save.

This variable contains the approved purposes.

---

## 8. Create the GDPR applicability variable

1. Go to **Variables**.

2. Click **New**.

3. Name the variable:

   `cmpGDPR`

4. Select:

   `Data Layer Variable`

5. Set **Data Layer Variable Name** to:

   `cmpGDPR`

6. Save.

This variable indicates whether GDPR applies to the visitor.

Typical values:

* `1` = GDPR applies
* `0` = GDPR does not apply

For most European businesses, the CMP is usually configured so all visitors are asked for consent. In that case, `cmpGDPR` will usually be `1`.

---

# Part C — Block Google Analytics until consent exists

## 9. Find the Google Analytics vendor ID in consentmanager

In consentmanager:

1. Open your CMP/vendor list.
2. Find **Google Analytics**.
3. Note its vendor ID.

In the webinar example, Google Analytics used:

`s26`

The ID in your account may differ, so check your actual vendor list.

---

## 10. Create a consent trigger for Google Analytics

In GTM:

1. Go to **Triggers**.

2. Click **New**.

3. Name the trigger:

   `Analytics has consent`

4. Click **Trigger Configuration**.

5. Select:

   `Custom Event`

6. Set **Event name** to:

   `cmpEvent`

7. Select:

   `Some Custom Events`

8. Add this condition:

   `cmpConsentVendors`
   `contains`
   `,s26,`

Replace `s26` with your actual Google Analytics vendor ID.

The commas are important.

Correct:

`,s26,`

Avoid:

`s26`

Why? Because without commas, GTM may accidentally match IDs like `s260` or `s126`.

1. Save the trigger.

---

## 11. Apply the consent trigger to Google Analytics

1. Go to **Tags**.

2. Open your Google Analytics tag.

3. Remove the existing trigger if it is:

   `All Pages`

4. Add the new trigger:

   `Analytics has consent`

5. Save the tag.

Google Analytics should now fire only when the relevant consentmanager vendor consent exists.

---

# Part D — Handle event-based tags correctly

Some tags should fire only after both:

* A user action happens
* Consent exists

Examples:

* Add to cart
* Form submission
* Checkout step
* Button click
* Lead capture
* Purchase event

For these, a simple consent trigger may not be enough because the user action might happen before consent is given.

---

## 12. Create a trigger group for combined consent and user action

Example: Add to cart event plus Analytics consent.

In GTM:

1. Go to **Triggers**.

2. Click **New**.

3. Name the trigger:

   `Add to cart + Analytics consent`

4. Choose:

   `Trigger Group`

5. Add the first trigger:

   `Add to cart`

6. Add the second trigger:

   `Analytics has consent`

7. Save.

Now the tag will fire only when both triggers have occurred.

The order does not matter.

So this works whether the user:

* Gives consent first, then adds to cart
* Adds to cart first, then gives consent

Important limitation:

> GTM trigger groups usually fire once per page lifecycle. If the user clicks “Add to cart” five times before giving consent, the tag may still only fire once.

For complex ecommerce tracking, you may need a more advanced event architecture.

---

# Part E — Enable Google Consent Mode

Google Consent Mode helps Google services adjust their behaviour before consent is given.

It does not remove all legal risk, but it can reduce tracking before consent and improve consent signalling.

---

## 13. Enable Google Consent Mode in consentmanager

In consentmanager:

1. Log in to your account.

2. Open the relevant CMP.

3. Go to CMP settings or edit CMP.

4. Open:

   `Other settings`

5. Find:

   `Google Consent Mode`

6. Enable the checkbox.

7. Save.

This activates Consent Mode logic on the consentmanager side.

---

## 14. Add the Google Consent Mode default snippet to your website

You must also add the Consent Mode default code snippet to your website.

The purpose of this snippet is to tell Google services that the default consent state is denied until consentmanager updates it.

The default state should generally deny consent for things like:

* Ad storage
* Analytics storage
* Ad user data
* Ad personalisation

The exact snippet should be taken from your consentmanager help documentation/account, because implementation details can change.

General placement rule:

> Insert the Consent Mode default snippet before Google Analytics, Google Ads, Floodlight, or Google Tag Manager loads.

If you use GTM, place the Consent Mode default snippet before the GTM container snippet.

This is critical. If Google tags load before the default consent state is set, tracking may occur before the consent logic is active.

---

## 15. Activate the Consent Overview in GTM

This step is optional but strongly recommended.

In GTM:

1. Go to **Admin**.

2. Open **Container Settings**.

3. Enable:

   `Consent Overview`

4. Save.

This gives you a clearer view of which tags have consent settings configured.

---

# Part F — Configure GTM tag consent settings

## 16. Open a tag’s consent settings

In GTM:

1. Open a tag, for example Google Analytics.

2. Expand:

   `Advanced Settings`

3. Open:

   `Consent Settings`

You will generally see three options:

1. **Not set**
2. **No additional consent required**
3. **Require additional consent for tag to fire**

---

## 17. Use “No additional consent required” only for genuinely necessary tags

Select:

`No additional consent required`

only for tags that are truly necessary and do not need consent.

Examples may include:

* Strictly necessary security tags
* Essential functionality
* Internal operational scripts that do not involve tracking or third-party marketing

Be careful here. Do not casually classify marketing, analytics, advertising, or profiling tools as “necessary.” That is where compliance gremlins breed.

---

## 18. Use “Require additional consent” for Analytics

For Google Analytics:

1. Open the Google Analytics tag.

2. Go to **Advanced Settings**.

3. Open **Consent Settings**.

4. Select:

   `Require additional consent for tag to fire`

5. Add the built-in consent type:

   `analytics_storage`

6. Save.

This tells GTM that the tag requires analytics consent.

---

## 19. Use Google consent types for Google advertising tags

For Google Ads, remarketing, Floodlight, or advertising-related tags, use relevant consent types such as:

* `ad_storage`
* `ad_user_data`
* `ad_personalization`

The exact combination depends on the Google product and your use case.

As a practical rule:

* Analytics tags usually need `analytics_storage`
* Advertising/remarketing tags usually need `ad_storage`
* Personalised ads may also need `ad_personalization`
* Enhanced conversions or user data sharing may require `ad_user_data`

---

## 20. Use custom consent types for non-Google vendors

consentmanager can send consent statuses for individual vendors.

The naming format is:

`cmp_VENDORID`

Example:

If LinkedIn has vendor ID:

`s2`

Then the consent type is:

`cmp_s2`

To configure this:

1. Open the relevant GTM tag, for example LinkedIn Insight Tag.

2. Go to **Advanced Settings**.

3. Open **Consent Settings**.

4. Select:

   `Require additional consent for tag to fire`

5. Add:

   `cmp_s2`

6. Save.

Replace `s2` with the actual vendor ID from your consentmanager account.

---

# Part G — Deal with embedded content outside GTM

GTM consent settings only control tags inside GTM.

They do not automatically control embedded content hardcoded into your website.

Examples:

* YouTube embeds
* Google Maps embeds
* iframe widgets
* Social media embeds
* External video players
* Chat widgets inserted directly into the CMS/theme

---

## 21. Audit embedded third-party content

Review your website for third-party embedded content.

Check:

* Page templates
* Blog posts
* Product pages
* Landing pages
* Checkout pages
* Footer/header scripts
* CMS widgets
* Theme files
* Plugin-generated embeds

List each embedded provider.

For each provider, record:

| Item             | Provider    |     Location | Loaded via GTM? | Requires consent? | Action required                             |
| ---------------- | ----------- | -----------: | --------------: | ----------------: | ------------------------------------------- |
| YouTube video    | YouTube     |    Blog page |              No |               Yes | Adapt embed/block until consent             |
| Google Maps      | Google Maps | Contact page |              No |        Likely yes | Replace with consent-controlled placeholder |
| LinkedIn Insight | LinkedIn    |          GTM |             Yes |               Yes | Configure GTM consent                       |

---

## 22. Block or adapt embedded content

For embedded content outside GTM, use one of these methods:

### Method 1 — CMS/plugin blocking

If using WordPress, use the consentmanager WordPress plugin where possible.

This may automatically detect and adapt things like YouTube embeds.

### Method 2 — Manual code adaptation

For manually embedded scripts or iframes, adapt the code so it does not load until consent exists.

This may involve:

* Changing script types
* Adding CMP-specific attributes
* Replacing embeds with placeholders
* Loading the embed only after the relevant vendor consent

Use the exact current implementation guidance from consentmanager for the provider/content type.

---

# Part H — Configure Google Analytics carefully

## 23. Check Google Analytics advertising integrations

In Google Analytics, review whether Analytics is connected to advertising features.

Check settings for:

* Google Ads linking
* Remarketing
* Advertising features
* Signals
* Demographics
* Interest reporting
* Personalised advertising

Recommended risk-reduction approach:

* Disable unnecessary advertising integrations.
* Avoid automatic remarketing unless you have explicit consent.
* Separate analytics from marketing where possible.

Analytics is not just “counting visitors” anymore. It can become profiling and marketing infrastructure very quickly.

---

## 24. Prefer direct Analytics implementation if maximum page-view capture is required

If your goal is to capture the most complete possible Analytics page-view data while still applying consent controls, the webinar suggested that Analytics directly in the website may be more reliable than Analytics inside GTM.

Recommended order:

1. consentmanager loads first.
2. Consent Mode default state is set to denied.
3. Google Analytics loads.
4. consentmanager updates the consent state once the user decides.

If Analytics must remain inside GTM, consider trigger groups or Consent Mode settings depending on the event complexity.

---

# Part I — Configure GDPR applicability logic

## 25. Decide whether all visitors should be asked for consent

In consentmanager, check the GDPR visitor settings.

Common setting for European businesses:

`Ask all visitors for consent`

This is usually the safest default.

Alternative setting:

`Ask only EU visitors`

Use this only if it fits your legal structure and data protection advice.

---

## 26. Only use cmpGDPR branching if required

If all visitors are asked for consent, you usually do not need to add `cmpGDPR = 1` to every trigger.

If only EU visitors are asked, you may need two logic paths:

### Path 1 — GDPR applies

Condition:

`cmpGDPR equals 1`

Then require vendor consent.

### Path 2 — GDPR does not apply

Condition:

`cmpGDPR equals 0`

Then the tag may fire without waiting for the consent layer, depending on your legal requirements and regional obligations.

Be careful: non-GDPR does not automatically mean “no privacy law applies.” Other jurisdictions may still impose rules.

---

# Part J — Test everything before publishing

## 27. Test using GTM Preview Mode

In GTM:

1. Click **Preview**.

2. Open your website.

3. Confirm consentmanager fires on:

   `Consent Initialization`

4. Check that Analytics does not fire before consent.

5. Accept Analytics consent.

6. Confirm Analytics fires after consent.

7. Reject Analytics consent.

8. Confirm Analytics does not fire.

9. Test page reloads.

10. Test new sessions/incognito windows.

---

## 28. Test with browser developer tools

Use browser DevTools to inspect:

* Network requests
* Cookies
* Local storage
* Session storage
* Console errors

Before consent, check that there are no premature requests to vendors such as:

* Google Analytics
* Google Ads
* Facebook/Meta
* LinkedIn
* YouTube
* Google Maps
* Hotjar
* Microsoft Ads
* TikTok
* Any other third-party tracking provider

After consent, confirm only approved vendors load.

---

## 29. Test each consent scenario

Test at least these scenarios:

| Scenario                    | Expected result                                                     |
| --------------------------- | ------------------------------------------------------------------- |
| User does nothing           | Non-essential tags remain blocked                                   |
| User accepts all            | Approved tags fire                                                  |
| User rejects all            | Non-essential tags remain blocked                                   |
| User accepts Analytics only | Analytics fires, marketing tags stay blocked                        |
| User accepts Marketing only | Marketing tags fire, Analytics depends on your category setup       |
| User changes consent        | Tags respond according to updated consent                           |
| User uses ad blocker        | Site remains protected, though CMP/GTM functionality may be limited |
| User returns later          | Previous consent state is respected                                 |

---

## 30. Test embedded content

For each embedded third-party element:

1. Open the page before giving consent.
2. Confirm the embed does not load.
3. Give consent for the relevant vendor/category.
4. Confirm the embed loads.
5. Withdraw consent if your CMP allows it.
6. Confirm the behaviour is acceptable.

High-risk embeds to test:

* YouTube
* Vimeo
* Google Maps
* reCAPTCHA
* Social media feeds
* Chat widgets
* Booking widgets
* Review widgets

---

# Part K — Publish and monitor

## 31. Publish the GTM container

Once testing is complete:

1. Submit the GTM container.
2. Name the version clearly.

Example:

`Implement consentmanager + Consent Mode + vendor blocking`

1. Add version notes describing:

* consentmanager tag added
* CMP variables created
* Analytics consent trigger added
* Consent Mode settings configured
* Vendor-specific consent settings added

1. Publish.

---

## 32. Document your consent configuration

Maintain a simple internal register.

| Provider         | Purpose        | Loaded via | Consent category         | GTM trigger/setting                          | Notes                         |
| ---------------- | -------------- | ---------- | ------------------------ | -------------------------------------------- | ----------------------------- |
| Google Analytics | Analytics      | GTM/direct | Analytics                | analytics_storage / vendor trigger           | Advertising features disabled |
| Google Ads       | Marketing      | GTM        | Marketing                | ad_storage, ad_user_data, ad_personalization | Requires explicit consent     |
| LinkedIn         | Marketing      | GTM        | Marketing                | cmp_s2                                       | Confirm vendor ID             |
| YouTube          | External media | CMS embed  | Marketing/External Media | Plugin/manual block                          | Placeholder before consent    |

---

## 33. Schedule periodic reviews

Review your setup whenever:

* You add a new marketing tool
* You install a new CMS plugin
* You add embedded content
* Google changes Consent Mode requirements
* consentmanager updates templates or code
* Analytics/GTM tags are modified
* You launch new website sections
* You enter new jurisdictions

Minimum practical review cadence:

* Quarterly for active marketing sites
* Immediately after major website/GTM changes
* Immediately after adding new vendors

---

# Recommended Implementation Path

For a clean and defensible setup, use this order:

1. Decide whether consentmanager loads directly or through GTM.
2. Prefer direct/CMS-plugin loading where possible.
3. Enable Google Consent Mode in consentmanager.
4. Add the Consent Mode default snippet before Google/GTM scripts.
5. Create CMP data layer variables in GTM.
6. Create consent-based triggers for major vendors.
7. Configure GTM Consent Settings.
8. Adapt embedded third-party content outside GTM.
9. Disable unnecessary Google Analytics advertising integrations.
10. Test before consent, after consent, rejection, and consent changes.
11. Publish the GTM container.
12. Maintain a provider and tag register.

---

# Practical Compliance Notes

This guide is operational, not legal advice.

From a risk-management perspective:

* Treat Google Analytics as consent-required.
* Treat remarketing and advertising tags as consent-required.
* Be cautious about classifying Google Tag Manager as strictly necessary.
* Use Google Consent Mode as a mitigation layer, not as a magic compliance force field.
* Prefer loading consentmanager before anything that tracks, profiles, advertises, or embeds third-party content.

In short:

> consentmanager first, default denied, tags later, consent decides.
