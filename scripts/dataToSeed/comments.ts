import { ObjectId } from "mongodb";

const Comments = [
  // Original helpful comments
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "Great article! This was very helpful for understanding the concepts.",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "I found a small typo in the third paragraph, but overall excellent content!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "Could you elaborate more on the performance implications of this approach?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "This is exactly what I was looking for. Thank you for the detailed explanation!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "I've implemented this in my project and it works perfectly!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Do you have plans to write a follow-up article on this topic?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "I had a different approach to this problem. How does it compare to yours?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "Could you provide more real-world examples? That would be really helpful.",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "This clarified a concept I was struggling with. Much appreciated!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Great read! I'll definitely be sharing this with my team.",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "I'm new to this topic but your explanation was very clear. Thanks!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Do you have any resources for further reading on this subject?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Is there a TypeScript version of the example you provided?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 30),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "This is exactly what I needed for my current project. Thank you!",
    approved: true,
    createdAt: new Date(),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "I think there's an error in the code example in section 3.",
    approved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Fantastic breakdown of a complex topic. Easy to follow!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Could you add more information about the security implications?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "The code examples really helped me understand the concepts.",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Great article. Keep up the good work!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "I found this very informative. Will reference this in my upcoming talk.",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13),
  },

  // NEW COMMENTS - More diverse and realistic
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Bookmarked for later! This is a goldmine of information.",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "How does this compare to the approach used in the official documentation?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "The diagrams really helped visualize the architecture. Thanks!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "I disagree with your conclusion in section 4. Here's why...",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 17),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Are there any known edge cases or gotchas I should be aware of?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "This helped me fix a bug I've been struggling with for days!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 19),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Would love to see a video tutorial covering this topic in depth.",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "The best explanation of this concept I've found online. Seriously impressive!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "What about backwards compatibility? Did you test this with older versions?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "I'm getting an error when trying to run this. Any suggestions?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "This is spam. Click here for amazing deals!",
    approved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 24),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Your writing style makes complex topics accessible. Keep it up!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "How does this scale when dealing with millions of records?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 26),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "I built a side project using this approach and it's been rock solid!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 27),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "What's your opinion on using library X instead of Y for this?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Can you share the GitHub repo for the demo project mentioned?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 29),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "This is outdated. The new version works completely differently now.",
    approved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Excellent timing! I'm giving a presentation on this next week.",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 31),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content:
      "The performance benchmarks you included are super valuable. Thanks!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 32),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "How would you handle this in a microservices architecture?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 33),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "I've shared this with my engineering team. They loved it!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 34),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Are there any licensing concerns I should be aware of?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "This approach saved us hours of debugging. Much appreciated!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 36),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "What about memory consumption? Did you profile this?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 37),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "I'm curious about your testing strategy for this implementation.",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 38),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Check out my blog where I write better content!",
    approved: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 39),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Will this work with the latest version released last week?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "Your blog has become my go-to resource. Thank you for your work!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 41),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "I'd love to contribute to this project. How can I help?",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 42),
  },
  {
    postId: new ObjectId(),
    userId: new ObjectId(),
    content: "This is now part of my team's onboarding documentation!",
    approved: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];

export default Comments;
