import crypto from 'crypto'

const NEWPRODUCTID = parseInt(Math.random().toFixed(16).split('.')[1])

export enum Forms {
  newProduct = NEWPRODUCTID,
}
