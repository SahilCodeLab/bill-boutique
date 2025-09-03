import { Card } from "@/components/ui/card";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  tax: number;
  total: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  companyLogo: string;
  clientName: string;
  clientAddress: string;
  clientTaxId: string;
  items: InvoiceItem[];
  notes: string;
  terms: string;
  discount: number;
}

interface InvoicePreviewProps {
  data: InvoiceData;
  template: string;
}

export function InvoicePreview({ data, template }: InvoicePreviewProps) {
  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const totalTax = data.items.reduce((sum, item) => sum + (item.quantity * item.rate * item.tax / 100), 0);
  const discountAmount = subtotal * (data.discount / 100);
  const total = subtotal + totalTax - discountAmount;

  if (template === "minimal") {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border text-black" style={{ minHeight: "420px", fontSize: "12px" }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{data.companyName || "Your Company"}</h1>
            <div className="text-gray-600 text-sm whitespace-pre-line mt-2">
              {data.companyAddress || "Your Company Address"}
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-800">INVOICE</h2>
            <div className="text-sm text-gray-600 mt-1">
              <div>#{data.invoiceNumber}</div>
              <div>Date: {data.date}</div>
              {data.dueDate && <div>Due: {data.dueDate}</div>}
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-700 mb-2">BILL TO:</div>
          <div className="text-sm text-gray-800">
            <div className="font-medium">{data.clientName || "Client Name"}</div>
            <div className="whitespace-pre-line text-gray-600 mt-1">
              {data.clientAddress || "Client Address"}
            </div>
            {data.clientTaxId && (
              <div className="text-gray-600 mt-1">Tax ID: {data.clientTaxId}</div>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-semibold text-gray-700">Description</th>
                <th className="text-center py-2 font-semibold text-gray-700 w-16">Qty</th>
                <th className="text-right py-2 font-semibold text-gray-700 w-20">Rate</th>
                <th className="text-right py-2 font-semibold text-gray-700 w-16">Tax%</th>
                <th className="text-right py-2 font-semibold text-gray-700 w-20">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 text-gray-800">{item.description || "Item description"}</td>
                  <td className="py-3 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-3 text-right text-gray-600">${item.rate.toFixed(2)}</td>
                  <td className="py-3 text-right text-gray-600">{item.tax}%</td>
                  <td className="py-3 text-right font-medium text-gray-800">${item.total.toFixed(2)}</td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    No items added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-64">
            <div className="flex justify-between py-1 text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-sm">
              <span className="text-gray-600">Tax:</span>
              <span className="text-gray-800">${totalTax.toFixed(2)}</span>
            </div>
            {data.discount > 0 && (
              <div className="flex justify-between py-1 text-sm">
                <span className="text-green-600">Discount ({data.discount}%):</span>
                <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-t border-gray-200 font-semibold">
              <span className="text-gray-700">Total:</span>
              <span className="text-gray-800">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        {(data.notes || data.terms) && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {data.notes && (
              <div>
                <div className="font-semibold text-gray-700 text-sm mb-1">Notes:</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{data.notes}</div>
              </div>
            )}
            {data.terms && (
              <div>
                <div className="font-semibold text-gray-700 text-sm mb-1">Terms & Conditions:</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{data.terms}</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Modern Template
  if (template === "modern") {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg text-black" style={{ minHeight: "420px", fontSize: "12px" }}>
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{data.companyName || "Your Company"}</h1>
              <div className="text-blue-100 text-sm mt-2 whitespace-pre-line">
                {data.companyAddress || "Your Company Address"}
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold">INVOICE</h2>
              <div className="text-sm text-blue-100 mt-1">
                <div>#{data.invoiceNumber}</div>
                <div>Date: {data.date}</div>
                {data.dueDate && <div>Due: {data.dueDate}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="text-sm font-semibold text-gray-700 mb-2">BILL TO:</div>
          <div className="text-sm">
            <div className="font-medium text-gray-800">{data.clientName || "Client Name"}</div>
            <div className="text-gray-600 mt-1 whitespace-pre-line">
              {data.clientAddress || "Client Address"}
            </div>
            {data.clientTaxId && (
              <div className="text-gray-600 mt-1">Tax ID: {data.clientTaxId}</div>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700 w-16">Qty</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700 w-20">Rate</th>
                <th className="text-right py-3 px-2 font-semibold text-gray-700 w-16">Tax%</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 w-20">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-3 px-4 text-gray-800">{item.description || "Item description"}</td>
                  <td className="py-3 px-2 text-center text-gray-600">{item.quantity}</td>
                  <td className="py-3 px-2 text-right text-gray-600">${item.rate.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right text-gray-600">{item.tax}%</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-800">${item.total.toFixed(2)}</td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    No items added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm w-64">
            <div className="flex justify-between py-1 text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-sm">
              <span className="text-gray-600">Tax:</span>
              <span className="text-gray-800">${totalTax.toFixed(2)}</span>
            </div>
            {data.discount > 0 && (
              <div className="flex justify-between py-1 text-sm">
                <span className="text-green-600">Discount ({data.discount}%):</span>
                <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-t border-gray-200 font-semibold text-lg">
              <span className="text-gray-700">Total:</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        {(data.notes || data.terms) && (
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
            {data.notes && (
              <div>
                <div className="font-semibold text-gray-700 text-sm mb-1">Notes:</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{data.notes}</div>
              </div>
            )}
            {data.terms && (
              <div>
                <div className="font-semibold text-gray-700 text-sm mb-1">Terms & Conditions:</div>
                <div className="text-sm text-gray-600 whitespace-pre-line">{data.terms}</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Corporate Template (default fallback)
  return (
    <div className="bg-white p-8 rounded-lg border-2 border-gray-800 text-black" style={{ minHeight: "420px", fontSize: "12px" }}>
      {/* Bold Header */}
      <div className="bg-gray-800 text-white p-6 -m-8 mb-6 rounded-t-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{data.companyName || "Your Company"}</h1>
            <div className="text-gray-300 text-sm mt-2 whitespace-pre-line">
              {data.companyAddress || "Your Company Address"}
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">INVOICE</h2>
            <div className="text-sm text-gray-300 mt-1">
              <div>#{data.invoiceNumber}</div>
              <div>Date: {data.date}</div>
              {data.dueDate && <div>Due: {data.dueDate}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Rest of corporate template similar to minimal but with bolder styling */}
      <div className="mb-6">
        <div className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">Bill To:</div>
        <div className="text-sm">
          <div className="font-bold text-gray-800">{data.clientName || "Client Name"}</div>
          <div className="text-gray-600 mt-1 whitespace-pre-line">
            {data.clientAddress || "Client Address"}
          </div>
          {data.clientTaxId && (
            <div className="text-gray-600 mt-1 font-medium">Tax ID: {data.clientTaxId}</div>
          )}
        </div>
      </div>

      {/* Items with bold borders */}
      <div className="mb-6 border-2 border-gray-800">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-3 font-bold">Description</th>
              <th className="text-center py-3 px-2 font-bold w-16">Qty</th>
              <th className="text-right py-3 px-2 font-bold w-20">Rate</th>
              <th className="text-right py-3 px-2 font-bold w-16">Tax%</th>
              <th className="text-right py-3 px-3 font-bold w-20">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-300">
                <td className="py-3 px-3 text-gray-800">{item.description || "Item description"}</td>
                <td className="py-3 px-2 text-center text-gray-600">{item.quantity}</td>
                <td className="py-3 px-2 text-right text-gray-600">${item.rate.toFixed(2)}</td>
                <td className="py-3 px-2 text-right text-gray-600">{item.tax}%</td>
                <td className="py-3 px-3 text-right font-bold text-gray-800">${item.total.toFixed(2)}</td>
              </tr>
            ))}
            {data.items.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">
                  No items added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bold totals */}
      <div className="flex justify-end mb-6">
        <div className="w-64 border-2 border-gray-800 p-4">
          <div className="flex justify-between py-1 text-sm font-medium">
            <span className="text-gray-600">Subtotal:</span>
            <span className="text-gray-800">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1 text-sm font-medium">
            <span className="text-gray-600">Tax:</span>
            <span className="text-gray-800">${totalTax.toFixed(2)}</span>
          </div>
          {data.discount > 0 && (
            <div className="flex justify-between py-1 text-sm font-medium">
              <span className="text-green-600">Discount ({data.discount}%):</span>
              <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-t-2 border-gray-800 font-bold text-lg">
            <span className="text-gray-800">TOTAL:</span>
            <span className="text-gray-800">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      {(data.notes || data.terms) && (
        <div className="space-y-4 pt-4 border-t-2 border-gray-800">
          {data.notes && (
            <div>
              <div className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wide">Notes:</div>
              <div className="text-sm text-gray-600 whitespace-pre-line">{data.notes}</div>
            </div>
          )}
          {data.terms && (
            <div>
              <div className="font-bold text-gray-800 text-sm mb-1 uppercase tracking-wide">Terms & Conditions:</div>
              <div className="text-sm text-gray-600 whitespace-pre-line">{data.terms}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}