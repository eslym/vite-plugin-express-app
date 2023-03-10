# Express App in Vite

```shell
npm i -D @eslym/vite-plugin-express-app
```

```shell
yarn add -D @eslym/vite-plugin-express-app
```

## express only

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { viteExpressApp } from "@eslym/vite-plugin-express-app";
import { app as yourExpressApp } from "src/app.ts";

export default defineConfig({
    plugins: [
        //...
        viteExpressApp(yourExpressApp),
    ],
});
```

## with express-ws

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { viteExpressApp } from "@eslym/vite-plugin-express-app";
import {
    app as yourExpressApp,
    getWss /* getWss from express-ws */,
} from "src/app.ts";

export default defineConfig({
    plugins: [
        //...
        viteExpressApp(yourExpressApp, getWss()),
    ],
});
```
