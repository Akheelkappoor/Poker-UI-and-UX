const ToastStack = ({ toasts }) => {
  if (!toasts || toasts.length === 0) {
    return null;
  }
  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div className="toast" key={toast.id}>
          <strong>{toast.title}</strong>
          <span className="label">{toast.detail}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastStack;
