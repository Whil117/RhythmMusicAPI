import type { NextPage } from 'next';

import { gql, useQuery } from '@apollo/client';
import { AtomIcon, AtomText, AtomWrapper, convertHexToRGB } from '@whil/ui';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const colors = ['#7579E7', '#47F759', '#EF4E69', '#F8CA47'];
const Home: NextPage = () => {
  const totalArtists = useQuery(gql`
    query {
      listArtists(take: 50, skip: 1, order: DESC) {
        totalCount
      }
    }
  `);

  const totalAlbums = useQuery(gql`
    query {
      listAlbums(take: 50, skip: 1, order: DESC) {
        totalCount
      }
    }
  `);

  const totalPlaylists = useQuery(gql`
    query {
      listPlaylists(take: 50, skip: 1, order: DESC) {
        totalCount
      }
    }
  `);

  const totalTracks = useQuery(gql`
    query {
      listTracks(take: 50, skip: 1, order: DESC) {
        totalCount
      }
    }
  `);

  const total = useMemo(() => {
    return {
      artists: totalArtists?.data?.listArtists?.totalCount ?? 0,
      albums: totalAlbums?.data?.listAlbums?.totalCount ?? 0,
      playlists: totalPlaylists?.data?.listPlaylists?.totalCount ?? 0,
      tracks: totalTracks?.data?.listTracks?.totalCount ?? 0
    };
  }, [totalArtists, totalAlbums, totalPlaylists, totalTracks]);

  const [url, setUrl] = useState('http://localhost:3000');

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  return (
    <AtomWrapper
      display="flex"
      flexDirection="column"
      width="1440px"
      gap="1rem"
    >
      <AtomWrapper
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        padding={'0em'}
      >
        <AtomWrapper display="flex" flexDirection="column">
          <AtomText fontWeight={900} fontSize={'1.7rem'} color="white">
            Rhythmusic API
          </AtomText>
          <AtomText fontWeight={900} fontSize="1rem" color="white">
            created by: Milton Garcia
          </AtomText>
        </AtomWrapper>
        <Link
          href={'https://github.com/Whil117/RhythmMusicAPI'}
          target="_blank"
          passHref
        >
          <AtomIcon
            customCSS={(css) => css``}
            color="white"
            src={`
              <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 115 112"
            fill="none"
          >
            <path
              d="M57.4998 0.416748C50.0035 0.416748 42.5807 1.89325 35.655 4.76196C28.7293 7.63066 22.4365 11.8354 17.1358 17.1361C6.43062 27.8413 0.416504 42.3606 0.416504 57.5001C0.416504 82.7309 16.7994 104.137 39.4615 111.729C42.3157 112.186 43.229 110.416 43.229 108.875V99.228C27.4169 102.653 24.049 91.5788 24.049 91.5788C21.4232 84.9572 17.7128 83.1876 17.7128 83.1876C12.5182 79.6484 18.1123 79.7626 18.1123 79.7626C23.8207 80.1622 26.8461 85.6422 26.8461 85.6422C31.8123 94.3188 40.2036 91.7501 43.4573 90.3801C43.9711 86.6697 45.4553 84.158 47.0536 82.7309C34.3811 81.3038 21.0807 76.3947 21.0807 54.6459C21.0807 48.3097 23.2498 43.2292 26.9603 39.1763C26.3894 37.7492 24.3915 31.8126 27.5311 24.1063C27.5311 24.1063 32.3261 22.5651 43.229 29.9288C47.7386 28.673 52.6478 28.0451 57.4998 28.0451C62.3519 28.0451 67.2611 28.673 71.7707 29.9288C82.6736 22.5651 87.4686 24.1063 87.4686 24.1063C90.6082 31.8126 88.6103 37.7492 88.0394 39.1763C91.7498 43.2292 93.919 48.3097 93.919 54.6459C93.919 76.4517 80.5615 81.2467 67.8319 82.6738C69.8869 84.4434 71.7707 87.9255 71.7707 93.2342V108.875C71.7707 110.416 72.684 112.243 75.5953 111.729C98.2573 104.08 114.583 82.7309 114.583 57.5001C114.583 50.0038 113.107 42.5809 110.238 35.6552C107.369 28.7296 103.165 22.4367 97.8638 17.1361C92.5632 11.8354 86.2703 7.63066 79.3447 4.76196C72.419 1.89325 64.9961 0.416748 57.4998 0.416748Z"
              fill="white"
            />
          </svg>

        `}
          />
        </Link>
      </AtomWrapper>
      <AtomText fontWeight={900} fontSize="1rem" color="white">
        {url}/api/graphql
      </AtomText>
      <AtomWrapper display="flex" flexDirection="column" gap="2rem">
        <AtomText fontSize="1rem" color="white">
          Rhythm Music is a API created with Nodejs and Mongoose. with the
          database MongoDB.
        </AtomText>
        <AtomText fontSize="1rem" color="white">
          The music API also provides access to an extensive music database that
          includes detailed information about songs, albums, artists, genres,
          and other related metadata. This allows developers to obtain accurate
          and up-to-date information about the available music, which helps them
          create content-rich and relevant applications for music lovers.
        </AtomText>
        <AtomText fontWeight={900} fontSize="1rem" color="white">
          Why I do that?
        </AtomText>

        <AtomText fontSize="1rem" color="white">
          Because your app needs a data when you are loading the application.
          It's neccesary understand when is neccesary those querys. It's
          recommend use the Querys with Spotify nomenclature when you are
          loading data dynamicly. or when you are navigate in the app and you
          want to show a list of albums, artists, playlists use the others
          querys.
        </AtomText>
        <AtomText fontWeight={900} fontSize="1rem" color="white">
          Spotify Querys
        </AtomText>

        <AtomText fontSize="1rem" color="white">
          1. Spotify Search Artist by Name
          <br /> 2. Spotify Albums by Artist Id Spotify Tracks by Album Id{' '}
          <br /> 3. Spotify Search Playlist by Name <br /> 4. Spotify Tracks By
          Playlist <br />
          5. Spotify Search All
        </AtomText>
        <AtomWrapper display="flex" gap="2rem" width="100%" flexWrap="wrap">
          {Object.entries(total)
            ?.map((item) => ({
              label: item[0],
              value: item[1]
            }))
            ?.sort(function (a, b) {
              return b.value - a.value; // Orden de mayor a menor
            })
            ?.map((dataItem, index) => (
              <AtomWrapper
                key={index}
                display="flex"
                gap="10px"
                flexDirection="column"
              >
                <AtomWrapper
                  width="120px"
                  borderRadius="10px"
                  height="120px"
                  display="flex"
                  flexDirection="column"
                  border="0.2px solid black"
                  zIndex={9}
                  // backgroundColor={dataItem?.color}
                >
                  <AtomWrapper
                    borderRadius="10px 10px 0px 0px"
                    height="60px"
                    backgroundColor={colors[index]}
                  ></AtomWrapper>
                  <AtomWrapper>
                    <AtomWrapper
                      width="60px"
                      borderRadius="0px 0px 0px 10px"
                      height="60px"
                      background={convertHexToRGB(colors[index], 0.6).rgba}
                    ></AtomWrapper>
                    <AtomWrapper
                      width="60px"
                      borderRadius="0px 0px 10px 0px"
                      height="60px"
                      background={convertHexToRGB(colors[index], 0.3).rgba}
                    ></AtomWrapper>
                  </AtomWrapper>
                </AtomWrapper>
                <AtomText fontWeight={'bold'} color="white">
                  {dataItem.label}
                </AtomText>
                <AtomText color="white" fontSize="17px">
                  {dataItem.value
                    ?.toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, `,`)}
                </AtomText>
              </AtomWrapper>
            ))}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default Home;
