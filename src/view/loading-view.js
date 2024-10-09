import AbstractView from '../framework/view/abstract-view.js';

const loadingAnimation =
`<svg x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
<circle fill="none" stroke="#000" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"/>
  <circle fill="#000" stroke="#000" stroke-width="3" cx="8" cy="54" r="6" >
    <animateTransform
      attributeName="transform"
      dur="2s"
      type="rotate"
      from="0 50 48"
      to="360 50 52"
      repeatCount="indefinite" />
  </circle>
</svg>`;

const createLoadingTemplate = () => `<p class="trip-events__msg"></div>${loadingAnimation}</div></p>`;

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}

