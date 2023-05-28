# **RhythmMusic API**

![1685285592913](image/README/1685285592913.png)

The music API also provides access to an extensive music database that includes detailed information about songs, albums, artists, genres, and other related metadata. This allows developers to obtain accurate and up-to-date information about the available music, which helps them create content-rich and relevant applications for music lovers.

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

| Property   | Data                                      |
| ---------- | ----------------------------------------- |
| items      | Awalys return a array with the properties |
| totalCount | Number of the total of items founded      |
| pageInfo   | A object with properties for pagination   |

All queries with the spotify nomenclature is connected with the service Spotify.com. While the others is connected with the service own

## Why I do that?

Because your app needs a data when you are loading the application. It's neccesary understand when is neccesary those querys. It's recommend use the Querys with Spotify nomenclature when you are loading data dynamicly. or when you are navigate in the app and you want to show a list of albums, artists, playlists use the others querys.

### Spotify Querys

REMEMBER: askip pagination start with the value 0 .

1. Spotify Search Artist by Name
2. Spotify Albums by Artist Id
3. Spotify Tracks by Album Id
4. Spotify Search Playlist by Name
5. Spotify Tracks By Playlist
6. Spotify Search All

**Spotify Search Artist by Name**

Returns a array of elements with the next params

```js
{
  id:string
  name:string
  photo: string
  followers: number
  popularity:number
  genres: string[]
  uri:string
  spotify_url:string
}
```

Example using the query

```js


query SpotifysearchArtistByName(
  $take: Int!
  $skip: Int!
  $nameArtist: String!
) {
  SpotifysearchArtistByName(take: $take, skip: $skip, nameArtist: $nameArtist) {
    items {
      name
      photo
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}

//////////////// VARIABLES /////////////////

{
  "take": 10,
  "skip": 0,
  "nameArtist": "TWICE"
}


//////////// DATA/////////////////
{
  "data": {
    "SpotifysearchArtistByName": {
      "items": [
        {
          "name": "TWICE",
          "id": "7n2Ycct7Beij7Dj7meI4X0",
          "photo": "https://i.scdn.co/image/ab6761610000e5eb8944c8aec8db82f35980b191"
        },
        {
          "name": "TWICE",
          "id": "2yp6zqk49KOKKrOSSsUb75",
          "photo": "https://i.scdn.co/image/ab6761610000e5ebed57bf41c8463fac1c9c9578"
        },
        {
          "name": "BLACKPINK",
          "id": "41MozSoPIsD1dJM0CLPjZF",
          "photo": "https://i.scdn.co/image/ab6761610000e5ebc9690bc711d04b3d4fd4b87c"
        },
        {
          "name": "Twice As Nice",
          "id": "1WdM0BAEXN9RpUdPOzEZdx",
          "photo": "https://i.scdn.co/image/ab67616d0000b273a16e6867b1a5f9e38bd42226"
        },
        {
          "name": "ITZY",
          "id": "2KC9Qb60EaY0kW4eH68vr3",
          "photo": "https://i.scdn.co/image/ab6761610000e5eb8ec4207332def07fec21874d"
        }
      ],
      "totalCount": 8,
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false
      }
    }
  }


```

Spotify Albums By Artist Id

returns a array of elements with the next params

```js

{
 id: string
 album_type:string
 artists: ...array of artists
 available_markets: string[]
 spotify_url:string
 photo:string
 name:string
 release_date:string
 release_date_precision:string
 total_tracks: number
 uri:string
}
```

Example using the query

```js
query SpotifyAlbumsByArtistId($take: Int!, $skip: Int!, $artistId: ID!) {
  SpotifyAlbumsByArtistId(take: $take, skip: $skip, artistId: $artistId) {
    items {
      name
      id
      photo
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}


//////////// VARIABLES //////////

{
  "take": 5,
  "skip": 0,
  "artistId": "7n2Ycct7Beij7Dj7meI4X0"
}



//////////// DATA //////////
{
  "data": {
    "SpotifyAlbumsByArtistId": {
      "items": [
        {
          "name": "READY TO BE",
          "id": "7MSkU2pVl6Z3QxDNMJUn1T",
          "photo": "https://i.scdn.co/image/ab67616d0000b2736997d60d0d2319c7a2a7025b"
        },
        {
          "name": "READY TO BE",
          "id": "7hzP5i7StxYG4StECA0rrJ",
          "photo": "https://i.scdn.co/image/ab67616d0000b27359f57a5ca507a3d3fed81ea6"
        },
        {
          "name": "BETWEEN 1&2",
          "id": "5QdY7RvuEg2tznpYJG8gP2",
          "photo": "https://i.scdn.co/image/ab67616d0000b27390b0ec9b2a62d373bcbfd267"
        },
        {
          "name": "BETWEEN 1&2",
          "id": "3NZ94nQbqimcu2i71qhc4f",
          "photo": "https://i.scdn.co/image/ab67616d0000b273c3040848e6ef0e132c5c8340"
        },
        {
          "name": "Celebrate",
          "id": "1nqz3cEjuvCMo8RHLBI9kM",
          "photo": "https://i.scdn.co/image/ab67616d0000b27396f409e230a8f42400c901f1"
        }
      ],
      "totalCount": 135,
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false
      }
    }
  }
}

```

