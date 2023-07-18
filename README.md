# scissor-api

### Full API documentation: https://documenter.getpostman.com/view/19301718/2s93zH2eWb#4411bda5-ae79-4104-b445-f4dc7a25a746

### Live API URL: https://bitlink.onrender.com

## Requirements
1. User should be able to sign up and sign in
2. Use JWT as authentication strategy
3. Logged in users should be able to create a shortened URL.
4. Logged in users should be able to update a shortened URL.
5. Logged in users should be able to delete a shortened URL.
6. Logged in users should be able to get all created shortened URLs.
7. Logged in users should be able to get the analytics of a shortened URL.
7. Logged in users should be able to generate QR code for a shortened URL.
8. Test Application

## Setup
- Install NodeJs, Typescript
- pull this repo
- create `.env` file using variables in the `.env-example` file
- run`npm install`
- run `npm run watch`

## Models
### User
| field | data_type | constraints |
| ---- | ---- | ---- |
| id | string | required, PK |
| userUuid | string | required |
| email | string | required, unique |
| first_name | string | required |
| last_name | string | required |
| password | string | required

### Link
| field | data_type | constraints |
| ---- | ---- | ---- |
| id | string | required, PK |
| userUuid | string |  
| url | string | required
| customDomain | string |  
| backHalf | string |
| finalUrl | string |
| clicks | int | default: 0 |
| qrCode | string: url | 
| timestamp | timestamp | 

## APIs
### Home
- Route: `/api/v1`
- Method: GET

### Signup User
- Route: `/api/v1/auth/signup`
- Method: POST

### Login User
- Route: `/api/v1/auth/login`
- Method: POST

### Create Link
- Route: `/api/v1/links`
- Method: POST
- Header
  - Authorization: Bearer {token}

### Get All Links of a User
- Route: `/api/v1/links`
- Method: GET
- Header
  - Authorization: Bearer {token}
  
 ### Update Link
- Route: `/api/v1/links/:id`
- Method: PUT
- Header
  - Authorization: Bearer {token}

### Delete Link
- Route: `/api/v1/links/:id`
- Method: DELETE
- Header
  - Authorization: Bearer {token}

## Contributor
- Faleke Peace
