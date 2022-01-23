# API Wrapper & Error Boundary for Next.js 

This API Wrapper serves two main purposes:
- HTTP Method Resolution (GET, POST, PUT, DELETE)
- Error Boundary for Errors & Exceptions
  - Custom Exceptions return a 400..499 status code, along with Exception's message and optional data object in JSON
  - Errors return a 500 status code with "Internal Server Error" message, logging to server's console or logger function

### Install

```shell
npm i next-api-wrapper
```

### Example usage

```js
// pages/api/hello.js
import Wrapper, { Exception } from 'next-api-wrapper'

export default Wrapper({
  // pass a direct result
  GET: 'Hello World',
  
  // pass a function
  POST: async req => {
    await new Promise(resolve =>
        setTimeout(resolve, 1000)
    )
    
    return {
      time: 1000,
      message: 'Your Post Was Lost'
    }
  },
  
  // throw an exception
  PUT: async req => {
    throw new Exception('Access Forbidden', 403, { minrole: ['editor'] })
  },
  
  // throw an error
  DELETE: async req => {
    throw new Error("You Can't Delete")
  }
})

```

#### Example responses

```shell
curl http://localhost:300/api/hello
## Status: 200
## "Hello World"

curl -X POST http://localhost:300/api/hello
## Status: 200
## { "time": 1000, "message": "Your Post Was Lost" }

curl -X PUT http://localhost:300/api/hello
## Status: 403
## { "error": 403, "message": "Access Forbidden", "data": { "minrole": [ "editor" ] } }

curl -X DELETE http://localhost:300/api/hello
## Error w/ stack printed to server's console or logger function
## Status: 500
## { "error": 500, "message": "Internal Server Error" }

curl -X PATCH http://localhost:300/api/hello
## Status: 405
## { "error": 405, "message": "Method PATCH Not Supported" }


```