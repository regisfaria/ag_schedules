import { getRepository } from 'typeorm';

import Lead from '../models/Lead';

interface Request {
  name: string;
  email: string;
  dot: string;
  phoneNumber: string;
  companyName: string;
  primaryAddress: string;
  otherAddress: string;
  entityType: string;
  operatingStatus: string;
  mcs150FormDate: string;
  carrierOperation: string;
  cargoCarried: string;
  powerUnits: string;
  operationClassification: string;
}

export default class CreateProfileService {
  public async execute({
    name,
    email,
    dot,
    phoneNumber,
    companyName,
    primaryAddress,
    otherAddress,
    entityType,
    operatingStatus,
    mcs150FormDate,
    carrierOperation,
    cargoCarried,
    powerUnits,
    operationClassification,
  }: Request): Promise<Lead> {
    const leadRepository = getRepository(Lead);

    const lead = leadRepository.create({
      name,
      email,
      dot,
      phoneNumber,
      companyName,
      primaryAddress,
      otherAddress,
      entityType,
      operatingStatus,
      mcs150FormDate,
      carrierOperation,
      cargoCarried,
      powerUnits,
      operationClassification,
    });

    await leadRepository.save(lead);

    return lead;
  }
}
