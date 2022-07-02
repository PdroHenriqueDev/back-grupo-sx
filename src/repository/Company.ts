import  Response  from '../config/utils/response';
import { CompanyEntity } from '../entity/company';
import { getRepository } from 'typeorm';
import { ResponsePattern } from '../types/response';
import { CollaboratorEntity } from './../entity/collaborator';

const response = new Response();

export const create = async(body: CompanyEntity): Promise<ResponsePattern> => {
    if (!body) return  response.badRequest<null, string>(400, null, 'Requisição sem conteúdo!');

    const { cnpj, name, email, phone, address } = body;

    if (!cnpj || !name || !email || !phone || !address) {
        return response.badRequest<null, string>(400, null, 'Preencha todos os campos!');
    }

    const cnpjNumber = Number(cnpj);
    const phoneNumber = Number(phone);
    if (Number.isNaN(cnpjNumber) || !cnpjNumber) return response.badRequest<null, string>(400, null, 'Formato do cnpj inválido!');
    if (Number.isNaN(phoneNumber) || !phoneNumber) return response.badRequest<null, string>(400, null, 'Formato do número inválido!');

    const companyExists = await getRepository(CompanyEntity).findOne({
        where: {
            cnpj,
        }
    });
    if (companyExists) return response.badRequest<null, string>(400, null, 'Empresa já cadastrada!');

    try {
        const data = {
            cnpj,
            name,
            email,
            phone,
            address
        };
        
        await getRepository(CompanyEntity).save(data);

        return response.successfulRequest<string, null>(201, 'Nova empresa cadastrada!', null);
    } catch (error) {
        return response.error<string>(`Error: ${error}`);
    }
}

export const find = async(code?: string): Promise<ResponsePattern> => {
    const codeIsNumber = Number(code);
    if (code && Number.isNaN(code)) return  response.badRequest<null, string>(400, null, 'Formato do código inválido!');

    const data = code
        ? await getRepository(CompanyEntity).find({ where: { code: codeIsNumber } })
        : await getRepository(CompanyEntity).find();

    return response.successfulRequest<CompanyEntity | CompanyEntity[], null>(200, data, null);

}

export const update = async(code: string, body: CompanyEntity): Promise<ResponsePattern> => {
    const codeIsNumber = Number(code);
    if (!code || Number.isNaN(codeIsNumber)) return  response.badRequest<null, string>(
        400,
        null,
        !code ? 'Código inválido!' : 'Formato do código inválido!'
    );

    const { cnpj, name, email, phone, address } = body;

    if (!cnpj || !name || !email || !phone || !address) {
        return response.badRequest<null, string>(400, null, 'Preencha todos os campos!');
    }

    const cnpjNumber = Number(cnpj);
    const phoneNumber = Number(phone);
    if (Number.isNaN(cnpjNumber) || !cnpjNumber) return response.badRequest<null, string>(400, null, 'Formato do cnpj inválido!');
    if (Number.isNaN(phoneNumber) || !phoneNumber) return response.badRequest<null, string>(400, null, 'Formato do número inválido!');

    const companyExists = await getRepository(CompanyEntity).findOne({
        where: {
            code: codeIsNumber,
        }
    });

    if (!companyExists) return response.badRequest<null, string>(400, null, 'Empresa não existe!');

    const formattedEmail = email.toLocaleLowerCase();

    try {
        await getRepository(CompanyEntity).update(
            { code: codeIsNumber, },
            {
                cnpj,
                name,
                email: formattedEmail,
                phone,
                address,
            },
        );

        return response.successfulRequest<string, null>(200, `Empresa ${code} atualizada!`, null);
    } catch (error) {
        return response.error<string>(`Error: ${error}`)
    }
}

export const remove = async(code: string): Promise<ResponsePattern> => {
    const codeIsNumber = Number(code);
    if (Number.isNaN(codeIsNumber)) return  response.badRequest<null, string>(400, null, 'Formato do código inválido!');

    const companyExists = await getRepository(CompanyEntity).findOne({
        where: {
            code: codeIsNumber,
        }
    });
    
    if (!companyExists) return response.badRequest<null, string>(400, null, 'Empresa não existe!');

    const collaboratorRelation = await getRepository(CollaboratorEntity).findOne({
        where: {
            company_code: codeIsNumber,
        }
    });
    if (collaboratorRelation) return  response.badRequest<null, string>(400, null, 'Colaborador relacionado à empresa. Assim, não pode ser deletada!');

    try {
        await getRepository(CompanyEntity).delete(code);

        return response.successfulRequest<string, null>(200, `Empresa ${code} deletada!`, null);
    } catch (error) {
        return response.error<string>(`Error: ${error}`)
    }
}