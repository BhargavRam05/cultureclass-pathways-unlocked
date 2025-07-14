import React, { useState } from 'react';
import { Film, Music, Utensils, BookOpen, Lightbulb, Star, Brain } from 'lucide-react';

const CultureClass = () => {
  const [formData, setFormData] = useState({
    movie: '',
    artist: '',
    food: '',
    book: '',
    topic: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowResults(true);
    
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('resultsSection')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleTryAgain = () => {
    setShowResults(false);
    setFormData({
      movie: '',
      artist: '',
      food: '',
      book: '',
      topic: ''
    });
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputFields = [
    { 
      key: 'movie', 
      label: 'Favorite Movie', 
      icon: Film, 
      placeholder: 'e.g., Inception, The Matrix...' 
    },
    { 
      key: 'artist', 
      label: 'Favorite Music Artist', 
      icon: Music, 
      placeholder: 'e.g., Billie Eilish, The Beatles...' 
    },
    { 
      key: 'food', 
      label: 'Favorite Food', 
      icon: Utensils, 
      placeholder: 'e.g., Sushi, Pizza, Tacos...' 
    },
    { 
      key: 'book', 
      label: 'Favorite Book', 
      icon: BookOpen, 
      placeholder: 'e.g., Harry Potter, 1984...' 
    },
    { 
      key: 'topic', 
      label: 'Learning Topic', 
      icon: Lightbulb, 
      placeholder: 'e.g., JavaScript, Photography...' 
    }
  ];

  const learningSteps = [
    {
      title: "Introduction & Foundation",
      content: `Start with the basics of ${formData.topic || 'your chosen topic'}, using examples and metaphors from ${formData.movie || 'your favorite films'} to make complex concepts more relatable and memorable.`
    },
    {
      title: "Creative Exploration",
      content: `Dive deeper through hands-on projects inspired by ${formData.artist || 'your music taste'}. The rhythm and creativity of music will guide your learning pace and style.`
    },
    {
      title: "Cultural Context",
      content: `Understand the broader implications by exploring how ${formData.topic || 'this topic'} connects to different cultures, similar to how ${formData.food || 'cuisine'} reflects cultural diversity and innovation.`
    },
    {
      title: "Practical Application",
      content: `Apply your knowledge through real-world scenarios, using storytelling techniques inspired by ${formData.book || 'literary works'} to structure and present your understanding.`
    },
    {
      title: "Mastery & Sharing",
      content: `Consolidate your learning by teaching others or creating something unique, combining all your cultural influences into a personal approach to ${formData.topic || 'the subject'}.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-float">
              CultureClass
            </h1>
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-16 font-light">
              Learn What You Love
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Enter your taste. Discover your unique way to learn.
            </p>
          </div>

          {/* Input Form Card */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-card backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-border max-w-2xl mx-auto hover:shadow-glow transition-all duration-500">
              <form onSubmit={handleSubmit} className="space-y-6">
                {inputFields.map((field, index) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={field.key} className="relative group" style={{ animationDelay: `${0.1 * index}s` }}>
                      <div className="relative">
                        <IconComponent className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                        <input
                          type="text"
                          id={field.key}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:bg-secondary/70"
                          placeholder=" "
                          required
                        />
                        <label 
                          htmlFor={field.key}
                          className="absolute left-12 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-all duration-300 pointer-events-none
                          peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                          peer-focus:-top-2 peer-focus:left-4 peer-focus:text-sm peer-focus:text-primary peer-focus:bg-card peer-focus:px-2 peer-focus:rounded
                          "
                          style={{
                            top: formData[field.key as keyof typeof formData] ? '-8px' : '50%',
                            fontSize: formData[field.key as keyof typeof formData] ? '0.875rem' : '1rem',
                            left: formData[field.key as keyof typeof formData] ? '1rem' : '3rem',
                            color: formData[field.key as keyof typeof formData] ? 'hsl(var(--primary))' : '',
                            backgroundColor: formData[field.key as keyof typeof formData] ? 'hsl(var(--card))' : 'transparent',
                            padding: formData[field.key as keyof typeof formData] ? '0 0.5rem' : '0',
                            borderRadius: formData[field.key as keyof typeof formData] ? '0.25rem' : '0'
                          }}
                        >
                          {field.label}
                        </label>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-8 bg-gradient-primary text-primary-foreground font-semibold py-4 px-8 rounded-xl
                  hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-glow
                  disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed
                  animate-pulse-glow"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    'Generate Learning Path'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section 
          id="resultsSection" 
          className="min-h-screen flex items-center justify-center px-4 py-16 animate-fade-in-up"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-card backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-border">
              <div className="text-center mb-12">
                <Brain className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                  Your Personalized Learning Plan
                </h3>
                <p className="text-muted-foreground text-lg">
                  Crafted specifically for your cultural tastes and learning style
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {learningSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 p-6 bg-secondary/30 rounded-xl border border-border/50 hover:bg-secondary/50 transition-all duration-300"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2 text-foreground">
                        Step {index + 1}: {step.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={handleTryAgain}
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold py-3 px-8 rounded-xl
                  hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg border border-border"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CultureClass;
