import { Slot } from "@radix-ui/react-slot";
import React, {
  ButtonHTMLAttributes,
  createContext,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";
import ReactDOM from "react-dom";

import useControllableState from "../../hooks/useControllableState";

interface ModalContestProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContestProps | undefined>(undefined);

const useToggleContext = () => {
  const contextOrUndefined = useContext(ModalContext);
  if (typeof contextOrUndefined === "undefined") {
    throw new Error(
      "Modal context should only be accessed in ModalProvider. is scope missing?"
    );
  }
  return contextOrUndefined;
};

/**
 * Modal (Context provider)
 */

interface ModalCompound {
  Trigger: FC<PropsWithChildren<TiggerProps>>;
  Overlay: FC<PropsWithChildren<OverlayProps>>;
  Content: FC<PropsWithChildren<ContentProps>>;
  Close: FC<PropsWithChildren<CloseProps>>;
  Portal: FC<PropsWithChildren<PortalProps>>;
}

interface ModalProps {
  open?: boolean;
  onChangeOpen?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const Modal: ModalCompound & FC<PropsWithChildren<ModalProps>> = (props) => {
  const {
    open: openProps,
    onChangeOpen: onChangeOpenProps,
    defaultOpen,
    children,
  } = props;

  const [open, setOpen] = useControllableState({
    value: openProps,
    defaultValue: defaultOpen,
    onChange: onChangeOpenProps,
  });

  return (
    <ModalContext.Provider value={{ open: open, setOpen: setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

/**
 * Modal.Trigger
 */
interface TiggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Trigger: FC<PropsWithChildren<TiggerProps>> = (props) => {
  const { asChild, ...rest } = props;
  const { setOpen } = useToggleContext();
  const Comp = asChild ? Slot : "button";

  const handleClick = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return <Comp onClick={handleClick} {...rest} />;
};

/**
 * Modal.Overlay
 */
interface OverlayProps {
  asChild?: boolean;
}

const Overlay: FC<PropsWithChildren<OverlayProps>> = (props) => {
  const { asChild, ...rest } = props;
  const { setOpen } = useToggleContext();
  const Comp = asChild ? Slot : "div";

  const handleClick = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return <Comp onClick={handleClick} {...rest} />;
};

/**
 * Modal.Content
 */
interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Content: FC<PropsWithChildren<ContentProps>> = (props) => {
  const { asChild, ...rest } = props;
  const Comp = asChild ? Slot : "div";

  return <Comp {...rest} />;
};

/**
 * Modal.Close
 */
interface CloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Close: FC<PropsWithChildren<CloseProps>> = (props) => {
  const { asChild, ...rest } = props;
  const { setOpen } = useToggleContext();
  const Comp = asChild ? Slot : "button";

  const handleClick = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return <Comp onClick={handleClick} {...rest} />;
};

/**
 * Modal.Portal
 */
interface PortalProps {}

const Portal: FC<PropsWithChildren<PortalProps>> = (props) => {
  const { children } = props;
  const { open } = useToggleContext();

  const element =
    typeof window !== "undefined" && document.querySelector("#portal");

  const renderTarget = open && element ? element : null;

  return children && renderTarget
    ? ReactDOM.createPortal(children, renderTarget)
    : null;
};

Modal.Portal = Portal;
Modal.Content = Content;
Modal.Overlay = Overlay;
Modal.Trigger = Trigger;
Modal.Close = Close;
export default Modal;
