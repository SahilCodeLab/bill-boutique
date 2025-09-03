import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  User, 
  Building, 
  Bell,
  Palette,
  Shield,
  CreditCard,
  Download,
  Upload
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    invoiceReminders: true,
    paymentAlerts: false,
    marketingEmails: false,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and application settings
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="card-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Profile Information</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <Button className="btn-gradient">Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Company Settings */}
        <TabsContent value="company">
          <Card className="card-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Company Information</h3>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="InvoicePro Inc." />
                </div>
                <div>
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input id="taxId" defaultValue="12-3456789" />
                </div>
              </div>

              <div>
                <Label htmlFor="companyAddress">Address</Label>
                <Textarea
                  id="companyAddress"
                  defaultValue="123 Business Street&#10;Suite 100&#10;New York, NY 10001"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="https://invoicepro.com" />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="consulting">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="logo">Company Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold">
                    IP
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>

              <Button className="btn-gradient">Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="card-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Notification Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="invoiceReminders">Invoice Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders for overdue invoices
                    </p>
                  </div>
                  <Switch
                    id="invoiceReminders"
                    checked={notifications.invoiceReminders}
                    onCheckedChange={(checked) =>
                      setNotifications(prev => ({ ...prev, invoiceReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paymentAlerts">Payment Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Instant alerts when payments are received
                    </p>
                  </div>
                  <Switch
                    id="paymentAlerts"
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications(prev => ({ ...prev, paymentAlerts: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive tips, updates, and promotional content
                    </p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotifications(prev => ({ ...prev, marketingEmails: checked }))
                    }
                  />
                </div>
              </div>

              <Button className="btn-gradient">Save Preferences</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance">
          <Card className="card-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Appearance Settings</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Choose your preferred color scheme
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                    <div className="w-full h-8 bg-white border border-gray-200 rounded mb-2"></div>
                    <p className="text-sm font-medium">Light</p>
                  </div>
                  <div className="p-4 border border-primary rounded-lg cursor-pointer bg-primary/5">
                    <div className="w-full h-8 bg-gradient-primary rounded mb-2"></div>
                    <p className="text-sm font-medium">Auto</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                    <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                    <p className="text-sm font-medium">Dark</p>
                  </div>
                </div>
              </div>

              <div>
                <Label>Brand Colors</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Customize your brand colors for invoices
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input id="primaryColor" defaultValue="#6366f1" className="flex-1" />
                      <div className="w-10 h-10 rounded border" style={{ backgroundColor: "#6366f1" }}></div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input id="secondaryColor" defaultValue="#8b5cf6" className="flex-1" />
                      <div className="w-10 h-10 rounded border" style={{ backgroundColor: "#8b5cf6" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="btn-gradient">Save Settings</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing">
          <Card className="card-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Billing & Subscription</h3>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-success">Pro Plan</h4>
                    <p className="text-sm text-success/80">Your subscription is active</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">$29/month</p>
                    <p className="text-sm text-success/80">Next billing: Jan 15, 2024</p>
                  </div>
                </div>
              </div>

              <div>
                <Label>Payment Method</Label>
                <div className="mt-2 p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="btn-gradient">Manage Subscription</Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card className="card-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Security Settings</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label>Change Password</Label>
                <div className="mt-2 space-y-3">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button className="mt-3">Update Password</Button>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <Label>Active Sessions</Label>
                <div className="mt-2 space-y-2">
                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on MacOS • New York, NY</p>
                      </div>
                      <span className="text-sm text-success">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}