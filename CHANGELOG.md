# [14.0.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/13.0.0...14.0.0) (2022-10-24)


BREAKING CHANGES

* Angular version updated to v14



# [13.0.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/9.0.0...13.0.0) (2022-10-21)


### Features

* **lib:** support for angular v13 ([cc69c0b](https://github.com/nicky-lenaers/ngx-scroll-to/commit/cc69c0beea92ac3aa1b8715c93f5a51cdc3240ba))



# [9.0.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/3.0.1...9.0.0) (2020-04-23)


### Bug Fixes

* scroll to element with relative positioned parent ([#124](https://github.com/nicky-lenaers/ngx-scroll-to/issues/124)) ([4d2c775](https://github.com/nicky-lenaers/ngx-scroll-to/commit/4d2c775c69052c12399c1de655a7f30d0b3e1cca))


### Features

* **lib:** support for angular v9 ([#128](https://github.com/nicky-lenaers/ngx-scroll-to/issues/128)) ([4d4425b](https://github.com/nicky-lenaers/ngx-scroll-to/commit/4d4425b3e1f59a7bca3588b3a408fa9fcce37032))


### BREAKING CHANGES

* **lib:** Rename properties to follow angular style guide

Before:

[ngx-scroll-to]
[ngx-scroll-to-event]
[ngx-scroll-to-duration]
[ngx-scroll-to-easing]
[ngx-scroll-to-offset]
[ngx-scroll-to-offset-map]

After:

[ngxScrollTo]
[ngxScrollToEvent]
[ngxScrollToDuration]
[ngxScrollToEasing]
[ngxScrollToOffset]
[ngxScrollToOffsetMap]

* **core:** Fix lint



## [3.0.1](https://github.com/nicky-lenaers/ngx-scroll-to/compare/3.0.0...3.0.1) (2019-08-13)


### Bug Fixes

* incorrect package version ([abd2e97](https://github.com/nicky-lenaers/ngx-scroll-to/commit/abd2e97d59bb6c92cd4a34c1efeeb85f676a684d))



# [3.0.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/2.0.0...3.0.0) (2019-08-13)


### Bug Fixes

* failing install due to locked deps ([214d57e](https://github.com/nicky-lenaers/ngx-scroll-to/commit/214d57e4b28ffb1604fab5a69bec6f351a4a3529))
* **lib:** replace "... from 'rjx/index'" import by "...from 'rxjs'" ([#115](https://github.com/nicky-lenaers/ngx-scroll-to/issues/115)) ([452a986](https://github.com/nicky-lenaers/ngx-scroll-to/commit/452a986a011422b0f4d88fbfcd235537faa2e681))


### Features

* update to angular 8 ([#123](https://github.com/nicky-lenaers/ngx-scroll-to/issues/123)) ([8d0e337](https://github.com/nicky-lenaers/ngx-scroll-to/commit/8d0e337ff77740c50c728051b4a971cfd410a0be))



# [2.0.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/1.1.1...2.0.0) (2018-12-12)


### Features

* **lib:** support for angular v7 ([#114](https://github.com/nicky-lenaers/ngx-scroll-to/issues/114)) ([5b9cb85](https://github.com/nicky-lenaers/ngx-scroll-to/commit/5b9cb85a65ebd86ed2fc6584f0284f0582b46784))



## [1.1.1](https://github.com/nicky-lenaers/ngx-scroll-to/compare/1.1.0...1.1.1) (2018-09-12)


### Bug Fixes

* include src in npm packages ([1e44246](https://github.com/nicky-lenaers/ngx-scroll-to/commit/1e4424672022a39d409672ca4d599f69055672da))



# [1.1.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/1.0.0...1.1.0) (2018-09-11)


### Features

* passive events ([#99](https://github.com/nicky-lenaers/ngx-scroll-to/issues/99)) ([37b1e23](https://github.com/nicky-lenaers/ngx-scroll-to/commit/37b1e23e0fbefb7d56e2fc7b0734f6ef4032aed5)), closes [#76](https://github.com/nicky-lenaers/ngx-scroll-to/issues/76)
* support for overflow property overlay ([61d58c3](https://github.com/nicky-lenaers/ngx-scroll-to/commit/61d58c3c27b62065e57d9a6ba47abfaf66b31ea6)), closes [#87](https://github.com/nicky-lenaers/ngx-scroll-to/issues/87)



# [1.0.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/1.0.0-beta.0...1.0.0) (2018-06-04)



# [1.0.0-beta.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.6.1...1.0.0-beta.0) (2018-06-04)


### Features

* support for angular 6 ([#88](https://github.com/nicky-lenaers/ngx-scroll-to/issues/88)) ([9c3c866](https://github.com/nicky-lenaers/ngx-scroll-to/commit/9c3c866861520f4af593553f17def8eecb383762))


### BREAKING CHANGES

* Support for Angular 5 is dropped as of v1.0.0 of this module. For Angular 5 proejcts, please see install guides in the README file.



## [0.6.1](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.6.0...0.6.1) (2018-05-10)


### Bug Fixes

* **module:** non-target offset inside nested container ([#80](https://github.com/nicky-lenaers/ngx-scroll-to/issues/80)) ([292e479](https://github.com/nicky-lenaers/ngx-scroll-to/commit/292e47940afdb142a4cb3a4d0f320ba3fa8eed35))


### Features

* add conventional github releaser ([#86](https://github.com/nicky-lenaers/ngx-scroll-to/issues/86)) ([a3e5dc7](https://github.com/nicky-lenaers/ngx-scroll-to/commit/a3e5dc7092e5ece15ca550385e24969bf0982465))
* commit linting ([#84](https://github.com/nicky-lenaers/ngx-scroll-to/issues/84)) ([82ddc9d](https://github.com/nicky-lenaers/ngx-scroll-to/commit/82ddc9d4c732bf01ae24215783a6bcb7a205fdaf))
* github contributing guidelines and code of conduct ([#85](https://github.com/nicky-lenaers/ngx-scroll-to/issues/85)) ([095e1c8](https://github.com/nicky-lenaers/ngx-scroll-to/commit/095e1c86fa786a3b9be5e4f0ac890223df069193))



# [0.6.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.5.3...0.6.0) (2018-02-13)


### Features

* **module:** scroll to offset instead of target ([#67](https://github.com/nicky-lenaers/ngx-scroll-to/issues/67)) ([c72828a](https://github.com/nicky-lenaers/ngx-scroll-to/commit/c72828acfdd0c048b1dc4fe31d7009b93208159e)), closes [#28](https://github.com/nicky-lenaers/ngx-scroll-to/issues/28)



## [0.5.3](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.5.2...0.5.3) (2018-02-02)


### Bug Fixes

* **module:** compare position value to mapped offset value ([#64](https://github.com/nicky-lenaers/ngx-scroll-to/issues/64)) ([a2f4792](https://github.com/nicky-lenaers/ngx-scroll-to/commit/a2f4792bd38ca16156febba4449c66a549f46b07)), closes [#62](https://github.com/nicky-lenaers/ngx-scroll-to/issues/62)



## [0.5.2](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.5.1...0.5.2) (2018-02-02)


### Bug Fixes

* **module:** e2e runs against compatible chrome version ([#63](https://github.com/nicky-lenaers/ngx-scroll-to/issues/63)) ([293b458](https://github.com/nicky-lenaers/ngx-scroll-to/commit/293b45854c42bb733eaaaab4fc37567b1d347920))



## [0.5.1](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.5.0...0.5.1) (2018-02-02)


### Bug Fixes

* **module:** prevent float to int comparison and use int to int ([b7fa36c](https://github.com/nicky-lenaers/ngx-scroll-to/commit/b7fa36cc67f946615cfd01a8513163d4b484f6a8)), closes [#62](https://github.com/nicky-lenaers/ngx-scroll-to/issues/62)



# [0.5.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.4.0...0.5.0) (2017-12-03)


### Bug Fixes

* bash typo ([12a7958](https://github.com/nicky-lenaers/ngx-scroll-to/commit/12a7958a72fff98f758f41ccbaa527e99054d84c))


### Features

* **module:** Catchable Errors for suppression and custom Error Handling ([#57](https://github.com/nicky-lenaers/ngx-scroll-to/issues/57)) ([0af1208](https://github.com/nicky-lenaers/ngx-scroll-to/commit/0af1208fb16ca266c8f1a9553c01c04e3628766a)), closes [#50](https://github.com/nicky-lenaers/ngx-scroll-to/issues/50)
* **module:** Support for Angular 5 ([#54](https://github.com/nicky-lenaers/ngx-scroll-to/issues/54)) ([fe1da1f](https://github.com/nicky-lenaers/ngx-scroll-to/commit/fe1da1f4548552a6b1e767a011e4afcbe9c42a66)), closes [#52](https://github.com/nicky-lenaers/ngx-scroll-to/issues/52)
* **module:** Support for Native Element in both Target and Container ([#56](https://github.com/nicky-lenaers/ngx-scroll-to/issues/56)) ([8ed7b63](https://github.com/nicky-lenaers/ngx-scroll-to/commit/8ed7b63efbc73bf678cc9b7bf142daa3c8b52302)), closes [#22](https://github.com/nicky-lenaers/ngx-scroll-to/issues/22) [#55](https://github.com/nicky-lenaers/ngx-scroll-to/issues/55)



# [0.4.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.4.0-alpha.3...0.4.0) (2017-10-12)


### Bug Fixes

* **module:** Correctly calcuate `ngx-scroll-to-offset` value on inverse scrolling from bottom to top ([7656e35](https://github.com/nicky-lenaers/ngx-scroll-to/commit/7656e350870e37cc9f1ed1cf49004b3c0064b7cf)), closes [#29](https://github.com/nicky-lenaers/ngx-scroll-to/issues/29)


### Features

* **module:** ScrollTo using a diferent Container Element and without `event` parameter ([bf3612f](https://github.com/nicky-lenaers/ngx-scroll-to/commit/bf3612f65afde40ec4af6800a1e674e86277ca85)), closes [#27](https://github.com/nicky-lenaers/ngx-scroll-to/issues/27) [#20](https://github.com/nicky-lenaers/ngx-scroll-to/issues/20)


### BREAKING CHANGES

* **module:** The `ScrollToConfig` Interface has been renamed to `ScrollToConfigOptions`
* **module:** The `event` parameter has been removed from `scrollTo` function, see README.md for updated examples



# [0.4.0-alpha.3](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.4.0-alpha.2...0.4.0-alpha.3) (2017-10-04)



# [0.4.0-alpha.2](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.4.0-alpha.1...0.4.0-alpha.2) (2017-10-04)



# [0.4.0-alpha.1](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.3.1...0.4.0-alpha.1) (2017-10-04)


### Features

* **comments:** Set Proper Commenting ([db167a1](https://github.com/nicky-lenaers/ngx-scroll-to/commit/db167a1d9dc2bf60f45f56a5fd182aabedd284be))
* **github:** Improved Issue Template ([4da3eae](https://github.com/nicky-lenaers/ngx-scroll-to/commit/4da3eae205b19e4fb2d4d7f17c3e1effa0504152))
* **github:** Proper PR merging for Changelog Generation ([c64b59d](https://github.com/nicky-lenaers/ngx-scroll-to/commit/c64b59d2a4e9cf17f2632cef971f946c0c81cbcc))



## [0.3.1](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.3.0...0.3.1) (2017-08-08)



# [0.3.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.2.4...0.3.0) (2017-08-08)



## [0.2.4](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.2.3...0.2.4) (2017-07-27)



## [0.2.3](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.2.2...0.2.3) (2017-07-23)



## [0.2.2](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.2.1...0.2.2) (2017-07-22)



## [0.2.1](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.2.0...0.2.1) (2017-07-21)



# [0.2.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.1.7...0.2.0) (2017-07-21)



## [0.1.7](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.1.6...0.1.7) (2017-07-20)



## [0.1.6](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.1.5...0.1.6) (2017-07-20)



## [0.1.5](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.1.4...0.1.5) (2017-07-20)



## [0.1.4](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.1.3...0.1.4) (2017-07-20)



## [0.1.3](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.1.2...0.1.3) (2017-07-20)



## [0.1.2](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.1.1...0.1.2) (2017-07-20)



## [0.1.1](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.1.0...0.1.1) (2017-07-20)



# [0.1.0](https://github.com/nicky-lenaers/ngx-scroll-to/compare/0.0.2...0.1.0) (2017-07-20)



## 0.0.2 (2017-07-20)



