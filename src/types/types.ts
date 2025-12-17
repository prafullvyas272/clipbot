export type Plan = {
    id: string
    name: string
    description: string
    productId: string
    active: boolean
    image: string | null
    metadata: Record<string, any>
    createdAt: string | Date
    updatedAt: string | Date
  }
  