export type Currency = "USD"; // possibly we would want to support other currencies later on 

export class PriceDefinition {
    constructor(amout: number, currency: Currency = "USD") {
        this.amount = amout * 100;
        this.currency = currency;
    }

    readonly currency: Currency;
    private readonly amount: number; // stored as int, representing cents in case of USD

    public plus = (value: PriceDefinition): PriceDefinition => {
        if (this.currency !== value.currency) {
            throw Error("Cannot add prices with different currencies");
        }

        return new PriceDefinition((this.amount + value.amount) / 100, this.currency);
    };

    public minus = (value: PriceDefinition): PriceDefinition => {
        if (this.currency !== value.currency) {
            throw Error("Cannot subtract prices with different currencies");
        }

        return new PriceDefinition((this.amount - value.amount) / 100, this.currency);
    };

    public getAmount = () => this.amount / 100;

    public toString = () => {
        return `${this.getAmount()} ${this.currency}`;
    };
}
