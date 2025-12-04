import { setStorage } from './dataServices';
import renderHeaderFooter from './headerfooter';
import { capitalize, getParams, setData, fullDate } from './utils';

renderHeaderFooter();
getBooking();

document.forms['checkout'].addEventListener('submit', (event) => {
  event.preventDefault();
  location.href = '/checkout/';
});

function getBooking() {
  try {
    let bookingData = getParams();

    let from = bookingData.from;
    let to = bookingData.to;
    let leaveDate = bookingData['leave-date'];
    let returnDate = bookingData['return-date'];
    let travelerCount = bookingData['traveler-count'];
    let roundtrip = bookingData.roundtrip;

    let travelArrow = `<div class="icon travel-arrow"></div>`;
    travelArrow += roundtrip ? `<div class="icon travel-arrow2"></div>` : ``;

    let bookingSummary = `<section class="travel-block">
      <p>From: ${capitalize(from)}</p>
      <div class="circle" style="background: var(--color-${from})"></div>
      <p>Leave By: ${fullDate(leaveDate)}</p>
    </section>
    <section class="travel-through">
      <p>Travelers: ${travelerCount}</p>
      <div class="travel-arrow-container">${travelArrow}</div>
      ${roundtrip ? '<p>Round Trip</p>' : '<p>One-Way</p>'}
    </section>
    <section class="travel-block">
      <p>To: ${capitalize(to)}</p>
      <div class="circle" style="background: var(--color-${to})"></div>
      <p>${roundtrip ? 'Return On: ' + fullDate(returnDate) : ''}</p>
    </section>`;

    setData('#booking-summary', bookingSummary);

    setStorage('gt_stor', bookingData);
  } catch (error) {
    console.error(error);
  }

  /*
  from=Alderaan
  to=Coruscant
  leave-date=2025-11-24
  arrive-date=2025-12-01
  traveler-count=3
  roundtrip=on

  */

  // renderSlider(sliderName);
}
