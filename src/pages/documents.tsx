import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppState } from "@/hooks/use-app-state";

const formSchema = z.object({
  identityProof: z.enum([
    "aadhaar",
    "pan",
    "passport",
    "voter",
    "drivingLicense",
  ]),
});

export default function Documents() {
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
          <h2 className="text-lg font-semibold">Upload Documents</h2>

          <FormField
            control={form.control}
            name="identityProof"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name as per your PAN</FormLabel>
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
                      <SelectItem value="voter">Voter ID Card</SelectItem>
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
        </div>
      </form>
    </Form>
  );
}
