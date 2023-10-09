import { DiscountDefinition, DiscountInput } from "./DiscountDefinition";
import { ServiceTypeName } from "../ServiceTypeName";
import { PriceDefinition } from "../priceCalculator/PriceDefinition";

export class WeddingSessionWith22PhotographyDiscount extends DiscountDefinition {
    constructor(input: DiscountInput) {
        super(input); 
    }

    affectsService(service: ServiceTypeName): boolean {
        return service === "WeddingSession";
    }

    isApplicable(): boolean {
        return this.year === 2022 &&
            this.services.some(x => x === "WeddingSession") &&
            this.services.some(x => x === "Photography");
    }

    getPriceAfterDiscount(_: PriceDefinition): PriceDefinition {
        return new PriceDefinition(0, "USD");
    }
}