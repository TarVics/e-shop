import React, {FC} from 'react';
import ReactDOM from 'react-dom';

export type ModalPropsType = {
    isShowing: boolean,
    hide: () => void,
}

/*
    const {isShowing, toggle} = useModal();

    <button className="button-default" onClick={() => toggle()}>Show Modal</button>
    <Modal
        isShowing={isShowing}
        hide={() => toggle()}
    />
*/
const Modal: FC<ModalPropsType> = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <p>
                    Hello, I'm a modal.
                </p>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export {Modal}