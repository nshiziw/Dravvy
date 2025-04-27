import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useResumeStore } from '@/store/useResumeStore';
import { Reference } from '@/types/resume';
import { referenceSchema } from '@/lib/validations/resume';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

type FormData = Omit<Reference, 'id'>;

export function ReferenceForm() {
  const { references, addReference, updateReference, removeReference } = useResumeStore();

  const form = useForm<FormData>({
    resolver: zodResolver(referenceSchema),
    defaultValues: {
      name: '',
      relationship: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = (data: FormData) => {
    addReference(data);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Former Manager" {...field} />
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
                  <Input type="email" placeholder="e.g. john.doe@example.com" {...field} />
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
                  <Input placeholder="e.g. +1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add Reference</Button>
        </form>
      </Form>

      <div className="grid gap-4">
        {references.map((reference) => (
          <Card key={reference.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">{reference.name}</p>
                <p className="text-sm text-muted-foreground">{reference.relationship}</p>
                <p className="text-sm">{reference.email}</p>
                <p className="text-sm">{reference.phone}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeReference(reference.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 