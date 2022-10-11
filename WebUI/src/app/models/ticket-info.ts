import { ITable } from './table';
import { IUser } from './user';
export interface ITicketInfo {
    createdAt: Date,
    customer_address: String,
    customer: IUser,
    customer_phone: String,
    id: Number,
    payment_date: Date | any,
    received_date: Date
    table: ITable,
    type_party: any,
    updatedAt: Date
}
