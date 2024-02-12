import React from "react";
import ReactDOM from "react-dom";

interface ModalPropsType {
  visible: boolean;
  title: string;
  content: React.ReactElement | string;
  footer: React.ReactElement | string;
  onClose: () => void;
}

const Modal: React.FC<ModalPropsType> = (
  {
    visible = false,
    title = "",
    content = "",
    footer = "",
    onClose
  }
) => {
  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <span className="modal-close" onClick={onClose}><i className="fa fa-close"></i></span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>, document.body
  );
};

export { Modal };
