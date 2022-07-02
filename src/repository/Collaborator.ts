import  Response  from '../config/utils/response';
import { getRepository } from 'typeorm';
import { ResponsePattern } from '../types/response';
import { CollaboratorEntity } from './../entity/collaborator';
import { CompanyEntity } from '../entity/company';

const response = new Response();

export const create = async(body: CollaboratorEntity): Promise<ResponsePattern> => {
    if (!body) return  response.badRequest<null, string>(400, null, 'Requisição sem conteúdo!');
    console.log(body);
    
    const { cpf, name, email, phone, address, company_code } = body;

    if (!cpf || !name || !email || !phone || !address || !company_code) {
        return response.badRequest<null, string>(400, null, 'Preencha todos os campos!');
    }

    const cpfjNumber = Number(cpf);
    const phoneNumber = Number(phone);
    const companyCodeNumber = Number(company_code);
    if (Number.isNaN(cpfjNumber) || !cpfjNumber) return response.badRequest<null, string>(400, null, 'Formato do cpf inválido!');
    if (Number.isNaN(phoneNumber) || !phoneNumber) return response.badRequest<null, string>(400, null, 'Formato do número inválido!');
    if (Number.isNaN(companyCodeNumber) || !companyCodeNumber) return response.badRequest<null, string>(400, null, 'Formato do código da empresa inválido!');

    const collaboratorExists = await getRepository(CollaboratorEntity).findOne({
        where: {
            cpf,
        }
    });
    if (collaboratorExists) return response.badRequest<null, string>(400, null, 'Colaborador já cadastrado!');

    const companyExists = await getRepository(CompanyEntity).findOne({
        where: {
            code: companyCodeNumber,
        }
    });
    if (!companyExists) return response.badRequest<null, string>(400, null, 'Empresa não existe!');

    try {
        const data = {
            cpf,
            name,
            email,
            phone,
            address,
             company_code,
        };
        
        await getRepository(CollaboratorEntity).save(data);

        return response.successfulRequest<string, null>(201, 'Novo colaborador cadastrado!', null);
    } catch (error) {
        return response.error<string>(`Error: ${error}`);
    }
}

export const find = async(code?: string): Promise<ResponsePattern> => {
    const codeIsNumber = Number(code);
    if (code && Number.isNaN(code)) return  response.badRequest<null, string>(400, null, 'Formato do código inválido!');
    
    const data = code
        ? await getRepository(CollaboratorEntity).find({ 
            where: { code: codeIsNumber },
            relations: ['company_code']
        })
        : await getRepository(CollaboratorEntity).find({
            relations: ['company_code']
        });

    return response.successfulRequest<CollaboratorEntity | CollaboratorEntity[], null>(200, data, null);

}

export const update = async(code: string, body: CollaboratorEntity): Promise<ResponsePattern> => {
    const codeIsNumber = Number(code);
    if (!code || Number.isNaN(codeIsNumber)) return  response.badRequest<null, string>(
        400,
        null,
        !code ? 'Código inválido!' : 'Formato do código inválido!'
    );

    const { cpf, name, email, phone, address, company_code } = body;

    if (!cpf || !name || !email || !phone || !address || !company_code) {
        return response.badRequest<null, string>(400, null, 'Preencha todos os campos!');
    }

    const cpfNumber = Number(cpf);
    const phoneNumber = Number(phone);
    const companyCodeNumber = Number(company_code);
    if (Number.isNaN(cpfNumber) || !cpfNumber) return response.badRequest<null, string>(400, null, 'Formato do cnpj inválido!');
    if (Number.isNaN(phoneNumber) || !phoneNumber) return response.badRequest<null, string>(400, null, 'Formato do número inválido!');
    if (Number.isNaN(companyCodeNumber) || !companyCodeNumber) return response.badRequest<null, string>(400, null, 'Formato do código da empresa inválido!');

    const companyExists = await getRepository(CompanyEntity).findOne({
        where: {
            code: companyCodeNumber,
        }
    });
    if (!companyExists) return response.badRequest<null, string>(400, null, 'Empresa não existe!');

    const formattedEmail = email.toLocaleLowerCase();

    try {
        await getRepository(CollaboratorEntity).update(
            { code: codeIsNumber, },
            {
                cpf,
                name,
                email: formattedEmail,
                phone,
                address,
                company_code,
            },
        );

        return response.successfulRequest<string, null>(200, `Colaborador ${code} atualizado!`, null);
    } catch (error) {
        return response.error<string>(`Error: ${error}`)
    }
}

export const remove = async(code: string): Promise<ResponsePattern> => {
    const codeIsNumber = Number(code);
    if (Number.isNaN(codeIsNumber)) return  response.badRequest<null, string>(400, null, 'Formato do código inválido!');

    const collaboratorExists = await getRepository(CollaboratorEntity).findOne({
        where: {
            code: codeIsNumber,
        }
    });
    if (!collaboratorExists) return response.badRequest<null, string>(400, null, 'Colaborador não existe!');

    try {
        await getRepository(CollaboratorEntity).delete(code);

        return response.successfulRequest<string, null>(200, `Colaborador ${code} deletada!`, null);
    } catch (error) {
        return response.error<string>(`Error: ${error}`)
    }
}