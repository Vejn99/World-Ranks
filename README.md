# Country Ranking App
A country ranking web application built with React and TypeScript that allows users to view, sort, and filter information about countries. The app uses the REST Countries API to fetch data and displays detailed information about each country.

## Features
* View a list of all countries sorted by population by default.
* Sort countries by:
  * Name (alphabetical order)
  * Population
  * Area (km²)
* Filter countries by multiple regions: Americas, Antarctic, Africa, Asia, Europe, or Oceania.
* Filter countries by United Nations membership and independence status.
* Search for countries by their name, region, or subregion.
* View the total number of countries in the list.
* Click on a country to see more details, including:
  * Population
  * Area
  * Capital
  * Neighboring countries
* Navigate to neighboring countries from the country details page.
* [Optional] Pagination for the country list.
  
## Tech Stack
* Frontend: React (with TypeScript) for building components and managing state.
* Routing: React Router for navigation between pages.
* API: REST Countries API for fetching country data.
  
## Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
* Node.js installed on your machine.
  
## Installation
1. Clone the repository:

```
git clone https://github.com/your-username/country-ranking.git
```

2. Navigate to the project directory:
   
```
cd app
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm start
```

5. Open your browser and go to http://localhost:3011

## API Reference
This project uses the REST Countries API. You can find more information here https://restcountries.com/ .
