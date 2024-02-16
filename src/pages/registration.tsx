import { z } from 'zod';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAppState } from '@/hooks/use-app-state';

const formSchema = z.object({
  phone: z
    .string({ required_error: 'Please enter your phone number' })
    .refine(validator.isMobilePhone, { message: 'Enter a valid phone number' }),
});

export default function Registration() {
  const [state, setState] = useAppState();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: state,
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setState({ ...state, ...data });
    navigate('/verification', { replace: true });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8 p-4">
          <h2 className="text-lg font-semibold">User Registration</h2>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormDescription>
                  We'll send a verification code via sms on your number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}
          >
            Get Verification Code <ChevronRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
