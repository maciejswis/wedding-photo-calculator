import { calculateServicePrice } from "./priceCalculator/PriceCalculator";
import { PriceDefinition } from "./priceCalculator/PriceDefinition";
import { ServiceType } from "./ServiceType";
import { validateSelectedServices } from "./validateSelectedServices";
import { DiscountDefinitionBuilders } from "./discount/DiscountDefinitionBuilders";
import { ServiceYear } from "./ServiceYear";
import { ServiceTypeName } from "./ServiceTypeName";
import { getUniqueValues } from "./utils";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceTypeName[],
    action: { type: "Select" | "Deselect"; service: ServiceTypeName }
) => {
    switch (action.type) {
        case "Deselect":
            const newServices = previouslySelectedServices.filter(item => item !== action.service);
            const validServices = validateSelectedServices(newServices.map(service => ServiceType[service]));
            return validServices.map(service => service.name);
        case "Select": {
            const serviceType = ServiceType[action.service];
            if (serviceType.dependentOn.length === 0) {
                return getUniqueValues(previouslySelectedServices.concat([action.service]));
            }
            for (const dependency of serviceType.dependentOn) {
                if (previouslySelectedServices.some(s => s === dependency)) {
                    return getUniqueValues(previouslySelectedServices.concat([action.service]));
                }
            }
            return previouslySelectedServices;

        }
        default:
            return previouslySelectedServices;
    }
};

type Result = {
    basePrice: number,
    finalPrice: number,
}

export const calculatePrice = (
    selectedServiceNames: ServiceTypeName[],
    selectedYear: ServiceYear): Result => {

    const selectedServices: ServiceTypeName[] = validateSelectedServices(selectedServiceNames.map(ser => ServiceType[ser]))
        .map(s => s.name);

    // get all applicable discounts
    const discountDefinitions = DiscountDefinitionBuilders
        .map(builder => builder({
            services: selectedServices,
            year: selectedYear
        }))
        .filter(def => def.isApplicable());

    const result = selectedServices
        .map(service => calculateServicePrice(service, selectedYear, discountDefinitions))
        .reduce((sum, current) => ({
            basePrice: sum.basePrice.plus(current.basePrice),
            finalPrice: sum.finalPrice.plus(current.finalPrice)
        }), {
            basePrice: new PriceDefinition(0, "USD"),
            finalPrice: new PriceDefinition(0, "USD")
        });

    return {
        basePrice: result.basePrice.getAmount(),
        finalPrice: result.finalPrice.getAmount()
    };
};

