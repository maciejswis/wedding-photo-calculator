import { PriceDefinition } from "./PriceDefinition";
import { ServiceTypeName } from "../ServiceTypeName";
import { ServiceYear } from "../ServiceYear";
import { CalculatorResult, DiscountDefinition } from "../discount/DiscountDefinition";

export const calculateServicePrice = (
    serviceName: ServiceTypeName,
    year: ServiceYear, discountDefinitions:
        DiscountDefinition[]
): CalculatorResult => {
    const basePrice = getBasePrice(serviceName, year);
    const finalPrice = getFinalPrice(serviceName, basePrice, discountDefinitions);
    return {
        basePrice: basePrice,
        finalPrice: finalPrice
    }
}

type ServicePriceDefinition = {
    serviceName: ServiceTypeName;
    price: PriceDefinition;
    year: ServiceYear | undefined;
}

const basePrices: Array<ServicePriceDefinition> = [
    { serviceName: "Photography", year: 2020, price: new PriceDefinition(1700, "USD") },
    { serviceName: "Photography", year: 2021, price: new PriceDefinition(1800, "USD") },
    { serviceName: "Photography", year: 2022, price: new PriceDefinition(1900, "USD") },

    { serviceName: "VideoRecording", year: 2020, price: new PriceDefinition(1700, "USD") },
    { serviceName: "VideoRecording", year: 2021, price: new PriceDefinition(1800, "USD") },
    { serviceName: "VideoRecording", year: 2022, price: new PriceDefinition(1900, "USD") },

    { serviceName: "WeddingSession", year: undefined, price: new PriceDefinition(600, "USD") },
    { serviceName: "BlurayPackage", year: undefined, price: new PriceDefinition(300, "USD") },
    { serviceName: "TwoDayEvent", year: undefined, price: new PriceDefinition(400, "USD") },
]

const getBasePrice = (serviceName: ServiceTypeName, year: ServiceYear): PriceDefinition => {
    var basePriceDef = basePrices.filter(def =>
        def.serviceName === serviceName && (def.year <= year || def.year === undefined))
        .sort((a, b) => {
            const yearA = a.year || 0;
            const yearB = b.year || 0;
            return yearA - yearB;
        }).pop();

    if (basePriceDef) {
        return basePriceDef.price;
    }

    throw Error(`Missing price definiton for ${serviceName} for ${year} year`);
};

const getFinalPrice = (serviceName: ServiceTypeName, basePrice: PriceDefinition, discountDefinitions: DiscountDefinition[]): PriceDefinition => {
    const serviceDiscounts = discountDefinitions.filter(def => def.affectsService(serviceName))
    const result = serviceDiscounts.reduce(
        (acc, current) => {
            const discountCalculation = current.getPriceAfterDiscount(basePrice);
            return (acc.getAmount() < discountCalculation.getAmount()) ? acc : discountCalculation;
        }, basePrice);

    return result;
};
