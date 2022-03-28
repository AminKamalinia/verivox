export class Product {
    id: string;
    title: string;
    tag?: string | null;
    providerName: string;
    url: string;

    constructor() {
        this.id = '';
        this.title = '';
        this.tag = null;
        this.providerName = '';
        this.url = '';
    }
}
