import Head from 'next/head';
import { FC } from 'react';

type Props = {
  title: string;
  description: string;
  url: string;
  image: string;
  content: string;
};

const AtomSeo: FC<Props> = ({ title, content, description, url, image }) => {
  return (
    <Head>
      <title>{title}</title>
      {/* {props.icon && (
      <link rel="icon" type="image/png" href={props.icon ?? `/favicon.png`} />
    )} */}
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=7" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="canonical" content={url} />
      <meta name="keywords" content={`${content}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="description" content={description} />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="googlebot" content="index,follow" />

      <meta property="og:locale" content="ES" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image" content={image} />

      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />

      <meta property="og:image" itemProp="image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
    </Head>
  );
};

export default AtomSeo;
