import { toast } from "react-toastify";

export default function ToastExamples() {

    const message = "custom toast";
  const notify = () => {
    toast("Default Notification !");

    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
    });

    toast.error("Error Notification !", {
      position: "top-left",
    });

    toast.warn("Warning Notification !", {
      position: "bottom-left",
    });

    toast.info("Info Notification !", {
      position: "bottom-center",
    });

    toast("Custom Style Notification with css class!", {
      position: "bottom-right",
      className: "foo-bar",
    });
  };

  return (
    <>
      <div className="w-full text-center my-10">
        <button
          className="h-10 w-auto bg-green-400 p-3 rounded"
          onClick={notify}
        >
          Notify
        </button>
      </div>
    </>
  );
}
