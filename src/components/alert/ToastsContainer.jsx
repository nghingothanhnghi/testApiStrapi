import Toast from './Toast';
import "./alert.module.css"
const ToastsContainer = ({ toasts, position = "top-right" }) => {
  return (
    <div className={`toasts-container ${position}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastsContainer;