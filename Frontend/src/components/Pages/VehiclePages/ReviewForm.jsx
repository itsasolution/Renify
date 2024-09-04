import React, { useContext, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserContext } from "../../../context/context";

const ReviewForm = ({ user, vid }) => {
  const [rating, setRating] = useState(1);
  const { register, handleSubmit, reset } = useForm();
  const { url } = useContext(UserContext);

  const submit = async (data) => {
    const newReview = {
      //   user: user._id,
      user: user.name,
      date: new Date().toISOString(),
      text: data.text,
      rating: rating,
    };

    axios
      .post(`${url}/vehicles/addreview/${vid}`, newReview)
      .then((res) => {
        toast.success("Review Added");

        window.location.reload();
        reset(); // Reset the form after successful submission
      })
      .catch((err) => {
        alert("error");
        console.log(err);
      });
  };

  return !user ? (
    ""
  ) : (
    <div className="max-w-lg p-4 py-8 my-5 mx-3 md:mx-auto bg-white dark:bg-slate-900 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-4 text-lg">
          <label htmlFor="text" className="block font-medium">
            Review
          </label>
          <textarea
            {...register("text")}
            className="mt-1 p-2 w-full bg-white dark:bg-slate-800 shadow border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rating" className="block font-medium">
            Rating
          </label>
          <span className="flex justify-center text-center">
            <Rating
              name="simple-controlled"
              value={rating}
              sx={{ fontSize: "30px" }}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
