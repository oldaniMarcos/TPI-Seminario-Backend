import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository
    .createQueryBuilder('client')
    .loadRelationCountAndMap(
      'client.petsCount',
      'client.pets'
    )
    .getMany()
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['pets'],
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    await this.findOne(id);
    await this.clientRepository.update(id, updateClientDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.delete(client.id);
  }

  async updateState(id: number, state: 'alta' | 'baja') {
    await this.clientRepository.update(id, { state });

    return this.clientRepository
      .createQueryBuilder('client')
      .loadRelationCountAndMap(
        'client.petsCount',
        'client.pets'
      )
      .where('client.id = :id', { id })
      .getOne();
  }

  async findAllPastDue(): Promise<any> {
    const rows = await this.clientRepository
    .createQueryBuilder('client')
    .innerJoin('client.pets', 'pet')
    .innerJoin('pet.visits', 'visit')
    .innerJoin('visit.installments', 'installment')
    .select([
      'client.id AS clientId',
      'client.fullName AS fullName',
      'client.docType AS docType',
      'client.docNum AS docNum',
      'client.phone AS phone',
      'client.state AS state',
      'installment.id AS installmentId',
      "DATE_FORMAT(installment.dueDate, '%Y-%m-%d') AS dueDate",
      'installment.amount AS amount',
      'installment.payDate AS payDate',
    ])
    .where('installment.payDate IS NULL')
    .andWhere('installment.dueDate < CURDATE()')
    .getRawMany();

    const result = Object.values(
      rows.reduce((acc, row) => {
        const id = row.clientId;

        if (!acc[id]) {
          acc[id] = {
            id,
            fullName: row.fullName,
            docType: row.docType,
            docNum: row.docNum,
            phone: row.phone,
            state: row.state,
            installments: []
          };
        }

        acc[id].installments.push({
          id: row.installmentId,
          dueDate: row.dueDate,
          amount: row.amount,
          payDate: row.payDate
        });

        return acc;
      }, {})
    );

    return result;
  }

  async updateStateInstallment(id: number, state: 'alta' | 'baja') {
    await this.clientRepository.update(id, { state });

    const rows = await this.clientRepository
    .createQueryBuilder('client')
    .innerJoin('client.pets', 'pet')
    .innerJoin('pet.visits', 'visit')
    .innerJoin('visit.installments', 'installment')
    .select([
      'client.id AS clientId',
      'client.fullName AS fullName',
      'client.docType AS docType',
      'client.docNum AS docNum',
      'client.phone AS phone',
      'client.state AS state',
      'installment.id AS installmentId',
      "DATE_FORMAT(installment.dueDate, '%Y-%m-%d') AS dueDate",
      'installment.amount AS amount',
      'installment.payDate AS payDate',
    ])
    .where('installment.payDate IS NULL')
    .andWhere('installment.dueDate < CURDATE()')
    .andWhere('client.id = :id', { id })
    .getRawMany();

    const result = Object.values(
      rows.reduce((acc, row) => {
        const id = row.clientId;

        if (!acc[id]) {
          acc[id] = {
            id,
            fullName: row.fullName,
            docType: row.docType,
            docNum: row.docNum,
            phone: row.phone,
            state: row.state,
            installments: []
          };
        }

        acc[id].installments.push({
          id: row.installmentId,
          dueDate: row.dueDate,
          amount: row.amount,
          payDate: row.payDate
        });

        return acc;
      }, {})
    );

    return result[0];
  }

  async findByDoc(docType: string, docNum: string): Promise<any | null> {

    // 1) Buscar cliente primero
    const client = await this.clientRepository.findOne({
      where: { docType, docNum },
    });

    if (!client) return null;  // ← Cliente inexistente

    // 2) Buscar cuotas del cliente
    const rows = await this.clientRepository
      .createQueryBuilder('client')
      .leftJoin('client.pets', 'pet')
      .leftJoin('pet.visits', 'visit')
      .leftJoin('visit.installments', 'installment')
      .select([
        'client.id AS clientId',
        'client.fullName AS fullName',
        'client.docType AS docType',
        'client.docNum AS docNum',
        'client.phone AS phone',
        'client.state AS state',
        'installment.id AS installmentId',
        "DATE_FORMAT(installment.dueDate, '%Y-%m-%d') AS dueDate",
        'installment.amount AS amount',
        'installment.payDate AS payDate',
      ])
      .where('client.docType = :docType', { docType })
      .andWhere('client.docNum = :docNum', { docNum })
      .andWhere('installment.payDate IS NULL')     // cuotas impagas
      .getRawMany();

    // 3) Si no tiene cuotas impagas → devolver installments = null
    if (rows.length === 0) {
      return {
        id: client.id,
        fullName: client.fullName,
        docType: client.docType,
        docNum: client.docNum,
        phone: client.phone,
        state: client.state,
        installments: null
      };
    }

    // 4) Agrupar cuotas
    const result = {
      id: rows[0].clientId,
      fullName: rows[0].fullName,
      docType: rows[0].docType,
      docNum: rows[0].docNum,
      phone: rows[0].phone,
      state: rows[0].state,
      installments: rows.map(r => ({
        id: r.installmentId,
        dueDate: r.dueDate,
        amount: r.amount,
        payDate: r.payDate,
      }))
    };

    return result;
  }



}
