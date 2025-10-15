import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { MapPin, Mail, Phone } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Please provide a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const handleSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);
    toast.success("Thanks for reaching out! We'll reply soon.");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-gray-900 dark:to-gray-950 py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent drop-shadow">
            Get in Touch
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions or feedback? Fill out the form or contact us directly — we’d love to hear from you.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Info */}
          <Card className="shadow-lg border-0 rounded-2xl bg-white/90 dark:bg-gray-900/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-600">Contact Info</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                You can reach us via the following channels:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-4">
                <span className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </span>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p>123 Main Street, Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <Mail className="h-6 w-6 text-orange-600" />
                </span>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>{  "contact@delivery.com"}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <Phone className="h-6 w-6 text-orange-600" />
                </span>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p>{  "+880 1234 567 890"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right: Form */}
          <Card className="shadow-lg border-0 rounded-2xl bg-white/90 dark:bg-gray-900/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-600">Send a Message</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                We’ll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-orange-600 font-semibold">Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your full name"
                            className="bg-orange-50/30 dark:bg-gray-800 border-orange-200 dark:border-gray-700 focus:ring-orange-500 focus:border-orange-500"
                          />
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
                        <FormLabel className="text-orange-600 font-semibold">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="you@example.com"
                            className="bg-orange-50/30 dark:bg-gray-800 border-orange-200 dark:border-gray-700 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-orange-600 font-semibold">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Write your message..."
                            className="min-h-[100px] bg-orange-50/30 dark:bg-gray-800 border-orange-200 dark:border-gray-700 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold py-3 rounded-full shadow hover:opacity-90 transition-all"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} LogistiCore — All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Contact;
