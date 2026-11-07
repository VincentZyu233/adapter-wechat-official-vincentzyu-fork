> 💡 推荐前往 [GitHub](https://github.com/VincentZyuApps/adapter-wechat-official-vincentzyu-fork) 或 [Gitee](https://gitee.com/vincent-zyu/adapter-wechat-official-vincentzyu-fork) 阅读 README，体验更好。
>
> **[📖 查看完整更新日志 →](./CHANGELOG.md)**

![adapter-wechat-official-vincentzyu-fork](https://socialify.git.ci/VincentZyuApps/adapter-wechat-official-vincentzyu-fork/image?description=1&font=Bitter&forks=1&issues=1&language=1&logo=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Ff%2Ff3%2FKoishi.js_Logo.png&name=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Auto)

# 📱 koishi-plugin-adapter-wechat-official-vincentzyu-fork

[![npm](https://img.shields.io/npm/v/koishi-plugin-adapter-wechat-official-vincentzyu-fork?style=flat-square&logo=npm)](https://www.npmjs.com/package/koishi-plugin-adapter-wechat-official-vincentzyu-fork)
[![npm-download](https://img.shields.io/npm/dm/koishi-plugin-adapter-wechat-official-vincentzyu-fork?style=flat-square&logo=npm)](https://npm-stat.com/charts.html?package=koishi-plugin-adapter-wechat-official-vincentzyu-fork)

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/VincentZyuApps/adapter-wechat-official-vincentzyu-fork)
[![Gitee](https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white)](https://gitee.com/vincent-zyu/adapter-wechat-official-vincentzyu-fork)

[![Koishi Forum](https://img.shields.io/badge/Koishi%20Forum-12566-5546A3?style=for-the-badge&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABU0lEQVR42p2UQSsFYRSGnxnqLuytKWKpKFkQNsS%2FsOHPWPADLCmxU5S7UzYWNrJR7lYiRF2FeWzOMKZ7mXHqNNP5vvP2nu%2B850CY2lP4X1K31ZbaDm%2BpO%2Bpyp5wfAXVEPfRvO1JHf4AVQGbUh7j4EZ4VkrNCXPVRnf3CUBN1SH2KC28VGOV3ntRhNclZHdcAKYM11QR1oVBOXctzFlNgBTC8qmXxPQEegbVeYApIgJT6tg%2F0AdMp0B%2FBpCabK2AAmAAa%2F2GRBft1oBFPkqTAba7LCiAfQC9wClwAY1HJHepuiO29Yrsf1Dn1uiDU3RTYCtTkl1Leg8k9MB4NGgReI28rV3azgyCz0og01Xl1Uz1QX8uCTELm3UbkTF1VJ9Wr0tn3iBSGdjYG0XivE3VN3VD31PM4a3cc2tIGGI0VkTO7rLxGuiy25ejmjfqsvkSXui62TxaK03td4FXTAAAAAElFTkSuQmCC&logoColor=white)](https://forum.koishi.xyz/t/topic/12566)

[![QQ群](https://img.shields.io/badge/QQ群-1085190201-12B7F5?style=flat-square&logo=qq&logoColor=white)](https://qm.qq.com/q/ZHj33L5cuC)

<h2>💬 交流反馈</h2>
<p>🐛 Bug 反馈 / 💡 建议 / 👨‍💻 插件开发交流，欢迎加群：</p>
<p><del>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b>259248174</b>   🎉（这个群G了）</del></p> 
<p>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b>1085190201</b> 🎉</p>
<p>💡 在群里直接艾特我，回复的更快哦~ ✨</p>

---

适用于 Koishi 的微信公众号 (Wechat Official) 适配器增强版，基于 [@satorijs/adapter-wechat-official](https://github.com/satorijs/satori/tree/main/adapters/wechat-official) 演进，修复了官方版本中媒体素材上传、富文本超链接丢失、Token 异常处理等关键缺陷，全面增强公众号消息体验。核心修复已同步向官方提交 [Satori PR #448](https://github.com/satorijs/satori/pull/448)。

## 📸 实机效果演示

<p align="center">
  <img src="./docs/images/preview/preview.text-image-voice.png" alt="微信公众号文本、图片与语音消息实测预览" width="600" />
</p>
<p align="center">
  <img src="./docs/images/preview/preview.miniprogram-a-href-jump.png" alt="微信公众号消息与小程序直达效果预览" width="600" />
</p>

## 主要特性与修复 (Compared to Upstream)

- 🔗 **支持富文本超链接与小程序直达**：
  - 完整支持 `h('a', { href }, children)`，渲染为微信支持的 `<a href="...">...</a>` 网页链接或小程序卡片链接。
  - 针对带有 `href` 属性的未识别元素进行降级容错渲染，防止包含复杂元素的指令输出被截断或丢弃。
- 🖼️ **图片与媒体上传修复与规范化**：
  - 将 Satori 的 `img` 元素类型统一规整为 `image`，彻底解决官方适配器调用微信素材上传接口时因类型不匹配导致上传失败的问题（已向官方提交 [PR #448](https://github.com/satorijs/satori/pull/448)）。
  - 修复微信上传素材 API 返回字符串格式响应时的解析崩溃问题，安全提取 `media_id`。
  - 媒体上传失败时优雅降级并输出告警，不会导致整个发送链路抛错中断。
- 🔄 **40001 Token 自动重试机制**：
  - 当调用微信上传接口遇到 `40001` (invalid credential / access_token expired) 错误码时，自动清理并刷新本地凭据后无缝重试，避免缓存未过期但微信端失效导致的发图失败。
- 🛡️ **被动回复与主动客服消息解耦**：
  - 针对各类媒体消息（图片、语音等）和文本超链接提供原生被动回复 XML 与客服消息通道双重保障。

## 配置说明

在 Koishi 工作区 `koishi.yml` 中配置：

```yaml
adapter-wechat-official-vincentzyu-fork:
  appid: your-wechat-appid
  secret: your-wechat-appsecret
  account: gh_xxxxxx # 公众号原始 ID
  token: your-webhook-token
  aesKey: your-encoding-aes-key
```

## 常见消息格式示例

### 超链接与小程序跳转

```ts
// 发送带超链接的消息（支持微信官方跳转或小程序）
await session.send(h('a', { href: 'https://example.com' }, '打开网页'))

// 或在模板中混合文本与链接
await session.send([
  '📦 插件推荐：',
  h('a', { href: 'https://uniapp-koishi-market.pages.dev/#/pages/plugin-detail/plugin-detail?name=market' }, '[小程序直达]'),
])
```

### 图片与语音消息

```ts
await session.send(h.image('https://example.com/demo.png'))
await session.send(h.audio('file:///path/to/voice.mp3'))
```

## 鸣谢与上游同步

- 上游代码提交：[satorijs/satori#448](https://github.com/satorijs/satori/pull/448)
- 原始项目：[@satorijs/adapter-wechat-official](https://github.com/satorijs/satori/tree/main/adapters/wechat-official)
- 协议生态：[Koishi](https://koishi.chat/)
