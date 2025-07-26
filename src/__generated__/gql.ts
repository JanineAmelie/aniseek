/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetTrendingAnime($page: Int = 1, $perPage: Int = 20) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(type: ANIME, sort: TRENDING_DESC) {\n        id\n        title {\n          romaji\n          english\n          native\n        }\n        coverImage {\n          medium\n          large\n        }\n        status\n        episodes\n        averageScore\n        description\n        genres\n        studios {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetTrendingAnimeDocument,
    "\n  query GetAnimeById($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      id\n      title {\n        romaji\n        english\n        native\n      }\n      coverImage {\n        medium\n        large\n        extraLarge\n      }\n      bannerImage\n      status\n      episodes\n      duration\n      averageScore\n      popularity\n      description\n      genres\n      format\n      source\n      season\n      seasonYear\n      favourites\n      tags {\n        name\n        description\n        category\n        rank\n      }\n      studios {\n        nodes {\n          name\n        }\n      }\n      staff {\n        nodes {\n          name {\n            first\n            last\n          }\n        }\n      }\n      characters {\n        nodes {\n          name {\n            first\n            last\n          }\n          image {\n            medium\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetAnimeByIdDocument,
    "\n  query SearchAnime($search: String!, $page: Int = 1, $perPage: Int = 20) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(type: ANIME, search: $search) {\n        id\n        title {\n          romaji\n          english\n        }\n        coverImage {\n          medium\n        }\n        status\n        episodes\n        averageScore\n        description\n        genres\n      }\n    }\n  }\n": typeof types.SearchAnimeDocument,
    "\n  query GetGenres {\n    GenreCollection\n  }\n": typeof types.GetGenresDocument,
};
const documents: Documents = {
    "\n  query GetTrendingAnime($page: Int = 1, $perPage: Int = 20) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(type: ANIME, sort: TRENDING_DESC) {\n        id\n        title {\n          romaji\n          english\n          native\n        }\n        coverImage {\n          medium\n          large\n        }\n        status\n        episodes\n        averageScore\n        description\n        genres\n        studios {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetTrendingAnimeDocument,
    "\n  query GetAnimeById($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      id\n      title {\n        romaji\n        english\n        native\n      }\n      coverImage {\n        medium\n        large\n        extraLarge\n      }\n      bannerImage\n      status\n      episodes\n      duration\n      averageScore\n      popularity\n      description\n      genres\n      format\n      source\n      season\n      seasonYear\n      favourites\n      tags {\n        name\n        description\n        category\n        rank\n      }\n      studios {\n        nodes {\n          name\n        }\n      }\n      staff {\n        nodes {\n          name {\n            first\n            last\n          }\n        }\n      }\n      characters {\n        nodes {\n          name {\n            first\n            last\n          }\n          image {\n            medium\n          }\n        }\n      }\n    }\n  }\n": types.GetAnimeByIdDocument,
    "\n  query SearchAnime($search: String!, $page: Int = 1, $perPage: Int = 20) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(type: ANIME, search: $search) {\n        id\n        title {\n          romaji\n          english\n        }\n        coverImage {\n          medium\n        }\n        status\n        episodes\n        averageScore\n        description\n        genres\n      }\n    }\n  }\n": types.SearchAnimeDocument,
    "\n  query GetGenres {\n    GenreCollection\n  }\n": types.GetGenresDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTrendingAnime($page: Int = 1, $perPage: Int = 20) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(type: ANIME, sort: TRENDING_DESC) {\n        id\n        title {\n          romaji\n          english\n          native\n        }\n        coverImage {\n          medium\n          large\n        }\n        status\n        episodes\n        averageScore\n        description\n        genres\n        studios {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTrendingAnime($page: Int = 1, $perPage: Int = 20) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(type: ANIME, sort: TRENDING_DESC) {\n        id\n        title {\n          romaji\n          english\n          native\n        }\n        coverImage {\n          medium\n          large\n        }\n        status\n        episodes\n        averageScore\n        description\n        genres\n        studios {\n          nodes {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAnimeById($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      id\n      title {\n        romaji\n        english\n        native\n      }\n      coverImage {\n        medium\n        large\n        extraLarge\n      }\n      bannerImage\n      status\n      episodes\n      duration\n      averageScore\n      popularity\n      description\n      genres\n      format\n      source\n      season\n      seasonYear\n      favourites\n      tags {\n        name\n        description\n        category\n        rank\n      }\n      studios {\n        nodes {\n          name\n        }\n      }\n      staff {\n        nodes {\n          name {\n            first\n            last\n          }\n        }\n      }\n      characters {\n        nodes {\n          name {\n            first\n            last\n          }\n          image {\n            medium\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAnimeById($id: Int!) {\n    Media(id: $id, type: ANIME) {\n      id\n      title {\n        romaji\n        english\n        native\n      }\n      coverImage {\n        medium\n        large\n        extraLarge\n      }\n      bannerImage\n      status\n      episodes\n      duration\n      averageScore\n      popularity\n      description\n      genres\n      format\n      source\n      season\n      seasonYear\n      favourites\n      tags {\n        name\n        description\n        category\n        rank\n      }\n      studios {\n        nodes {\n          name\n        }\n      }\n      staff {\n        nodes {\n          name {\n            first\n            last\n          }\n        }\n      }\n      characters {\n        nodes {\n          name {\n            first\n            last\n          }\n          image {\n            medium\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchAnime($search: String!, $page: Int = 1, $perPage: Int = 20) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(type: ANIME, search: $search) {\n        id\n        title {\n          romaji\n          english\n        }\n        coverImage {\n          medium\n        }\n        status\n        episodes\n        averageScore\n        description\n        genres\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchAnime($search: String!, $page: Int = 1, $perPage: Int = 20) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        total\n        currentPage\n        lastPage\n        hasNextPage\n      }\n      media(type: ANIME, search: $search) {\n        id\n        title {\n          romaji\n          english\n        }\n        coverImage {\n          medium\n        }\n        status\n        episodes\n        averageScore\n        description\n        genres\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetGenres {\n    GenreCollection\n  }\n"): (typeof documents)["\n  query GetGenres {\n    GenreCollection\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;