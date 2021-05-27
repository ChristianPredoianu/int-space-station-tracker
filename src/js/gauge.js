export const gaugeElement = document.querySelector('.gauge');

export function setGaugeValue(gauge, value) {
  let maxValue = 30000;
  if (value < 0 || value > 1) {
    return;
  }

  gauge.querySelector('.gauge__fill').style.transform = `rotate(${
    value / 2
  }turn)`;
  gauge.querySelector(
    '.gauge__cover'
  ).textContent = `${new Intl.NumberFormat().format(value * maxValue)}Km/h`;
}
