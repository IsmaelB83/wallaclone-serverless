# WALLACLONE-SERVERLESS
Wallaclone is a single page application that replicates the minimum functionality of a website like Ebay or Wallapop (Spanish app similar to Ebay but more oriented to direct personal contact when buying/selling products).

This application was originally written by me in a web development bootcamp during 2019/2020. At that time it was the classic MERN stack (Mongo, Express, React and Node). After this Cloud Developer Nanodegree I have applied all the knowledge in serverless architectures to re implement it for AWS Serverless.

You can access the application trough cloudfront here: https://d3onyjbgfh1a2i.cloudfront.net/

## CONTENTS
- [ARCHITECTURE](#ARCHITECTURE)
- [DEPENDENCIES](#DEPENDENCIES)
  - [React, Router and redux](#React,-Router-and-redux)
  - [Authentication](#Authentication)
  - [Serverless](#Serverless)
  - [Internationalization](#Internationalization)
  - [UX/UI](#UX/UI)
- [DEPLOYMENT](#DEPLOYMENT)
  - [Download](#Download)
  - [Install dependencies](#Install-Dependencies)
  - [Configuration](#Configuration)
  - [Deploy serverless](#Deploy-Serverless)
  - [Start Frontend](#Start-Frontend)
- [USER-GUIDE](#USER-GUIDE)

## ARCHITECTURE
The architecture of Wallaclone-serverless is shown in below imagen:
![alt text](https://raw.githubusercontent.com/IsmaelB83/wallaclone-serverless/master/documentation/architecture.jpg)

Main component is the API Gateway that provide endpoints to two different resources:
- Products: what the user will publish either to sell or buy
- Users: even when the authentication is done against Auth0. The application request the user to complete the profile before being able to publish products. The profile will include a name, email, nick (login) and an avatar. All this will be associated to the identity received from auth0, and will be used later on in the frontend to identify the products published and the user that published them.

Appart from the API Gateway there are two main DynamoDB tables storing all the data:
- Products: including all the information related to published products, and having one attribute (which is the range key) that identifies the user that published the product.
- Users: profile information attached to an Auth0 identity.

In order to store the attachments the application uses S3 buckets. One of them to attach product images and the other to attach the user avatars. Both buckets work with the pre-signed url pattern. So that before the frontend being able to upload an image to the buckets it needs first to request a pattern-url to the api-gateway, that will generate the url with an expiration time, and then the frontend will upload the image directly to the bucket (not overloading the lambdas for this purpose).

## DEPENDENCIES
This application makes use of the following packages

### React, Router and redux
- "connected-react-router": "^6.7.0"
- "react": "^16.10.2"
- "react-dom": "^16.10.2"
- "react-moment": "^0.9.6"
- "react-redux": "^7.1.3"
- "react-router-dom": "^5.1.2"
- "react-scripts": "3.2.0"
- "redux": "^4.0.4"
- "redux-logger": "^3.0.6"
- "redux-thunk": "^2.3.0"
- "prop-types": "^15.7.2"

### Authentication
- "auth0-js": "^9.19.0",

### Serverless
- "aws-xray-sdk": "^2.2.0",
- "axios": "^0.18.0",
- "http-errors": "^1.7.2",
- "jsonwebtoken": "^8.5.1",
- "middy": "^0.27.0",
- "source-map-support": "^0.5.11",
- "uuid": "^3.3.2",
- "winston": "^3.2.1"

### Internationalization
- "i18next": "^19.1.0" (frontend)
- "i18next-browser-languagedetector": "^4.0.1" (frontend)
- "react-i18next": "^9.0.10"

### UX/UI
- "@material-ui/core": "^4.5.1"
- "@material-ui/icons": "^4.5.1"
- "notistack": "^0.9.7"
- "react-scrollable-feed": "^1.1.2"
- "react-share": "^4.0.1"

## DEPLOYMENT

### Download

To download the repository
```
\downloads\git clone https://github.com/IsmaelB83/wallaclone-serverless.git
```

### Install dependencies

Install all the required npm packages both in backend and frontend folders
```
\downloads\wallaclone-serverless\backend\npm install
\downloads\wallaclone-serverless\frontend\npm install
```

### Configuration

**FRONTEND**
Before starting the frontend application you need to create one .env file in order to update the api endpoint, the auth0 redirect and the max adverts to display per page:
- API Endpoint: REACT_APP_API_URL=https://{id}.execute-api.us-east-1.amazonaws.com/dev
- Auth0 redirect: should match with config in application in auth0 - REACT_APP_AUTH0_REDIRECT=https://bucketname.s3.amazonaws.com/callback
- MAX Adverts per page: REACT_APP_MAX_ADVERTS_UI=10

**SERVERLESS**
All the serverless configuration is included in the serverless.yml itself. Section environment. Modify as per desirde before deploying the backend.
- USERS_PROFILE_TABLE: users-${self:provider.stage}
- AVATAR_S3_BUCKET: avatars-ibernal-${self:provider.stage}
- AVATAR_S3_URL: https://avatars-ibernal-${self:provider.stage}.s3.amazonaws.com/
- PRODUCTS_TABLE: products-${self:provider.stage}
- PRODUCTS_TABLE_INDEX: products-index-${self:provider.stage}
- ATTACHMENT_S3_BUCKET: products-ibernal-${self:provider.stage}
- ATTACHMENT_S3_URL: https://products-ibernal-${self:provider.stage}.s3.amazonaws.com/
- NO_PHOTO: https://products-ibernal-${self:provider.stage}.s3.amazonaws.com/nophoto.jpg
- SIGNED_URL_EXPIRATION: 300
- JWKSURL: https://dev-wbbbogs3.us.auth0.com/.well-known/jwks.json

### Deploy Serverless
To deploy all the lambdas, api gateway, buckets and dynamodb tables do the following (require having serverless properly configured in your computer)
```
\downloads\wallaclone-serverless\backend\sls deploy
```

### Start Frontend

Once everything is configured, the backend is deployed in AWS you can start the frontend with npm start:
```
\downloads\wallaclone-serverless\frontend\npm start
```

## USER-GUIDE

Find below some screenshots from wallaclone:

### Public area
In this section any users accessing our application are able to see what products are published, and open the detail of each of them. There is no need to have an account for this purpose:

![alt text](https://raw.githubusercontent.com/IsmaelB83/wallaclone-serverless/master/documentation/wallaclone_0.png)

![alt text](https://raw.githubusercontent.com/IsmaelB83/wallaclone-serverless/master/documentation/wallaclone_1.png)

### Authentication
In order for a user to access it's private area it needs to authenticate first. Authentication is performed against Auth0. Once the authentication is successfull, auth0 will redirect to /callback

![alt text](https://raw.githubusercontent.com/IsmaelB83/wallaclone-serverless/master/documentation/wallaclone_03.png)

![alt text](https://raw.githubusercontent.com/IsmaelB83/wallaclone-serverless/master/documentation/wallaclone_04.png)

### Adverts

![alt text](https://raw.githubusercontent.com/IsmaelB83/wallaclone-serverless/master/documentation/wallaclone_08.png)

![alt text](https://raw.githubusercontent.com/IsmaelB83/wallaclone-serverless/master/documentation/wallaclone_09.png)

### Notifications and emails

![alt text](https://raw.githubusercontent.com/IsmaelB83/wallaclone-serverless/master/documentation/wallaclone_06.png)

![alt text](https://raw.githubusercontent.com/IsmaelB83/wallaclone-serverless/master/documentation/wallaclone_07.png)

### Chat

![alt text](https://raw.githubusercontent.com/IsmaelB83/wallaclone-serverless/master/documentation/wallaclone_05.png)