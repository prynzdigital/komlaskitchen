const Marque = ({ pt = 0 }) => {
  return (
    <div className={`marque-section fix section-padding pt-${pt} section-bg`}>
      <div className="marquee-wrapper text-slider">
        <div className="marquee-inner to-left">
          <ul className="marqee-list d-flex">
            <li className="marquee-item">
              <span className="text-slider text-color">Jollof Rice</span>
              <span className="text-slider" />
              <span className="text-slider text-color-2">Kontomire Stew</span>
              <span className="text-slider">
                <img src="assets/img/icon/burger.png" alt="African food icon" />
              </span>
              <span className="text-slider text-color">Okro Soup</span>
              <span className="text-slider" />
              <span className="text-slider text-color-2">Beans &amp; Plantain</span>
              <img src="assets/img/icon/pizza.png" alt="Food icon" />
              <span className="text-slider" />
              <span className="text-slider text-color">Authentic Flavors</span>
              <span className="text-slider text-color-2">Made with Love</span>
              <span className="text-slider">
                <img src="assets/img/icon/burger.png" alt="African food icon" />
              </span>
              <span className="text-slider" />
              <span className="text-slider text-color">Vegetable Rice</span>
              <span className="text-slider text-color-2">Grilled Specials</span>
              <span className="text-slider" />
              <span className="text-slider text-color">Chicago Delivery</span>
              <img src="assets/img/icon/pizza.png" alt="Food icon" />
              <span className="text-slider" />
              <span className="text-slider text-color-2">Jollof Rice</span>
              <span className="text-slider text-color">Kontomire Stew</span>
              <span className="text-slider" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Marque;
