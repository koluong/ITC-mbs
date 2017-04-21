# Leaf-Map [Software Documentation]
Before you move to a new place, it would be useful to know the neighborhood, and it would be wonderful if most of the desired information can be aggregated and found in just one website.

### Abstract
Leaf-Map is a mashup web application that displays aggregate information about different neighborhoods. In just one search through Leaf-Map, the user is able to get information that would usually require different searches or visits to multiple websites.

### Content
This documentation analyzes and illustrates the application and the characteristics of the system, the following will be discussed:
1. [Executive Summary](#executive-summary)
2. [Requirements](#requirements)
3. [Application Features](#application-features)
4. [System Analysis and Design](#system-analysis-and-design)
5. [Technical Documentation](#technical-documentation)
6. [User Interface](#user-interface)
7. [Development Plans](#development-plans)
8. [Closing](#closing)

## Executive Summary


## Requirements



In web development, a mashup extracts content from different sources, aggregates the content, and displays enriched results. In this project, a mashup web application is developed to use a location, such as an address, as input, combining information from different free sources, and displays various results which may include but are not limited the following:

| Result         | Parameters             | Description                                                         |
| -------------- | ---------------------- | ------------------------------------------------------------------- |
| Map            | Longitude and Latitude | Displays an instance of Google Maps from the user-entered location. |
| About          |
| Weather        |
| Restaurants    |
| Places         |
| Transportation |
- What amenities (such as restaurants, grocery stores, superstores, fitness centers, banks, parks, schools, universities, libraries, post office, etc.) are nearby the particular location? What are their distances to the location and their ratings and reviews if applicable?
- How convenient is this location to major public transportations, such as distances to nearby highways, subway or train stations, airports, etc.?
- How safe is this area, such as crime-related information?
- What is the weather in the next few days and year around?
- What nearby properties are currently on the market for sale and what are their
attributes, such as numbers of bedroom and bathroom, sizes of living space, lot sizes,
listing prices, years built, distances to the given location, etc.
- What nearby properties are currently on the market for rent and what are their
attributes, such as numbers of bedroom and bathroom, sizes of living space, rental rates, distances to the given location, etc.

## Application Features

## System Analysis and design

## Technical Documentation

![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/angular.png?raw=true "Angular")
![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/googlemaps.png "Google Maps")
![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/darksky.png "Dark Sky")
![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/wikipedia.jpg "MediaWiki")
![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/s3.png "Amazon S3")

### [Angular](https://angular.io)
We utilize Angular to create a Single Page Application (SPA) by using front-end routing. We also make use of Angular's data binding to get user input and event and property binding to control the HTML DOM. Angular allows for a responsive and reactive application.
- *Project created and compiled with Angular CLI*

### [Google Maps and Places](https://console.developers.google.com/apis/library)
Google Maps and Google Places provides web services in generating the map and retrieving locations for our restaurant and places components.
- *Google Maps JavaScript and Google Places API and web services are free for the first 1000 calls per day; by having billing information free calls are increased to 150,000 per day*

### [Dark Sky](https://darksky.net/dev/)
We needed a weather API that handles request for the current and future weather. Dark Sky fulfills both of these while providing minute-by-minute weather forecast in JSON format.
- *Using Dark Sky API is free for the first 1000 requests per day*

### [MediaWiki](https://www.mediawiki.org/wiki/API:Main_page)
Wikipedia is built on top of MediaWiki API. This provides a convenient way to access wiki features, data, and meta-data returned in JSON format.
- *MediaWiki is open source software and free to use*

### [Amazon S3](https://www.mediawiki.org/wiki/API:Main_page)


## User Interface

## Development Plans

## Closing
