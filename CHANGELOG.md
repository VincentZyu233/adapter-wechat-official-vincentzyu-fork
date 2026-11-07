# 变更日志 (CHANGELOG)

本项目遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 语义化版本规范。

---

## 🚀 上游同步与贡献 (Upstream PR)

我们已将适配器的核心修复与健壮性增强代码向上游官方仓库提交了 Pull Request，期待官方生态采纳合入：
- **上游 PR 链接**：👉 **[satorijs/satori#448: fix(wechat-official): 修复临时素材上传时 img 媒体类型错误及解构崩溃](https://github.com/satorijs/satori/pull/448)**
- **分支状态**：已完成本地与生产环境完整实机测试（Ready for review），欢迎前往上游参与 Review 或点赞关注。

---

## [2.5.0+20261106] - 2026-11-06

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
