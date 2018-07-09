function nav(nav, count) {
  for (var index in nav) {
    if (index == count) {
      nav[index].current = 1;
    } else {
      nav[index].current = 0;
    }
  }
}
module.exports = {
  nav: nav
}