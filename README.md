# minelev-fix-missing-mainGroupName

Tool for adding studentMainGroupName to documents where it is missing

## Setup

- Clone the repo
- Install dependencies
- Add a local .env file

```
MONGODB_CONNECTION=your-mongodb-connection-string
MONGODB_COLLECTION=your-mongodb-collection-name
MONGODB_NAME=your-mongodb-database-name
TJOMMI_SERVICE_URL=url-to-tjommi-compatible-web-service
TJOMMI_SERVICE_SECRET=jwt-secret-for-the-tjommi-service
```

## Usage

### documents:count

Returns the number of documents missing studentMainGroupName

```
$ npm run documents:count
```

### documents:collect

Saves an array of all documents to be updated to disc

```
$ npm run documents:collect
```

### start

Updates missing documents with mainGroupName from student.

Run this **after** `documents:collect` 

```
$ npm start
```

# Licence

[MIT](LICENSE)
