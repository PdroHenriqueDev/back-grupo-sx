import { Request, Response } from 'express';
import { create, find, remove, update } from '../repository/Collaborator';

export class CollaboratorController {
    async new(request: Request, response: Response) {      
        const { body } = request;         
        const { httpCode, ...rest } = await create(body);
        return response.status(httpCode).json(rest);
    }

    async find(request: Request, response: Response) { 
        const { code } = request.query;      
        const { httpCode, ...rest } = await find(code as string);
        return response.status(httpCode).json(rest);
    }

    async update(request: Request, response: Response) {      
        const { code } = request.params;      
        const { body } = request;
        const { httpCode, ...rest } = await update(code as string, body );
        return response.status(httpCode).json(rest);
    }

    async delete(request: Request, response: Response) {
        const { code } = request.params;      
        const { httpCode, ...rest } = await remove(code as string);
        return response.status(httpCode).json(rest);
    }
}