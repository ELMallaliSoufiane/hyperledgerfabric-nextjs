import type { NextPage } from "next";
import React from "react";
import { Formik } from "formik";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
const Createasset: NextPage = () => {
  const createAsset = trpc.useMutation(["example.createAsset"]);
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
          createAsset.mutate({ ID: "asdsad", ...values });
          if (createAsset.isSuccess) {
            router.push("/");
          }
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div></div>
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
    </div>
  );
};

interface TextFieldProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextField = ({ name, value, onChange }: TextFieldProps) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {name}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={name}
      ></input>
    </div>
  );
};

export default Createasset;
