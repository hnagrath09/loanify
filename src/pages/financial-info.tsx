import { z } from "zod";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/hooks/use-app-state";

const formSchema = z
  .object({
    ifscCode: z.string({ required_error: "Please enter your bank IFSC code" }),
    accountNumber: z.coerce.number(),
    repeatAccountNumber: z.coerce.number(),
  })
  .refine((data) => data.accountNumber === data.repeatAccountNumber, {
    message: "Account Number don't match",
    path: ["repeatAccountNumber"], // path of error
  });

export default function FinancialInfo() {
  const navigate = useNavigate();
  const [state, setState] = useAppState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: state,
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setState({ ...state, ...data });
    navigate("");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8 p-4">
          <h2 className="text-lg font-semibold">Bank Details</h2>

          <FormField
            name="ifscCode"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input placeholder="IFSC Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="accountNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Account Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="repeatAccountNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-enter Account Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Re-enter Account Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}
          >
            <Check className="mr-2 h-4 w-4" /> Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
