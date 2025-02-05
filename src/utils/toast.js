import toast from "react-hot-toast";

export const errToast = (message) => {
  toast.error(`${message}`, {
    duration: 4000,
    position: "top-right",
    style: {
      borderRadius: "12px",
      background: "#ffe6e6",
      color: "#d32f2f",
      border: "1px solid #d32f2f",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      padding: "12px 16px",
    },
    icon: "🚩",
  });
};

export const successfullyToast = (message) => {
  toast.success(`${message}`, {
    duration: 4000,
    position: "top-right",
    style: {
      borderRadius: "12px",
      background: "#e6ffe6",
      color: "#388e3c",
      border: "1px solid #388e3c",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      padding: "12px 16px",
    },
    icon: "✅",
  });
};

export const velcomeToast = (message) => {
  toast.success(`${message}`, {
    duration: 4000,
    position: "top-right",
    style: {
      borderRadius: "12px",
      background: "#e6f7ff",
      color: "#0288d1",
      border: "1px solid #0288d1",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
      padding: "12px 16px",
    },
    icon: "👋",
  });
};
