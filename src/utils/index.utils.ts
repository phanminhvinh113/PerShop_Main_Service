import _ from 'lodash'
import { Types } from 'mongoose'
//
export const getInfoData = (fields: any, object: object = {}) => {
   return _.pick(object, fields)
}
export const getSelectData = (select: string[] = []) => {
   return Object.fromEntries(select.map((el) => [el, 1]))
}
export const unGetSelectData = (select: string[] = []) => {
   return Object.fromEntries(select.map((el) => [el, 0]))
}
export const removeAllElementUnknown = (obj: object) => {
   return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined))
}

export const convertToObjectId = (idString: string): Types.ObjectId => {
   return new Types.ObjectId(idString)
}
