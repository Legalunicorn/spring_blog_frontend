import "./modal.scss"
import { Icon } from "@iconify/react/dist/iconify.js";

//Confirm,

type modalProps = {
    onClose: () => void,
    onConfirm: () => void,
    title: string,
    text: string
}


const ConfirmModal = ({
    onClose,
    onConfirm,
    title = "",
    text
}: modalProps) => {

    return (
        <div className="modal">
            <div className="modal-background">
            </div>

            <div className="modal-main">
                <Icon className="close-button" icon="gridicons:cross" width="20" height="20" 
                    onClick={onClose}
                />
                <section className="modal-header">
                    <p>{title}</p>
                </section>
                <p>{text}</p>
                <div className="option-buttons">
                    <span
                        onClick={() => {
                            onClose();
                        }}
                    >Cancel
                    </span>

                    <span
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        Confirm
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;