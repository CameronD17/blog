---
layout:         post
title:          "Mystery Date Nights"
date:           2016-12-01 09:00:00 +0000
tags:           projects angular2 typescript development web
categories:     projects
---

Recently, I realised that I hadn't developed anything major outside of work for a while - since this blog or website a year or so ago. Wanting to change that, I dived into the extremely intimidating and fast-moving world of JavaScript frameworks, and started learning [Angular 2][angular-io].

<!-- Read More -->

I will preface this article by saying I'm still very much a novice when it comes to JavaScript frameworks - my experience is limited to essentially vanilla JavaScript and jQuery. The whole eco-system is [frankly terrifying][javascript-in-2016] to look at from the outside, and everything is so co-dependent that it's difficult to find a gap to work your way in easily. You have to dive in head first, accept that there's a lot of code you'll be running that you don't fully understand, and try to pick things up as you go. Learning JavaScript frameworks in the current climate is nothing like learning any other programming language.

As well as learning Angular 2 from scratch, I also picked up a new language ([TypeScript][typescript-language]) and a new source code editor ([Visual Studio Code][visual-studio-code]) to learn along the way; may as well go the whole hog and make things as difficult as possible, eh?

## Visual Studio Code 

Since starting university, I've switched fairly evenly between two code editors for web development; [Notepad++][notepad-plus-plus] and [Sublime Text][sublime-text] (the former being my editor-of-choice for writing these blog posts). About a year and a half ago though, a newcomer joined the ranks - Visual Studio Code. I decided I'd give it a try, since everything else on the project was new to me anyway.

The interface is a cross between Sublime Text and Visual Studio, the IDE I use for C++ development. Honestly, I think Microsoft are due a fair bit of credit for their design, as this is one of the first IDEs or code editors that I haven't immediately changed the look-and-feel of. The syntax highlighting colour scheme is different to most other editors, but it works well enough that I didn't feel inclined to try and change it.

I'm in no way a power user when it comes to basic code editors, but the majority of shortcuts I tried using were intuitive, and I haven't yet found anything glaringly obvious missing compared with Notepad++ or Sublime Text. 

For me, the main selling points are the Intellisense for TypeScript/JavaScript, and the Git integration. Neither were things I felt I really needed before this project, but they worked so effortlessly in Code that I don't think I'll go back to not using them in future. Overall, it's a very pleasant editor, and will probably stay as my first choice for JavaScript work going forward (Sublime Text still wins for HTML/CSS/PHP, and Notepad++ still wins for Markdown).

## TypeScript

When I first started looking at Angular 2 back in September or so, pretty much as soon as release 2.0.0-rc.6 was closed off, the documentation was written with the TypeScript developer in mind. I hadn't touched on TypeScript previously, although I was aware of it, and decided to add an extra challenge and add a new string to my bow and learn it.

![TypeScript is king when it comes to Angular 2]({{site.baseurl}}/assets/img/mystery-date-nights-angular-2-docs-typescript.jpg)
*TypeScript is king when it comes to Angular 2*

TypeScript is a superset of JavaScript, that requires transpilation into JavaScript. It introduces types to JavaScript, and in doing so allows a strongly-typed environment to work in (despite JavaScript itself not requiring types). This isn't to say that types are *required* though; TypeScript has type inference, meaning you can use the `let` keyword, and it will automatically figure out what type you're trying to use. You can also cast to `<any>` if need be, TypeScript will allow that. The object-oriented development style was also a welcome change, given my Java / C++ background. It helped massively too that Visual Studio Code included Intellisense for TypeScript, so I wasn't completely scratching around in the dark when I hit issues. 

## Angular 2

Now, the actually difficult part - Angular 2. As I mentioned, I've actively avoided JavaScript frameworks for the last couple of years, burying my head in the sand. There are too many, choosing one would inevitably mean choosing the wrong one. I never learned Angular 1 in any real depth (I made a simple app with a tutorial to grasp the basics, but that was all), so this isn't a comparison between the two.

Angular 2 is a component-based framework to develop single-page applications, where your HTML `templates` contain markup with Angular tags, that align with `component` classes to manage said templates, with the application logic itself residing in `services`. Components and services are collected together in `modules`. It's a little complicated if you're new to it (which I was), but it starts to make sense after a bit of playing around.

## Mystery Date Nights

The project itself is simply to chronicle the date nights Sasha and I go on in Edinburgh and the surrounding areas (discussed a little more in my post [Local]({% post_url 2016-09-11-local %})). My plan was to simply list the dates themselves, provide a map of where we've been, and also write a couple of lines about our experiences at each place. As of this writing, we've been on 27 "official" date nights, although I've also included a select few other places that we've visited outwith the actual two-dates-a-month that we decided on as our rule.

The list was based on a tutorial I followed when looking into AngularJS (Angular 1), using filters to sort columns and also to find date nights by typing ito the search box. However, this isn't quite so simple in Angular 2 as in AngularJS, but it did give me a good excuse to learn about Pipes, used to transform data. 

![The list layout of the mystery date nights]({{site.baseurl}}/assets/img/mystery-date-nights-list-screenshot.jpg)
*The list layout of the mystery date nights*

The map section uses LeafletJS to display the data as pins on a map. This isn't really as integrated as I'd like, but in practice for this simple application it works fairly well.

![The map layout of the mystery date nights]({{site.baseurl}}/assets/img/mystery-date-nights-map-screenshot.jpg)
*The map layout of the mystery date nights*

The project is located at [mysterydatenights.co.uk][mdn-url]. It's hosted on a Heroku dyno, automatically deploying from the Git repository.

## Known Issues / Future Development 

I set myself a strict timescale of three months to complete this project. This should have been more than enough time, but as often happens, personal issues arose that got in the way. With that in mind, I am aware of the following issues / improvements, and plan to implement them at some point in the future. If you find any issues aside from these (or you think there's any other improvements I can make) please feel free to [raise an issue on GitHub][github-issue] or drop me an email at [hello@camerondoyle.co.uk][email-link].

- **Unit testing:** I currently have no unit tests written for this project (I know, I know, cardinal sin). I decided against them due to not being familiar with the testing frameworks suggested by Angular 2 (Karma, Jasmine), although I do want to learn them, I felt it was too much in one go.
- **Responsive design:** I wrote this to be specifically used on a full-fledged web browser, and while it runs okay on a mobile, the experience could definitely use an improvement.
- **Cross-browser compatibility:** I'm aware of issues surrounding the application running in Internet Explorer - I tested this only in Chrome, and I plan to polyfill and fix for other browsers in future.

[angular-io]:           https://angular.io/
[javascript-in-2016]:   https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.ulc87z1gh
[typescript-language]:  https://www.typescriptlang.org/
[visual-studio-code]:   https://code.visualstudio.com/
[notepad-plus-plus]:    https://notepad-plus-plus.org/
[sublime-text]:         https://www.sublimetext.com/
[mdn-url]:              http://www.mysterydatenights.co.uk
[github-issue]:         https://github.com/CameronD17/mystery-date-nights/issues
[email-link]:           mailto:{{ site.author.email }}