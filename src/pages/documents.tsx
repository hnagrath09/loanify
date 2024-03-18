import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/hooks/use-app-state";
import { Separator } from "@/components/ui/separator";
import {
  businessIncomeProof,
  individualIncomeProof,
} from "@/constants/income-proof";
import {
  salariedEmploymentProof,
  selfEmployedProof,
} from "@/constants/employment-proof";

const formSchema = z.object({
  identityProof: z.enum(
    ["aadhaar", "pan", "passport", "voter", "drivingLicense"],
    { required_error: "Please select document" },
  ),
  identityProofDocument: z
    .any()
    .refine((files) => files?.length == 1, "Required document."),
  addressProof: z.enum(
    [
      "aadhaar",
      "passport",
      "utility",
      "voter",
      "rentalAgreement",
      "propertyTax",
    ],
    { required_error: "Please select document" },
  ),
  addressProofDocument: z
    .any()
    .refine((files) => files?.length == 1, "Required document."),
  incomeProof: z.enum(
    ["salarySlips", "bankStatement", "ITR", "financialStatement"],
    { required_error: "Please select document" },
  ),
  incomeProofDocument: z
    .any()
    .refine((files) => files?.length === 1, "Required document."),
  employmentProof: z.enum(
    [
      "employerIdCard",
      "employmentLetter",
      "salarySlips",
      "businessLicense",
      "gstCertificate",
      "MoAorAoA",
    ],
    { required_error: "Please select document" },
  ),
  employementProofDocument: z
    .any()
    .refine((files) => files?.length === 1, "Required document."),
  passportPhotograph: z
    .any()
    .refine((files) => files?.length === 1, "Required document."),
});

export default function Documents() {
  const navigate = useNavigate();
  const [state, setState] = useAppState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: state,
  });

  const { employmentType } = state;

  const idProof = form.watch("identityProof");
  const addressProof = form.watch("addressProof");
  const incomeProof = form.watch("incomeProof");
  const employmentProof = form.watch("employmentProof");

  const incomeProofOptions =
    employmentType === "salaried" ? individualIncomeProof : businessIncomeProof;

  const employmentProofOptions =
    employmentType === "salaried" ? salariedEmploymentProof : selfEmployedProof;

  function onSubmit(data: z.infer<typeof formSchema>) {
    setState({ ...state, ...data });
    navigate("/financial-info");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8 p-4">
          <h2 className="text-lg font-semibold">Upload Documents</h2>

          <FormField
            control={form.control}
            name="identityProof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identity Proof</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Identity Document" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar</SelectItem>
                      <SelectItem value="pan">Pan Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="voter">Voter's ID Card</SelectItem>
                      <SelectItem value="drivingLicense">
                        Driving License
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="identityProofDocument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identity Proof Document</FormLabel>
                <FormControl>
                  <Input type="file" disabled={!idProof} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="addressProof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Proof</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Address Document" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="utility">
                        Utility Bills (Water, Electricity, Gas)
                      </SelectItem>
                      <SelectItem value="voter">Voter's' ID Card</SelectItem>
                      <SelectItem value="rentalAgreement">
                        Rental Agreement
                      </SelectItem>
                      <SelectItem value="propertyTax">
                        Property Tax Receipt
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressProofDocument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Proof Document</FormLabel>
                <FormControl>
                  <Input type="file" disabled={!addressProof} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="incomeProof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Income Proof</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Income Document" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {incomeProofOptions.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="incomeProofDocument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Income Proof Document</FormLabel>
                <FormControl>
                  <Input type="file" disabled={!incomeProof} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="employmentProof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Proof</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Employment Document" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employmentProofOptions.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employementProofDocument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Proof Document</FormLabel>
                <FormControl>
                  <Input type="file" disabled={!employmentProof} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="passportPhotograph"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport Photograph</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/soft-offer")}
            >
              <ChevronLeft /> Back
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
