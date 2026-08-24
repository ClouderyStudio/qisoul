# 栖所（Qisoul）

> 安静 · 温和 · 长久 —— 一个温暖、安全的心理健康互助社区。

栖所是一个前后端分离的心理健康互助平台前端。在这里，用户可以记录每天的心情、通过图表观察情绪趋势、在温暖的社区中匿名分享故事与便签、互相评论与鼓励，并获取专业的心理帮助资源。

## ✨ 功能特性

| 模块        | 说明                                                   |
| ----------- | ------------------------------------------------------ |
| 📝 心情记录 | 记录当日心情类型、强度、备注与标签，支持按日期范围查询 |
| 📊 情绪统计 | 总记录数、连续记录天数、情绪分布与趋势（按周/月视图）  |
| 💬 温暖社区 | Markdown 帖子、便签（sticky）、嵌套评论、点赞互动      |
| 🧘 心灵资源 | 心理帮助网站 / 实用 APP / 方法练习等静态资源卡片       |
| 🔐 统一登录 | Casdoor 单点登录（OAuth2 授权码模式），Cookie 会话     |
| 🌗 深浅主题 | 浅色 / 深色主题切换，持久化到本地，跟随系统偏好        |

## 🛠 技术栈

- **框架**：Vue 3（`<script setup>`）+ TypeScript
- **构建**：Vite 8 · vue-tsc（构建时全量类型检查）
- **状态管理**：Pinia
- **路由**：vue-router 5（懒加载 + 全局守卫）
- **样式**：Tailwind CSS 4 + CSS 变量主题体系
- **HTTP**：Axios（`withCredentials` 携带 Cookie）
- **认证**：Casdoor OAuth2（`casdoor-vue-sdk` 已弃用，改用自有 OAuth 流程）
- **安全渲染**：marked + DOMPurify（统一 `renderMarkdown` 消毒）

包管理器为 **pnpm**（`packageManager: pnpm@11.13.1`）。

## 📁 环境要求

- Node.js ≥ 20（Vite 8 要求较新 Node 版本）
- pnpm ≥ 11

## 🚀 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 配置环境变量（复制示例并按需修改）
Copy-Item .env.example .env   # Windows PowerShell
# cp .env.example .env        # Linux / macOS

# 3. 启动开发服务器（默认 http://localhost:5173）
pnpm dev

# 4. 生产构建（vue-tsc 类型检查 + vite 打包，产物输出到 dist/）
pnpm build

# 5. 本地预览构建产物
pnpm preview
```

## 🔧 环境变量

| 变量                      | 必填     | 默认值                    | 说明                                       |
| ------------------------- | -------- | ------------------------- | ------------------------------------------ |
| `VITE_API_BASE_URL`       | 生产必填 | 无（缺省发往同源并告警）  | 后端 API 地址，如 `https://localhost:7288` |
| `VITE_CASDOOR_SERVER_URL` | 否       | `https://auth.cldery.com` | Casdoor 单点登录服务地址                   |
| `VITE_CASDOOR_CLIENT_ID`  | 否       | `75c6718aad099242d03f`    | Casdoor 应用公开 client_id                 |
| `VITE_CASDOOR_ORG_NAME`   | 否       | `iam`                     | Casdoor 组织名                             |
| `VITE_CASDOOR_APP_NAME`   | 否       | `iam`                     | Casdoor 应用名                             |

> `.env` 已被 `.gitignore` 忽略，请勿把真实密钥提交到仓库；模板见 `.env.example`。Casdoor 的 `clientId` 属 OAuth 公开标识，非机密。生产环境务必注入 `VITE_API_BASE_URL`，缺省时请求会发往站点同源路径。

## 📂 项目结构

```
src/
├── main.ts                 # 入口：Pinia、路由、主题初始化
├── App.vue                 # 全局布局（Navbar / RouterView / Footer）
├── components/             # Navbar、Footer、MarkdownEditor、CommentSection
├── composables/            # useTheme（深浅主题，挂载前初始化防闪烁）
├── config/auth.ts          # Casdoor 配置唯一来源
├── pages/                  # Home、Login、Callback、Dashboard、Resources、
│   │                       # About、Privacy、Terms、Help
│   └── community/          #   Index（社区列表）、PostDetail（帖子详情）
├── router/router.ts        # 路由定义与全局守卫（服务端校验登录态）
├── services/               # API 分层：api（axios）+ auth/mood/post/
│   │                       #   comment/sticky/stats
├── stores/user.ts          # 用户状态（登录、登出、会话恢复）
├── styles/main.css         # Tailwind 入口 + 深浅色 CSS 变量
└── utils/                  # markdown（安全渲染）、time（时间格式化）、
                            #   text（截断/字数统计）
```

## 🔐 认证流程

栖所采用 **Casdoor OAuth2 授权码模式** + 后端 Cookie 会话：

1. 用户点击登录 → `/login` 页先请求后端 `GET /identity/auth/state` 获取随机 `state`（后端同时种入 HttpOnly Cookie 用于回调校验，防 CSRF 登录）；
2. 前端携带 `state`、`redirect_uri` 跳转 Casdoor 授权页；
3. Casdoor 回调到 `/callback?code=...&state=...`，前端把 `code`、`state` 提交给后端 `POST /identity/auth/callback`；
4. 后端校验 `state` 与 Cookie 一致后下发登录 Cookie，返回用户信息；
5. 前端将用户信息缓存到 Pinia + localStorage（仅为展示缓存，**鉴权以 Cookie 为准**）。

