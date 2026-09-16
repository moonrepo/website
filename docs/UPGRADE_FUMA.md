Our fumadocs package version(s) are a bit out of date in web/package.json​.

Update each dependency one by one, to the latest minor.patch version, fix any issues, and commit the changes. Then move onto the next minor.patch version. For example, fumadocs-core​ would be 16.7.16 -> 16.8.12 -> 16.9.3, etc.

Some of the fuma packages are coupled to each other at specific version ranges, so feel free to upgrade them together. If fuma requires updating non-fuma packages, like vite, also upgrade those as well, otherwise ignore the non-fuma deps.

The one exception is tanstack. Fumadocs is built on top of tanstack, both of which introduce backwards incompatible changes in minor/patch versions, so you'll need to keep them in sync while upgrading (if something breaks).

GitHub: https://github.com/fuma-nama/fumadocs
Website: https://www.fumadocs.dev
