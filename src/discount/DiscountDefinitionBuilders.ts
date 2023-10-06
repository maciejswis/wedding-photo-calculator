import { PhotoAndVideo20PackageDiscount } from "./PhotographyAndVideo20PackageDiscount";
import { WeddingSessionWith22PhotographyDiscount } from "./WeddingSessionWith22PhotographyDiscount";
import { WeddingSessionWithPhotoOrVideoPackageDiscount } from "./WeddingSessionWithPhotoOrVideoPackageDiscount";
import { DiscountInput, DiscountDefinition } from "./DiscountDefinition";

export const DiscountDefinitionBuilders: { (input: DiscountInput): DiscountDefinition; }[] = [

    (input) => new PhotoAndVideo20PackageDiscount(input),
    (input) => new WeddingSessionWithPhotoOrVideoPackageDiscount(input),
    (input) => new WeddingSessionWith22PhotographyDiscount(input),
];
