import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const context = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(["hyperledger.getallassets"]);
  const deleteAsset = trpc.useMutation(["hyperledger.deleteAsset"], {
    onSuccess() {
      context.invalidateQueries("hyperledger.getallassets");
    },
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>HyperLedger fabric CRUD</title>
        <meta name="description" content="Hyperledger fabric crud" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-start min-h-screen p-4">
        <h5 className="text-md md:text-[3rem] leading-normal font-extrabold text-gray-700">
          Hyperledger Fabric <span className="text-purple-300">Next</span> App
        </h5>

        <div className="flex flex-col justifiy-center w-11/12 m-10 ">
          <div className="flex justify-end">
            <Link href={"/create-asset"}>
              <a className="text-white bg-blue-600 py-2.5 px-5 rounded-sm my-2 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-sm font-medium">
                + Add Asset
              </a>
            </Link>
          </div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead>
                <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <th className="py-3 px-6 text-sm">Color</th>
                  <th className="py-3 px-6 text-sm">Size</th>
                  <th className="py-3 px-6 text-sm">Owner</th>
                  <th className="py-3 px-6 text-sm">Appraised Value</th>
                  <th className="py-3 px-6 text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {deleteAsset.isLoading ? (
                  <td colSpan={5}>
                    <div className="flex justify-center justify-items-center content-center h-16 w-full">
                      <svg
                        aria-hidden="true"
                        className="self-center mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </td>
                ) : (
                  data?.assets.map((asset) => (
                    <tr key={asset.ID}>
                      <td className="py-3 px-6">{asset.Color}</td>
                      <td className="py-3 px-6">{asset.Size}</td>
                      <td className="py-3 px-6">{asset.Owner}</td>
                      <td className="py-3 px-6">{asset.AppraisedValue}</td>
                      <td className="py-3 px-6">
                        <Link href={`/asset/${asset.ID}/edit`}>
                          <a className="text-blue-600 hover:underline mr-3">
                            Edit
                          </a>
                        </Link>

                        <span className="text-red-600 hover:underline cursor-pointer">
                          <a
                            onClick={() => deleteAsset.mutate({ ID: asset.ID })}
                          >
                            Delete
                          </a>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
