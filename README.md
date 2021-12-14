# SiteSails JS
Javascript/NodeJS client library for the SiteSails API.

Full documentation is located at https://sitesails.com/docs/

### Installation

```
npm install sitesails
```

or

```
yarn add sitesails
```

### Basic usage

```
import SiteSailsClient from 'sitesails';

// initialize the client module
export const ss = new SiteSailsClient({
  publicApiKey: 'mypublickey'
});

// fetch a page
const page = await ss.nodes('pages').get('/');

// fetch some blog posts
const articles = await ss.nodes('blog').search({ lang: 'en' });
```