Spotify Tracks Album By Id

Returns a array of elements with the next params

```js
{
  id: String;
  name: String;
  artists: [IArtist];
  available_markets: [String];
  album_id: String;
  album: IAlbum;
  disc_number: Int;
  duration_ms: Int;
  explicit: Boolean;
  spotify_url: String;
  preview_url: String;
  track_number: Int;
  uri: String;
}
```

Example using the query

```js
query SpotifyTracksAlbumById($take: Int!, $skip: Int!, $albumId: ID!) {
  SpotifyTracksAlbumById(take: $take, skip: $skip, albumId: $albumId) {
    items {
      id
      album {
        photo
      }
      name
      track_number
      preview_url
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}

//////////// VARIABLES //////

{
  "take": 5,
  "skip": 0,
  "albumId": "5QdY7RvuEg2tznpYJG8gP2"
}
///////////// DATA /////////////

{
  "data": {
    "SpotifyTracksAlbumById": {
      "items": [
        {
          "id": "0kqTXMHiQiB7IECD0WwcPq",
          "album": {
            "photo": "https://i.scdn.co/image/ab67616d0000b27390b0ec9b2a62d373bcbfd267"
          },
          "name": "Talk that Talk",
          "track_number": 1,
          "preview_url": "https://p.scdn.co/mp3-preview/706c768ce6ae81c68fc557c326f4933b1c30f822?cid=15e19cc7c63946a1a28fa4ccd923a9f7"
        },
        {
          "id": "6yox9CUPrQQp2HtXZsUJkz",
          "album": {
            "photo": "https://i.scdn.co/image/ab67616d0000b27390b0ec9b2a62d373bcbfd267"
          },
          "name": "Queen of Hearts",
          "track_number": 2,
          "preview_url": "https://p.scdn.co/mp3-preview/6ee0bb57df3290b21c539da7c6e7143ca0ed3cad?cid=15e19cc7c63946a1a28fa4ccd923a9f7"
        },
        {
          "id": "3HLIZfLpwoTeadk5FpDle5",
          "album": {
            "photo": "https://i.scdn.co/image/ab67616d0000b27390b0ec9b2a62d373bcbfd267"
          },
          "name": "Basics",
          "track_number": 3,
          "preview_url": "https://p.scdn.co/mp3-preview/4935517cc3348c11ed4bce3d6ffb65b3537e3d2b?cid=15e19cc7c63946a1a28fa4ccd923a9f7"
        },
        {
          "id": "5hmRmFmHJqzH9IscZNCMMQ",
          "album": {
            "photo": "https://i.scdn.co/image/ab67616d0000b27390b0ec9b2a62d373bcbfd267"
          },
          "name": "Trouble",
          "track_number": 4,
          "preview_url": "https://p.scdn.co/mp3-preview/d800f02bef28f163ed494fe394c8ba090b91b79e?cid=15e19cc7c63946a1a28fa4ccd923a9f7"
        },
        {
          "id": "0MnWI4RRh1lEX24rIKaCuV",
          "album": {
            "photo": "https://i.scdn.co/image/ab67616d0000b27390b0ec9b2a62d373bcbfd267"
          },
          "name": "Brave",
          "track_number": 5,
          "preview_url": "https://p.scdn.co/mp3-preview/ac0532b167fdd443facf2b973d2a06ad55731b22?cid=15e19cc7c63946a1a28fa4ccd923a9f7"
        }
      ],
      "totalCount": 7,
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false
      }
    }
  }
}

```

Spotify Search Playlist

return a array of elements with the next params

```js
{
  collaborative: Boolean;
  description: String;
  spotify_url: String;
  id: String;
  photo: String;
  name: String;
  owner: IOwn;
  total_tracks: Int;
  uri: String;
}
```

Example using the query

