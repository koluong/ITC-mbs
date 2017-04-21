# Leaf-Map
Before you move to a new place, it would be useful to know the neighborhood, and it would be wonderful if most of the desired information can be aggregated and found in just one website.

*Leaf-Map web-app is hosted on an S3 bucket. Click the link to visit.*  
   [Leaf-Map](http://itc-leaf-map.s3-website-us-west-1.amazonaws.com/)  

### Abstract
Leaf-Map is a mashup web application that displays aggregate information about different neighborhoods. In just one search through Leaf-Map, the user is able to get information that would usually require different searches or visits to multiple websites.

### Executive Summary
- By combining data from different sources our web application displays useful information about a neighborhood in a single interface.
- The user is able to search any location from Google Places which delivers the aggregate information into segmented panes and views.
- This leveled pane system provides an efficient and user-friendly way to view the information.
- Complied by the Angular CLI, our web application is deployed on hosted on Amazon Web Services S3.
- Once the user enters the location, Google Maps API Web Services generates an object with values which are interpolated back into the DOM.
- The location object also contains the values that are used as parameters in the other APIs to retrieve their data.
- All the technologies we use are free of charge indefinitely.

# Software Documentation

### Content
This documentation analyzes and illustrates the application and the characteristics of the system, the following will be discussed:
1. [Requirements](#requirements)
2. [Application Features](#application-features)
3. [System Analysis and Design](#system-analysis-and-design)
4. [Technical Documentation](#technical-documentation)
5. [Closing](#closing)


## Requirements
In web development, a mashup extracts content from different sources, aggregates the content, and displays enriched results. In this project, a mashup web application is developed to use a location, such as an address, as input, combining information from different free sources, and displays various results which include the following:

| Result             | Parameters             | Description                                                                                          |
| :----------------- | :--------------------- | :--------------------------------------------------------------------------------------------------- |
| **Map**            | Longitude and Latitude | An instance of Google Maps that is generated from the user's entered location from the search input. |
| **About**          | City and State         | The name and description of the searched location's city.                                            |
| **Weather**        | Longitude and Latitude | The current and future weather of the searched location's city.                                      |
| **Restaurants**    | Longitude and Latitude | A list of nearby restaurants, information, location and user ratings and reviews.                    |
| **Places**         | City and State         | A list of nearby establishments, geographical locations, or prominent points of interest.            |
| **Transportation** | Longitude and Latitude | A list of nearby public transportation including planes, buses and trains.                           |
| **Property**       | Zillow and Property ID | A property object containing property details including address, images and home facts.              |

### Requirements - Additional Notes
- The access to the data must be free. Sources that have free trials or a limited time access are not considered a free source.
- Sources that provide free but limited access are okay to be used. Some of the free sources require creation of a free account.

## Application Features


### User Interface

 - **Search bar**

   Users can search for a specific location through Google Maps autocomplete function. This address contains the parameters for the other requests.

- **Map**

   This is the instance of Google Maps that will be generated every time the user searches for an address. The user can browse the map to look around and see the geographic location of any result they select (e.g. the selected house, restaurant, or point of interest).

- **Left Sidebar**

   This is the container that holds the about and result preview panes. At a glance the user can see very general results like the current weather and nearby establishments. From the sidebar the user can select which result they want to view further.

- **Expanded and Detailed Views**

   The user accesses these views by clicking the arrow in a preview pane. These panes deliver more information and add functionality like locating an establishment on the map or visiting its website.

### Data and Information Delivery
Our web application displays the information into three different views in order to deliver information to the user. Initially, only the preview pane of each result is displayed. If the user wants more detailed information about a specific result they can navigate further through the views.

**The views in the order of general to specific:**
1. Preview Pane *(Displayed Automatically)*
2. Expanded View
3. Detailed View

|                    | Preview Pane                          | Expanded View                                                                               | Detailed View |
| :----------------- | :------------------------------------ | :------------------------------------------------------------------------------------------ | :------------ |
| **Weather**        | The current and two day weather forecast.               | Detailed information including precipitation chances, humidity levels, description and hourly and five day forecast.             | *N/A*
| **Restaurants**    | The two closest restaurants. Includes rating.           | A list of restaurants sorted by shortest distance from the user-entered location. Includes full address and open status.             | The selected restaurant. Includes phone number, hours of operations, website and reviews.     |
| **Places**         | The two closest points of interest. Includes rating.    | A list of places sorted by shortest distance from the user-entered location. Includes full address and open status.                       | The selected places. Includes phone number, hours of operations, website and reviews.         |
| **Transportation** | The two closest public transportation.                  | A list of public transportation sorted by shortest distance from the user-entered location. Includes full address and open status | The selected transportation. Includes phone number, hours of operations and website.          |
| **Property**       | Picture of property and address.      | Home details including size and number of bedrooms and bathrooms. Displays detailed description | *N/A*
## System Analysis and Design
![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/leaf-map-system.png "Leaf-Map Data Flow")

### Hosting and Framework
Our application, complied by the Angular CLI, is hosted on an Amazon Web Services S3 bucket. Angular provides Single Page Application functionality so we are able to set the `index.html` as the index document within our static web hosting. We enable our CORS policy that allows resources to be requested from another domain.

### Data Flow
As the user searches for a location, Google Places Autocomplete assists with fetching a valid location. Google Maps API Web Service creates an object with the location string with all the data we need for interpolation onto the DOM and as  parameters for the other APIs (e.g. Longitude and Latitude). The parameters are picked out from the location object and sent in as parameters to Dark Sky, MediaWiki, and Zillow APIs to get their respective data like weather and property information. Through Angular's string interpolation and property binding we delivery the data back into DOM as information the user can read and interact with.

## Technical Documentation

![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/angular.png "Angular")
![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/googlemaps.png "Google Maps")
![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/zillow.png "Zillow")
![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/darksky.png "Dark Sky")
![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/wikipedia.jpg "MediaWiki")
![Alt text](https://raw.github.com/koluong/ITC-mbs/master/src/assets/s3.png "Amazon S3")

### [Angular](https://angular.io)
We utilize Angular to create a Single Page Application (SPA) by using front-end routing. We also make use of Angular's data binding to get user input and event and property binding to control the HTML DOM. Angular allows for a responsive and reactive application.
- *Project created and compiled with Angular CLI*

### [Google Maps and Places](https://console.developers.google.com/apis/library)
Google Maps and Google Places provides web services in generating the map and retrieving locations for our restaurant and places components.
- *Google Maps JavaScript and Google Places API and web services are free for the first 1000 calls per day; by having billing information free calls are increased to 150,000 per day*

### [Zillow](https://www.zillow.com/howto/api/APIOverview.htm)
Zillow API provides an extensive web service to get real estate, property details and valuation, and neighborhood data returned in XML.
- *Using Zillow API is free for the first 1000 requests per day*

### [Dark Sky](https://darksky.net/dev/)
We needed a weather API that handles request for the current and future weather. Dark Sky fulfills both of these while providing minute-by-minute weather forecast in JSON format.
- *Using Dark Sky API is free for the first 1000 requests per day*

### [MediaWiki](https://www.mediawiki.org/wiki/API:Main_page)
Wikipedia is built on top of MediaWiki API. This provides a convenient way to access wiki features, data, and meta-data returned in JSON format.
- *MediaWiki is open source software and free to use*

### [Amazon Web Services S3](https://aws.amazon.com/s3/)
The S3 bucket allows us the host our single page application with ease on AWS. It is a convenient way to store cloud-native applications like websites with a simple interface to configure CORS and bucket policy.
- *Amazon S3 offers a free tier entailing 5GB of S3 storage, 20,000 GET and 2,000 PUT requests per month*

## Closing

### Things We Learned

### Future Development Plans
