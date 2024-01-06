"use client";
import React, { useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecAct = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!show) {
    return null;
  }

  return (
    <div className="flex justify-center items-start fixed z-50 inset-0 bg-neutral-800/70 overflow-x-hidden overflow-y-auto">
      <div className="relation w-full md:w-4/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto">
        <div
          className={`translate duration-300 h-full ${
            show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          {/* Content */}
          <div className="translate h-full md:h-auto rounded-lg shadow-lg relative flex flex-col w-full bg-white">
            <div className="p-6 flex justify-center items-center rounded-t relative border-b-[1px]">
              <button
                onClick={handleClose}
                className="p-1 absolute right-9 hover:opacity-70 transition border-0"
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* Body */}
            <div className="relative px-6 pt-6 flex-auto">{body}</div>
            {/* Footer */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryLabel && (
                  <Button
                    outline
                    label={secondaryLabel}
                    onClick={handleSecAct}
                    disabled={disabled}
                  />
                )}
                <Button
                  label={actionLabel}
                  onClick={handleSubmit}
                  disabled={disabled}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
