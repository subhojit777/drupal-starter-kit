# Drupal Starter Kit

## About
Drupal Starter Kit is a starter kit for Drupal sites which provides provisioning entire local
dev stack using docker containers running current Drupal 7/8 stable release and some contributed
modules sprinkled with CI infra built in using travis + gulp.

## Features
* Automated coding standard(Drupal Coding Standards, CSS Linting, JS Linting) check using [coder](https://www.drupal.org/project/coder)
, [eslint](http://eslint.org), [csslint](http://csslint.net). The infrastructure has been setup using [gulp](http://gulpjs.com) and
[travis](http://travis-ci.org).

## Roadmap
* One touch set up of local development environment using docker containers
* Configurable path for Drupal Installation: Currently there is a dependency on the location of Drupal
codebase to check/enforce coding standards which is hardcoded in gulp.js file. Eventually the
location of Drupal Codebase would be configuration so that Drupal Codebase does not have to be moved
to docroot dirctory which is currently the case.
* Dashboard to analyze php notices/warning: Ideally there should not be minimal php notices/warning
in a project and should decrease with time. Any deviation can be a signal for the team to diagonise the
problem.

## Dependencies
You need npm and composer to use this, please install npm and composer using the steps as per our
OS.
* Composer: https://getcomposer.org/download/
* npm: https://www.npmjs.com/

## Steps to install
Once all the dependencies are installed, follow the steps below

* Clone the repo
* `cp example.travis.yml .travis.yml`
* `cp example.config.yml config.yml`
* Execute ```npm install -g gulp```
* Execute ```npm install```
* Execute ```composer install```
* Move your Drupal codebase to docroot directory

## How to use
You can check for coding standards either in your system or use it during a pull request

### Local
* Execute ```gulp``` inside your project to check for coding standards

### In travis
* Create a pull request and travis would make sure to check your pull request for coding standards.
