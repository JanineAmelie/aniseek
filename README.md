# AniSeek

Discover your new favorite anime

## Getting Started

### Prerequisites

Make sure you have Node.js v20 installed on your machine.

### Development Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Generate GraphQL types:**

   ```bash
   npm run codegen
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Important Notes

- **Always run codegen after cloning** - The GraphQL generated files are not committed to the repository
- **Run codegen after schema changes** - If you modify GraphQL queries or the schema, regenerate the types
