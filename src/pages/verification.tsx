import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Otp from '@/components/ui/otp';
import { Button } from '@/components/ui/button';

const formSchema = z
  .object({
    otp: z.coerce.number({
      required_error: 'Please enter valid otp received on sms',
    }),
  })
  .refine(({ otp }) => otp === 1234, {
    message: 'Please enter valid otp received on sms',
    path: ['otp'],
  });

export default function Verfication() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: undefined },
  });

  function onSubmit() {
    navigate('/personal-information', { replace: true });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8 p-4">
          <h2 className="text-lg font-semibold">Phone Verification</h2>

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter OTP</FormLabel>
                <FormControl>
                  <Otp length={4} onOtpChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            Submit <ChevronRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
