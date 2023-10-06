import { CalculatorResult, DiscountDefinition, DiscountInput } from "./DiscountDefinition";
import { PriceDefinition } from "../PriceDefinition";

export class WeddingSessionWithPhotoOrVideoPackageDiscount extends DiscountDefinition {
    constructor(input: DiscountInput) {
        super(input);
    }
    
    private readonly discountValue = new PriceDefinition(300, "USD");

    isApplicable(): boolean {
        return this.services.some(x => x.name === "WeddingSession")
            && (
                this.services.some(x => x.name === "VideoRecording")
                || this.services.some(x => x.name === "Photography")
            );

    }

    getCalculationAfterDiscount(result: CalculatorResult): CalculatorResult { 
        return {
            basePrice: result.basePrice,
            finalPrice: result.basePrice.minus(this.discountValue)
        };
    }
}
