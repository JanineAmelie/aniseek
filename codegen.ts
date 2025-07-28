import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql.anilist.co",
  documents: ["src/**/*.{ts,tsx}", "!./src/__generated__/**"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
    },
    "./src/__generated__/hooks.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        withResultType: true,
        withMutationFn: true,
        defaultScalarType: "unknown",
        inlineFragmentTypes: "combine",
        errorPolicy: "all",
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  ignoreNoDocuments: true,
};

export default config;
