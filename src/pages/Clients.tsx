import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Plus, 
  Search,
  Mail,
  Phone,
  MapPin,
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

const clientsData = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, New York, NY 10001",
    totalInvoices: 12,
    totalAmount: 25600,
    status: "active",
  },
  {
    id: "2",
    name: "Tech Solutions Inc",
    email: "hello@techsolutions.com",
    phone: "+1 (555) 987-6543",
    address: "456 Innovation Ave, San Francisco, CA 94102",
    totalInvoices: 8,
    totalAmount: 18400,
    status: "active",
  },
  {
    id: "3",
    name: "Creative Design Studio",
    email: "info@creativedesign.com",
    phone: "+1 (555) 456-7890",
    address: "789 Art District, Los Angeles, CA 90210",
    totalInvoices: 15,
    totalAmount: 32100,
    status: "active",
  },
  {
    id: "4",
    name: "Marketing Solutions Co",
    email: "team@marketingsolutions.com",
    phone: "+1 (555) 321-9876",
    address: "321 Commerce Blvd, Chicago, IL 60601",
    totalInvoices: 5,
    totalAmount: 9800,
    status: "inactive",
  },
];

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-1">
            Manage your client relationships and contact information
          </p>
        </div>
        <Button className="btn-gradient shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search */}
      <Card className="card-premium p-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="card-premium p-6 animate-scale-in">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  <Badge variant={client.status === "active" ? "default" : "secondary"} className="mt-1">
                    {client.status}
                  </Badge>
                </div>
              </div>
              
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
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{client.phone}</span>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span className="line-clamp-2">{client.address}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">{client.totalInvoices}</p>
                  <p className="text-muted-foreground">Invoices</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">${client.totalAmount.toLocaleString()}</p>
                  <p className="text-muted-foreground">Total</p>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border">
              <Button className="w-full" variant="outline" size="sm">
                View Invoices
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card className="card-premium p-12">
          <div className="text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No clients found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first client"}
            </p>
            <Button className="btn-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}