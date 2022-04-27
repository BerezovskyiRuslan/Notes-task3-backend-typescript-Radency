import { Types } from 'mongoose'

export interface ITokenModel {
    _id?: string,
    userId: { type: typeof Types.ObjectId, ref: string } | string,
    refreshToken: string
}

export interface ITokenData {
    _id?: string,
    userId?: string,
    refreshToken: string
}