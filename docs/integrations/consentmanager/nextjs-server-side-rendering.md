# Next.JS Server-side Rendering

In order to use the consentmanager script in a Next.JS website with server-side rendering, you must use the semi-automatic blocking code of consentmanager in the version as external script code:

1. Go to **Menu** > **CMPs** > **Get Codes for ... Websites**
2. Click on **Semi-automatic blocking**
3. Click on **External Code**
4. Copy the code

---

In your Next.JS App you will need to slightly adjust the `<script>` that you copied and insert it into your main or page component. The adjustments to be made are:

- Change `<script ...>` to `<Script ...>` (uppercase S)
- Add attribute `strategy="afterInteractive"` to the `<Script ...>`

**Example `page.tsx`:**

```tsx
'use client';

import React from 'react';
import Script from 'next/script';
import Head from 'next/head';

export default function TestPage() {
    return (
        <div>
            <Head>
                <title>Next.js SSR Demo</title>
            </Head>

            <h1 style={{color: '#0070F3'}}>SSR Demo Page</h1>

            <Script strategy="afterInteractive" type="text/javascript" data-cmp-ab="1"
                src="https://cdn.consentmanager.net/delivery/js/semiautomatic.min.js"
                data-cmp-cdid="..." //Todo: Add Code-ID from your CMP-Code
                data-cmp-host="..." //Todo: Add host-value from your CMP-Code
                data-cmp-cdn="..."  //Todo: Add cdn-value from your CMP-Code
                data-cmp-codesrc="0"></Script>
        </div>
    );
}
```
