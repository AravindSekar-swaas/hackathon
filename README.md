# 🏥 Medical Rep Performance Tracker

> A comprehensive React-based web application for tracking, analyzing, and comparing medical representative performance with AI-powered insights.

## 🎯 Overview

Medical Rep Performance Tracker is a modern, single-page application designed for pharmaceutical companies to monitor and analyze medical representative performance. The application provides real-time performance visualization, AI-powered insights, comparative analytics, and detailed reporting capabilities.

### Key Highlights

- 📊 **Real-time Performance Tracking** - Monitor visits, coverage, samples, and CRM calls
- 🤖 **AI-Powered Analysis** - Get intelligent insights using OpenAI or Anthropic APIs
- 📈 **Interactive Charts** - Beautiful trend visualizations with Recharts
- 🎨 **Theme Support** - Light and dark mode with persistent preferences
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚖️ **Rep Comparison** - Compare two representatives side-by-side with AI analysis
- 📅 **Historical Data** - View performance data for any month

## ✨ Features

### Core Features

- **📋 Representative Selection**

  - Horizontal scrollable selector with avatar cards
  - Smooth animations and selection highlighting
  - Default selection of first representative

- **👤 Profile Dashboard**

  - Representative name, territory, and region
  - Join date and experience
  - Target achievement percentage
  - Product assignments with badges
  - Key doctors list with tier badges (A, B, C, D, E)
  - Expandable doctor details

- **📊 Performance Metrics**

  - Animated stat cards with counter animations
  - Four key metrics: Visits, Coverage, Samples, CRM Calls
  - Trend indicators (↗ upward, ↘ downward, → stable)
  - Target vs actual comparison

- **📈 Trend Charts**

  - 2x2 grid layout with Recharts visualization
  - 6-month performance trends
  - Percentage change displayed at top
  - Interactive tooltips
  - Theme-aware styling

- **📅 Month Selection**

  - Dropdown selector for historical data
  - Filter performance metrics by specific month
  - Charts show data up to selected month
  - AI insights based on filtered data

- **🤖 AI-Powered Insights**

  - Overall performance summary
  - Trend insights
  - Key strengths identification
  - Risk area detection
  - Suggested improvement habits
  - Color-coded sections for easy reading

- **⚖️ Representative Comparison**

  - Side-by-side comparison of two reps
  - Visual "VS" divider
  - Color-coded rep cards
  - Performance metrics comparison table
  - AI-generated comparison insights
  - Individual strengths and differences
  - Actionable recommendations

- **🎨 Theme Management**

  - Light and dark theme support
  - Persistent theme preference (localStorage)
  - Smooth theme transitions
  - Theme-aware components throughout


## 🚀 Tech Stack

### Core Technologies

- **React 18.2.0** - UI framework with hooks and context API
- **Vite 5.0.8** - Build tool with HMR (Hot Module Replacement)
- **JavaScript (ES6+)** - Modern JavaScript features

### Styling & UI

- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **PostCSS 8.4.32** - CSS processing
- **Autoprefixer 10.4.16** - CSS vendor prefixing

### Data Visualization

- **Recharts 3.5.1** - Professional chart library for React
  - LineChart for trend visualization
  - ResponsiveContainer for adaptive sizing
  - Interactive tooltips and grids

### AI Integration

- **OpenAI API** - GPT models for insights generation
- **Anthropic API** - Claude models support
- **Fallback System** - Intelligent mock insights when API unavailable



## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher (comes with Node.js)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables** (optional)

   Create a `.env` file in the root directory:

   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

   Or for Anthropic:

   ```env
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

### Available Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview production build          |

## 📚 Documentation

Document : https://swaassystems-my.sharepoint.com/:w:/g/personal/aravind_sekar_swaas_net/IQDU1GeHYZS8Sq852jSGu-EvAXQFWslDjqt9QL4ctz8OxgY?e=qqJ2Bi


<div align="center">

**Made with ❤️ for SwaaS Sytem PVT LTD**

[⬆ Back to Top](#-medical-rep-performance-tracker)

</div>
