import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const invoicesData = [
  {
    id: "INV-001",
    client: "Acme Corporation",
    amount: 2500,
    status: "paid",
    date: "2024-01-15",
    dueDate: "2024-02-15",
  },
  {
    id: "INV-002", 
    client: "Tech Solutions Inc",
    amount: 1800,
    status: "pending",
    date: "2024-01-14",
    dueDate: "2024-02-14",
  },
  {
    id: "INV-003",
    client: "Creative Design Studio",
    amount: 3200,
    status: "paid",
    date: "2024-01-13",
    dueDate: "2024-02-13",
  },
  {
    id: "INV-004",
    client: "Marketing Solutions Co",
    amount: 950,
    status: "overdue",
    date: "2024-01-10",
    dueDate: "2024-01-25",
  },
  {
    id: "INV-005",
    client: "Digital Agency",
    amount: 4200,
    status: "draft",
    date: "2024-01-12",
    dueDate: "2024-02-12",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-success/10 text-success hover:bg-success/20">Paid</Badge>;
    case "pending":
      return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Pending</Badge>;
    case "overdue":
      return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Overdue</Badge>;
    case "draft":
      return <Badge className="bg-muted text-muted-foreground hover:bg-muted/80">Draft</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredInvoices = invoicesData.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your invoices
          </p>
        </div>
        <Button className="btn-gradient shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-premium p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Invoices List */}
      <Card className="card-premium">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">All Invoices</h3>
            <div className="text-sm text-muted-foreground">
              {filteredInvoices.length} of {invoicesData.length} invoices
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background-secondary/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Invoice</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Client</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Due Date</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border hover:bg-background-secondary/30 transition-colors">
                  <td className="p-4 font-medium text-foreground">{invoice.id}</td>
                  <td className="p-4 text-foreground">{invoice.client}</td>
                  <td className="p-4 font-semibold text-foreground">${invoice.amount.toLocaleString()}</td>
                  <td className="p-4">{getStatusBadge(invoice.status)}</td>
                  <td className="p-4 text-muted-foreground">{invoice.date}</td>
                  <td className="p-4 text-muted-foreground">{invoice.dueDate}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No invoices found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first invoice"}
              </p>
              <Button className="btn-gradient">
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}