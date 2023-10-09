import { PriceDefinition } from "../priceCalculator/PriceDefinition";
import { ServiceTypeName } from "../ServiceTypeName";
import { ServiceYear } from "../ServiceYear";

export type DiscountInput = {
    services: ServiceTypeName[],
    year: ServiceYear,
}

export type CalculatorResult = {
    basePrice: PriceDefinition,
    finalPrice: PriceDefinition
}

export abstract class DiscountDefinition {
    readonly services: ServiceTypeName[];
    readonly year: ServiceYear;

    constructor(input: DiscountInput) {
        this.services = input.services;
        this.year = input.year;
    }

    abstract affectsService(service: ServiceTypeName): boolean;
    abstract isApplicable(): boolean;
    abstract getPriceAfterDiscount(basePrice: PriceDefinition): PriceDefinition;
}

