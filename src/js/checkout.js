import { getStorage } from './dataServices';
import renderHeaderFooter from './headerfooter';
import { capitalize, fullDate, qs, setData } from './utils';

renderHeaderFooter();
getCart();

document.forms['checkout'].addEventListener('submit', (event) => {
  event.preventDefault();
  location.href = '/checkout/thank-you';
});

function getCart() {
  const cart = getStorage('gt_stor');
  let summary = cart ? getBill(cart) : `<h2>Your cart is empty.</h2>`;
  setData('#checkout-summary', summary);
}

function getBill(cart) {
  const pricePerTraveler = 1000;
  const tax = 0.06;
  const travelerInsurance = 200;
  let subtotal =
    pricePerTraveler * cart['traveler-count'] * (cart['roundtrip'] ? 1.75 : 1);
  let taxPrice = subtotal * tax;
  let total = subtotal + taxPrice + travelerInsurance;

  let ticket = `<h2>Trip Summary</h2>
            <p class="bill-item">
              <span>${capitalize(cart.from)}</span><i class="fa-solid fa-arrow-right-long"></i>
              <span>${capitalize(cart.to)}</span>
            </p>
            <p class="bill-item">
              <span>${fullDate(cart['leave-date'])}</span>
            </p>
            ${
              cart.roundtrip && cart['return-date']
                ? `<p class="bill-item">
                <span>${capitalize(cart.to)}</span><i class="fa-solid fa-arrow-right-long"></i>
                <span>${capitalize(cart.from)}</span>
              </p>
              <p class="bill-item">
                <span>${fullDate(cart['return-date'])}</span>`
                : ``
            }
            </p>
            
           
            <hr />
            <p class="bill-item">
              <span>${cart['traveler-count']} Traveler${cart['traveler-count'] > 1 ? 's' : ''}:</span
              ><span><span class="credits">$</span>${subtotal}</span>
            </p>
            <p class="bill-item">
              <span>Tax & Fees:</span
              ><span><span class="credits">$</span>${taxPrice}</span>
            </p>
            <p class="bill-item">
              <span>Travel Insurance:</span
              ><span><span class="credits">$</span>${travelerInsurance}</span>
            </p>
            <hr />
            <p class="bill-item">
              <span>Total:</span><span><span class="credits">$</span>${total}</span>
            </p>
            <section class="hidden-small">
              <button type="submit" class="full-width" form="checkout">Checkout</button>
            </section>`;

  return ticket;
}
