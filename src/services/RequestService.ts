import { Transaction } from "../db/models/Transaction";
import { User } from "../db/models/User";
import { TransactionCreationDto } from "../dtos/TransactionDto";
import lodash from "lodash";
import { HttpException } from "../exceptions/HttpException";


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
        const findRequest: Transaction | null = await Transaction.findOne({
            where: {
                id: requestId,
                type: 0
            }
        });
        if (!findRequest) throw new HttpException(404, "Request not found");
        if (findRequest.status != 0) throw new HttpException(405, "Request has been processed before");

        await Transaction.update({ status: status }, { where: { id: requestId } });
    }
}