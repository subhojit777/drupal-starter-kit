# Drupal Starter Kit

## About
Drupal Starter Kit is a starter kit for Drupal sites which provides provisioning entire local
dev stack using docker containers running current Drupal 7/8 stable release and some contributed
modules sprinkled with CI infra built in using travis + gulp.

## Dependencies
You need npm and composer to use this, please install npm and composer using the steps as per our
OS.
* Composer: https://getcomposer.org/download/
* npm: https://www.npmjs.com/

## Steps to install
Once all the dependencies are installed, follow the steps below

* Clone the repo
* Execute ```npm install gulp```
* Execute ```npm install```
* Execute ```composer install```
* Move your Drupal codebase to docroot directory

## How to use
You can check for coding standards either in your system or use it during a pull request

### Local
* Execute ```gulp``` inside your project to check for coding standards

### In travis
* Create a pull request and travis would make sure to check your pull request for coding standards.
