"use client";
import React, { useState, useRef } from "react";
import Timer from "../components/timer/Timer";
import AccountModal from "../components/accounts/AccountModal";
import AllAccounts from "../components/accounts/AllAccounts";
import AccountHistory from "../components/accounts/AccountTransactions";
import { Account } from "@/types/types";
import Navigation from "../components/layout/Navigation";
import { dummyAccount } from "./utils/dummyAccount";
import {
  showAddAccountModalContext,
  selectedAccountContext,
  HomeContext,
} from "./contexts";
import { createClient } from "@/utils/supabase/client";
import AccountMenuButton from "../components/accounts/AccountMenuButton";

const scrollToElement = (element: HTMLDivElement | null) => {
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Page = () => {
  const timerRef = useRef<HTMLDivElement | null>(null);
  const accountsRef = useRef<HTMLDivElement | null>(null);

  const bringToTimer = () => scrollToElement(timerRef.current);
  const goToAccounts = () => scrollToElement(accountsRef.current);
  const [selectedAccount, setSelectedAccount] = useState<Account>(dummyAccount);

  const [selectedPage, setSelectedPage] = useState("Home");
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);

  return (
    <HomeContext.Provider value={{ selectedPage, setSelectedPage }}>
      <showAddAccountModalContext.Provider
        value={{ showAddAccountModal, setShowAddAccountModal }}
      >
        <selectedAccountContext.Provider
          value={{
            selectedAccount,
            setSelectedAccount,
            timerRef,
            accountsRef,
            bringToTimer,
            goToAccounts,
          }}
        >
          <div className="min-h-screen flex flex-col justify-center items-center">
            <div
              className="flex justify-center w-screen "
              style={{
                backgroundColor:
                  selectedAccount.id === "dummy-account"
                    ? "background"
                    : `${selectedAccount.colour}10`,
              }}
              ref={timerRef}
            >
              <div className="w-full max-w-7xl">
                {/* Header */}
                <Navigation />

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                  <div className="py-12">
                    {/* Timer Section */}
                    <div className="mb-24">
                      <Timer />
                    </div>
                    <AccountHistory />
                    <div ref={accountsRef}>
                      <AllAccounts />
                    </div>
                  </div>
                </main>

                {showAddAccountModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <AccountModal
                      mode="add"
                      onClose={() => setShowAddAccountModal(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </selectedAccountContext.Provider>
      </showAddAccountModalContext.Provider>
    </HomeContext.Provider>
  );
};

export default Page;
