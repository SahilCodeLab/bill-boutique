import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Eye,
  Download,
  Star,
  Heart,
  Sparkles,
  Briefcase,
  Zap
} from "lucide-react";

const templatesData = [
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Simple and clean design perfect for professional services",
    preview: "bg-white border border-gray-200",
    category: "Professional",
    isPremium: false,
    rating: 4.8,
    downloads: 1250,
    icon: Sparkles,
    colors: ["#000000", "#ffffff", "#f8f9fa"]
  },
  {
    id: "modern",
    name: "Modern Gradient",
    description: "Contemporary design with beautiful gradients and modern styling",
    preview: "bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200",
    category: "Modern",
    isPremium: true,
    rating: 4.9,
    downloads: 890,
    icon: Zap,
    colors: ["#3b82f6", "#8b5cf6", "#f0f9ff"]
  },
  {
    id: "corporate",
    name: "Corporate Bold",
    description: "Bold and authoritative design ideal for corporate businesses",
    preview: "bg-white border-2 border-gray-800",
    category: "Corporate", 
    isPremium: true,
    rating: 4.7,
    downloads: 670,
    icon: Briefcase,
    colors: ["#1f2937", "#ffffff", "#f3f4f6"]
  },
  {
    id: "elegant",
    name: "Elegant Serif",
    description: "Sophisticated design with elegant typography and subtle styling",
    preview: "bg-gradient-to-b from-rose-50 to-pink-50 border border-rose-200",
    category: "Elegant",
    isPremium: true,
    rating: 4.6,
    downloads: 450,
    icon: Heart,
    colors: ["#e11d48", "#fdf2f8", "#f8fafc"]
  },
  {
    id: "creative",
    name: "Creative Studio",
    description: "Artistic and creative design perfect for design agencies",
    preview: "bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border border-orange-200",
    category: "Creative",
    isPremium: false,
    rating: 4.5,
    downloads: 320,
    icon: Palette,
    colors: ["#f97316", "#fef3c7", "#fffbeb"]
  },
  {
    id: "tech",
    name: "Tech Startup",
    description: "Modern tech-focused design with clean lines and bold accents",
    preview: "bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200",
    category: "Technology",
    isPremium: true,
    rating: 4.8,
    downloads: 590,
    icon: Zap,
    colors: ["#0891b2", "#67e8f9", "#f0fdff"]
  }
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = ["All", "Professional", "Modern", "Corporate", "Elegant", "Creative", "Technology"];

  const filteredTemplates = templatesData.filter(template =>
    selectedCategory === "All" || template.category === selectedCategory
  );

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoice Templates</h1>
          <p className="text-muted-foreground mt-1">
            Choose from our collection of beautiful, professional invoice templates
          </p>
        </div>
        <Button className="btn-gradient shadow-glow">
          <Palette className="w-4 h-4 mr-2" />
          Create Custom
        </Button>
      </div>

      {/* Category Filter */}
      <Card className="card-premium p-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "btn-gradient" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="card-premium overflow-hidden group animate-scale-in">
            {/* Preview */}
            <div className={`h-48 ${template.preview} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-white/90 rounded-lg shadow-lg p-4 transform scale-75 group-hover:scale-80 transition-transform">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="h-3 bg-gray-800 rounded w-16 mb-1"></div>
                      <div className="h-2 bg-gray-400 rounded w-20"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-2 bg-gray-600 rounded w-12 mb-1"></div>
                      <div className="h-2 bg-gray-400 rounded w-8"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 bg-gray-300 rounded w-full"></div>
                    <div className="h-1.5 bg-gray-300 rounded w-4/5"></div>
                    <div className="h-1.5 bg-gray-300 rounded w-3/5"></div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex justify-end">
                      <div className="h-2 bg-gray-800 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button size="sm" className="btn-gradient">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Use
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <template.icon className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">{template.name}</h3>
                    {template.isPremium && (
                      <Badge className="bg-gradient-primary text-primary-foreground mt-1">
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleFavorite(template.id)}
                  className={favorites.includes(template.id) ? "text-red-500" : "text-muted-foreground"}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(template.id) ? "fill-current" : ""}`} />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

              {/* Color Palette */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-muted-foreground">Colors:</span>
                <div className="flex gap-1">
                  {template.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-yellow-400" />
                  {template.rating}
                </div>
                <div>{template.downloads} downloads</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1 btn-gradient" size="sm">
                  Use Template
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="card-premium p-12">
          <div className="text-center">
            <Palette className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              Try selecting a different category or check back later for new templates
            </p>
            <Button className="btn-gradient">
              View All Templates
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}