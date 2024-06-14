import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { readContract } from "@wagmi/core";
import { airDropABI } from "../abis/AirDrop";
import { contractAddress } from "../config/config";
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useReadContract,
  useSendTransaction,
  useWatchContractEvent,
} from "wagmi";
import { parseEther } from "viem";

// Define the type for presale details
interface AirDrop {}

const AirDropPage: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { data: txResult, writeContractAsync } = useWriteContract();
  const {
    data: readData,
    isError,
    isLoading,
  } = useReadContract({
    address: contractAddress,
    abi: airDropABI,
    functionName: "getWhitelistedAddress",
  });
  //   const { data: readData1 } = useReadContract({
  //     address: contractAddress,
  //     abi: airDropABI,
  //     functionName: "getWhitelistedAddress",
  //   });
  const { data: readData1 } = useReadContract({
    address: contractAddress,
    abi: airDropABI,
    functionName: "isOwner",
  });
  console.log(address, isConnected);
  console.log(readData, readData1);
  return (
    <>
      <ConnectButton />
      {readData1 === address ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <span>Welcome Owner</span>
          <button
            onClick={() => {
              if (address)
                try {
                  writeContractAsync({
                    abi: airDropABI,
                    address: contractAddress,
                    functionName: "addAddressForAirDrop",
                    args: [address],
                  });
                } catch (err) {
                  console.error(err);
                }
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Add
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <span>
            Now 30% of $Token will be distributed to users who I invite to our
            token site. enjoy AirDropPage
          </span>
          <button
            onClick={() => {
              if (address)
                try {
                  writeContractAsync({
                    abi: airDropABI,
                    address: contractAddress,
                    functionName: "claimToken",
                    args: [address],
                  });
                } catch (err) {
                  console.error(err);
                }
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Claim
          </button>

          {/* Add other components like Button, Progress, TextField, Form here */}
        </div>
      )}
    </>
  );
};

export default AirDropPage;
