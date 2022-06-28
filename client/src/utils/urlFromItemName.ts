/**
 *
 * @param productName
 * @returns A URL friendly string where spaces are replaces by hypens
 */

export const urlFromItemName = (productName: string, id: string) => {
  const parsedProductName = productName.replace(/\W/g, ' ').replace(/\s+/g, '-')
  const parsedId = id.slice(id.length - 4, id.length)

  return `${parsedProductName}-${parsedId}`
}
