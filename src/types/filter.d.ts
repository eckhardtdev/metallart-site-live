export type DatasourceFilter = {
  type: 'select' | 'toggle'
  name: string
  label: string
  value?: string
  advanced?: boolean
  options?: {
    label?: string
    value: string | boolean | number | null
    id: string
  }[]
}
