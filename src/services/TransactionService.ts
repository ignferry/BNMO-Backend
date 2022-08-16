import { Transaction } from "../db/models/Transaction";
import { HttpException } from "../exceptions/HttpException";


export default class TransactionService {
    public async findTransactionById(transactionId: number): Promise<Transaction> {
        const findTransaction: Transaction | null = await Transaction.findByPk(transactionId);
        if (!findTransaction) throw new HttpException(409, "User not found");

        return findTransaction;
    }
}