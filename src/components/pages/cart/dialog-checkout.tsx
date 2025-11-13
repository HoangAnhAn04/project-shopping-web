import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { email, z } from 'zod';
import validator from 'validator';
import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const checkoutFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Ít nhất 2 ký tự',
  }),
  email: z.string().email().or(z.literal('')),
  phone: z.string().refine(
    (phone) => {
      return validator.isMobilePhone(phone, 'vi-VN');
    },
    { message: 'Số điện thoại không hợp lệ' }
  ),
  address: z.string().min(10, {
    message: 'Ít nhất 10 ký tự',
  }),
});

export default function DialogCheckout(props: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  const [loading, setLoading] = React.useState(false);
  async function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log({ values });
  }

  return (
    <Dialog open={props.open} onOpenChange={(open) => props.onOpenChange(open)}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Thông tin đơn hàng</DialogTitle>
              <DialogDescription>
                Vui lòng điền đầy đủ thông tin để hoàn tất đơn hàng
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên người nhận*</FormLabel>
                    <FormControl>
                      <Input disabled={loading} required placeholder="Người nhận..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" disabled={loading} placeholder="Email" {...field} />
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
                    <FormLabel>Số điện thoại*</FormLabel>
                    <FormControl>
                      <Input disabled={loading} required placeholder="Số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ*</FormLabel>
                    <FormControl>
                      <Input disabled={loading} required placeholder="Địa chỉ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Xác nhận</Button>
              <Button type="button" variant={'outline'} onClick={() => props.onOpenChange(false)}>
                Hủy
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
