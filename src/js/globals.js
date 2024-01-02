const html = document.querySelector('html');
const body = document.querySelector('body');
const header = document.querySelector('header');
const container = document.querySelector('.row');

let winW = document.documentElement.clientWidth;
let winH = document.documentElement.clientHeight;
let docH = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
let headerH = header.offsetHeight;
const container_gap = getComputedStyle(container).getPropertyValue('grid-gap');
const gap = parseInt(container_gap.substring(0, 2));

const host = document.location.host;
const protocol = document.location.protocol;
const curr_domain = protocol + '//' + host;
const pathname = window.location.pathname; // Returns path only
const url = window.location.href; // Returns full URL

const globals = {
  html: html,
  body: body,
  header: header,
  url: url,
  winW: winW,
  winH: winH,
  docH: docH,
  headerH: headerH,
  curr_domain: curr_domain,
  pathname: pathname,
};

function setScrollPosition() {
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.scrollHeight;

  if (scrollPosition < 100) {
    body.setAttribute('data-scroll', 'top');
  } else if (scrollPosition + windowHeight === bodyHeight) {
    body.setAttribute('data-scroll', 'bottom');
  } else {
    body.setAttribute('data-scroll', 'down');
  }
}

function handleScroll() {
  setScrollPosition();
}

document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('scroll', handleScroll);
  setScrollPosition();
});

export default globals;
