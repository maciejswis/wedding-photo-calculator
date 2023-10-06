import { ServiceType } from "./ServiceType";

export const validateSelectedServices = (selectedServices: ServiceType[]): ServiceType[] => {
    var validServices = [];
    for (const selectedService of selectedServices) {
        if (selectedService.dependentOn.length > 0) {
            for (const dependency of selectedService.dependentOn) {
                const dependencyFound = selectedServices.some(service => dependency === service.name);
                if (dependencyFound) {
                    validServices = [...validServices, selectedService];
                    break;
                }
            }
            // inform user that we removed some services?
        } else {
            validServices = [...validServices, selectedService];
        }
    }

    return validServices;
};
