import { PhotoWithVideoPackageDiscount } from "./PhotoWithVideoPackageDiscount";
import { VideoWithPhotoPackageDiscount } from "./VideoWithPhotoPackageDiscount";
import { WeddingSessionWith22PhotographyDiscount } from "./WeddingSessionWith22PhotographyDiscount";
import { WeddingSessionWithPhotoOrVideoPackageDiscount } from "./WeddingSessionWithPhotoOrVideoPackageDiscount";
import { DiscountInput, DiscountDefinition } from "./DiscountDefinition";

export const DiscountDefinitionBuilders: { (input: DiscountInput): DiscountDefinition; }[] =
    [
        (input) => new VideoWithPhotoPackageDiscount(input),
        (input) => new PhotoWithVideoPackageDiscount(input),
        (input) => new WeddingSessionWithPhotoOrVideoPackageDiscount(input),
        (input) => new WeddingSessionWith22PhotographyDiscount(input),
    ];
