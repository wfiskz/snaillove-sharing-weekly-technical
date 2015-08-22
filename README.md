# snaillove-weekly-technical-sharing
This is the weekly technical sharing in the company.


### #1 2015-08-21(Fri)

***

[@ifeegoo](http://github.com/ifeegoo)

####1.Why C language has the function name with abbreviation,for example,"printf",but why some other programming language Objective-C has the long and full function name?

I think one of the most important is that we have excellent IDE for coding.We can easily remembered by the IDE reminder,we don't need to remember every word of the function name and also we are easy to know what this function does from the long and full name of the function.But we need to remember the full function name while we didn't have the excellent IDE before!

####2.Why Objective-C .m files use m extension?

From the book "Learn Objective-C on the Mac" by Mark Dalrymple and Scott Knaster, page 9:

>"The .m extension originally stood for "**m**essages" when Objective-C was first introduced, referring to a central feature of Objective-C [...]"

Reference:[http://stackoverflow.com/questions/652186/why-do-objective-c-files-use-the-m-extension](http://stackoverflow.com/questions/652186/why-do-objective-c-files-use-the-m-extension)

####3.How to solve the problem that when we add .gitignore file after you have already commited,or you have modified the .gitignore file while .gitignore file has no effect? 

A:In the Git code management,when we add .gitignore file after you have already commited,or you have ADDED some files,directories or kinds of files.The following git command will help you to make the .gitignore file effect:

>`git rm -r –cached .`

>`git add .`

>`git commit -m "Refresh .gitignore file."`

A:In the Git code management,when we have REMOVED some files,directories or kinds of files.The following git command will help you to make the .gitignore file effect：

>`git add -f *.[file type]`

>`git commit -m "Refresh removing *.* from .gitignore file."`

Reference:[http://www.ifeegoo.com/git-code-management-dot-gitignore-file-has-no-effect-solution.html](http://www.ifeegoo.com/git-code-management-dot-gitignore-file-has-no-effect-solution.html)

####4.Programming Font

Programming Font have the following features:
>1.Space-monoed.

>2.Easy to recognize [‘i’, ‘1’, ‘l’] , [‘0′, ‘o’, ‘O’] and so on.

>3.Support extension charset.

Here is a programming fonts collection git repository on Github collected by ifeegoo:

[https://github.com/ifeegoo/ifeegoo-programming-fonts-collection](https://github.com/ifeegoo/ifeegoo-programming-fonts-collection)

***
