import { CalculatorResult, DiscountDefinition, DiscountInput } from "./DiscountDefinition";
import { PriceDefinition } from "../PriceDefinition";
import { ServiceYear } from "../ServiceYear";

export class PhotoAndVideo20PackageDiscount extends DiscountDefinition {
    constructor(input: DiscountInput) {
        super(input);
    }

    private readonly discountValues: { [key in ServiceYear]: PriceDefinition } =
        {
            2020: new PriceDefinition(1200, "USD"),
            2021: new PriceDefinition(1300, "USD"),
            2022: new PriceDefinition(1300, "USD"),
        }

    isApplicable(): boolean {
        return this.services.some(x => x.name === "Photography") &&
            this.services.some(x => x.name === "VideoRecording");
    }

    getCalculationAfterDiscount(currentCalculations: CalculatorResult): CalculatorResult {
        const discount = this.getCurrentDiscount();
        const val = currentCalculations.basePrice.minus(discount);
        return {
            basePrice: val,
            finalPrice: val
        };
    }

    private getCurrentDiscount(): PriceDefinition {
        return this.discountValues[this.year] || new PriceDefinition(0, "USD");
    }
}