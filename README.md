NC News (Frontend)

A web application that lets a user view a list of articles with initial details of the article. Upon selecting a article you'll be navigated to a page where the selected article will load with more info and also an option to post a comment, delete a comment, update a comment posted and also to vote on the article. Also this app has a topics page listing the topics of articles to read an when clicking a specific topic you'll be navigated to a page of articles based upon the topic you've chosen. 

---

🌐 Live Demo
View it online at: (https://nc-newsga.netlify.app/)

---

🚀 Tech Stack

React (with Vite) for fast, modular UI

React Router for client-side routing

Fetch API for interacting with the NC News API

CSS for custom styling

---

🔍 Features

Browse all articles and filter by topic

Read full article details with author info

Upvote/downvote articles

Comment on articles (requires selecting a user)

Delete your own comments

Sort articles by date, votes, or comments

Error handling for invalid URLs/resources

---

📁 Project Structure

/src

  /Cards              – Reusable card components for displaying articles, topics, etc.
  
  /Comments           – Handles comment display and management
  
  /Pages              – Page-level views (Home, ArticleView, NotFound…)
  
  /Styling            – Global styles and utility classes (CSS)
  
  /api                – API helper functions for making requests
  
  /assets             – Static assets (images, icons, etc.)
  
  /utils              – Utility functions (e.g., date formatting)
  
App.jsx               – Root component with routing and main layout

Header.jsx            – Header component for site navigation

main.jsx              – App entry point for Vite setup

.gitignore            – Git ignore file

README.md            – Project documentation

eslint.config.js      – ESLint configuration

index.html           – HTML template

package-lock.json     – Package lock file

package.json          – Project metadata and dependencies

vite.config.js        – Vite configuration file

---

⚙️ Getting Started
To run the app locally:

git clone https://github.com/GeorgeA25/nc-news.git

cd nc-news

npm install

npm run dev

This app will be available at http://localhost:3000 (Vite default). Ensure NC News API is running 

---

🖥️ Backend API

This frontend expects the NC News API to provide the following endpoints:

GET /api/topics – List of topics

GET /api/articles – Articles with optional filters/sorting

GET /api/articles/:article_id – Single article & comment count

GET /api/articles/:article_id/comments – Fetch comments for an article

PATCH /api/articles/:id – Update vote count

POST /api/articles/:id/comments – Add comment to article

DELETE /api/comments/:id – Delete comment

(Adjust the link/path if your API repo is named differently.)

---

✅ Usage

Navigate to the homepage to view all articles

Click a topic navigatrion link to take you to topics page

Select an article tile to view details + comments

Upvote / downvote using the arrow buttons

(If you've selected a user) Post or delete your own comments

Invalid paths will show a user-friendly 404 page

---

🔧 Requirements

Node.js v16+

Your NC News API backend running (locally or deployed)

---

📝 Credits
This is a Northcoders bootcamp project. All work is original and authored by @GeorgeA25.
