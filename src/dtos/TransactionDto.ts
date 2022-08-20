export class TransactionCreationDto {
    constructor(
        public sender_id: number,
        public receiver_id: number,
        public amount: number,
    ) {};
}