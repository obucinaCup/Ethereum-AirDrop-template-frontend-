import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { readContract } from '@wagmi/core'
import { abi } from './abi'
import { config } from './config';
import { useAccount, useReadContracts, useWriteContract, useReadContract, useSendTransaction, useWatchContractEvent, } from 'wagmi';
import { parseEther } from 'viem'
const contractAddress = '0x2D5e361d80AA073A68Bf04DE9d347A0E38B6b338';

// Define the type for presale details
interface AirDrop {
  
}

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
 
  
  const { data: readData, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'getWhitelistedAddress',
  });
  console.log(address, isConnected);
  console.log(readData);
  return (
    <></>
  );
};

export default Home;
