import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Explore the latest trends shaping the web development landscape, from AI integration to new frameworks and performance optimization techniques.",
      date: "December 15, 2023",
      readTime: "5 min read",
      image: "/placeholder.svg",
      slug: "future-of-web-development-2024"
    },
    {
      title: "Building Accessible Web Applications: A Developer's Guide",
      excerpt: "Learn essential techniques for creating inclusive web applications that work for everyone, including best practices for ARIA, keyboard navigation, and screen readers.",
      date: "December 8, 2023",
      readTime: "8 min read",
      image: "/placeholder.svg",
      slug: "accessible-web-applications-guide"
    },
    {
      title: "Optimizing React Performance: Tips and Tricks",
      excerpt: "Discover proven strategies to improve your React application's performance, from component optimization to efficient state management.",
      date: "November 28, 2023",
      readTime: "6 min read",
      image: "/placeholder.svg",
      slug: "optimizing-react-performance"
    },
    {
      title: "CSS Grid vs Flexbox: When to Use Which",
      excerpt: "A comprehensive comparison of CSS Grid and Flexbox, with practical examples and guidelines for choosing the right layout method for your projects.",
      date: "November 20, 2023",
      readTime: "4 min read",
      image: "/placeholder.svg",
      slug: "css-grid-vs-flexbox"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Latest Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I enjoy sharing my knowledge and experiences through writing. Here are some of my 
            recent articles about web development, design, and technology trends.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={index} className="group shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <CardHeader>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-200">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <Button 
                  variant="ghost" 
                  className="text-accent hover:text-accent-foreground hover:bg-accent p-0 h-auto"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-full"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;