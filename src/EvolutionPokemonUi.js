import { LitElement, html, css } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './evolution-pokemon-ui.css.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';
import '@pokemon/pokemon-list-dm/pokemon-list-dm.js'

export class EvolutionPokemonUi extends LitElement {
  static get properties() {
    return {
      pokemonName: { type: String },
      pokemonDetails: { type: Object },
      evolutions: { type: Array },
      noEvolutionsMessage: { type: String },
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
    const PokemonListDm = this.shadowRoot.querySelector('pokemon-list-dm');
    if (this.pokemonName) {
      const { pokemonDetails, evolutions } = await PokemonListDm.fetchPokemonDetails(this.pokemonName);
      this.pokemonDetails = pokemonDetails;
      this.evolutions = evolutions;

      if (this.evolutions.length === 0) {
        this.noEvolutionsMessage = 'Este Pokémon no tiene evoluciones.';
      }
    }
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('evolution-pokemon-ui-shared-styles'),
    ];
  }

  async updated(changedProperties) {
    if (changedProperties.has('pokemonName')) { 
      const PokemonListDm = this.shadowRoot.querySelector('pokemon-list-dm');
      const { pokemonDetails, evolutions } = await PokemonListDm.fetchPokemonDetails(this.pokemonName);
  
      this.pokemonDetails = pokemonDetails;
      this.evolutions = evolutions;
  
      // Reinicia el mensaje de evolución si se encuentran evoluciones
      if (this.evolutions.length === 0) {
        this.noEvolutionsMessage = 'Este Pokémon no tiene evoluciones.';
      } else {
        this.noEvolutionsMessage = '';
      }
    }
  }

  render() {
    return html`
      <div class="pokemon-card">
        <h1 class="pokemon-name">${this.pokemonDetails.name}</h1>
        <img src="${this.pokemonDetails.image}" alt="${this.pokemonDetails.name}" class="pokemon-image" />
        <p><strong>Tipos:</strong> ${this.pokemonDetails.types}</p>
        
        ${this.noEvolutionsMessage
          ? html`<p>${this.noEvolutionsMessage}</p>`
          : html`
              <div class="evolution-list">
                <h2>Evoluciones</h2>
                ${this.evolutions.map(evolution => html`
                  <div class="evolution-item">
                    <img src="${evolution.image}" alt="${evolution.name}" class="pokemon-image" />
                    <p>${evolution.name}</p>
                  </div>
                `)}
              </div>
            `}
      </div>
      <div class="button-container">
        <bbva-button-default @click="${this.gotopokemon}"> Ver pokemones</bbva-button-default>
      </div>

      <pokemon-list-dm></pokemon-list-dm>
    `;
  }

  gotopokemon() {
    this.dispatchEvent(new CustomEvent('navigate-to-pokemon', {
      bubbles: true,
      composed: true
    }));
  }
}