关键点：

- 登录前目标页面存放在 `sessionStorage("oauth_redirect")`，登录成功后跳回原页面；
- 回调跳转只允许站内路径（`/` 开头且不含 `//`），防止 open redirect；
- 路由守卫对 `requiresAuth` 页面会调用 `checkStatus()` 以**服务端结果为准**，不再只信 localStorage；
- 任意接口返回 401 时，前端清除本地缓存并跳转登录页（`/login?redirect=当前路径`）。

## 🔌 后端 API 约定

- 所有接口以 `VITE_API_BASE_URL` 为基址，携带 Cookie（`withCredentials: true`）；
- 响应统一包裹：`{ success, data, message?, pagination? }`；
- 业务前缀 `/qisoul/*`，身份认证 `/identity/*`：

| 分组 | 端点                                                                                                                                               |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 身份 | `GET /identity/auth/state` · `POST /identity/auth/callback` · `GET /identity/auth/status` · `GET /identity/auth/me` · `POST /identity/auth/logout` |
| 帖子 | `GET/POST /qisoul/post` · `GET /qisoul/post/categories` · `GET/PUT/DELETE /qisoul/post/{id}` · `POST /qisoul/post/{id}/like`                       |
| 评论 | `GET /qisoul/comment/post/{postId}` · `POST /qisoul/comment` · `GET/DELETE /qisoul/comment/{id}` · `POST /qisoul/comment/{id}/like`                |
| 心情 | `GET/POST /qisoul/mood`（`days`/`startDate`/`endDate`）· `GET/PUT/DELETE /qisoul/mood/{id}`                                                        |
| 统计 | `GET /qisoul/stats?days=&view=`（趋势、分布、连续天数）                                                                                            |
| 便签 | `GET/POST /qisoul/sticky` · `DELETE /qisoul/sticky/{id}` · `POST /qisoul/sticky/{id}/like`                                                         |

## 🛡 安全设计

- **Markdown 消毒**：所有用户内容统一经 `utils/markdown.ts` 的 `renderMarkdown` 渲染——禁止 `iframe/object/embed/form` 等危险标签与 `srcdoc/style` 属性，带 `target` 的链接自动补 `rel="noopener noreferrer"`；
- **登录 CSRF**：OAuth `state` 由服务端下发并种入 HttpOnly Cookie，回调比对；
- **授权边界**：前端"删除/编辑自己的内容"的判断（按用户名比对）**仅用于隐藏按钮**，真正的鉴权与所有权校验由后端在 Cookie 会话上完成；
- **点赞状态**：前端按用户隔离持久化（仅作展示），最终幂等性需后端保证。

## 🚢 部署

```bash
pnpm build
```

产物在 `dist/`，为纯静态资源，可用任意静态服务器托管（nginx / CDN 等）。建议：

- 生产注入 `VITE_API_BASE_URL` 指向后端域名；
- 通过反向代理将 API 与前端置于同源（或保证 Cookie `SameSite` 配置兼容），使 `withCredentials` 正常工作；
- 站点必须启用 HTTPS（认证 Cookie 的常规要求）；
- 部署后再执行一次 `pnpm build` 并在浏览器验证登录、社区读写与深浅主题。

> ⚠️ 本项目采用 AGPL-3.0。若以**网络服务（SaaS）**形式对外提供，按协议第 13 条，运行修改版的服务须向通过网络与之交互的用户提供对应源代码（例如在界面提供可获取源码的途径）。

## 🧰 常用工具函数

- `renderMarkdown(md)` —— 安全渲染 Markdown（DOMPurify 消毒，防 XSS）；
- `formatTime(dateStr)` —— 中文相对时间（"刚刚 / N分钟前 / 昨天…"），对非法日期有防护；
- `truncateText / truncateByLines / truncateSmart / stripMarkdown` —— 文本截断与纯文本提取。

## 📄 文档页面

项目内置 关于（`/about`）、隐私政策（`/privacy`）、服务条款（`/terms`）、帮助中心（`/help`）页面，内容为静态文案；涉及隐私与数据处理的描述请与后端实际实现保持一致。

## 📄 开源协议

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0.html)

本项目基于 **GNU Affero General Public License v3.0（AGPL-3.0）** 开源，完整协议文本见 [LICENSE.txt](./LICENSE.txt)。

```
Copyright (C) 2026 栖所

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
```

- 版权行中的年份与持有者可自行调整（默认对齐页脚署名"栖所"）；
- 若对外提供网络服务（SaaS），须遵守第 13 条向用户提供对应源代码。

## 📌 备注

- 默认头像引用 `public/default-avatar.png`（暖色圆形"栖"字），缺失时 `@error` 会兜底替换；
- `vite.config.ts` 中 `/api` 代理为历史配置，当前服务层直连 `VITE_API_BASE_URL`，如无使用可移除以减少误解；
- 社区发帖/便签、点赞属于需登录功能（`requiresAuth`），帖子详情公开可读。
