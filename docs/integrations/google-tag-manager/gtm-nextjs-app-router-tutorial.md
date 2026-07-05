# Getting Started with GTM in Next.js App Router


Have you ever thought about tracking user behavior on your website? If yes, you are probably familiar with Google Analytics, the state-of-the-art user tracker companion. How about Google Tag Manager? Also yes? Of course, since that's how you've found this post. If you are at the first step of setting it up, you are in the right place. But in case you have never heard about it, I still recommend reading it to the end because who knows? You might learn something you didn't even know you needed. So let's get started.

## Motivation

Why did I write this post? There are a couple of reasons. First, I have always felt that there is much more to Google Analytics than simply seeing how many active users you have currently and had in the last few days. But I had no idea how to configure this. I also knew it was possible to see which buttons your users press the most, but again, I didn't know how to do it.

Second, I found a convenience library made by the Next.js team that makes it extremely easy to integrate Google Tag Manager and Google Analytics into a website. Still, sadly, as of writing this post, it contains an unresolved bug many face when installing it. I will uncover how to overcome this and what my workaround is.

And finally, my ultimate reason was that I wanted to configure all of the above on [ReadSonic](https://readsonic.io/), my audioblog website. So, if you have the same ambitions as me and work with the same tech stack, namely Next.js, and Google, then look no further because this post was written for you.

A quick disclaimer before I jump into it: this post isn't an in-depth guide about Google Tag Manager. It is a simple Next.js and GTM tutorial to get you started as fast as possible.

## What is Google Tag Manager?

Google Tag Manager (GTM) is a marketing tool that helps you track user behavior with extremely granular configuration for each kind of interaction. It can track scroll behavior, clicks, video plays, back and forward navigation inside the page, and many more, just to mention a few. But the primary goal of this post is to show how to set up GTM with the Next.js App Router, so I will simply stay at tracking clicks on the website.

GTM is free to use, and you can also easily connect it to Google Analytics to see the tracked clicks in one location. GTM defines numerous user interaction types by default, but of course, you can define custom ones, although they recommend using the built-in interactions for better results.

GTM can look extremely overwhelming on the first visit. You find Tags, Triggers, and Variables everywhere. You feel they are somehow connected and need them all, but you don't know how and when. On top of that, many guides on the internet use the same terminology as GTM, so you aren't helped with those either. Here is my attempt.

The first step you must make if you just opened Google Tag Manager is to create a new Account and a Container. In my case, it looks like the image below.

![Creating an Account and a Container in Google Tag Manager](/images/blog/getting-started-with-gtm-in-nextjs-app-router/gtm-account-and-container-setup.png)

You have to choose the name and location of the new account. Then, you have to configure the name and type of the container. Next, you must agree to the Google Tag Manager Terms of Service Agreement and, depending on your location, potentially GDPR. Once your account and container are created, you will see a code snippet that you can use to embed GTM on your website.

![Google Tag Manager Code Snippet](/images/blog/getting-started-with-gtm-in-nextjs-app-router/gtm-configuration.png)

You may use this option, but I will show you a more convenient method designed explicitly for Next.js. Don't worry if you accidentally close this popup since you can reopen it later by pressing your GTM tag in the toolbar. It has a format like this: GTM-XXXXXXXX.

You are done with the first step, so let's explore a more exciting territory: Variables.

### What are Variables?

You definitely need them, but chances are you don't have to define custom ones, contrary to what other guides might suggest. Variables have two major types: built-in and user-defined ones. There are many more types inside these two categories, but explaining them is out of the scope of this post. For now, you have to understand three things:

- there are built-in variables you can choose from,
- you can define custom ones if they are not enough, and finally,
- you most probably won't need custom ones for simple use cases.

Simply put, Variables are metadata in your website that you can refer to. The `id` of a button is a Variable. Its `class` is also a Variable. And so is its target, text, and URL. The same is true for any other element. You can refer to any `div`, `a` tag, `button`, `span`, etc., by variables in GTM. But the hostname, URL, and the path the user is currently on are also Variables. There are specific Variables for forms, videos, and navigation history. I think you get the idea now.

The most basic use case is this: you have some buttons on your landing page, each having a different `id`, and you want to track clicks on them. For this, first, you must enable clicks in the Variables menu by clicking the Configure button in the upper right corner.

![Enabling Clicks in Google Tag Manager](/images/blog/getting-started-with-gtm-in-nextjs-app-router/gtm-click-variables.png)

Enable each Click Variable like the image above, and that's it. Understanding what a Variable is is important because, in the next step, you have to refer to them when you define Triggers.

### What are Triggers?

While it's relatively hard to choose the most important component of GTM, if I had to choose one, I would say Triggers are these.

Triggers are user interactions GTM can track. They have multiple types. Like in Variables, you can also define custom Triggers or events your app can listen to. Click-type Triggers can be the click on a link or any element in the DOM, like a button.

![Click and User Engagement Triggers in Google Tag Manager](/images/blog/getting-started-with-gtm-in-nextjs-app-router/gtm-click-and-user-engagement-triggers.png)

But the depth of scrolling a user does on your site is also a Trigger. And so is the loading of the DOM.

So, how are Triggers and Variables connected? For the sake of simplicity, I will stay at the simplest kind of Trigger: a click.

To simplify things even more, I must mention that you can define a Trigger that listens for *every* click. In this case, you don't need a Variable at all. However, usually this is not the case. Collecting every single click, even those on a div, would probably bloat your logs, and you don't want that.

What you want instead is to listen to specific clicks. For example, you would collect every click on the main call-to-action button in your hero section with `id="cta-button"`. Or you could also collect every navigation to the login page with a link or button having `id="login-button"`.

Remember what Variables were? Metadata in your website, like an `id` or a `class`. To filter clicks based on these, you must use them when setting up a Trigger. Here is what it looks like on the UI.

![Setting up a Click Trigger in Google Tag Manager](/images/blog/getting-started-with-gtm-in-nextjs-app-router/defining-a-click-trigger.png)

**NOTE:** If you want to track clicks on a button with other elements in itself, child elements can hijack that click if they are below the cursor. A common example is a button with an icon in it. A click of the button will usually be a click on the image. To overcome this, you can set `pointer-events: none;` on the image. This way, every click will happen on the button and show up correctly in your analytics.

Okay, so you already know that you can listen to user events on your site (Triggers), and you can filter them based on some conditions (Variables). But you still have no idea how to collect and view these. You probably also want to provide this information to other services like Google Analytics or some other external user behavior monitoring tool. For this, you need Tags.

### What are Tags?

Since GTM is only for configuration, you need a place to collect and view events that happened on your page. This is what Tags are for. Tags are the connection to the world outside GTM.

When you define a Tag, you must choose a Trigger that the Tag should listen to, and then you must configure where the event should be forwarded. As you probably already guessed, Tags also have multiple types, and you can define custom Tags, but I will keep things at the beginner level for this post. If you are a Google user, forwarding events to Google Analytics 4 is an obvious choice. In the image below, you can see how the `GA4 Event` type is chosen for the Tag Type, and below it, there is the Trigger from the previous image.

![Defining a Tag in Google Tag Manager](/images/blog/getting-started-with-gtm-in-nextjs-app-router/defining-a-tag.png)

In this case, you must also configure a Measurement ID, which is the ID of your Google Analytics 4 web data stream. It has the format G-XXXXXXXXXX. This ID is crucial to finding the correct GA4 configuration where GTM should forward the button clicks. Finally, you must provide an Event Name, which will be displayed in Google Analytics. The event name can be static, or it can be a Variable. The same Variable I spoke about earlier. If you are using a variable like Click Text, the event's name in Google Analytics will be the innerText of the button clicked. It is especially useful when you define Triggers based on class, and the same Tag collects multiple button clicks. Click Text makes it easy to differentiate between them. You can, of course, use other available Variables if you want.

When you define your Measurement ID, there is one thing you must be aware of. You will probably see the warning below.

![Google Tag Manager Warning](/images/blog/getting-started-with-gtm-in-nextjs-app-router/gtm-warning.png)

The **Google Tag** is a specific kind that helps establish the data flow from the website to Google Analytics or other destinations. You can find more information on the [Tag Manager Help page](https://support.google.com/tagmanager/answer/9442095) if interested.

Simply create it with the **Create tag** button on the right. Again, use your Google Analytics ID as the Tag ID when creating it. You only need to do this once. Other Tags created later will find your existing Google Tag and won't throw the warning anymore.

With this setup, you are done. You should see the events in Google Analytics soon if everything goes well. Disable any ad blockers if you experience nothing being shown on the dashboard. Using them is a common cause of missing events since they usually prohibit website trackers from working correctly.

When you created the container in the first step, you received a guide (a code snippet) that you must include in your website to make GTM work. But as I mentioned at that point, you don't need it at all because Next.js already did the hard work for you.

## Integration with Next.js

Since you are here, you are probably familiar with Next.js, so I won't make this post longer by introducing it. Next.js makes it ridiculously easy to integrate some third-party apps. Luckily for us, one of them is Google Tag Manager.

**NOTE:** I am using the App Router in this guide. Ensure you are also using it when following the examples below. There's a good chance it would also work with the Pages Router, but I only tested and used the App Router in the following snippets.

Execute the following command to install the [third-party extension](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries) module:

```bash
npm i @next/third-parties
```

When it is finished, you can integrate GTM with a simple line:

```tsx title="layout.tsx"
import { GoogleTagManager } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleTagManager gtmId="GTM-XXXXXXXX" />    <-- The line you need
    </html>
  )
}
```

Put the above code in your root layout.tsx file to include GTM on every page of your web application. This module also exposes helper functions to send custom events to GTM. However, if you are satisfied with the built-in Triggers and Variables I explained earlier, the code above is enough to send every button click to GTM. No additional code is required.

### Integrating Google Analytics

The third-party module also helps with Google Analytics integration and lots of other web analytics tools, but as of writing this post, there is an unresolved bug with it, which results in the following error:

![Next.js Third-Party Module Error](/images/blog/getting-started-with-gtm-in-nextjs-app-router/nextjs-third-party-error.png)

To fix this, I only used the third-party extension for GTM and solved GA configuration with a custom snippet. Here is my workaround in case you need it.

```tsx title="analytics.tsx"
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import conf from "../conf/config";

export default function Analytics() {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${conf.googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${conf.googleAnalyticsId}');
        `}
      </Script>
      <GoogleTagManager gtmId={conf.googleTagManagerId} />
    </>
  ) : null;
}
```

To avoid errors locally and in the test environment, I have a guard that only includes Google Analytics and Tag Manager when the app runs on production. The `<Script>` tags are what GA gives you for manual setup, and down below is the `GoogleTagManager`, which is reduced to a single line if you are using the third-party extension. This `<Analytics />` component is included in the root layout instead of `GoogleTagManager`.

## The final result

Hopefully, you did everything by my description, and the UIs haven't updated much since I released this post. 😁

If everything is set up, click some buttons you connected with GTM to Google Analytics, then open the dashboard and check the events arriving in a minute or two. Here is the result in my case.

![Google Analytics Events](/images/blog/getting-started-with-gtm-in-nextjs-app-router/analytics-events.png)

The landing page of [ReadSonic](https://readsonic.io) has some call-to-action buttons at the top named **Let's hear it** and **Read more**, and it also has some sample voices with names the user can try before registering. You can see in the image above that I pressed these buttons several times when I tested that GTM was working and forwarding events to GA correctly. You don't see here `primary-cta` and `secondary-cta` anywhere because I am using the `Click Text` Variable as the event's name. Remember this part? You can configure the forwarded click events to appear as the `innerText` of the pressed button in Analytics. You can see it in action above.

## Summary

This post won't turn you into The Master of Tag Manager, but that wasn't the goal either. Since the App Router in Next.js is relatively new, and so is GA4, I haven't found any introductory posts about integrating them with GTM. Now we have one.

By following the steps above, you should have a working setup that can track any particular click on your site, and they will appear in your Analytics dashboard.

There's much more to GTM than simple Variables, Triggers, and Tags, but if your requirements are as simple as mine, you don't need a complicated solution. Go with the built-in options and make your life easier.

See you next time.


---

To find navigation and other pages on this website, fetch the llms.txt file at: https://richardkovacs.dev/llms.txt