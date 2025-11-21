const esbuild = require("esbuild");

// CommonJS build
esbuild
    .build({
        entryPoints: ["src/index.ts"],
        bundle: true,
        minify: true,
        sourcemap: true,
        format: "cjs",
        outfile: "dist/index.js",
        external: [
            "react",
            "react-dom",
            "@mui/material",
            "@mui/icons-material",
            "styled-components",
        ],
        target: ["es2020"],
    })
    .catch(() => process.exit(1));

// ESM build
esbuild
    .build({
        entryPoints: ["src/index.ts"],
        bundle: true,
        minify: true,
        sourcemap: true,
        format: "esm",
        outfile: "dist/index.esm.js",
        external: [
            "react",
            "react-dom",
            "@mui/material",
            "@mui/icons-material",
            "styled-components",
        ],
        target: ["es2020"],
    })
    .catch(() => process.exit(1));
