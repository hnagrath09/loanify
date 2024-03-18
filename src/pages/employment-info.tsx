import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useAppState } from "@/hooks/use-app-state";
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
import { bankList } from "@/constants/banks";

const formSchema = z.discriminatedUnion("employmentType", [
  z.object({
    employmentType: z.literal("salaried"),
    employerName: z.string({
      required_error: "Please enter your employer name",
    }),
    monthlyIncome: z.string().transform((val) => parseInt(val)),
    yearsOfExperience: z.string().transform((val) => parseInt(val)),
    officeAddress: z.string(),
    salaryBank: z.enum(
      ["sbi", "hdfc", "icici", "pnb", "axis", "kotak mahindra", "other"],
      { required_error: "Please select the bank you have salary account with" },
    ),
  }),

  z.object({
    employmentType: z.literal("self-employed"),
    businessName: z.string(),
    natureOfBusiness: z.string(),
    typeOfBusinessEntity: z.string(),
    businessPan: z
      .string({ required_error: "Please enter your Business PAN number" })
      .length(10),
    businessAnnualIncome: z.number(),
    businessVintage: z.string(),
    businessAddress: z.string(),
  }),
]);

export default function EmploymentInfo() {
  const navigate = useNavigate();
  const [state, setState] = useAppState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: state,
  });

  const employmentType = form.watch("employmentType");

  function onSubmit(data: z.infer<typeof formSchema>) {
    setState({ ...state, ...data });
    navigate("/loan-requirement");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8 p-4">
          <h2 className="text-lg font-semibold">Employment Information</h2>

          <FormField
            name="employmentType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="salaried">Salaried</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {employmentType === "salaried" && (
            <>
              <FormField
                control={form.control}
                name="employerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your employer name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          minimumFractionDigits: 0,
                        }).format(+field.value)}
                        onChange={(event) => {
                          const value = event.target.value;
                          const newValue = Number(
                            value.replace(/[^0-9.-]+/g, ""),
                          );
                          field.onChange(newValue);
                        }}
                        placeholder="Enter your monthly income"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your years of experience"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="officeAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your office address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="salaryBank"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Account Bank Name</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select salary account bank" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bankList.map(({ icon, value, label }) => (
                          <SelectItem key={value} value={value}>
                            <div className="flex items-center">
                              {icon && (
                                <img
                                  className="mr-2 inline h-4 w-4"
                                  src={icon}
                                />
                              )}
                              <span>{label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {employmentType === "self-employed" && (
            <>
              <FormField
                name="businessName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your business name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="natureOfBusiness"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nature of Business</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your business vintage"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="typeOfBusinessEntity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Business Entity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your business entity type"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="businessPan"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business PAN Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your business PAN number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="businessAnnualIncome"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Annual Income</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your business annual income"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="businessVintage"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Vintage</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your business annual income"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="businessAddress"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your business address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

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
