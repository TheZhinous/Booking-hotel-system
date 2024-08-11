import { useEffect } from "react";

export default function useOutsideClick(refValue, exceptionId, callBack) {
  return useEffect(() => {
    function handleOutsideClick(event) {
      if (
        refValue.current &&
        !refValue.current.contains(event.target) &&
        event.target.id !== exceptionId
      )
        // console.log("clicked outside the options");
      callBack();
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [refValue, callBack]);
}
