const pkg = require('../package.json')

const detailsStyle = 'margin:12px 0;border:1px solid var(--k-color-border, #909399);border-radius:8px;background:var(--k-card-bg, transparent);color:var(--k-text-dark, inherit);overflow:hidden;box-shadow:var(--k-card-shadow, 0 1px 3px rgb(0 0 0 / 12%));transition:var(--color-transition, border-color .2s ease, background-color .2s ease)'
const summaryStyle = 'padding:10px 14px;background:var(--k-hover-bg, rgba(127, 127, 127, .12));color:var(--k-text-dark, inherit);cursor:pointer;user-select:none;font-weight:bold'
const detailsBodyStyle = 'padding:12px 16px;border-top:1px solid var(--k-color-divider, rgba(127, 127, 127, .28));background:var(--k-card-bg, transparent);color:var(--k-text-dark, inherit);line-height:1.7'

const KOISHI_LOGO_BASE64 = 'data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABU0lEQVR42p2UQSsFYRSGnxnqLuytKWKpKFkQNsS%2FsOHPWPADLCmxU5S7UzYWNrJR7lYiRF2FeWzOMKZ7mXHqNNP5vvP2nu%2B850CY2lP4X1K31ZbaDm%2BpO%2Bpyp5wfAXVEPfRvO1JHf4AVQGbUh7j4EZ4VkrNCXPVRnf3CUBN1SH2KC28VGOV3ntRhNclZHdcAKYM11QR1oVBOXctzFlNgBTC8qmXxPQEegbVeYApIgJT6tg%2F0AdMp0B%2FBpCabK2AAmAAa%2F2GRBft1oBFPkqTAba7LCiAfQC9wClwAY1HJHepuiO29Yrsf1Dn1uiDU3RTYCtTkl1Leg8k9MB4NGgReI28rV3azgyCz0og01Xl1Uz1QX8uCTELm3UbkTF1VJ9Wr0tn3iBSGdjYG0XivE3VN3VD31PM4a3cc2tIGGI0VkTO7rLxGuiy25ejmjfqsvkSXui62TxaK03td4FXTAAAAAElFTkSuQmCC'

