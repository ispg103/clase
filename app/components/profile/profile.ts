export enum Attribute {
    "name" = "name",
    "email" = "email",
    "city" = "city",
    "company" = "company",
}

class MyProfile extends HTMLElement {
    name?: string;
    email?: number;
    city?: string;
    company?: string;
    
    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            name: null,
            email: null,
            city: null,
            company: null,
        };
        return Object.keys(attrs);
    }
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
        this.render();
    }
    
    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {
                case Attribute.email:
                this.email = newValue ? Number(newValue) : undefined;
                break;
                
                default:
                this[propName] = newValue;
                break;
            }
            
            this.render();
        }
        
        render() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./app/components/profile/profile.css">
                <section>
                <h1>${this.name}</h1>
                <p>Email for one of our users: ${this.email}</p>
                <span><strong>From:${this.city}</strong><span>
                <span><strong>From:${this.company}</strong><span>
                </section>
                `;
            }
        }
    }
    
customElements.define("my-profile", MyProfile);
export default MyProfile;