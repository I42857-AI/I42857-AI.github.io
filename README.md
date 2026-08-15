# 洪观林 · AI 视觉设计师 — 个人网站

> 暗色电影感 · 克制高级版 | 求职核心资产 + 个人品牌名片

单页长滚动响应式静态站点，纯 HTML / CSS / 原生 JS，零构建依赖，可直接托管 GitHub Pages / Vercel / 任意静态空间。

---

## 站点结构

```
personalSite/
├── index.html              # 主页面（单页长滚动，5 分区 + 锚点导航）
├── assets/
│   ├── css/
│   │   └── style.css       # 全部样式（暗夜银光配色 + 响应式）
│   ├── js/
│   │   └── main.js         # 全部交互（原生 JS，零依赖）
│   └── images/             # 示例作品图（AI 生成占位，可替换为真实作品）
│       ├── hero-bg.jpg         # Hero 首屏背景（暗色电影感）
│       ├── watch-before.jpg    # 手表精修 Before（原图）
│       ├── watch-after.jpg     # 手表精修 After（暗背景高光）
│       ├── lamp.jpg            # 灯饰氛围视觉
│       ├── ip-cantonese.jpg    # 粤菜餐饮品牌 IP 插画
│       └── video-pointer.jpg   # AI 短剧《指针》剧照感
└── README.md               # 本文档
```

## 分区清单

| # | 分区 | 内容 |
|---|------|------|
| 1 | Hero 首屏 | 全屏电影感主视觉 + 姓名 + 定位语「8 年视觉功底 × AI 工作流」+ 滚动提示 |
| 2 | 关于我 | 一句话定位 + 三张能力徽章（视觉精修 / AI 工作流 / 团队管理）+ 标签 |
| 3 | 作品集 | **杀手锏 before/after 精修对比滑动条**（手表精修 + AI 场景合成）+ 分类 Tab（全部/精修/IP/灯饰/AI视频） |
| 4 | AI 能力 | 工作流可视化（TRAE 提示词 → RunningHub 生图 → 手工精修 → Seedance 成片）+ 效率数据 + AI 视频案例 |
| 5 | 联系 CTA | 求职 CTA + 简历下载位 + 微信 / 邮箱 + 社交链接 |

## 交互与动效

- 顶部固定导航 + 锚点跳转 + 滚动后毛玻璃背景 + 滚动高亮当前分区
- 滚动渐显（IntersectionObserver，支持 `prefers-reduced-motion`）
- Hero 首屏视差滚动
- 作品卡片 hover 放大 + 光影流动 + 箭头浮现
- **Before / After 滑动条**：鼠标拖拽 / 触摸滑动，原生 JS + clip-path 实现
- 作品集分类 Tab 切换筛选
- 移动端汉堡菜单（<760px）
- 返回顶部按钮

## 本地预览

直接用浏览器打开 `index.html` 即可（无需服务器）。

## 部署到 GitHub Pages

1. 在 GitHub 新建一个仓库（如 `hongguanlin-portfolio`），**Public** 公开。
2. 将本目录内所有文件（`index.html` + `assets/` + `README.md`）上传到仓库根目录。
3. 进入仓库 **Settings → Pages**：
   - Source 选择 `Deploy from a branch`
   - Branch 选 `main`（或 master）+ 根目录 `/`
   - 点击 Save 保存
4. 等待 1-2 分钟构建完成，站点将发布到：
   `https://<你的用户名>.github.io/<仓库名>/`
5. （可选）在仓库根目录添加 `CNAME` 文件绑定自定义域名，如 `hongguanlin.com`。

> 提示：若想让站点在根域名直接展示（而非子路径），把仓库命名为 `<你的用户名>.github.io` 即可。

## 待替换 / 待确认清单

- [ ] **真实作品图**：6 张示例图由 AI 生成占位，建议替换为真实项目成品图（手表精修、灯饰、餐饮 IP、电商详情页、AI 视频截图），文件名保持不变或同步更新 `index.html`。
- [ ] **简历文件**：`index.html` 中「下载简历」按钮当前为占位提示，需将正式简历 PDF 命名为 `resume.pdf` 放在站点根目录，并把按钮链接改为 `href="resume.pdf"`。
- [ ] **微信号**：联系区「微信」按钮当前为占位提示，需替换为真实微信号文本。
- [ ] **邮箱**：当前使用 `hongguanlin.design@gmail.com` 占位，请确认或替换为真实邮箱。
- [ ] **联系方式确认**：如有站酷 / 小红书 / 公众号 / GitHub / LinkedIn 等主页链接，可加入联系区。
- [ ] **AI 视频**：《指针》《粤菜视频》案例区当前为剧照占位，可替换为真实成片（推荐 720p mp4，置于 `assets/videos/` 后更新为 `<video>` 标签）。

## 内容数据来源

- 用户档案：`Y:\142857\.agents\skills\GeRen-ShuJu-ZhuanJia\shuJu\洪观林·个人档案.md`
- 项目确认单：`Y:\142857\.agents\output\kaoWen\个人网站优化-项目信息确认单.md`
- 定位语、工作流、效率数据均取自用户档案，无编造。

---

© 2026 洪观林 · AI 视觉设计师 · 深圳
