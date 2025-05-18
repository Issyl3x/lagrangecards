"use client";

import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { TransactionForm, type TransactionFormValues } from "../components/TransactionForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { addTransactionToMockData } from "@/lib/mock-data";
import type { Transaction } from "@/lib/types";

export default function AddTransactionPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: TransactionFormValues) => {
    setIsLoading(true);

    // 📤 Send webhook to Make
    await fetch("https://hook.us2.make.com/y7mimw79elkvk3dm3x86xu7v373ah4f2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property: data.property,
        amount: data.amount,
        category: data.category,
        note: data.note || "",
        submittedBy: "jessrafalfernandez@gmail.com",
        submittedAt: new Date().toISOString(),
      }),
    });

    // 💾 Save locally
    const newTransactionData: Transaction = {
      id: uuidv4(),
      ...data,
      date: format(data.date, "yyyy-MM-dd"),
      property: data.property,
      unitNumber: data.unitNumber || "",
      receiptImageURI: data.receiptImageURI || "",
      reconciled: false,
      sourceType: data.sourceType || "manual",
    };

    addTransactionToMockData(newTransactionData);
    console.log("New Transaction Added via addTransactionToMockData:", newTransactionData);

    // ⏱ Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // ✅ Toast confirmation
    toast({
      title: "Transaction Saved",
      description: (
        <>
          Transaction for <b>{data.vendor}</b> of ${data.amount.toFixed(2)} has been saved.
          <br />
          <em className="text-xs text-muted-foreground">
            (Simulated: Webhook notification would be sent to work email.)
          </em>
        </>
      ),
    });

    setIsLoading(false);

    // 🔁 Redirect to transactions page
    router.push("/transactions");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Transaction</CardTitle>
        <CardDescription>Fill in the details for the new transaction.</CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionForm onSubmit={handleSubmit} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
