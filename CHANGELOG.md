# 变更日志 (CHANGELOG)

本项目遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 语义化版本规范。

---

## 🚀 上游同步与贡献 (Upstream PR)

我们已将适配器的核心修复与功能增强代码分批次向上游官方仓库提交了 Pull Request，期待官方生态采纳合入：
- **Bugfix 核心修复 PR**：👉 **[satorijs/satori#448: fix(wechat-official): 修复临时素材上传时 img 媒体类型错误及解构崩溃](https://github.com/satorijs/satori/pull/448)**（Ready for review，已完成本地与生产环境完整实机测试）
- **Feature 音频转码 PR**：👉 **[satorijs/satori#449: feat(wechat-official): 支持语音素材双引擎自动转码 (FFmpeg 服务联动与纯 JS 编码兜底)](https://github.com/satorijs/satori/pull/449)**（Ready for review，双引擎自动将非 MP3 语音转码为微信合规 MP3）

欢迎前往上游参与 Review 或给本仓库点点 Star ⭐️

---

## [2.6.0-beta.3+20261107] - 2026-11-07

> 对应上游特性 PR：👉 **[satorijs/satori#449](https://github.com/satorijs/satori/pull/449)**

### ✨ 新增特性 (Features)

- **语音双引擎自动转码系统**：针对微信公众平台语音接口（`POST /cgi-bin/media/upload?type=voice`）仅支持 MP3 与 AMR 格式的严格限制，为适配器引入音频双引擎自动转码流水线：
  - **内置纯 JS 编码器**：引入 `@breezystack/lamejs`，针对最常见的 16-bit PCM WAV 音频切片（如 `otto-hzys` 活字印刷合成结果）在纯内存中秒级编码转为合规 MP3，零系统依赖、零环境门槛开箱即用；
  - **FFmpeg 微服务联动**：动态联动 Koishi 上下文中的 `ffmpeg` 服务，支持全格式（WAV/OGG/FLAC/AAC/M4A 等）音频向标准 128kbps 44.1kHz MP3 转换；
  - **双向 Fallback 容灾**：首选引擎未命中、未安装或转码失败时，自动平滑回退至备选引擎执行兜底。
- **配置项扩展 (Schema)**：在控制台新增 `audioTranscodePriority` 单选框设置，支持用户在 WebUI 中自由切换“内置纯 JS 编码器优先”或“FFmpeg 服务优先”。

### 🐛 缺陷修复 (Bug Fixes)

- **修复非 MP3 语音 40005 报错**：彻底解决向微信公众号发送 WAV 音频时返回 `40005 invalid file type` 导致无法收到语音的问题。
- **解构保护与被动响应超时防护**：修补 `flushMedia` 中对 `uploadMedia` 失败返回值的空保护，杜绝抛出 `TypeError: (intermediate value) is not iterable` 异常导致微信 5 秒被动响应窗口超时（`resolve timeout`）。

---

## [2.5.1-beta.2+20261107] - 2026-11-07

### ✨ 新增特性 (Features)

- **新增 Koishi 控制台 Usage 配置页说明**：创建 `src/usage.ts`，为插件配置页提供卡片化默认折叠指南，包含微信后台参数填写规范、小程序卡片直达语法、多媒体收发机制及在线测试公众号等。

---

## [2.5.1-beta.1+20261107] - 2026-11-07

### 🐛 缺陷修复 (Bug Fixes)

- **修复媒体素材上传 40004 错误**：Satori 默认生成的图片元素标签类型为 `img`，而微信公众平台上传临时素材接口（`/cgi-bin/media/upload`）仅接受 `image` 类型。现已增加归一化转换逻辑，彻底解决公众号发图报错 `40004 invalid media type hint` 的问题。
- **解构空值防御性容错**：修复在网络抖动或上传失败导致 `uploadMedia` 返回 `undefined` 时，直接解构引发 `TypeError: (intermediate value) is not iterable` 致命崩溃的问题，增强被动回复流程的稳定性。
- **字符串响应兼容解析**：兼容特定网络代理与微信接口偶发返回纯字符串 JSON 响应的异常场景，安全提取 `media_id`。
- **Token 失效自动重试自愈**：捕获微信接口返回的 `errcode === 40001` (access_token expired) 状态码，主动清理并调用 `refreshToken()` 刷新凭据后自动重试一次上传，保证服务连续性。

### ✨ 新增特性 (Features)

- **富文本 `<a>` 标签与小程序直达支持**：原生识别解析 `type === 'a'` 元素及其属性，渲染生成合规 HTML 链接标签，支持微信客户端内直接唤起对应的小程序卡片与网页链接。
- **未知元素降级渲染兜底**：优化元素遍历器 `visit`，遇到未显式处理的复合元素时，自动 fallback 执行递归渲染 `render(children)`，杜绝消息被截断或吞字。

### 📝 文档与生态 (Documentation & Ecosystem)

- **新增实机测试凭据**：在文档与 PR 中补充了真实公众号运行截图（包含文本、图片、1" 语音消息及小程序卡片直达）。
- **优化统计与元数据**：添加 `.gitattributes` 支持 GitHub Linguist 统计 Markdown 代码占比。
- **组织归档与迁移**：仓库正式迁移至 [VincentZyuApps](https://github.com/VincentZyuApps) 组织统一维护。
