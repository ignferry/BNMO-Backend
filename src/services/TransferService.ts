import lodash from "lodash";
import { sequelizeConnection } from "../config/default";
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
            },
            attributes: {
                exclude: ["type"]
            }
        });

        return allRequests;
    }

    public async createTransfer(transfer: TransactionCreationDto, currentUser: User) {
        if (lodash.isEmpty(transfer)) throw new HttpException(400, "Request data is empty");
        if (!(transfer.sender_id && transfer.receiver_id)) throw new HttpException(400, "Sender and receiver id cannot be empty");
        if (transfer.sender_id == transfer.receiver_id) throw new HttpException(400, "Sender and receiver cannot be the same");
        if (transfer.sender_id != currentUser.id) throw new HttpException(403, "Forbidden");

        let errorMessage = "";

        try {
            await sequelizeConnection.transaction(async (t) => {
                errorMessage = "Sender with the corresponding Id not found";
                const sender: User | null = await User.findByPk(transfer.sender_id, { transaction: t });
                if (sender?.is_admin || !sender?.is_verified) throw 0;
    
                errorMessage = "Receiver with the corresponding Id not found";
                const receiver: User | null = await User.findByPk(transfer.receiver_id, { transaction: t });
                if (receiver?.is_admin || !receiver?.is_verified) throw 0;

                errorMessage = "Not enough balance";
                const senderBalance = sender?.balance;
                if (!senderBalance) throw 0;
                if (senderBalance < transfer.amount) throw 0;
                await User.update({ balance: senderBalance-transfer.amount }, { where: {id: transfer.sender_id} , transaction: t});

                errorMessage = "Transfer error";
                let receiverBalance = receiver?.balance;
                if (!receiverBalance) receiverBalance = 0;
                await User.update({ balance: receiverBalance+transfer.amount }, { where: { id: transfer.receiver_id }, transaction: t });

                await Transaction.create({ ...transfer, type: 1, status: 1 });
            });
        } catch {
            throw new HttpException(409, errorMessage);
        }
    }
}