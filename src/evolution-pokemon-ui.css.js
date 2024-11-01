import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  display: block;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.pokemon-card {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  max-width: 280px;
  margin: 20px auto;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.pokemon-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.pokemon-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 12px 0;
  color: #333;
}

.evolution-list {
  max-height: 150px;
  overflow-y: auto;
  margin-top: 16px;
  padding: 12px;
  font-size: 0.9rem;
  background-color: #f7f7f7;
}

.evolution-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.evolution-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.2s;
}

.evolution-item img:hover {
  transform: scale(1.1);
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

h2 {
  font-size: 1.1rem;
  margin: 10px 0;
  color: #555;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}
`;
