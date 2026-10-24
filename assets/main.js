(function () {
  "use strict";
  var root = document.documentElement;
  var BP = 768;
  var toggle = document.querySelector(".menu-toggle");
  var drawer = document.querySelector(".mob-drawer");
  var overlay = document.querySelector(".mob-overlay");
  var closeBtn = document.querySelector(".mob-close");

  function setDrawer(open) {
    if (!drawer || !overlay || !toggle) { return; }
    drawer.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    root.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) { closeBtn.focus(); }
    if (!open) { toggle.focus({ preventScroll: true }); }
  }
  if (toggle) { toggle.addEventListener("click", function () { setDrawer(!drawer.classList.contains("open")); }); }
  if (closeBtn) { closeBtn.addEventListener("click", function () { setDrawer(false); }); }
  if (overlay) { overlay.addEventListener("click", function () { setDrawer(false); }); }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.classList.contains("open")) { setDrawer(false); }
  });
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) { setDrawer(false); }
    });
  }
  var mq = window.matchMedia("(min-width:" + (BP + 1) + "px)");
  function onMq() { if (mq.matches && drawer && drawer.classList.contains("open")) { setDrawer(false); } }
  if (mq.addEventListener) { mq.addEventListener("change", onMq); } else if (mq.addListener) { mq.addListener(onMq); }

  var qs = document.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(qs, function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) { panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px"; }
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(qs, function (btn) {
      if (btn.getAttribute("aria-expanded") === "true") {
        var p = document.getElementById(btn.getAttribute("aria-controls"));
        if (p) { p.style.maxHeight = p.scrollHeight + "px"; }
      }
    });
  });
})();
