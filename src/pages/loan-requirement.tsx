import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppState } from "@/hooks/use-app-state";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  amountRequired: z.coerce.number().min(0).max(1000000),
  loanPurpose: z.enum(
    ["home-loan", "personal-loan", "education-loan", "vehicle-loan"],
    { required_error: "Please select your loan purpose!" },
  ),
});

export default function LoadRequirement() {
  const navigate = useNavigate();
  const [state, setState] = useAppState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: state,
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setState({ ...state, ...data });
    navigate("/soft-offer");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8 p-4">
          <h2 className="text-lg font-semibold">Loan Requirement</h2>

          <FormField
            name="amountRequired"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Loan Amount</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Slider
                      min={0}
                      step={1}
                      max={1000000}
                      value={[field.value]}
                      onValueChange={field.onChange}
                    />
                    <Input
                      {...field}
                      type="number"
                      className="w-20"
                      value={`${field.value}`}
                      placeholder="Enter required loan amount"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="loanPurpose"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Purpose</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan purpose" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="home-loan">Home Loan</SelectItem>
                    <SelectItem value="personal-loan">Personal Loan</SelectItem>
                    <SelectItem value="education-loan">
                      Education Loan
                    </SelectItem>
                    <SelectItem value="vehicle-loan">Vehicle Loan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/personal-information")}
            >
              <ChevronLeft />
              Back
            </Button>

            <Button
              type="submit"
              className="w-full"
              onClick={form.handleSubmit(onSubmit)}
            >
              Proceed <ChevronRight />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
