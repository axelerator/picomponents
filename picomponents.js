class PicoClassUpdater extends HTMLElement {
  constructor() {
    super();
  }
  static get observedAttributes() { return ["data-value"]; }
  connectedCallback() {
      let attributeName = this.getAttribute("data-attribute");
      let value = this.getAttribute("data-value");
      if (value === null) {
	document.documentElement.removeAttribute(attributeName);
      } else {
	document.documentElement.setAttribute(attributeName, value);
      }
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (property === "data-value") {
      let attributeName = this.getAttribute("data-attribute");
      if (newValue === null) {
	document.documentElement.removeAttribute(attributeName);
      } else {
	document.documentElement.setAttribute(attributeName,newValue);
      }
    }
  }
}
  
customElements.define('pico-class-updater', PicoClassUpdater);

