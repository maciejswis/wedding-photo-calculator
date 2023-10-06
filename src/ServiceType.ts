import { ServiceTypeName } from "./ServiceTypeName";

export class ServiceType {
    private constructor(name: ServiceTypeName, dependentOn: ServiceTypeName[] = []) {
        this.name = name;
        this.dependentOn = dependentOn;
    }

    readonly name: ServiceTypeName;
    readonly dependentOn: ServiceTypeName[];
  
    public static Photography = new ServiceType("Photography");
    public static VideoRecording = new ServiceType("VideoRecording");
    public static BlurayPackage = new ServiceType("BlurayPackage", ["VideoRecording"]);
    public static TwoDayEvent = new ServiceType("TwoDayEvent", ["VideoRecording", "Photography"]);
    public static WeddingSession = new ServiceType("WeddingSession");
}
