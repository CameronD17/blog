---
layout:         post
title:          "Respecting Your Reader"
date:           2016-09-07 09:00:00 +0000
tags:           web development technology
categories:     development
---

There are two things that I consider to be disrespectful to the reader when browsing online; intrusive advertising, and excessive page-weight. Both tell me exactly what the author or page-owner thinks of their audience, and it isn't positive.

<!-- Read More -->

## Advertisements

I'll admit upfront, I use an ad-blocker ([uBlock Origin][ublock-wiki-page]). There is a long and nuanced argument to be had about the ethics of using ad-blockers, and I can see both sides. I understand the need for adverts from a site-owner perspective as a revenue stream, and I understand that without that revenue some/many/all sites that rely on it may disappear. However, as advertisements can end up [costing the reader up to $0.40 to view a page][nytimes-cost-of-mobile-ads] on mobile, I can also see why the reader may choose to block ads, and that's before the argument of intrusive advertisements having a negative impact on the reader's browsing experience.

Despite using an ad-blocker by default, I do whitelist the majority of sites that I visit regularly (unless they have appallingly intrusive or bloated advertisements). I feel that this is the fairest way of using the web; when I visit a page for the first time, I don't know that I'm going to enjoy it or find it useful. Compare this with entering a physical brick-and-mortar store; while I'm browsing a store, I wouldn't expect to have to pay money for that experience. Would you be happy visiting a store that left it's doors wide open, but charged you a fee as soon as you set foot across the threshold?

If I see something I like in a physical store, I'll quite happily pay to purchase. Or if I like the content on a website and find it useful, I'll whitelist the site and allow advertisements to be displayed. If I don't see anything I like in the store, I can leave and the store has earned no money from me. If I visit a website and the content is not what I was looking for, or what I expected, I can leave without whitelisting, and again the site has earned no money from me. You could argue that the website has had to pay for me to visit (in terms of server costs, bandwidth etc.) and deserves to be reimbursed, but you could just as easily argue that the physical store has had to pay for me to visit too (in terms of rent, utilities, staff wages etc). I'd consider both the cost of doing business.

## Page Bloat

At least with advertisements I can see their place as a necessary evil. Page bloat, on the other hand, I consider to be pure laziness on the part of the author/developer.

In April of this year, Ronan Cremlin wrote an article for mobiforge titled [The web is Doom][the-web-is-doom]. In the article, Ronan outlines how the average web page size has now exceeded the Doom install image, at around 2.3MB. That is an *obscenely* high figure for a webpage, and the trend is towards an even higher increase. Sitepoint have posted an [annual article][sitepoint-page-weight-2015] since 2012 about the average page size increase for that year; in the last five years, average page size has soared from around 960kB to 2,262kB. At the end of last year, Maciej Cegłowski gave a talk about [The Website Obesity Crisis][idlewords-obesity] which is a fantastic read on the absurd unnecessity of overweight websites (seriously, go read it).

Less is more when it comes to web design. You need to respect the reader's time, both by stripping out the unnecessary features that distract from your content, and slimming down your page size to a respectable size. I personally consider 'respectable size' to be under 500kB, not including content specific images. So if you have a 2MB Facebook icon on every page, that counts; if you have a picture specific to the page that adds value, that doesn't (although you should still be optimising your images for the web, as well as ensuring your [images are useful][taft-test]). Different people will have different metrics for this, but I'd say half a megabyte should be your absolute hard limit for a typical page.

This page clocks in at around 230kB total (as of this writing). Only about 13kB of that is actual content (i.e. this writing). A little over 100kB is made up of stylesheets, mainly Bootstrap. This is probably too much, but for now I can accept it. Another 100kB or so are fonts. Realistically, both of these could be much lower, but they're still within my own self-administered limits, so for now they're acceptable.

Overall, we need to remember what websites are *for*. They're for the reader, the consumer, the visitor. I've already said that I consider my target audience to [just be me]({% post_url 2015-12-18-audience %}), but I still try to optimise it on the off-chance somebody else visits. If you aren't providing your visitors with a good experience and showing them respect, they aren't going to stick around.

[ublock-wiki-page]: https://en.wikipedia.org/wiki/UBlock_Origin
[nytimes-cost-of-mobile-ads]: http://www.nytimes.com/interactive/2015/10/01/business/cost-of-mobile-ads.html
[the-web-is-doom]: https://mobiforge.com/research-analysis/the-web-is-doom
[sitepoint-page-weight-2015]: https://www.sitepoint.com/average-page-weight-increased-another-16-2015/
[idlewords-obesity]: http://idlewords.com/talks/website_obesity.htm
[taft-test]: https://tafttest.com/