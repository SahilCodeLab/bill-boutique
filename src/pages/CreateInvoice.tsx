import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";
import { 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  Send,
  Upload,
  Eye,
  Palette,
  Image
} from "lucide-react";
import html2canvas from "html2canvas";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  tax: number;
  total: number;
}

const initialInvoiceData = {
  invoiceNumber: "INV-001",
  date: new Date().toISOString().split('T')[0],
  dueDate: "",
  companyName: "Your Company",
  companyAddress: "",
  companyLogo: "",
  clientName: "",
  clientAddress: "",
  clientTaxId: "",
  items: [] as InvoiceItem[],
  notes: "",
  terms: "Payment is due within 30 days of invoice date.",
  discount: 0,
  template: "minimal"
};

export default function CreateInvoice() {
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");

  const downloadAsImage = async () => {
    const element = document.getElementById('invoice-preview');
    if (element) {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `invoice-${invoiceData.invoiceNumber}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      tax: 0,
      total: 0
    };
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate' || field === 'tax') {
            updatedItem.total = updatedItem.quantity * updatedItem.rate * (1 + updatedItem.tax / 100);
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const removeItem = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const totalTax = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.rate * item.tax / 100), 0);
  const discountAmount = subtotal * (invoiceData.discount / 100);
  const total = subtotal + totalTax - discountAmount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full animate-fade-in">
      {/* Form Panel */}
      <div className="space-y-6 max-h-screen overflow-y-auto pr-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create Invoice</h1>
            <p className="text-muted-foreground mt-1">
              Build professional invoices with live preview
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Palette className="w-4 h-4 mr-2" />
              Templates
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        {/* Company Details */}
        <Card className="card-premium p-6">
          <h3 className="text-lg font-semibold mb-4">Company Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={invoiceData.companyName}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, companyName: e.target.value }))}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                placeholder="INV-001"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Textarea
                id="companyAddress"
                value={invoiceData.companyAddress}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, companyAddress: e.target.value }))}
                placeholder="Enter company address"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="date">Invoice Date</Label>
              <Input
                id="date"
                type="date"
                value={invoiceData.date}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
          </div>
        </Card>

        {/* Client Details */}
        <Card className="card-premium p-6">
          <h3 className="text-lg font-semibold mb-4">Client Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={invoiceData.clientName}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, clientName: e.target.value }))}
                placeholder="Enter client name"
              />
            </div>
            <div>
              <Label htmlFor="clientTaxId">Tax ID / GST</Label>
              <Input
                id="clientTaxId"
                value={invoiceData.clientTaxId}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, clientTaxId: e.target.value }))}
                placeholder="Enter tax ID"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="clientAddress">Client Address</Label>
              <Textarea
                id="clientAddress"
                value={invoiceData.clientAddress}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, clientAddress: e.target.value }))}
                placeholder="Enter client address"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Items */}
        <Card className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Items & Services</h3>
            <Button onClick={addItem} size="sm" className="btn-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {invoiceData.items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 p-4 bg-background-secondary/30 rounded-lg">
                <div className="col-span-4">
                  <Label className="text-xs">Description</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Quantity</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Rate</Label>
                  <Input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Tax %</Label>
                  <Input
                    type="number"
                    value={item.tax}
                    onChange={(e) => updateItem(item.id, 'tax', parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-1">
                  <Label className="text-xs">Total</Label>
                  <div className="mt-1 p-2 bg-muted rounded text-sm font-medium">
                    ${item.total.toFixed(2)}
                  </div>
                </div>
                <div className="col-span-1 flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {invoiceData.items.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No items added yet. Click "Add Item" to get started.</p>
              </div>
            )}
          </div>

          {invoiceData.items.length > 0 && (
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>${totalTax.toFixed(2)}</span>
                  </div>
                  {invoiceData.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({invoiceData.discount}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold border-t border-border pt-2">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Notes & Terms */}
        <Card className="card-premium p-6">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={invoiceData.discount}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                placeholder="Enter discount percentage"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any notes or special instructions"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="terms">Terms & Conditions</Label>
              <Textarea
                id="terms"
                value={invoiceData.terms}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, terms: e.target.value }))}
                placeholder="Payment terms and conditions"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-2 pb-6">
          <Button className="btn-gradient flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={downloadAsImage}>
            <Image className="w-4 h-4 mr-2" />
            Download Image
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline">
            <Send className="w-4 h-4 mr-2" />
            Send Invoice
          </Button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="lg:sticky lg:top-6">
        <Card className="card-premium h-fit">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Live Preview</h3>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="p-4">
            <div id="invoice-preview">
              <InvoicePreview data={invoiceData} template={selectedTemplate} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}