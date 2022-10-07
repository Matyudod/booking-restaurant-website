import { IFood } from './food';
export interface ICartItem {
    quantity: Number,
    ticket_id: Number,
    food: IFood
}
