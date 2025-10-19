"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address, AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";
import { parseEther } from "viem/utils";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: delegate } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "delegate"
  });
  const [newDelegate, setNewDelegate] = useState("");

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({ contractName: "YourContract" });

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">The Delegate App</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <div className="flex justify-center items-center space-x-2 flex-col">
            <p className="my-2 font-medium">Current Delegate:</p>
            <Address address={delegate} />
          </div>
          <div className="mt-10 flex flex-col space-y-4">
            <AddressInput
              value={newDelegate}
              onChange={setNewDelegate}
            />
          </div>
          <div className="mt-4 flex justify-center items-center space-x-2 flex-col">
            <button
              className="btn btn-primary"
              onClick={async () => {
                try {
                  await writeYourContractAsync({
                    functionName: "setDelegate",
                    args: [newDelegate]
                  });
                } catch (e) {
                  console.error("Error setting delegate:", e);
                }
              }}
            >
              Set Delegate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
