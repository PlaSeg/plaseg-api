import { z } from "zod";

export const createPriceRegistrationRecordItemSchema = z.object({
	specificProductId: z.string().uuid("ID do produto específico inválido"),
	unitValue: z.number({
		required_error: "Valor unitário é obrigatório",
		invalid_type_error: "Valor unitário deve ser um número",
	}),
	quantity: z.number({
		required_error: "Quantidade é obrigatória",
		invalid_type_error: "Quantidade deve ser um número",
	}),
	minAdherenceQuantity: z.number({
		required_error: "Quantidade mínima de adesão é obrigatória",
		invalid_type_error: "Quantidade mínima de adesão deve ser um número",
	}),
	maxAdherenceQuantity: z.number({
		required_error: "Quantidade máxima de adesão é obrigatória",
		invalid_type_error: "Quantidade máxima de adesão deve ser um número",
	}),
});

export const createPriceRegistrationRecordBodySchema = z.object({
	number: z.string().min(1, "Número é obrigatório"),
	publicAgency: z.string().min(1, "Órgão público é obrigatório"),
	year: z.number({
		required_error: "Ano é obrigatório",
		invalid_type_error: "Ano deve ser um número",
	}),
	effectiveDate: z.coerce.date({
		required_error: "Data de vigência é obrigatória",
		invalid_type_error: "Data de vigência inválida",
	}),
	status: z.string().min(1, "Status é obrigatório"),
	items: z
		.array(createPriceRegistrationRecordItemSchema)
		.min(1, "Pelo menos um item é obrigatório"),
});

export const priceRegistrationRecordItemResponseSchema = z.object({
	id: z.string().uuid(),
	priceRegistrationRecordId: z.string().uuid(),
	specificProductId: z.string().uuid(),
	unitValue: z.number(),
	quantity: z.number(),
	minAdherenceQuantity: z.number(),
	maxAdherenceQuantity: z.number(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable(),
});

export const priceRegistrationRecordResponseSchema = z.object({
	id: z.string().uuid(),
	number: z.string(),
	publicAgency: z.string(),
	year: z.number(),
	effectiveDate: z.coerce.date(),
	status: z.string(),
	userId: z.string().uuid(),
	items: z.array(priceRegistrationRecordItemResponseSchema),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date().nullable(),
});

export const getPriceRegistrationRecordsResponseSchema = z.object({
	priceRegistrationRecords: z
		.array(priceRegistrationRecordResponseSchema)
		.nullable(),
});
