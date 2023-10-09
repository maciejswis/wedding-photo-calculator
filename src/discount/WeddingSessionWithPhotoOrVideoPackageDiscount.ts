import { DiscountDefinition, DiscountInput } from "./DiscountDefinition";
import { PriceDefinition } from "../priceCalculator/PriceDefinition";
import { ServiceTypeName } from "../ServiceTypeName";

export class WeddingSessionWithPhotoOrVideoPackageDiscount extends DiscountDefinition {
    private readonly discountValue: PriceDefinition;
    
    constructor(input: DiscountInput) {
        super(input);
        this.discountValue = new PriceDefinition(300, "USD");
    }

    affectsService(service: ServiceTypeName): boolean {
        return service === "WeddingSession";
    }

    isApplicable(): boolean {
        return this.services.some(x => x === "WeddingSession")
            && (
                this.services.some(x => x === "VideoRecording")
                || this.services.some(x => x === "Photography")
            );
    }

    getPriceAfterDiscount(basePrice: PriceDefinition): PriceDefinition {
        return basePrice.minus(this.discountValue);
    }
}
