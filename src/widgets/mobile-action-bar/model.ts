import { useEffect, useState } from "react";

const isTextField = (element: EventTarget | null) =>
  element instanceof Element &&
  element.matches("input:not([type=checkbox]):not([type=radio]), select, textarea");

// True while a text field has focus: the bar steps aside so it can't cover the field.
export function useTypingInField() {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      if (isTextField(event.target)) setTyping(true);
    };
    const onFocusOut = (event: FocusEvent) => {
      if (isTextField(event.target) && !isTextField(event.relatedTarget)) setTyping(false);
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);
  return typing;
}

export interface MobileAction {
  label: string;
  href: string;
  icon?: "sms";
}
