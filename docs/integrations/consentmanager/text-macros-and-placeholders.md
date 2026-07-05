# Text macros and placeholders

Macros or placeholders are predefined words that can occur in text. The system will automatically replace these words with other content. Macros are written in the form of `[macroname]`.

## General macros

The following macros can be used for all texts in the CMP:

| Macro               | Description |
|---------------------|-------------|
| `[cmp]`             | Will be replaced by the CMP name from your settings |
| `[CMP]`             | Will be replaced by the CMP name from your settings with uppercase first character |
| `[host]`            | Will be replaced by the domain name of the current page the visitor is on (e.g. `<www.mysite.com>`) |
| `[Host]`            | Will be replaced by the domain name of the current page the visitor is on with uppercase first character (e.g. `<Www.mysite.com>`) |
| `[domain]`          | Will be replaced by the domain name of the current page the visitor is on (e.g. `mysite.com`) |
| `[Domain]`          | Will be replaced by the domain name of the current page the visitor is on with uppercase first character (e.g. `Mysite.com`) |
| `[vendorname]`      | Will be replaced by the vendor name. Can only be used in texts for the preview layer in case of dynamic content blocking. |
| `[vendorname-XX]`   | Will be replaced by the vendor name of vendor with ID XX. |
| `[link=privacy]`    | Will be replaced by a link to the privacy policy.<br>**Note:** Ensure to enclose the link-text with `[link=privacy]link text[/link]` |
| `[link=tac]`        | Will be replaced by a link to the Terms&Conditions.<br>**Note:** Ensure to enclose the link-text with `[link=tac]link text[/link]` |
| `[link=imprint]`    | Will be replaced by a link to the legal notice/imprint.<br>**Note:** Ensure to enclose the link-text with `[link=imprint]link text[/link]` |
| `[link=cookies]`    | Will be replaced by a link to the cookies list.<br>**Note:** Ensure to enclose the link-text with `[link=cookies]link text[/link]` |
| `[link=settings]`   | Will be replaced by a link to the advanced settings page.<br>**Note:** Ensure to enclose the link-text with `[link=settings]link text[/link]` |
| `[link=vendors]`    | Will be replaced by a link to the advanced settings page > subpage vendors list.<br>**Note:** Ensure to enclose the link-text with `[link=vendors]link text[/link]` |
| `[link=vendorinfo]` | Will be replaced by a link to show details about a specific vendor.<br>**Note:** The macro can only be used in texts of dynamic content blocking / preview elements. Ensure to enclose the link-text with `[link=vendorinfo]link text[/link]` |
| `[link=vendorinfo-XX]` | Will be replaced by a link to show details about vendor with ID XX.<br>**Note:** Ensure to enclose the link-text with `[link=vendorinfo-s30]link text[/link]` |
| `[/link]`           | Ends an opened link (see above) |
| `[tooltip=...]`     | Will enable the text to display a tooltip on mouseover/click. Example:<br> `[tooltip=Here is my tooltip information]put your mouse here[/tooltip]` |
| `[/tooltip]`        | Ends an opened tooltip (see above) |
| `[expand=...]`      | Will enable the text to display further text on click. Example: <br>`[expand=Read more]Here is more text that is only visible when you click on Read more[/expand]` |
| `[/expand]`         | Ends an expand section (see above) |
| `[vendorcount]`     | Will be replaced by the amount (number) of vendors in the vendorlist. |
| `[userid]`          | If in CMP edit => legal settings a unique user ID is enabled, this ID will be shown |

> **Note:** HTML elements cannot be used within the tooltip.

---

## Button macros

The following macros can only be used in the welcome text of the CMP:

| Macro | Description |
|-------|-------------|
| `[purposes-text]`         | Will be replaced by a comma-separated list of purposes used in your CMP. Can only be used in the welcome text of the first layer. If used, the CMP will no longer display the normal purpose list on the first layer. |
| `[purposes-html]`         | Will be replaced by a html-list (depending in list settings with or without toggles) of purposes used in your CMP. Can only be used in the welcome text of the first layer. If used, the CMP will no longer display the normal purpose list on the first layer. |
| `[accept]` and `[accept-link]`     | Will be replaced by the accept all button / accept all link. If the macro is used in the text, the CMP will no longer display the accept button at the usual place. |
| `[reject]` and `[reject-link]`     | Will be replaced by the reject all button / reject all link. If the macro is used in the text, the CMP will no longer display the accept button at the usual place. |
| `[save]` and `[save-link]`         | Will be replaced by the save button / save link. If the macro is used in the text, the CMP will no longer display the save button at the usual place. |
| `[settings]` and `[settings-link]` | Will be replaced by the settings button / settings link. If the macro is used in the text, the CMP will no longer display the settings button at the usual place. |
| `[langugageswitch]`                | Will be replaced by the language switch button. If the macro is used in the CMP, the normal language switch will no longer be displayed at the usual place. |

---

## Privacy policy

The following macros can only be used in a custom privacy policy text:

| Macro | Description |
|-------|-------------|
| `[link=privacy]`    | Will be replaced by a link to the privacy policy.<br>**Note:** Ensure to enclose the link-text with `[link=privacy]link text[/link]` |
| `[link=tac]`        | Will be replaced by a link to the Terms&Conditions.<br>**Note:** Ensure to enclose the link-text with `[link=tac]link text[/link]` |
| `[link=imprint]`    | Will be replaced by a link to the legal notice/imprint.<br>**Note:** Ensure to enclose the link-text with `[link=imprint]link text[/link]` |
| `[link=cookies]`    | Will be replaced by a link to the cookies list.<br>**Note:** Ensure to enclose the link-text with `[link=cookies]link text[/link]` |
| `[link=settings]`   | Will be replaced by a link to the advanced settings page.<br>**Note:** Ensure to enclose the link-text with `[link=settings]link text[/link]` |
| `[link=vendors]`    | Will be replaced by a link to the advanced settings page > subpage vendors list.<br>**Note:** Ensure to enclose the link-text with `[link=vendors]link text[/link]` |
| `[/link]`           | Ends an opened link (see above) |
| `[tooltip=...]`     | Will enable the text to display a tooltip on mouseover/click. Example:<br> `[tooltip=Here is my tooltip information]put your mouse here[/tooltip]` |
| `[/tooltip]`        | Ends an opened tooltip (see above) |
| `[expand=...]`      | Will enable the text to display further text on click. Example: <br>`[expand=Read more]Here is more text that is only visible when you click on Read more[/expand]` |
| `[/expand]`         | Ends an expand section (see above) |
| `[vendorlistpolicy]`| Will be replaced by the vendorlist integration (expandable list of vendors). Can only be used if the custom privacy policy is integrated into the website and not used as inline privacy policy. |
| `[cookielistpolicy]`| Will be replaced by the table of cookies. Can only be used if the custom privacy policy is integrated into the website and not used as inline privacy policy. |

> **Note:** HTML elements cannot be used within the tooltip.

---

## Own macros

You can also define own macros using the client side configuration options.
