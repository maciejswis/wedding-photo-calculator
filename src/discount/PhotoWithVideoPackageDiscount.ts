import { DiscountDefinition, DiscountInput } from "./DiscountDefinition";
import { ServiceYear } from "../ServiceYear";
import { ServiceTypeName } from "../ServiceTypeName";
import { PriceDefinition } from "../priceCalculator/PriceDefinition";

export class PhotoWithVideoPackageDiscount extends DiscountDefinition {
    constructor(input: DiscountInput) {
        super(input);
    }

    private readonly discountValues: {
        [key in ServiceYear]: PriceDefinition;
    } = {
            2020: new PriceDefinition(600, "USD"),
            2021: new PriceDefinition(650, "USD"),
            2022: new PriceDefinition(650, "USD"),
        };

    affectsService(service: ServiceTypeName): boolean {
        return service === "Photography";
    }

    isApplicable(): boolean {
        return this.services.some(x => x === "Photography") &&
            this.services.some(x => x === "VideoRecording");
    }

    getPriceAfterDiscount(basePrice: PriceDefinition): PriceDefinition {
        const discount = this.getCurrentDiscount();
        return basePrice.minus(discount);
    }

    private getCurrentDiscount(): PriceDefinition {
        return this.discountValues[this.year] || new PriceDefinition(0, "USD");
    }
}
