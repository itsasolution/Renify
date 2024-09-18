import toast from "react-hot-toast";

export default function FeedBackForm() {
  const handle = (e)=>{
    e.preventDefault();
    toast.success("working on this feature")
  }
  return (
    <>
        <div className="relative md:py-6 px-5 py-12 md:w-[500px] ">
          <div className="absolute inset-0 bg-gradient-to-r md:block hidden from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="text-white relative px-4 py-10 bg-gradient-to-tr rounded-xl from-indigo-700/90 to-purple-500/90 shadow-lg sm:rounded-3xl sm:p-12">
            <div className="text-center pb-6">
              <h1 className="text-3xl">Contact Us!</h1>

              <p className="my-1">
                Fill up the form below to send us a message.
              </p>
            </div>

            <form onSubmit={(e)=>handle(e)} >
              <input
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                name="name"
              />

              <input
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                name="email"
              />

              <input
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Subject"
                name="_subject"
              />

              <textarea
                className="shadow mb-4 min-h-10 max-h-32 h-28  appearance-none border rounded  w-full py-2 px-3  leading-tight"
                placeholder="Type your message here..."
                name="message"
              ></textarea>

              <div className="flex justify-between">
                <button
                  className="shadow bg-sky-500 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Send ➤
                </button>
                <button
                  className="shadow bg-rose-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}
