import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  Eye,
  Download
} from "lucide-react";

const statsData = [
  {
    title: "Total Invoices",
    value: "156",
    change: "+12%",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Revenue",
    value: "$45,230",
    change: "+8%",
    icon: DollarSign,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Pending",
    value: "23",
    change: "-4%",
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "Paid",
    value: "133",
    change: "+15%",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const recentInvoices = [
  {
    id: "INV-001",
    client: "Acme Corp",
    amount: "$2,500",
    status: "paid",
    date: "2024-01-15",
  },
  {
    id: "INV-002", 
    client: "Tech Solutions",
    amount: "$1,800",
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "INV-003",
    client: "Design Studio",
    amount: "$3,200",
    status: "paid",
    date: "2024-01-13",
  },
  {
    id: "INV-004",
    client: "Marketing Co",
    amount: "$950",
    status: "overdue",
    date: "2024-01-10",
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
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your invoices.
          </p>
        </div>
        <Button className="btn-gradient shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={stat.title} className="card-premium p-6 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
                <p className={`text-sm mt-2 ${stat.color}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Invoices */}
        <Card className="card-premium lg:col-span-2">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Invoices</h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg bg-background-secondary/50 hover:bg-background-secondary transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.client}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{invoice.amount}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                    {getStatusBadge(invoice.status)}
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="card-premium">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          
          <div className="p-6 space-y-3">
            <Button className="w-full justify-start btn-gradient">
              <Plus className="w-4 h-4 mr-3" />
              Create New Invoice
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-3" />
              Add New Client
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-3" />
              View Reports
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-3" />
              Browse Templates
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}