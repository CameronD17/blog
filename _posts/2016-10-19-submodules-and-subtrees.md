---
layout:         post
title:          "Submodules and Subtrees"
date:           2016-10-19 09:00:00 +0000
tags:           html5 css development github projects
categories:     development projects
---

You may have noticed a new addition to the blog recently; a slide-out menu on the left hand side, linking to the other subdomains. For the last few months, I've been thinking of ways to restructure my website, to integrate the blog back into my main homepage, as well as incorporate other subdomains as I develop them. This menu was the answer I came up with.

<!-- Read More -->

However, as each subdomain resides in a separate repository on GitHub, I didn't want to have to maintain multiple copies of the menu. Duplicating code is never a good idea, as it inevitably leads to inconsistency as changes are missed when an update happens to one or more places the code resides. To counteract this, I looked into ways of sharing code between repositories. I found two solutions that seemed to do what I needed; Git Submodules, and Git Subtrees.

## The menu

When I first started designing the menu, I decided from the beginning that I wanted to avoid using JavaScript/jQuery entirely, and try to write the menu in pure HTML5 and CSS. The reason for this self-imposed constraint is that I wanted to be able to drop the menu into any of my Jekyll projects in the `_includes` folder, and not have to worry about any external dependencies; I wanted it to work out-the-box, with the only requirement being a simple `{% raw %}{% include menu/menu.html %}{% endraw %}` line in my layouts.

The solution I'm using is a bit of a hack, using an invisible checkbox to open/close the slide menu, and general sibling combinators to change CSS when the "checkbox" is selected or deselected. Nevertheless, the finished menu, complete with an internal stylesheet, comes in at a relatively slimline 48 lines and under 4kB - it's not going to bloat the projects I want to use it in. The code for the menu is [available on Github][menu-github-repo], and a demo version is available at [camerondoyle.co.uk/menu-sample][menu-sample].

Both submodules and subtrees worked as solutions for the menu. I initially included the menu as a submodule in each subdomain, but switched them all to subtrees prior to writing this article.

## Git Submodules

Submodules are links to external repositories - they exist only as a reference to a snapshot (a single commit), and do not copy the external repo into your main repo. If you need to make a change to the submodule and persist that change to repos that use the submodule, you must first commit/push changes within the submodule, and then update/commit/push the submodule within the parent repo. While this can be a tedious process, it is useful in that it doesn't update automatically, thus preventing changes to the submodule breaking the code of parent or causing unexpected behaviour.

### Adding a submodule

When I added the menu as a submodule to my blog repository, I wanted it to exist within the '_includes' folder generated by Jekyll, to allow me to call the menu easily in all of my layouts. To add the submodule I ran the following command from the root of my blog repository. It follows the pattern `git submodule add [url-to-submodule-repo] [path-for-submodule]`.

    git submodule add https://github.com/CameronD17/menu _includes/menu

This generates a folder called 'menu' within the '_includes' folder, containing a reference to the submodule. As this is the first submodule of the project, it also generates a .gitmodules file in the root of the repository:

    [submodule "_includes/menu"]
	path = _includes/menu
	url = https://github.com/CameronD17/menu

After adding the reference to the submodule, you then need to initate it in order to pull the code into the directory you configured in the previous step. This is simply:

    git submodule init

And that's it! More than likely you now need to change your main module to accommodate the new submodule in some way (for me, I simply needed to add `{% raw %}{% include menu/menu.html %}{% endraw %}` at the top of the `<body>` in my layouts).

### Maintaining a submodule

Adding a submodule is easy, and for static code it's great; there's nothing else to do. However, if you commit and push changes to the submodule repository, you're going to want to propagate those changes through to your other repos. To do this, you need to run the following commands (assuming that you've committed and pushed your external submodule changes already):

    git pull
    git submodule update --init

If you have nested submodules (or the submodule you're using has its own submodules), you can also add `--recursive` after the `git submodule update --init` command.

Now you'll need to commit and push these changes to your main repository. If you're doing this a lot, it's going to get tedious and repetitive, particularly if you have many repos that use the same submodule (I only have three and it was a pain). To make it slightly easier, GitHub themselves recommend [adding an alias][github-submodule-page] for these commands:

    git config --global alias.update '!git pull && git submodule update --init --recursive'

Now you can simply call `git update` to update the submodules before committing and pushing to your main repository.

## Git Subtrees

Git Subtrees are largely similar to Submodules in terms of their usage, to the point that I didn't need to change anything at all in the master repo when I changed the menu from a submodule to a subtree. In contrast to submodules, subtree source files are stored directly in the master repo. It's not a link, the files are actually there. There's also less commands required to use subtrees, and fewer steps in the workflow. 

### Adding a subtree

To reproduce the example with submodules above and add a subtree inside my _includes folder, I simply need to run two commands:

    git remote add menu https://github.com/CameronD17/menu
    git subtree add --squash --prefix=_includes/menu/ menu master

The first line adds a remote to the external repository, and the second line creates the subtree. I used the `--squash` command to avoid polluting my git history. The `--prefix=[path-for-submodule]` command tells git where to store the subtree (note the trailing slash to denote a folder - this is different than for creating a submodule), followed by the repo name and the branch name we want to use for the subtree. That's it, no initialisation required, and no extra metadata is created (i.e. the .gitmodules file).

### Maintaining a subtree

Assuming that, as we did with submodules, you've already committed and pushed changes to your external subtree repo, and want to reflect those changes in your master repo, all you need to do is run:

    git subtree pull --squash --prefix=_includes/menu/ menu master

The command is very similar to creating a new subtree; the only difference is substituting 'pull' for 'add'. Also, if you have write access to the submodule, you can also commit your changes from the master repo back to the subtree repo, using:

    git subtree push --squash --prefix=_includes/menu/ menu master

Which is a feature not available to git submodules (as they're only links). There is obviously much more you can do with both submodules, and subtrees, than what I've touched on here, but hopefully this is enough to at least get started.

As with my other development posts, I'm not an expert, so with that in mind, if you do find any errors or omissions with this article, please do drop me an email at [hello@camerondoyle.co.uk][email-link] and let me know. I’m always eager to learn, and any corrections will be updated here.

[menu-github-repo]:         https://github.com/CameronD17/menu/blob/master/menu.html
[menu-sample]:              http://camerondoyle.co.uk/menu-sample
[github-submodule-page]:    https://gist.github.com/gitaarik/8735255
[email-link]:               mailto:{{ site.author.email }}