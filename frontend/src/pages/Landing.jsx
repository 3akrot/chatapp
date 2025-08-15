import { Link } from 'react-router-dom';
import { MessageCircle, Users, Shield, Palette, Image, Zap, Globe, Heart } from 'lucide-react';

export const Landing = () => {
  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-time Messaging",
      description: "Send and receive messages instantly with our lightning-fast real-time chat system."
    },
    {
      icon: <Image className="w-8 h-8" />,
      title: "Image Sharing",
      description: "Share photos and images seamlessly with integrated Cloudinary support for optimal performance."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "User Discovery",
      description: "Find and connect with other users easily through our intuitive user discovery system."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Authentication",
      description: "Your conversations are protected with JWT-based authentication and secure password encryption."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Theme Customization",
      description: "Personalize your chat experience with multiple theme options including dark and light modes."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Profile Management",
      description: "Customize your profile with profile pictures and manage your account settings effortlessly."
    }
  ];

  const stats = [
    { number: "100%", label: "Real-time" },
    { number: "∞", label: "Messages" },
    { number: "24/7", label: "Available" },
    { number: "100%", label: "Secure" }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-screen pt-24  bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <MessageCircle className="w-24 h-24 text-primary animate-pulse" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Welcome to Chatty
            </h1>
            
            <p className="text-xl text-base-content/80 mb-8 max-w-2xl mx-auto">
              Connect, chat, and share moments with friends in real-time. Experience seamless messaging 
              with modern features designed for today's digital conversations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/signup" className="btn btn-primary btn-lg px-8">
                Get Started Free
                <Zap className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg px-8">
                Sign In
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-base-content/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              Why Choose Chatty?
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Built with modern technology and user experience in mind, Chatty offers everything 
              you need for seamless communication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="card-body items-center text-center">
                  <div className="text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="py-20 bg-base-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-base-content mb-8">
            Built with Modern Technology
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <span className="font-semibold">React</span>
              <span className="text-sm text-base-content/60">Frontend</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-3">
                <Zap className="w-8 h-8 text-success" />
              </div>
              <span className="font-semibold">Node.js</span>
              <span className="text-sm text-base-content/60">Backend</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mb-3">
                <Shield className="w-8 h-8 text-warning" />
              </div>
              <span className="font-semibold">MongoDB</span>
              <span className="text-sm text-base-content/60">Database</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                <MessageCircle className="w-8 h-8 text-secondary" />
              </div>
              <span className="font-semibold">Socket.IO</span>
              <span className="text-sm text-base-content/60">Real-time</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Chatting?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already enjoying seamless conversations on Chatty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn btn-white btn-lg px-8">
              Create Account
              <Users className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/login" className="btn btn-outline btn-white btn-lg px-8">
              Sign In Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className=" grid grid-cols-1 place-items-center place-content-center sm:grid-cols-2  p-10 bg-base-200 text-base-content">
        <div>
          <MessageCircle className="w-12 h-12 text-primary" />
          <p className="font-bold text-lg">
            Chatty
          </p>
          <p className="text-base-content/70">
            Connecting people through seamless conversations
          </p>
        </div>
        <div>
          <p className="text-sm text-base-content/60">
            © 2024 Chatty. Built with ❤️ for better conversations.
          </p>
        </div>
      </footer>
    </div>
  );
};