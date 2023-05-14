import { PropsLayout } from 'layout';

/* eslint-disable no-unused-vars */
declare module 'redux-persist/es/persistStore' {
  import { Action, AnyAction, Store } from 'redux';
  import { Persistor, PersistorOptions } from 'redux-persist/es/types';

  export default function persistStore(
    store: Store,
    persistorOptions?: PersistorOptions | null,
    callback?: () => any
  ): Persistor;
  export default function persistStore<
    S = any,
    A extends Action<any> = AnyAction
  >(
    store: Store<S, A>,
    persistorOptions?: PersistorOptions | null,
    callback?: () => any
  ): Persistor;
}

declare module 'next' {
  import { NextPage } from 'next';
  import { ReactNode } from 'react';
  export declare type Layout = (page: ReactNode) => ReactNode;
  export declare type NextPageFC<p> = NextPage<p> & PropsLayout;
  export declare type NextPageFCProps = NextPage & PropsLayout;
}

declare module 'react-color-extractor' {
  import { FC } from 'react';
  import ColorExtractor from 'react-color-extractor';
  export const ColorExtractor: FC<{
    src: string;
    getColors: (colors: string[]) => void;
  }>;
  export default ColorExtractor;
}

declare module 'next/app' {
  export declare type AppPropsWithLayout<P = any> = AppInitialProps & {
    Component: NextComponentType<NextPageContext, any, P> & PropsLayout;
    router: Router;
    __N_SSG?: boolean | undefined;
    __N_SSP?: boolean | undefined;
  };
}
declare module 'color-thief-node' {
  import 'color-thief-node';
  export const getColorFromURL = (url: string) => {};
  export default getColorFromURL;
}
declare module 'colorthief' {
  import 'colorthief';
  class ColorThief {
    getColor(url: string): Promise<number[]>;
    getPalette(url: HTMLImageElement, colorCount: number): number[][];
  }
  export default ColorThief;
}

declare module 'colorthief' {
  import 'colorthief';
  export class ColorThief {
    static getColor(url: string): Promise<number[]>;
  }
}
declare module 'react-color-extractor' {
  import { FC } from 'react';
  export const ColorExtractor: FC<{
    src: string;
    getColors: (colors: string[]) => void;
  }>;
  export default ColorExtractor;
}
declare module 'colorthief' {
  import 'colorthief';
  export class ColorThief {
    static getColor(url: string): Promise<number[]>;
  }
}
