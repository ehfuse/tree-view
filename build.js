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
            // 스크롤바를 번들에 품지 않는다 — 품으면 빌드 당시의 옛 판이 굳어, 스크롤바 패키지를 고쳐도 트리에는 닿지 않는다
            // (가상 표에서 옛 스크롤바 버그가 남았던 것과 같은 구조). peerDependencies 로 앱의 한 벌을 쓴다.
            "@ehfuse/overlay-scrollbar",
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
            // 스크롤바를 번들에 품지 않는다 — 품으면 빌드 당시의 옛 판이 굳어, 스크롤바 패키지를 고쳐도 트리에는 닿지 않는다
            // (가상 표에서 옛 스크롤바 버그가 남았던 것과 같은 구조). peerDependencies 로 앱의 한 벌을 쓴다.
            "@ehfuse/overlay-scrollbar",
        ],
        target: ["es2020"],
    })
    .catch(() => process.exit(1));
