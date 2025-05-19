import { PriceRegistrationRecord } from "../../../../domain/entities/price-registration-record";
import { PriceRegistrationRecordsRepository } from "../../../../domain/repositories/price-registration-records-repository";
import { PrismaPriceRegistrationRecordMapper } from "../mappers/prisma-price-registration-record-mapper";
import { prisma } from "../prisma";

export class PrismaPriceRegistrationRecordsRepository
	implements PriceRegistrationRecordsRepository
{
	async findById(id: string): Promise<PriceRegistrationRecord | null> {
		const record = await prisma.priceRegistrationRecord.findUnique({
			where: {
				id,
			},
			include: {
				priceRegistrationRecordItems: true,
			},
		});

		if (!record) {
			return null;
		}

		return PrismaPriceRegistrationRecordMapper.toDomain(record);
	}

	async findMany(): Promise<PriceRegistrationRecord[] | null> {
		const records = await prisma.priceRegistrationRecord.findMany({
			include: {
				priceRegistrationRecordItems: true,
			},
		});

		if (records.length === 0) {
			return null;
		}

		return records.map(PrismaPriceRegistrationRecordMapper.toDomain);
	}

	async findByNumber(number: string): Promise<PriceRegistrationRecord | null> {
		const record = await prisma.priceRegistrationRecord.findUnique({
			where: {
				number,
			},
			include: {
				priceRegistrationRecordItems: true,
			},
		});

		if (!record) {
			return null;
		}

		return PrismaPriceRegistrationRecordMapper.toDomain(record);
	}

	async findByPublicAgency(
		publicAgency: string
	): Promise<PriceRegistrationRecord[] | null> {
		const records = await prisma.priceRegistrationRecord.findMany({
			where: {
				publicAgency,
			},
			include: {
				priceRegistrationRecordItems: true,
			},
		});

		if (records.length === 0) {
			return null;
		}

		return records.map(PrismaPriceRegistrationRecordMapper.toDomain);
	}

	async findByUserId(userId: string): Promise<PriceRegistrationRecord | null> {
		const record = await prisma.priceRegistrationRecord.findUnique({
			where: {
				userId,
			},
			include: {
				priceRegistrationRecordItems: true,
			},
		});

		if (!record) {
			return null;
		}

		return PrismaPriceRegistrationRecordMapper.toDomain(record);
	}

	async create(record: PriceRegistrationRecord): Promise<void> {
		const data = PrismaPriceRegistrationRecordMapper.toPrisma(record);

		await prisma.priceRegistrationRecord.create({
			data,
		});
	}

	async update(record: PriceRegistrationRecord): Promise<void> {
		const data = PrismaPriceRegistrationRecordMapper.toPrisma(record);

		await prisma.priceRegistrationRecord.update({
			where: {
				id: record.id.toString(),
			},
			data,
		});
	}
}
