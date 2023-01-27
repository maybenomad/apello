//we use portal to append our modal to the body in the dom so that we'll ensure the portal container element will have higher precedence in hierarchy (The default behavior of the DOM hierarchy when no z-index is set to elements is that the elements that appear lower in the hierarchy will take higher precedence.) 
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';


//a helper function to create a div with a specific id
function createWrapperAndAppendToBody(wrapperId) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }

// Also, set a default value for wrapperId prop if none provided
function ReactPortal({ children, wrapperId = "react-portal-wrapper" }) {
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;