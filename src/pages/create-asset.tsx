import type { NextPage } from "next";
import React from "react";
import { Formik } from "formik";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import { TextField } from "../components/TextField";
const Createasset: NextPage = () => {
  const createAsset = trpc.useMutation(["hyperledger.createAsset"]);
  const router = useRouter();
  return (
    <div className="container mx-auto flex flex-col justifiy-center max-w-screen-md ">
      <div className="flex flex-row ">
        <Link href={"/"}>
          <a className="self-center text-md md:text-[2rem] leading-normal font-bold -ml-16 mr-4 text-blue-400">
            {"<--"}
          </a>
        </Link>

        <h4 className="text-md md:text-[2rem] my-4 leading-normal font-bold text-gray-700">
          Create Asset:{" "}
        </h4>
      </div>

      <Formik
        initialValues={{
          Color: "",
          Size: "",
          Owner: "",
          AppraisedValue: "",
        }}
        onSubmit={(values) => {
          createAsset.mutate(
            { ID: "asset" + Date.now(), ...values },
            {
              onSuccess() {
                router.push("/");
              },
            }
          );
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              name="Color"
              value={values.Color}
            />
            <TextField
              name="Size"
              onChange={handleChange}
              value={values.Size}
            />
            <TextField
              name="Owner"
              onChange={handleChange}
              value={values.Owner}
            />
            <TextField
              name="AppraisedValue"
              onChange={handleChange}
              value={values.AppraisedValue}
            />
            <button
              className="text-white bg-blue-600 py-2.5 px-5 rounded-sm my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-sm font-medium"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>

      {createAsset.isSuccess ? "Asset Added" : ""}
    </div>
  );
};

export default Createasset;
