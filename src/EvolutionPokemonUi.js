import { LitElement, html } from 'lit-element';
import '@pokemon/pokemon-list-dm/pokemon-list-dm.js';

export class EvolutionPokemonUi extends LitElement {
  static get properties() {
    return {
      pokemonName: { type: String },
      pokemonDetails: { type: Object },
      evolutions: { type: Array },
      noEvolutionsMessage: { type: String }
    };
  }

  constructor() {
    super();
    this.pokemonName = '';
    this.pokemonDetails = {};
    this.evolutions = [];
    this.noEvolutionsMessage = '';
  }

  async firstUpdated() {
    await this._fetchPokemonDetails(this.pokemonName);
  }

  async _fetchPokemonDetails(pokemonName) {
    const PokemonListDm = this.shadowRoot.querySelector('pokemon-list-dm');
    const { pokemonDetails, evolutions } = await PokemonListDm.fetchPokemonDetailsByName(pokemonName);

    this.pokemonDetails = pokemonDetails;
    this.evolutions = evolutions;

    if (this.evolutions.length === 0) {
      this.noEvolutionsMessage = 'Este Pokémon no tiene evoluciones.';
    }
  }

  render() {
    return html`
      <div class="pokemon-card">
        <h1>${this.pokemonDetails.name}</h1>
        <img src="${this.pokemonDetails.image}" alt="${this.pokemonDetails.name}" class="pokemon-image">
        <p>Tipos: ${this.pokemonDetails.types}</p>
        ${this.noEvolutionsMessage 
          ? html`<p>${this.noEvolutionsMessage}</p>`
          : html`
            <h2>Evoluciones</h2>
            ${this.evolutions.map(evolution => html`
              <div>
                <img src="${evolution.image}" alt="${evolution.name}">
                <p>${evolution.name}</p>
              </div>
            `)}
          `}
      </div>
      <bbva-button-default text="Regresar a Pokémon" @click="${this._goBack}"></bbva-button-default>
    `;
  }

  _goBack() {
    this.dispatchEvent(new CustomEvent('navigate-to-pokemon', {
      bubbles: true,
      composed: true
    }));
  }
}

window.customElements.define('evolution-pokemon-ui', EvolutionPokemonUi);
