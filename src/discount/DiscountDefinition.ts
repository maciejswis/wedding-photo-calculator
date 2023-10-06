import { PriceDefinition } from "../PriceDefinition";
import { ServiceType } from "../ServiceType";
import { ServiceYear } from "../ServiceYear";

export type DiscountInput = {
    services: ServiceType[],
    year: ServiceYear
}

export type CalculatorResult = {
    basePrice: PriceDefinition,
    finalPrice: PriceDefinition
}

export abstract class DiscountDefinition {
    readonly services: ServiceType[];
    readonly year: ServiceYear;
    
    constructor(input: DiscountInput) {
        this.services = input.services;
        this.year = input.year;
    }

    abstract isApplicable(): boolean;
    abstract getCalculationAfterDiscount(currentResult: CalculatorResult): CalculatorResult;
}