```js
query SpotifySearchPlaylist($take: Int!, $skip: Int!, $namePlaylist: String!) {
  SpotifySearchPlaylist(take: $take, skip: $skip, namePlaylist: $namePlaylist) {
    items {
      id
      photo
      name
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}


/////////////////// VARIABLES /////////////

{
  "take": 5,
  "skip": 0,
  "namePlaylist": "TWICE"
}


//////////////// DATA /////////////////////////

{
  "data": {
    "SpotifySearchPlaylist": {
      "items": [
        {
          "id": "6xTyBMa04funstryEQebk7",
          "photo": "https://i.scdn.co/image/ab67706c0000bebbd2ddfea3e5b06caad5ceb119",
          "name": "TWICE 5TH WORLD TOUR ‘READY TO BE’ Setlist"
        },
        {
          "id": "3HU4Rk0Hxa0JtRBGTH2FH8",
          "photo": "https://i.scdn.co/image/ab67706c0000bebb54de983e8022c8161073ccc9",
          "name": "TWICE AS FAST "
        },
        {
          "id": "5hKka3qQ75mbCxJ6KMi3CY",
          "photo": "https://mosaic.scdn.co/640/ab67616d0000b27395e8e1da8c31d89a952b6866ab67616d0000b273a53e99afb2329a19bd7933aeab67616d0000b273c7386a571bc59e304a0399f3ab67616d0000b273d5ec55f06656218f96f2e07e",
          "name": "Twice’s Hits"
        },
        {
          "id": "48raacEJvcd5hEePVnLDzV",
          "photo": "https://i.scdn.co/image/ab67706c0000bebb754ae6e02845338c0b9e4df5",
          "name": "TWICE 5TH WORLD TOUR ‘Ready To Be’  SETLIST 2023"
        },
        {
          "id": "39Eqgf1RkjcYC267C9IueQ",
          "photo": "https://i.scdn.co/image/ab67706c0000bebb3f26faa93a05a447aa29ce54",
          "name": "All Twice Songs in Order"
        }
      ],
      "totalCount": 7,
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false
      }
    }
  }
}


```

Spotify Tracks By Playlist

return a array of elements wit the next params

```js
{
  id: String;
  name: String;
  artists: [IArtist];
  available_markets: [String];
  album_id: String;
  album: IAlbum;
  disc_number: Int;
  duration_ms: Int;
  explicit: Boolean;
  spotify_url: String;
  preview_url: String;
  track_number: Int;
  uri: String;
}
```

Example using the query

```js
query SpotifyTracksByPlaylist($take: Int!, $skip: Int!, $playlistId: String!) {
  SpotifyTracksByPlaylist(take: $take, skip: $skip, playlistId: $playlistId) {
    items {
      id
      name
      track_number
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}

//////////////////////////// VARIABLES ////////////////////////////////////

{
  "take": 5,
  "skip": 0,
  "playlistId": "6xTyBMa04funstryEQebk7"
}


////////////////////////////////// DATA ///////////////////////////////////


{
  "data": {
    "SpotifyTracksByPlaylist": {
      "items": [
        {
          "id": "1Zr1SoGePJ3iKKakmmZaMR",
          "name": "SET ME FREE",
          "track_number": 1
        },
        {
          "id": "3apeXzypBMnUfYcZYNX6DH",
          "name": "I CAN'T STOP ME",
          "track_number": 1
        },
        {
          "id": "4DyrLEu46wIXGgBBcLVXEW",
          "name": "GO HARD",
          "track_number": 8
        },
        {
          "id": "2bAAj29XGc4h1G4oEGYCmg",
          "name": "MORE & MORE",
          "track_number": 1
        },
        {
          "id": "38DlSDrx9tgc5Gfq6y3aBa",
          "name": "MOONLIGHT SUNRISE",
          "track_number": 1
        }
      ],
      "totalCount": 38,
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false
      }
    }
  }
}


```

The next querys are using the same structure, every query needs a differents of params but always needs provide a take with skip, except querys by Id

![1685285620195](image/README/1685285620195.png)

<div>
  <h1 > Hello! I'm WhiL </h1>
  <h3 >  I'm FrontEnd Web developer </h3>
</div>

<p>Follow me on my social medias:</p>
<div style="
    display: flex;
    flex-direction: row;
    gap:10px;
    flex-wrap:wrap;
">
<a href="https://github.com/Whil117" target="_blank">
<img src=https://img.shields.io/badge/github-%2325292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=github  />
</a>
<a href="https://twitter.com/WhIlEx117" target="_blank">
<img src=https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white alt=twitter  />
</a>

<a href="https://www.linkedin.com/in/ivangarciawhil117/" target="_blank">
<img src=https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin  />
</a>
<a href="https://www.youtube.com/@WhiLEx" target="_blank">
<img src=https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white alt=twitter  />
</a>
</div>