export const usage = `
<h1>📱 微信公众号适配器增强版</h1>
<h2>🎯 当前版本：v${pkg.version}</h2>

<p>
  <a href="https://www.npmjs.com/package/koishi-plugin-adapter-wechat-official-vincentzyu-fork" target="_blank">
    <img src="https://img.shields.io/npm/v/koishi-plugin-adapter-wechat-official-vincentzyu-fork?style=flat-square&logo=npm" alt="npm version">
  </a>
  <a href="https://npm-stat.com/charts.html?package=koishi-plugin-adapter-wechat-official-vincentzyu-fork" target="_blank">
    <img src="https://img.shields.io/npm/dm/koishi-plugin-adapter-wechat-official-vincentzyu-fork?style=flat-square&logo=npm" alt="npm downloads">
  </a>
  <br>
  <a href="https://github.com/VincentZyuApps/koishi-plugin-adapter-wechat-official-vincentzyu-fork" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://gitee.com/vincent-zyu/koishi-plugin-adapter-wechat-official-vincentzyu-fork" target="_blank">
    <img src="https://img.shields.io/badge/Gitee-C71D23?style=for-the-badge&logo=gitee&logoColor=white" alt="Gitee">
  </a>
  <br>
  <a href="https://forum.koishi.xyz/t/topic/13800" target="_blank">
    <img src="https://img.shields.io/badge/Koishi%20Forum-13800-5546A3?style=for-the-badge&logo=${KOISHI_LOGO_BASE64}&logoColor=white" alt="Koishi Forum">
  </a>
  <a href="https://qm.qq.com/q/ZHj33L5cuC" target="_blank">
    <img src="https://img.shields.io/badge/QQ群-1085190201-12B7F5?style=flat-square&logo=qq&logoColor=white" alt="QQ群">
  </a>
</p>

<h2>💬 交流反馈</h2>
<p>🐛 Bug 反馈 / 💡 建议 / 👨‍💻 插件开发交流，欢迎加群：</p>
<p><del>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b>259248174</b>   🎉（这个群G了）</del></p>
<p>💬 插件使用问题 / 🐛 Bug反馈 / 👨‍💻 插件开发交流，欢迎加入QQ群：<b style="color: #12B7F5;">1085190201</b> 🎉</p>
<p>💡 在群里直接艾特我，回复的更快哦~ ✨</p>

<details style="${detailsStyle}; border-left: 5px solid #2196f3;">
<summary style="${summaryStyle}"><b style="color: #2196f3;">⚙️ 微信公众平台后台配置指南（首次接入必读）</b></summary>
<div style="${detailsBodyStyle}">
<p><b>🌐 1. 服务器地址 (URL)：</b>填写公网可访问的 Webhook 地址，默认路径通常为：<code>http(s)://your-domain.com/wechat-official</code>（或对应端口映射路径）。</p>
<p><b>🔑 2. 开发者令牌 (Token)：</b>需与微信后台【基本配置 -&gt; 服务器配置】中填写的 <code>Token</code> 保持完全一致。</p>
<p><b>🛡️ 3. 消息加解密密钥 (EncodingAESKey)：</b>在微信后台生成后复制粘贴至本配置，同时建议加解密方式选择【安全模式】或【兼容模式】。</p>
<p><b>📋 4. IP 白名单：</b>请务必将部署 Koishi 实例的公网出口 IP 加入微信公众平台后台的【IP 白名单】中，否则调用素材上传与 Access Token 刷新 API 会报 <code>40164 invalid ip</code> 错误。</p>
<p><b>⏳ 5. 5秒响应限制：</b>微信服务器要求被动回复在 5 秒内必须做出响应，本适配器已内置空值解构防崩溃及容错机制，确保网络抖动时不挂起进程。</p>
</div>
</details>

<details style="${detailsStyle}; border-left: 5px solid #ff9800;">
<summary style="${summaryStyle}"><b style="color: #ff9800;">🚀 富文本超链接与微信小程序卡片直达语法</b></summary>
<div style="${detailsBodyStyle}">
<p>微信公众号文本消息底层支持特定的 HTML <code>&lt;a&gt;</code> 标签，本适配器已提供原生完整支持及驼峰属性自动转义：</p>

<p><b>🔗 1. 普通网页跳转：</b></p>
<pre><code>await session.send(h('a', { href: 'https://example.com' }, '点击访问外部网页'))</code></pre>

<p><b>📱 2. 原生无缝唤起微信小程序（小程序卡片跳转）：</b></p>
<pre><code>await session.send(h('a', {
  href: 'https://example.com', // 极低版本微信降级兜底链接
  dataMiniprogramAppid: 'wx1234567890abcdef', // 目标小程序 AppID
  dataMiniprogramPath: 'pages/index/index?query=1', // 小程序页面路径与参数
}, '🚀 点击直达小程序查看详情'))</code></pre>
<p><i>💡 提示：目标小程序必须已在当前公众号后台完成关联绑定，用户点击蓝字即可直接在微信内全屏拉起原生小程序！</i></p>

<p><b>🛡️ 3. 未知标签安全兜底：</b>遇到非标准的复合元素时，适配器会自动执行 fallback 递归渲染子文本，绝不会将消息内容吞噬截断。</p>
</div>
</details>

<details style="${detailsStyle}; border-left: 5px solid #4caf50;">
<summary style="${summaryStyle}"><b style="color: #4caf50;">🎙️ 多媒体素材收发与自动自愈机制</b></summary>
<div style="${detailsBodyStyle}">
<p><b>🖼️ 图片发送：</b>完整支持 <code>session.send(h.image('...'))</code>，内部自动将 Satori 的 <code>img</code> 标签规整为微信 API 要求的 <code>image</code> 类型，彻底终结官方原版报 <code>40004 invalid media type hint</code> 的缺陷。</p>
<p><b>🎧 语音发送与双引擎转码：</b>支持 <code>session.send(h.audio('...'))</code>。针对微信语音（Voice）素材仅支持 MP3/AMR 的平台限制，适配器内置<b>纯 JS 编码器与 FFmpeg 微服务双引擎</b>，支持自动将 WAV/OGG/FLAC 转换为符合微信规范的标准 MP3 下发，支持在配置项中自由设置优先级与双向 Fallback 容灾，彻底终结 <code>40005 invalid file type</code> 报错。</p>
<p><b>🔄 40001 Token 自动重试自愈：</b>在多实例运行或微信后台重置密钥导致凭证失效时，适配器会自动拦截 <code>40001</code> 错误、重新获取 Access Token 并无缝重新上传素材，无需人工干预重启。</p>
<p><b>🛡️ 防御性容错保护：</b>素材上传遇到网络故障或极端错误时优雅输出 Warning 日志，杜绝 <code>undefined is not iterable</code> 导致整个被动回复链路悬挂超时。</p>
</div>
</details>

<details style="${detailsStyle}; border-left: 5px solid #9c27b0;">
<summary style="${summaryStyle}"><b style="color: #9c27b0;">🔄 被动回复与主动客服消息模式选型</b></summary>
<div style="${detailsBodyStyle}">
<p><b>📥 被动回复模式（默认）：</b>用户发一条消息，Koishi 在 5 秒内返回一条被动 XML 响应。未认证订阅号只能使用此模式。</p>
<p><b>📤 主动客服消息模式（customerService: true）：</b>开启后，机器人通过客服接口异步主动推送消息，摆脱 5 秒被动限制，并支持在 48 小时互动窗口内连续向用户发送多条消息（仅限认证服务号/认证订阅号可用）。</p>
</div>
</details>

<details style="${detailsStyle}; border-left: 5px solid #e91e63;">
<summary style="${summaryStyle}"><b style="color: #e91e63;">🎉 在线体验公众号（我搞的可以私信搜索koishi插件的微信公众号捏~ ）</b></summary>
<div style="${detailsBodyStyle}">
<p>欢迎微信扫码体验本适配器实机驱动的公众号：<b><code>koishi的npm插件公众号</code></b></p>
<p style="text-align: center;">
  <img src="https://raw.githubusercontent.com/VincentZyuApps/koishi-plugin-adapter-wechat-official-vincentzyu-fork/main/docs/images/promote/qrcode_for_gh_adc966d1f11c_1280.jpg" alt="公众号二维码" style="width: 200px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
</p>
<p>• <b>🔍 指令搜插件：</b>在聊天框发送 <code>market.search &lt;关键词&gt;</code> 或 <code>market.hot</code>；</p>
<p>• <b>🚀 小程序直达：</b>点击回复链接直接唤起微信小程序查看插件详情；</p>
<p>• <b>🎙️ 多媒体交互：</b>发送 <code>fa 来</code> 测试语音条回复，发送 <code>fa.list</code> 测试图片素材下发。</p>
</div>
</details>
`
