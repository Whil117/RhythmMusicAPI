# **Rhythmmuse API**

A GraphQL-based music API is an application programming interface that allows developers to access and manipulate music-related data using the GraphQL query language. This API provides a set of well-defined operations and a consistent data schema that enables clients to request specific data and receive only the required information.

A GraphQL-based music API offers several notable features and advantages. Firstly, it enables developers to make precise and customized queries to retrieve only the necessary data. Instead of receiving a complete response with all available data, clients can specify exactly what information they want to retrieve, optimizing the efficiency and performance of the application.

Additionally, GraphQL facilitates the integration of different data sources into a single, cohesive API. This means that developers can access information from various sources such as songs, albums, artists, genres, playlists, and user comments through a unified API. This simplifies the development process and enhances flexibility when working with different data providers.

Another significant advantage is that GraphQL provides strong data typing. Clients can obtain detailed information about the structure and data types available in the API. With this information, developers can make more precise queries, validate received data, and ensure application integrity.

What is the structure for request data?

```js
query Spotify($take: Int!, $skip: Int!) {
  Spotify(take: $take, skip: $skip) {
    items {
      ...rest of body
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}

```

- **Total Count**
  The total of items founded in the database
- **PageInfo** Has two properties: **HasNextPage** and **HasPreviousPage.** With NextPage. If we have more of 50 elements the property is true but we can skip once more a the property is false. With PreviousPage only needs skip from 0 or 1 for true
