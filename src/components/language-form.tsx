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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useResumeStore } from '@/store/useResumeStore';
import { Language } from '@/types/resume';
import { languageSchema } from '@/lib/validations/resume';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

type FormData = Omit<Language, 'id'>;

export function LanguageForm() {
  const { languages, addLanguage, updateLanguage, removeLanguage } = useResumeStore();

  const form = useForm<FormData>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      name: '',
      proficiency: 'Basic',
    },
  });

  const onSubmit = (data: FormData) => {
    addLanguage(data);
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
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. English" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="proficiency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proficiency Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select proficiency level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Native">Native</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add Language</Button>
        </form>
      </Form>

      <div className="grid gap-4">
        {languages.map((language) => (
          <Card key={language.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{language.name}</p>
                <p className="text-sm text-muted-foreground">{language.proficiency}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeLanguage(language.id)}
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