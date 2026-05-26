# shaonq

@shaonq 的个人 JS/SCSS 工具和弹窗库。

## 命令

- `build` — `cmd /c "npx webpack --config webpack.config.js"`（webpack 从仓库根目录运行，入口为 `./index.js`，不是 `./src/index.js`）
- 无测试、lint、类型检查或 CI 脚本。

## 目录结构

| 路径 | 作用 |
|---|---|
| `index.js` | webpack 入口（引入 `src/index.js` + `src/index.scss`） |
| `src/index.js` | 库入口，从 `src/utils/*` 重新导出 |
| `src/index.d.ts` | TypeScript 类型声明（含中文注释 + @example） |
| `src/index.scss` | SCSS 入口（引入 `src/utils/scss/dialog.scss`） |
| `src/utils/` | 所有源码模块：`base.js`, `date.js`, `dialog.js`, `dom.js`, `util.js` |
| `dist/` | 构建产物（已提交）：`index.js`（UMD）, `index.css` |

## 构建产物

- UMD 库，名称 `shaonq`，`libraryExport: 'default'`
- JS 编译目标 IE10+（`@babel/preset-env` + `core-js: 3`，`useBuiltIns: 'usage'`）
- CSS 通过 `mini-css-extract-plugin` 提取，autoprefixer 自动添加前缀

## 包导出

通过 `package.json` `exports` 支持 ESM + UMD：
- `shaonq` / `shaonq/scss` → 源码
- `shaonq/js` / `shaonq/css` / `shaonq/dist/*` → 构建产物

## 环境

- Windows：`npm` / `npx` 必须通过 `cmd /c` 运行（PowerShell 执行策略阻止 `.ps1` 脚本）
- `node_modules` 不跟踪；首次运行需执行 `cmd /c "npm install"`

## 注意事项

- `base.js` 依赖 `util.parse` / `util.stringify`（运行时通过 spread 合并的导出对象解析）
- `dialog.js` 直接引入 `dom`
- README 是一首诗，不是项目文档
- 未配置测试框架、linter 或 formatter
- `.gitignore` 排除了 `*.lock`，但 `package-lock.json` 仍被跟踪（在规则添加前已提交）
