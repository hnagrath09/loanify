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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAppState } from '@/hooks/use-app-state';

const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().refine(validator.isMobilePhone),
  password: z.string().min(8),
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
    navigate('/personal-information');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8 p-4">
          <h2 className="text-lg font-semibold">User Registration</h2>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
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
            Proceed <ChevronRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
