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

export interface MemeGenerateParams {}

export class MemeGeneratorAPI {
  constructor(public baseURL: string) {}

  constructURL(endpoint: string) {
    return new URL(endpoint, this.baseURL)
  }

  async getKeys() {
    const res = await fetch(this.constructURL('/memes/keys'))
    return (await res.json()) as string[]
  }

  async getInfo(key: string) {
    const res = await fetch(this.constructURL(`/memes/${key}/info`))
    return (await res.json()) as MemeInfo
  }

  async getPreview(key: string) {
    const res = await fetch(this.constructURL(`/memes/${key}/preview`))
    return await res.blob()
  }
}

export const backend = computed(() => new MemeGeneratorAPI(settings.backendBaseURL))
