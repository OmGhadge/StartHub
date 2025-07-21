"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();
  const [founders, setFounders] = useState("");
  const [status, setStatus] = useState("");
  const [raisedAmount, setRaisedAmount] = useState("");
  const [website, setWebsite] = useState("");
  const [fundedDate, setFundedDate] = useState("");

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
        status,
        raisedAmount,
        founders,
        website,
        fundedDate,
      };
      await formSchema.parseAsync(formValues);
      const result = await createPitch(prevState, formData, pitch, status, raisedAmount, founders, website, 0, fundedDate);
      if (result.status == "SUCCESS") {
        toast("Success! Your startup pitch has been created successfully");
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;
        setErrors(fieldErorrs as unknown as Record<string, string>);
        toast("Error: Please check your inputs and try again");
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast("Error: An unexpected error has occurred");
      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
      className="max-w-2xl mx-auto bg-white/90 my-10 space-y-8 px-8 py-10 rounded-2xl shadow-xl border border-gray-200"
    >
      <div>
        <Toaster />
        <label htmlFor="title" className="font-bold text-lg text-gray-900 uppercase">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="border-2 border-gray-300 px-5 py-4 text-base text-gray-900 font-semibold rounded-full mt-3 placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black transition"
          required
          placeholder="Startup Title"
        />
        {errors.title && <p className="text-red-500 mt-2 ml-5 text-sm">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="font-bold text-lg text-gray-900 uppercase">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="border-2 border-gray-300 p-5 text-base text-gray-900 font-semibold rounded-2xl mt-3 placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black transition"
          required
          placeholder="Startup Description"
        />
        {errors.description && (
          <p className="text-red-500 mt-2 ml-5 text-sm">{errors.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="font-bold text-lg text-gray-900 uppercase">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="border-2 border-gray-300 px-5 py-4 text-base text-gray-900 font-semibold rounded-full mt-3 placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black transition"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />
        {errors.category && (
          <p className="text-red-500 mt-2 ml-5 text-sm">{errors.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="link" className="font-bold text-lg text-gray-900 uppercase">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="border-2 border-gray-300 px-5 py-4 text-base text-gray-900 font-semibold rounded-full mt-3 placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black transition"
          required
          placeholder="Startup Image URL"
        />
        {errors.link && <p className="text-red-500 mt-2 ml-5 text-sm">{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="font-bold text-lg text-gray-900 uppercase">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="text-red-500 mt-2 ml-5 text-sm">{errors.pitch}</p>}
      </div>
      <div>
        <label htmlFor="status" className="font-bold text-lg text-gray-900 uppercase">
          Fundraiser Status
        </label>
        <select
          id="status"
          name="status"
          className="border-2 border-gray-300 px-4 py-2 text-base text-gray-900 font-semibold rounded-full mt-3 focus:border-black focus:ring-2 focus:ring-black transition h-10"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        >
          <option value="">Select status</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
          <option value="Series B">Series B</option>
          <option value="Series C">Series C</option>
          <option value="IPO">IPO</option>
          <option value="Bootstrapped">Bootstrapped</option>
        </select>
        {errors.status && <p className="text-red-500 mt-2 ml-5 text-sm">{errors.status}</p>}
      </div>
      <div>
        <label htmlFor="raisedAmount" className="font-bold text-lg text-gray-900 uppercase">
          Raised Amount (in millions)
        </label>
        <Input
          id="raisedAmount"
          name="raisedAmount"
          type="number"
          min="0"
          step="0.01"
          className="border-2 border-gray-300 px-5 py-4 text-base text-gray-900 font-semibold rounded-full mt-3 placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black transition"
          value={raisedAmount}
          onChange={e => setRaisedAmount(e.target.value)}
          placeholder="e.g. 3.99 for $3.99M"
        />
        {errors.raisedAmount && <p className="text-red-500 mt-2 ml-5 text-sm">{errors.raisedAmount}</p>}
      </div>
      <div>
        <label htmlFor="fundedDate" className="font-bold text-lg text-gray-900 uppercase">
          Last Funded Date
        </label>
        <Input
          id="fundedDate"
          name="fundedDate"
          type="date"
          className="border-2 border-gray-300 px-5 py-4 text-base text-gray-900 font-semibold rounded-full mt-3 focus:border-black focus:ring-2 focus:ring-black transition"
          value={fundedDate}
          onChange={e => setFundedDate(e.target.value)}
        />
        {errors.fundedDate && <p className="text-red-500 mt-2 ml-5 text-sm">{errors.fundedDate}</p>}
      </div>
      <div>
        <label htmlFor="founders" className="font-bold text-lg text-gray-900 uppercase">
          Founders
        </label>
        <Input
          id="founders"
          name="founders"
          className="border-2 border-gray-300 px-5 py-4 text-base text-gray-900 font-semibold rounded-full mt-3 placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black transition"
          value={founders}
          onChange={e => setFounders(e.target.value)}
          placeholder="Comma-separated names (e.g. John Doe, Jane Smith)"
        />
        {errors.founders && <p className="text-red-500 mt-2 ml-5 text-sm">{errors.founders}</p>}
      </div>
      <div>
        <label htmlFor="website" className="font-bold text-lg text-gray-900 uppercase">
          Website
        </label>
        <Input
          id="website"
          name="website"
          type="url"
          className="border-2 border-gray-300 px-5 py-4 text-base text-gray-900 font-semibold rounded-full mt-3 placeholder:text-gray-400 focus:border-black focus:ring-2 focus:ring-black transition"
          value={website}
          onChange={e => setWebsite(e.target.value)}
          placeholder="https://yourstartup.com"
        />
        {errors.website && <p className="text-red-500 mt-2 ml-5 text-sm">{errors.website}</p>}
      </div>
      <Button
        type="submit"
        className="bg-black border-2 border-black rounded-full p-5 min-h-[56px] w-full font-bold text-base text-white shadow hover:bg-gray-900 hover:border-gray-900 transition disabled:opacity-60"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;