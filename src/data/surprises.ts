export const funFacts = [
  "🎯 Nathan's superpower? Shipping fast. He built the Fetch prototype demo in record time and presented it to the CEO!",
  "🧠 The AttentioFlow AI project uses PyTorch to predict when you're about to get distracted. It's like having a focus coach in your computer!",
  "👽 For the UFO project, Nathan analyzed 80,000+ sighting descriptions. Turns out people see a lot of weird stuff in the sky!",
  "💰 At Exact Sciences, Nathan's automation script saved the company $140,000 by identifying and removing over 2,000 unused accounts.",
  "🚀 Nathan increased MongoDB insertion speed by 70% at AT&T while migrating 100+ million documents. That's a LOT of data!",
  "🔐 He reduced manual PDF processing effort by 90% using Python automation that integrated with Microsoft Outlook.",
  "📊 Fun fact: Nathan's auditing scripts at Lumen logged over 10,000 errors into MongoDB. Finding problems is half the battle!",
  "🎓 Nathan's studying Computer Science AND Business at UW–Madison. Best of both worlds!",
  "⚡ This website has Easter eggs! Triple-click the logo in the header for a wild ride.",
  "🌙 The site theme changes based on time of day. It's morning/day/night aware!"
];

export const projectDetails = [
  {
    title: "AttentioFlow AI Deep Dive",
    content: "Here's what makes AttentioFlow special:\n\n✨ **Real-time inference** with a PyTorch Neural Network\n🎯 **Temporal feature engineering** from digital interaction data using psutil and pynput\n🔔 **Proactive AI nudges** via the plyer library when distraction is detected\n💾 **Model persistence** with torch.save/load for continuous learning\n\nIt's basically a personal focus guardian powered by deep learning!"
  },
  {
    title: "Fetch Prototype Story",
    content: "The Fetch prototype is a great example of rapid execution:\n\n🏃 **Rapid prototyping** - Built a working demo fast\n👔 **Executive presentation** - Demoed directly to CEO and Chief of Staff\n📱 **Mobile-first** - Built for the modern user experience\n💡 **Product thinking** - Not just code, but solving real user problems\n\nSometimes the best way to explain an idea is to build it!"
  },
  {
    title: "UFO Analysis Insights",
    content: "The UFO Sightings project was a wild ride through 80,000+ reports:\n\n🔍 **K-Means clustering** to find patterns in sighting descriptions\n😊 **Sentiment analysis** using Naive Bayes, Logistic Regression, and SVM\n📈 **Predictive analytics** with linear regression for encounter forecasting\n🗺️ **Geospatial analysis** to see where sightings cluster\n\nThe truth IS out there... in the data!"
  },
  {
    title: "AT&T Impact",
    content: "At AT&T, Nathan worked at serious scale:\n\n📦 **100+ million documents** migrated to INLAP\n⚡ **70% faster** insertion speed using Java Spring Boot and MongoDB\n📄 **90% reduction** in manual PDF processing effort\n🔒 **Patent-pending** AI network analyzer for incident response\n\nThat's enterprise-grade impact!"
  },
  {
    title: "The $140K Save",
    content: "Here's a cool story from Exact Sciences:\n\nNathan built a VBA macro that integrated Okta and Active Directory to analyze account usage. The result?\n\n💰 **$140,000 saved** through algorithmic identification\n🔍 **2,000+ accounts** found and removed\n⚙️ **Automation** replaced manual analysis\n\nProof that good automation can have serious ROI!"
  }
];

export const codeSnippets = [
  {
    title: "Clean Python Pattern",
    language: "python",
    code: `# Nathan's approach to API error handling
def safe_api_call(func):
    """Decorator for graceful API failures"""
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logger.warning(f"API call failed: {e}")
            return None  # Fail gracefully
    return wrapper

@safe_api_call
def fetch_data(endpoint):
    response = requests.get(endpoint)
    return response.json()`
  },
  {
    title: "MongoDB Optimization",
    language: "javascript",
    code: `// Bulk insert pattern used at AT&T
// Increased insertion speed by 70%!
const bulkOps = documents.map(doc => ({
  insertOne: { document: doc }
}));

await collection.bulkWrite(bulkOps, {
  ordered: false,  // Parallel inserts
  writeConcern: { w: 1 }
});`
  },
  {
    title: "PyTorch Model Persistence",
    language: "python",
    code: `# From AttentioFlow AI
# Saving model state for continuous learning
torch.save({
    'model_state': model.state_dict(),
    'optimizer_state': optimizer.state_dict(),
    'epoch': epoch,
    'loss': loss
}, 'checkpoint.pt')

# Load and continue training
checkpoint = torch.load('checkpoint.pt')
model.load_state_dict(checkpoint['model_state'])`
  }
];

export const getRandomSurprise = (): string => {
  const surpriseType = Math.random();

  if (surpriseType < 0.4) {
    // 40% chance: Fun fact
    const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
    return fact;
  } else if (surpriseType < 0.7) {
    // 30% chance: Project detail
    const detail = projectDetails[Math.floor(Math.random() * projectDetails.length)];
    return `**${detail.title}**\n\n${detail.content}`;
  } else {
    // 30% chance: Code snippet
    const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    return `**${snippet.title}**\n\`\`\`${snippet.language}\n${snippet.code}\n\`\`\`\n\nNathan writes clean, production-ready code!`;
  }
};
