interface Storage {
  load(itemName: string): any
  set(itemName: string, item: any, lifespan?: number): boolean
  has(itemName: string): boolean
  setLifespan(itemName: string, lifespan: number): boolean
}

interface StorageWrapper {
  local: Storage
  session: Storage
  developmentMode: () => void
}

export default StorageWrapper;
