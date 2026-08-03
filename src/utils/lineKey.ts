export const DEFAULT_VARIANT_ID = 'default'

export function lineKey(productId: string, variantId: string = DEFAULT_VARIANT_ID) {
  return `${productId}:${variantId}`
}

export function parseLineKey(key: string): { productId: string; variantId: string } {
  const [productId, variantId] = key.split(':')
  return { productId, variantId }
}
