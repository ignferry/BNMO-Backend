import lodash from "lodash";
import { Transaction } from "../db/models/Transaction";
import { User } from "../db/models/User";
import { TransactionCreationDto } from "../dtos/TransactionDto";
import { HttpException } from "../exceptions/HttpException";


export default class TransferService {
    public async findAllTransfers(page: number, pageSize: number) {
        const allRequests: Transaction[] = await Transaction.findAll({
            limit: pageSize,
            offset: page * pageSize,
            where: {
                type: 0
            }
        });

        return allRequests;
    }

    public async createTransfer(transfer: TransactionCreationDto, currentUser: User) {
        if (lodash.isEmpty(transfer)) throw new HttpException(400, "Request data is empty");
        if (!(transfer.sender_id && transfer.receiver_id)) throw new HttpException(400, "Sender and receiver id cannot be empty");
        if (transfer.sender_id == transfer.receiver_id) throw new HttpException(400, "sender and receiver cannot be the same");
        if (transfer.sender_id != currentUser.id) throw new HttpException(403, "Forbidden");

        await Transaction.create({ ...transfer, type: 1, status: 1 })
    }
}