import { TypeGroup } from "@prisma/client";

export const types = () => {
	return [
		{
			description: "Armas de Fogo",
			group: TypeGroup.CATEGORY,
			children: {
				create: [
					{
						description: "Pistolas",
						group: TypeGroup.CATEGORY,
						children: {
							create: [
								{
									description: "Pistola Glock 9mm",
									group: TypeGroup.SUBCATEGORY,
								},
								{
									description: "Pistola Beretta 92",
									group: TypeGroup.SUBCATEGORY,
								},
							],
						},
					},
					{
						description: "Fuzis",
						group: TypeGroup.CATEGORY,
						children: {
							create: [
								{
									description: "Fuzil AR-15",
									group: TypeGroup.SUBCATEGORY,
								},
								{
									description: "Fuzil AK-47",
									group: TypeGroup.SUBCATEGORY,
								},
							],
						},
					},
					{
						description: "Espingardas",
						group: TypeGroup.CATEGORY,
						children: {
							create: [
								{
									description: "Espingarda Pump Calibre 12",
									group: TypeGroup.SUBCATEGORY,
								},
							],
						},
					},
					{
						description: "Submetralhadoras",
						group: TypeGroup.CATEGORY,
						children: {
							create: [
								{
									description: "Submetralhadora MP5",
									group: TypeGroup.SUBCATEGORY,
								},
							],
						},
					},
					{
						description: "Revólveres",
						group: TypeGroup.CATEGORY,
					},
					{
						description: "Metralhadoras",
							group: TypeGroup.CATEGORY,
					},
				],
			},
		},
		{
			description: "Chamada Pública",
			group: TypeGroup.OPPORTUNITY,
		},
	];
};
