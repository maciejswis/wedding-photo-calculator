import { CalculatorResult, DiscountDefinition, DiscountInput } from "./DiscountDefinition";
import { PriceCalculator } from "../PriceCalculator";
import { ServiceTypeName } from "../ServiceTypeName";
 

export class WeddingSessionWith22PhotographyDiscount extends DiscountDefinition {
    constructor(input: DiscountInput) {
        super(input);
    }

    private readonly weddingSessionName: ServiceTypeName = "WeddingSession";
    
    isApplicable(): boolean {
        return this.year === 2022 &&
            this.services.some(x => x.name === "WeddingSession") && 
            this.services.some(x => x.name === "Photography");
    }

    getCalculationAfterDiscount(result: CalculatorResult): CalculatorResult { 
        var weddingSessionPrice = PriceCalculator.getBasePrice(this.weddingSessionName, this.year);
        return {
            basePrice: result.basePrice,
            finalPrice: result.basePrice.minus(weddingSessionPrice)
        };
    }
}