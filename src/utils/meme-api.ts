import { UploadFile } from 'element-plus'
import { computed } from 'vue'

import { settings } from './settings'

export interface MemeParamArg {
  name: string
  type: string
  description: string | null
  default: string | null
  enum: string[] | null
}

export interface MemeParams {
  min_images: number
  max_images: number
  min_texts: number
  max_texts: number
  default_texts: string[]
  args: MemeParamArg[]
}

export interface MemeInfo {
  key: string
  keywords: string[]
  patterns: string[]
  params: MemeParams
}

export interface MemeGenerateParams {
  images: (UploadFile | null)[]
  texts: string[]
  args: Record<string, any>
}

export const memeErrorMessageMap: Record<number, string> = {
  531: 'no-such-meme',
  532: 'text-over-length',
  533: 'open-image-failed',
  534: 'parser-exit',
  541: 'image-number-mismatch',
  542: 'text-number-mismatch',
  543: 'text-or-name-not-enough',
  551: 'arg-parser-exit',
  552: 'arg-model-mismatch',
}

export class MemeRequestError extends Error {
  constructor(
    public status: number,
    public data: any
  ) {
    super(`Request failed with code ${status} (${memeErrorMessageMap[status]})`)
    this.name = 'MemeError'
  }
}

export class MemeGeneratorAPI {
  constructor(public baseURL: string) {}

  constructURL(endpoint: string) {
    return new URL(endpoint, this.baseURL)
  }

  async fetch(endpoint: string, init?: RequestInit) {
    const res = await fetch(this.constructURL(endpoint), init)
    if (!res.ok) {
      const raw = await res.text()
      let data
      try {
        data = JSON.parse(raw)
      } catch (e) {
        data = raw
      }
      throw new MemeRequestError(res.status, data)
    }
    return res
  }

  async getKeys() {
    const res = await this.fetch('/memes/keys')
    return (await res.json()) as string[]
  }

  async getInfo(key: string) {
    const res = await this.fetch(`/memes/${key}/info`)
    return (await res.json()) as MemeInfo
  }

  async getPreview(key: string) {
    const res = await this.fetch(`/memes/${key}/preview`)
    return await res.blob()
  }

  async generate(key: string, params: MemeGenerateParams) {
    const data = new FormData()
    params.images.forEach((file) => {
      if (file) data.append('images', file.raw!)
    })
    params.texts.forEach((text) => {
      data.append('texts', text)
    })
    if (params.args) data.append('args', JSON.stringify(params.args))
    const res = await this.fetch(`/memes/${key}/`, {
      method: 'POST',
      body: data,
    })
    return await res.blob()
  }
}

export const backend = computed(() => new MemeGeneratorAPI(settings.backendBaseURL))
