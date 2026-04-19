# Node con TypeScript - TS-Node-dev (preferido)

1. Instalar TypeScript y demás dependencias

```
npm i -D typescript @types/node ts-node-dev rimraf
```

2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)

```
npx tsc --init --outDir dist/ --rootDir src
```

3. Crear scripts para dev, build y start ([Más sobre TS-Node-dev aquí](https://www.npmjs.com/package/ts-node-dev))

```
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```

4. tsconfig.json

```
{
  "exclude": ["node_modules", "dist"],
  "include": ["src", "test"],
  "compilerOptions": {
    "rootDir": ".",
    "outDir": "dist/",
    "module": "commonjs",
    "target": "esnext",
    "types": ["node"],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": false,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}

```
