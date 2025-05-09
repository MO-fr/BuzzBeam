// Animation configurations for charts
export const chartAnimations = {
  bar: {
    appear: {
      animation: "grow",
      duration: 1000,
      delay: 200,
      easing: [0.4, 0, 0.2, 1],
    },
    update: {
      animation: "grow",
      duration: 800,
      easing: [0.4, 0, 0.2, 1],
    },
  },

  line: {
    appear: {
      animation: "draw",
      duration: 1500,
      delay: 300,
      easing: [0.4, 0, 0.2, 1],
    },
    update: {
      animation: "morph",
      duration: 800,
      easing: [0.4, 0, 0.2, 1],
    },
  },

  pie: {
    appear: {
      animation: "spin",
      duration: 1200,
      delay: 200,
      easing: [0.34, 1, 0.64, 1], // fixed from 1.56 to 1
    },
    update: {
      animation: "morph",
      duration: 800,
      easing: [0.4, 0, 0.2, 1],
    },
  },

  area: {
    appear: {
      animation: "wave",
      duration: 1200,
      delay: 200,
      easing: [0.4, 0, 0.2, 1],
    },
    update: {
      animation: "morph",
      duration: 800,
      easing: [0.4, 0, 0.2, 1],
    },
  },

  shared: {
    hover: {
      duration: 200,
      easing: [0.4, 0, 0.2, 1],
    },
    tooltip: {
      enter: {
        duration: 200,
        easing: [0.4, 0, 0.2, 1],
      },
      leave: {
        duration: 150,
        easing: [0.4, 0, 0.2, 1],
      },
    },
  },
}


// Chart color schemes
export const chartColors = {
  primary: ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE"],
  success: ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5"],
  warning: ["#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A", "#FEF3C7"],
  danger: ["#EF4444", "#F87171", "#FCA5A5", "#FECACA", "#FEE2E2"],
  neutral: ["#6B7280", "#9CA3AF", "#D1D5DB", "#E5E7EB", "#F3F4F6"],

  // Platform-specific colors
  platforms: {
    twitter: "#1DA1F2",
    instagram: "#E1306C",
    facebook: "#4267B2",
    tiktok: "#FF0050",
    youtube: "#FF0000",
    linkedin: "#0A66C2",
  },

  // Theme-specific color sets
  themes: {
    dark: ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"],
    tiktok: ["#FF0050", "#00F2EA", "#000000", "#FFFFFF", "#FF3370"],
    instagram: ["#E1306C", "#F77737", "#FCAF45", "#FFDC80", "#C13584"],
    twitter: ["#1DA1F2", "#14171A", "#657786", "#AAB8C2", "#E1E8ED"],
  },
}

// Chart data generators for dynamic/random data
export const generateChartData = {
  // Generate time series data
  timeSeries: (days = 7, baseValue = 1000, volatility = 0.2) => {
    const data = []
    let currentValue = baseValue

    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i - 1))

      // Random walk algorithm
      const change = currentValue * (Math.random() * volatility * 2 - volatility)
      currentValue += change

      data.push({
        date: date.toISOString().split("T")[0],
        value: Math.max(0, Math.round(currentValue)),
      })
    }

    return data
  },

  // Generate comparison data for multiple series
  comparison: (categories = 5, series = 3, maxValue = 1000) => {
    const data = []
    const seriesNames = ["Series A", "Series B", "Series C", "Series D", "Series E"]

    for (let i = 0; i < categories; i++) {
      const item = { name: `Category ${i + 1}` }

      for (let j = 0; j < series; j++) {
        if (j < seriesNames.length) {
          item[seriesNames[j]] = Math.floor(Math.random() * maxValue)
        }
      }

      data.push(item)
    }

    return data
  },

  // Generate pie chart data
  pie: (segments = 5, total = 100) => {
    const data = []
    let remaining = total

    for (let i = 0; i < segments - 1; i++) {
      const maxForSegment = remaining * 0.7
      const value = Math.floor(Math.random() * maxForSegment)
      remaining -= value

      data.push({
        name: `Segment ${i + 1}`,
        value: value,
      })
    }

    data.push({
      name: `Segment ${segments}`,
      value: remaining,
    })

    return data
  },
}
