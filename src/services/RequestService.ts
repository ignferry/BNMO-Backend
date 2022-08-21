import { Transaction } from "../db/models/Transaction";
import { User } from "../db/models/User";
import { TransactionCreationDto } from "../dtos/TransactionDto";
import lodash from "lodash";
import { HttpException } from "../exceptions/HttpException";
import { sequelizeConnection } from "../config/default";


export default class RequestService {
    public async findAllRequests(page: number, pageSize: number): Promise<Transaction[]> {
        const allRequests: Transaction[] = await Transaction.findAll({
            limit: pageSize,
            offset: page * pageSize,
            where: {
                type: 0
            }
        });

        return allRequests;
    }

    public async createRequest(request: TransactionCreationDto, currentUser: User): Promise<void> {
        if (lodash.isEmpty(request)) throw new HttpException(400, "Request data is empty");
        if (request.sender_id ? !request.receiver_id : request.receiver_id) throw new HttpException(400, "Exactly one id should be left null");
        if (request.receiver_id != currentUser.id && request.sender_id != currentUser.id) throw new HttpException(403, "Forbidden");

        await Transaction.create({ ...request, type: 0, status: 0 })
    }

    public async deleteRequest(requestId: number, currentUser: User) {
        const findRequest: Transaction | null = await Transaction.findOne({
            where: {
                id: requestId,
                type: 0
            }
        });
        if (!findRequest) {
            if (!currentUser.is_admin) throw new HttpException(403, "Forbidden");
            throw new HttpException(404, "Request not found");
        }
        if (!currentUser.is_admin 
            && currentUser.id != findRequest.sender_id 
            && currentUser.id != findRequest.receiver_id) throw new HttpException(403, "Forbidden");

        await Transaction.destroy({ where: { id: requestId } });
    }

    public async verifyRequest(requestId: number, status: number) {
        const request: Transaction | null = await Transaction.findOne({
            where: {
                id: requestId,
                type: 0
            }
        });
        if (!request) throw new HttpException(404, "Request not found");
        if (request.status != 0) throw new HttpException(405, "Request has been processed before");

        let errorMessage = "";

        if (status == 1) {
            // Request accepted
            try {
                await sequelizeConnection.transaction(async (t) => {
                    if (!request.receiver_id) {
                        // Request to subtract balance
                        errorMessage = "Sender with the corresponding Id not found";
                        const sender: User | null = await User.findByPk(request.sender_id, { transaction: t });
                        if (sender?.is_admin || !sender?.is_verified) throw 0;
    
                        errorMessage = "Not enough balance";
                        const senderBalance = sender?.balance;
                        if (!senderBalance) throw 0;
                        if (senderBalance < request.amount) throw 0;
                        await User.update({ balance: senderBalance-request.amount }, { where: {id: request.sender_id}, transaction: t });
                    } else {
                        // Request to add balance
                        errorMessage = "Receiver with the corresponding Id not found";
                        const receiver: User | null = await User.findByPk(request.receiver_id, { transaction: t });
                        if (receiver?.is_admin || !receiver?.is_verified) throw 0;
    
                        let receiverBalance = receiver.balance;
                        if (!receiverBalance) receiverBalance = 0;
                        await User.update({ balance: receiverBalance+request.amount }, { where: { id: receiver.id }, transaction: t });
                    }

                    Transaction.update({ status: 1 }, { where: { id: requestId } });
                });
            } catch {
                throw new HttpException(409, errorMessage);
            }
        }
        else {
            // Request declined
            await Transaction.update({ status: -1 }, { where: { id: requestId } });
        }
    }
}