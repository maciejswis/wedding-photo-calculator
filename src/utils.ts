import { ServiceTypeName } from "./ServiceTypeName";
import { CalculatorResult } from "./discount/DiscountDefinition";

export const getUniqueValues = (array: ServiceTypeName[]): ServiceTypeName[] => {
    return Array.from(new Set<ServiceTypeName>(array));
};

export const getGreaterDiscount = (value: CalculatorResult, secondValue: CalculatorResult): CalculatorResult => {
    return (secondValue.finalPrice.getAmount() < value.finalPrice.getAmount()) ? secondValue : value;
};
