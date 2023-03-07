import * as components from "./components/index.js";
import data from "./data.js";
import MyProfile, { Attribute } from "./components/profile/profile.js";

class AppContainer extends HTMLElement {
    profiles: MyProfile[] = [];
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        data.forEach((user) => {
            const profileCard = this.ownerDocument.createElement(
                "my-profile"
                ) as MyProfile;
                profileCard.setAttribute(Attribute.name, user.name);
                profileCard.setAttribute(Attribute.email, (user.email));
                profileCard.setAttribute(Attribute.city, user.address.city);
                profileCard.setAttribute(Attribute.city, user.company.name);
                profileCard.addEventListener("click", () => console.log(user.name));
                this.profiles.push(profileCard);
            });
        }
        
        connectedCallback() {
            this.render();
        }
        
        render() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``;
                
                this.profiles.forEach((profile) => {
                    this.shadowRoot?.appendChild(profile);
                });
            }
        }
    }
    
customElements.define("app-container", AppContainer);
