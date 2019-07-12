![Seatsmart Icon](https://seatsmart.tech/img/logo.b38f8b88.svg)

# Seatsmart Remote
This web-based remote UI communicates in realtime with the desktop application 
[Seatsmart](https://github.com/thaddeusm/seatsmart-FHSU) powered by [Seatsmart 
Remote Server](https://github.com/thaddeusm/seatsmart-remote-server).

## Scope
When Internet access is available, instructors can use the Remote feature to 
access basic features from a mobile device.  Data is encrypted during transport 
and this information is not stored in any cloud database.

Currently, the application supports selecting a random student and adding a 
new note related to one or more students' classroom participation.  Other actions 
may be added at the request of users.

Seatsmart Remote will never replace the original desktop application.  These 
remote features are only meant to add utility.

## Design
The application is mobile-first by its nature, with the original design work 
based upon the form factor of an iPhone SE.  The design was then expanded to 
support landscape resolutions of larger tablets, offering a presentation of 
students' seating similar to the original desktop application.

## Core Dependencies
### Vue JS
[repo](https://github.com/vuejs/vue)

Vue is a growing JavaScript framework for user interfaces in the browser.  Seatsmart 
uses CLI tools such as .vue files to organize the application in terms of interface 
components.  State management (Vuex) and routing (Vue Router) help make the codebase 
readable and easy to build upon.  Localization is another strength of this framework, 
with its Chinese documentation and developer community of particular relevance given 
the context of Seatsmart users.

### Socket.io
[repo](https://github.com/socketio/socket.io)

Socket.io powers bidirectional communication within an Express server, providing 
channels (or "rooms") for a Seatsmart host to communicate with their remote 
device.

## Running on a Local Machine
### to install dependencies
```
$ npm install
```
or
```
$ yarn
```

### to serve the application during development
```
$ npm serve
```
or
```
$ yarn serve
```

### to build the application
```
$ npm build
```
or
```
$ yarn build
```
