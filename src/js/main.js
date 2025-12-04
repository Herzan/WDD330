import renderHeaderFooter from './headerfooter.js';
import { renderListWithTemplate, renderSlider } from './display.js';
import { getJson } from './dataServices.js';
import { qs, qsAll } from './utils.js';
// import { getFandom } from './externalApi.js';

renderHeaderFooter();
renderSlider('slider-home');
bookingForm();

let formTest = {
  from: 'Alderaan',
  to: 'Somoto',
  leaveDate: '2025-11-24',
  returnDate: '2025-12-01',
  travelerCount: 3,
  roundtrip: true,
};
// prefillForm(formTest);
initForm();

qs('[data-return-toggle]').addEventListener('click', initForm);

function prefillForm(test) {
  qs('#from').value = test.from;
  qs('#to').value = test.to;
  qs('#leave-date').value = test.leaveDate;
  qs('#return-date').value = test.returnDate;
  qs('#traveler-count').value = test.travelerCount;
  qs('#roundtrip').checked = test.roundtrip;
}

function initForm() {
  let tripSwitch = qs('#roundtrip');
  let returnEls = qsAll('[data-return-toggle-this]');
  tripSwitch.checked
    ? returnEls.forEach((el) => {
        el.classList.remove('hidden');
        el.setAttribute('required', true);
      })
    : returnEls.forEach((el) => {
        el.classList.add('hidden');
        el.removeAttribute('required');
      });
}

async function bookingForm() {
  let destinationList = await getJson('destination-list');
  let list = destinationList.map((location) => location.name);
  list.unshift('');
  renderListWithTemplate(list, formSelectOptionFn, '#from');
  renderListWithTemplate(list, formSelectOptionFn, '#to');
}

function formOptionFn(listItem) {
  return `<option value="${listItem}">`;
}

function formSelectOptionFn(listItem) {
  return `<option value="${listItem}">${listItem}</option>`;
}