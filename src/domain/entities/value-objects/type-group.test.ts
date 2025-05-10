import { describe, it, expect } from "vitest";
import { TypeGroup, DomainTypeGroup } from "./type-group";

describe("TypeGroup Value Object", () => {
	describe("create", () => {
		it("should create a valid type group", () => {
			const typeGroup = TypeGroup.create(DomainTypeGroup.SERVICE);
			expect(typeGroup.toString()).toBe(DomainTypeGroup.SERVICE);
		});

		it("should throw error for invalid type group", () => {
			expect(() => TypeGroup.create("INVALID_GROUP")).toThrow(
				"Invalid type group."
			);
		});
	});

	describe("static methods", () => {
		it("should create service type group", () => {
			const typeGroup = TypeGroup.service();
			expect(typeGroup.toString()).toBe(DomainTypeGroup.SERVICE);
		});

		it("should create category type group", () => {
			const typeGroup = TypeGroup.category();
			expect(typeGroup.toString()).toBe(DomainTypeGroup.CATEGORY);
		});

		it("should create subcategory type group", () => {
			const typeGroup = TypeGroup.subcategory();
			expect(typeGroup.toString()).toBe(DomainTypeGroup.SUBCATEGORY);
		});

		it("should create subsubcategory type group", () => {
			const typeGroup = TypeGroup.subsubcategory();
			expect(typeGroup.toString()).toBe(DomainTypeGroup.SUBSUBCATEGORY);
		});

		it("should create opportunity type group", () => {
			const typeGroup = TypeGroup.opportunity();
			expect(typeGroup.toString()).toBe(DomainTypeGroup.OPPORTUNITY);
		});
	});

	describe("toPrisma", () => {
		it("should convert service to prisma type group", () => {
			const typeGroup = TypeGroup.service();
			expect(typeGroup.toPrisma()).toBe("SERVICE");
		});

		it("should convert category to prisma type group", () => {
			const typeGroup = TypeGroup.category();
			expect(typeGroup.toPrisma()).toBe("CATEGORY");
		});

		it("should convert subcategory to prisma type group", () => {
			const typeGroup = TypeGroup.subcategory();
			expect(typeGroup.toPrisma()).toBe("SUBCATEGORY");
		});

		it("should convert subsubcategory to prisma type group", () => {
			const typeGroup = TypeGroup.subsubcategory();
			expect(typeGroup.toPrisma()).toBe("SUBSUBCATEGORY");
		});

		it("should convert opportunity to prisma type group", () => {
			const typeGroup = TypeGroup.opportunity();
			expect(typeGroup.toPrisma()).toBe("OPPORTUNITY");
		});
	});

	describe("toString", () => {
		it("should return the type group string value", () => {
			const typeGroup = TypeGroup.create(DomainTypeGroup.SERVICE);
			expect(typeGroup.toString()).toBe(DomainTypeGroup.SERVICE);
		});
	});
});
