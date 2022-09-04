import { Transaction } from "../db/models/Transaction";
import { User } from "../db/models/User";
import { HttpException } from "../exceptions/HttpException";


export default class TransactionService {
    /**
     * Returns transaction with the specified id.
     * Only admin or users related to the transaction can access.
     * @param {number} transactionId 
     * @param {User} user 
     * @returns {Transaction}   
     */
    public async findTransactionById(transactionId: number, user: User): Promise<Transaction> {
        const findTransaction: Transaction | null = await Transaction.findByPk(transactionId, {
            include: [
                {
                    model: User,
                    as: "sender",
                    attributes: ["id", "username", "name"]
                },
                {
                    model: User,
                    as: "receiver",
                    attributes: ["id", "username", "name"]
                }
            ],
            attributes: {
                exclude: ["sender_id", "receiver_id"]
            }
        });

        if (!findTransaction) {
            if (user.is_admin) {
                throw new HttpException(404, "Transaction not found");
            }
            else {
                throw new HttpException(403, "Forbidden");
            }
        }

        if (findTransaction.sender?.id != user.id && findTransaction.receiver?.id != user.id && !user.is_admin) {
            throw new HttpException(403, "Forbidden");
        }

        return findTransaction;
    }
}