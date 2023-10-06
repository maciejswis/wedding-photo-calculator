import { PriceCalculator } from "./PriceCalculator";
import { PriceDefinition } from "./PriceDefinition";
import { ServiceType } from "./ServiceType";
import { validateSelectedServices } from "./validateSelectedServices";
import { DiscountDefinitionBuilders } from "./discount/DiscountDefinitionBuilders";
import { ServiceYear } from "./ServiceYear";
import { ServiceTypeName } from "./ServiceTypeName";
import { CalculatorResult } from "./discount/DiscountDefinition";
import { getUniqueValues, getGreaterDiscount } from "./utils";

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

    const selectedServices = validateSelectedServices(selectedServiceNames.map(ser => ServiceType[ser]));

    // calculate base price
    const basePrice = selectedServices
        .map(service => PriceCalculator.getBasePrice(service.name, selectedYear))
        .reduce((sum, current) => sum.plus(current), new PriceDefinition(0));

    var result: CalculatorResult = { basePrice: basePrice, finalPrice: basePrice };

    // check all potential discounts
    const discountDefinitions = DiscountDefinitionBuilders
        .map(builder => builder({
            services: selectedServices,
            year: selectedYear,
        }))
        .filter(def => def.isApplicable())

    for (const discountDef of discountDefinitions) {
        const discountCalculation = discountDef.getCalculationAfterDiscount(result);
        result = getGreaterDiscount(result, discountCalculation)
    }

    return {
        basePrice: result.basePrice.getAmount(),
        finalPrice: result.finalPrice.getAmount()
    }
};

