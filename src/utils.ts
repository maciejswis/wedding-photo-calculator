import { ServiceTypeName } from "./ServiceTypeName";

export const getUniqueValues = (array: ServiceTypeName[]): ServiceTypeName[] => {
    return Array.from(new Set<ServiceTypeName>(array));
};
