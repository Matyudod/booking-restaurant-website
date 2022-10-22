import { ITable } from './table';
import { IUser } from './user';
import { IComment } from './comment';
import { IBill } from './bill';
export interface ITicketInfo {
    createdAt: Date,
    customer_address: String,
    customer: IUser,
    comment: IComment,
    customer_phone: String,
    status: Number,
    id: Number,
    bill: IBill,
    feedback: any,
    payment_date: Date | any,
    received_date: Date
    table: ITable,
    type_party: any,
    updatedAt: Date
}
