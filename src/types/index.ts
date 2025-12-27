export interface CoverLetterRequest {
  type: 'url' | 'description'
  url?: string
  title?: string
  description?: string
  resumeContent?: string
}

export interface UrlTabData {
  type: 'url'
  url: string
  resumeContent?: string
}

export interface DescriptionTabData {
  type: 'description'
  title: string
  description: string
}
