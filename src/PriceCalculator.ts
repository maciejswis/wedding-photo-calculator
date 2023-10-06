import { PriceDefinition } from "./PriceDefinition";
import { ServiceTypeName } from "./ServiceTypeName";
import { ServiceYear } from "./ServiceYear";

type ServicePriceDefinition = {
    serviceName: ServiceTypeName;
    price: PriceDefinition;
    year: ServiceYear | undefined;
} 

export const basePrices: Array<ServicePriceDefinition> = [
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

 
export class PriceCalculator {

    public static getBasePrice = (serviceName: ServiceTypeName, year: ServiceYear): PriceDefinition => {
        var yearPriceDef = basePrices.find(def => def.year === year && def.serviceName === serviceName);
        if (yearPriceDef) return yearPriceDef.price;

        var basePriceDef = basePrices.find(def => def.year === undefined && def.serviceName === serviceName);
        if (basePriceDef) return basePriceDef.price;

        throw Error(`Missing price definiton for ${serviceName} for ${year} year`);
    };
}
