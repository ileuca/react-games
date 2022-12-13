import React, { FC } from "react";

export type ToastContextType = {
  addToast: (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => void;
  removeToast: (id: string) => void;
};
const ToastContext = React.createContext<ToastContextType>({
  addToast: () => {},
  removeToast: () => {},
});

type ToastContainerProps = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

const ToastContainer: FC<ToastContainerProps> = (props) => (
  <div
    className="toast toast-start toast-top"
    style={{ zIndex: 100 }}
    {...props}
  />
);

type ToastProps = {
  message: string;
  id: string;
  removeToast: (id: string) => void;
  type: "success" | "error" | "warning" | "info";
};

const Toast = ({ message, type, id, removeToast }: ToastProps) => {
  setTimeout(() => {
    removeToast(id);
  }, 3000);

  return (
    <div className={`${"alert alert-" + type}`}>
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
};

type ToastProviderProps = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = React.useState<any[]>([]);

  const addToast = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts([...toasts, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToast) => {
      return prevToast.filter((toast) => toast.id !== id);
    });
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} removeToast={removeToast} />
        ))}
      </ToastContainer>
      {children}
    </ToastContext.Provider>
  );
};

export const useToasts = () => React.useContext(ToastContext);
