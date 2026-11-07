import { Message } from './types'
import { WechatOfficialBot } from './bot'
import { Context, h } from '@satorijs/core'

export async function decodeMessage<C extends Context>(bot: WechatOfficialBot<C>, message: Message) {
  const session = bot.session()
  // https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html
  session.timestamp = message.CreateTime * 1000
  session.wechatOfficial = message
  session.userId = message.FromUserName
  session.channelId = session.userId
  // session.guildId = session.userId
  session.messageId = message.MsgId
  if (message.MsgType === 'text') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h.text(message.Content)]
    return session
  } else if (message.MsgType === 'image') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h.image(message.PicUrl)]
    return session
  } else if (message.MsgType === 'voice') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h.audio(bot.$toMediaUrl(message.MediaId))]
    // https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/Get_temporary_materials.html
    return session
  } else if (message.MsgType === 'video') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h.video(bot.$toMediaUrl(message.MediaId))]
    // const { video_url } = await bot.getMedia(message.MediaId)
    // session.elements = [h.video(video_url)]
    return session
  } else if (message.MsgType === 'location') {
    session.isDirect = true
    session.type = 'message'
    session.elements = [h('wechat-official:location', {
      latitude: message.Location_X,
      longitude: message.Location_Y,
      label: message.Label,
    })]
    return session
  } else if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      session.type = 'friend-added'
      return session
    } else if (message.Event === 'unsubscribe') {
      session.type = 'friend-deleted'
      return session
    }
  }
}

/**
 * 将 PCM WAV 格式数据转码为标准 MP3 Buffer (使用内置 @breezystack/lamejs 纯 JS 编码器)
 */
export async function transcodeWavToMp3(data: ArrayBuffer | Buffer): Promise<Buffer> {
  const { Mp3Encoder, WavHeader } = await import('@breezystack/lamejs')
  const arrayBuffer = Buffer.isBuffer(data)
    ? data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
    : data

  const dataView = new DataView(arrayBuffer)
  const wav = (WavHeader as any).readHeader(dataView)

  if (!wav || !wav.channels || !wav.sampleRate) {
    throw new Error('Invalid WAV file header')
  }

  const sampleCount = Math.floor(wav.dataLen / 2)
  const samples = new Int16Array(arrayBuffer, wav.dataOffset, sampleCount)
  const encoder = new Mp3Encoder(wav.channels, wav.sampleRate, 128)
  const mp3Chunks: Buffer[] = []

  if (wav.channels === 1) {
    const chunk = encoder.encodeBuffer(samples)
    if (chunk.length > 0) mp3Chunks.push(Buffer.from(chunk))
  } else if (wav.channels === 2) {
    const half = Math.floor(sampleCount / 2)
    const left = new Int16Array(half)
    const right = new Int16Array(half)
    for (let i = 0; i < half; i++) {
      left[i] = samples[i * 2]
      right[i] = samples[i * 2 + 1]
    }
    const chunk = encoder.encodeBuffer(left, right)
    if (chunk.length > 0) mp3Chunks.push(Buffer.from(chunk))
  } else {
    throw new Error(`Unsupported WAV channels: ${wav.channels}`)
  }

  const endChunk = encoder.flush()
  if (endChunk.length > 0) mp3Chunks.push(Buffer.from(endChunk))

  return Buffer.concat(mp3Chunks)
}

/**
 * 尝试通过 Koishi 运行时上下文中的 ffmpeg 服务将音频转码为 MP3 Buffer
 */
export async function transcodeAudioWithFfmpeg(ctx: Context, data: ArrayBuffer | Buffer): Promise<Buffer> {
  const ffmpeg = ctx.get('ffmpeg' as any)
  if (!ffmpeg || typeof ffmpeg.builder !== 'function') {
    throw new Error('ffmpeg service is not available or does not support builder()')
  }
  const inputBuf = Buffer.isBuffer(data) ? data : Buffer.from(data)
  return await ffmpeg
    .builder()
    .input(inputBuf)
    .outputOption('-ac', '1', '-ar', '44100', '-b:a', '128k', '-f', 'mp3')
    .run('buffer')
}
