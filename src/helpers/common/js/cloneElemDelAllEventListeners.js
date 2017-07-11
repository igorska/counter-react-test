//------------------------------------------------------------

let cloneElemDelAllEventListeners = function  (domElement) {
  let el = domElement;
  let elClone = el.cloneNode(true);
  el.parentNode.replaceChild(elClone, el);
};

//------------------------------------------------------------

export default cloneElemDelAllEventListeners
