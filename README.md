# **Swap Coral Six - Player Music**

the succesor of Spotify
Swap coral six is a project about music inspired in Spotify, I se the Spotify API combined ith Graphql and you can listen music without limits and announcements totally free
![](https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png)

## **Environment Variables**

This Application needs some variables.

| **1.NEXT_PUBLIC_SPOTIFY_CLIENT_ID**     | _--YOUR SPOTIFY CLIENT ID--_       |
| --------------------------------------- | ---------------------------------- |
| **2.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET** | _--YOUR SPOTIFY CLIENT SECRET--_   |
| **3.NEXT_PUBLIC_GRAPHQL_SERVER_URL**    | _---URL LOCALHOST OR DOMAIN--_     |
| **4.NEXTAUTH_SECRET**                   | _---AUTHSCRET FOR NEXTAUTH KEY---_ |
| **5.MONGODB_URI**                       | _---URL MONGODB CONNECTION---_     |

**1.NEXT_PUBLIC_SPOTIFY_CLIENT_ID & NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET **

The first step is go to https://developer.spotify.com/dashboard/applications and create a project
![](https://res.cloudinary.com/whil/image/upload/v1668403391/SWAAAP_zz545x.png)
So This project from Console Spotify has a client id and a client secret

**2.NEXT_PUBLIC_GRAPHQL_SERVER_URL**````
I recomend create a env.local in your PC and put this url

Example:
NEXT*PUBLIC_GRAPHQL_SERVER_URL:\_http://localhost:3000/api/graphql*
but in a web plataform for example vercel. You need put this variable
NEXT_PUBLIC_GRAPHQL_SERVER_URL:https://domain.example/api/graphql*

**3.NEXTAUTH_SECRET**
You need create a key unique for your app. this is for development and production
Example:
NEXTAUTH*SECRET=\_cvjWtBySvxBzkKMcHtMj3VNcQW*

**4.MONGODB_URI**
You need create a database for save data from swap coral six
Example:
MONGODB*URI:\_mongodb+srv://usernamepassword@clusterexample.mongodb.net/?retryWrites=true&w=majority*

## Structure Folders

![](https://res.cloudinary.com/whil/image/upload/v1668404763/FOLDERS_etamdm.png)

**1.BACKEND GRAPHQL**
If you want to know how i created the backend. you can watch the folder, I'm using microservices for this project with apollo-server-micro
apollo/server/graphpl

**2. FRONTEND**
I have created a components for reuse this logic in other pages. You can watch this components using in pages

**3.CONFIG**
1.Config for GRAPHQL SERVER AND MONGODB URI
![](https://res.cloudinary.com/whil/image/upload/v1668405185/CONNFIGG_gphkqw.png)

2.Config for Spotify Credentials and create Token Public
![](https://res.cloudinary.com/whil/image/upload/v1668405209/CONFI2_bcyfnx.png)

## How Works?

IMPORTANT!: This project was created with educative intentions

1. CREATE TOKEN PUBLIC SPOTIFY
   You need spotify web api node and axios libraries.
   you're going to send a request to Spotify.com and with your client_id and client_scret. in mode Buffer.from(). This method send in raw binary data your credentials in base64. More Info.

Spotify is going to return a token, but this token is public, doesnt belong a user. So why do I need this token? Because this token give access to data, Artists, Albums, Tracks, Episodies, Shows.
THIS TOKEN DOESNT WORK WITH SOME METHODS FROM THE LIBRARY Spotify-we-api-node.
This token you need register in spotify-web-api-node, why? because every token has expire. and if don't register this token. you can't consum the spotify api
![](https://res.cloudinary.com/whil/image/upload/v1663354333/createTokenpublic_ffb9no.png)

![](https://res.cloudinary.com/whil/image/upload/v1663355032/CREDENTIALS_h1iobw.png)

34. CREATE QUERYS CONSUMERS (GRAPHQL) OPTIONAL
    I have created a query that recive a slug, with context graphql. I recive a function that is the function of first step. and execute this function.
    So with the token registered. I can send request to Spotify and get data and save in my Database
    ![](https://res.cloudinary.com/whil/image/upload/v1663356881/QUERY_CONSUMER_rpzrtp.png)
    ![](https://res.cloudinary.com/whil/image/upload/v1663357137/GRAPHQLSERVERCONFIG_lyhho3.png)

35. Next Auth and your credentials
    Why NextAuth?, yeah because takes your credentials when you are going to play a song
    But how?
    yeah when you re listen music and this message appears. YOU NEED SIGN IN WITH YOUR ACCOUNT IN THE BROWSER AND APP WINDOWS, reload the page and select a new song. and you can listen complete the song

![](https://res.cloudinary.com/whil/image/upload/v1663358483/LOGIN_pi2rbv.png)
![](https://res.cloudinary.com/whil/image/upload/v1663358682/SIGN_IN_SPOTFY_ylcxip.png)
![](https://res.cloudinary.com/whil/image/upload/v1663358277/NEXTAUTH_zqmgqt.png)

4. useIFRAME Hook
   This Hook or Function takes the Iframe from player and you can get controls from spotify iframe

- Commands
  Toogle: This command can play and pause the iframe song. for example you want to stop the song in the minute 2:03 and go back and listen that minute. you can use this method!
  playerReadyAck: unknown
  play: Always play a song from the beginning
  TogglePlay: works as the first mehtod
  Seek: Set the duration of the song with timestamp. for example jump to minute 1:00 or 2:00
  SendMessageToEmbed: This commando is unknown

- Commands unknown
  onPlayerReady
  onPlaybackUpdate
  loadUri
  flushCommandQ

...and more

- Total
  This param by default is '\*' but is unknown and I'm finding their use

![](https://res.cloudinary.com/whil/image/upload/v1663363382/IFARME_tw730e.png)
![](https://res.cloudinary.com/whil/image/upload/v1663363496/BUTTONPLAY_k8kkbz.png)
![](https://res.cloudinary.com/whil/image/upload/v1663359108/USEIFRAME_ojy6ur.png)
