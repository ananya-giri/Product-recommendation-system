import { products } from "./products";

export function getLocalRecommendations(query) {
  if (!query || typeof query !== "string") {
    return {
      recommendations: [],
      summary: "Please enter a valid preference to get recommendations."
    };
  }

  const cleanQuery = query.toLowerCase();

  // 1. Budget Detection
  // Matches "under $500", "under 500", "below 500", "less than 500", "under $ 500", "budget 500", "< 500", etc.
  let budgetLimit = null;
  const budgetRegexes = [
    /(?:under|below|less\s+than|budget|max|maximum|under\s+\$|\$)\s*(\d+)/i,
    /(\d+)\s*(?:dollars|bucks|usd|or\s+less)/i,
    /(?:<\s*|<=|under\s+)\s*(\d+)/i
  ];

  for (const regex of budgetRegexes) {
    const match = cleanQuery.match(regex);
    if (match && match[1]) {
      budgetLimit = parseInt(match[1], 10);
      break;
    }
  }

  // 2. Scoring system
  const scoredProducts = products.map(product => {
    let score = 0;
    const reasons = [];

    // Category / Tag matches
    const nameWords = product.name.toLowerCase().split(/\s+/);
    const categoryWords = product.category.toLowerCase().split(/[\s&]+/);
    const tags = product.tags;
    const descWords = product.description.toLowerCase().split(/\s+/);

    // Tokenize query
    const queryWords = cleanQuery.split(/[^a-zA-Z0-9$]+/);

    // Budget check
    let satisfiesBudget = true;
    if (budgetLimit !== null) {
      if (product.price <= budgetLimit) {
        score += 15; // Major score boost for fitting in budget
        reasons.push(`fits within your $${budgetLimit} budget (priced at $${product.price})`);
      } else {
        satisfiesBudget = false;
        score -= 50; // Heavy penalty if it exceeds budget
      }
    }

    // Direct name match
    let nameMatchCount = 0;
    nameWords.forEach(word => {
      if (word.length > 2 && cleanQuery.includes(word)) {
        score += 8;
        nameMatchCount++;
      }
    });
    if (nameMatchCount > 0) {
      reasons.push(`matches product name keywords`);
    }

    // Category match
    let categoryMatch = false;
    categoryWords.forEach(word => {
      if (word.length > 2 && cleanQuery.includes(word)) {
        score += 10;
        categoryMatch = true;
      }
    });
    if (categoryMatch) {
      reasons.push(`belongs to the ${product.category} category`);
    }

    // Tag matching
    let tagMatchCount = 0;
    tags.forEach(tag => {
      if (cleanQuery.includes(tag)) {
        score += 5;
        tagMatchCount++;
      }
    });
    if (tagMatchCount > 0) {
      reasons.push(`matches tags: [${tags.slice(0, 3).join(", ")}]`);
    }

    // Description match
    let descMatchCount = 0;
    queryWords.forEach(word => {
      if (word.length > 3 && product.description.toLowerCase().includes(word)) {
        score += 1;
        descMatchCount++;
      }
    });

    // Rating bonus
    score += product.rating * 2;

    return {
      product,
      score,
      satisfiesBudget,
      reasons
    };
  });

  // Filter and Sort: If budget is specified, prioritize products that satisfy it.
  const eligibleProducts = scoredProducts
    // Don't completely discard if they are close, but if a budget is set, enforce it strictly for top recommendations
    .filter(p => budgetLimit === null || p.satisfiesBudget)
    .filter(p => p.score > 5) // Minimum score threshold to avoid recommending completely random items
    .sort((a, b) => b.score - a.score);

  // Take top 3 recommendations
  const topRecommendations = eligibleProducts.slice(0, 3);

  if (topRecommendations.length === 0) {
    // If nothing matches the budget, search without the strict budget limit to offer alternatives, or return empty
    const backupProducts = scoredProducts
      .filter(p => p.score > 2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);

    if (backupProducts.length > 0) {
      return {
        recommendations: backupProducts.map(p => ({
          productId: p.product.id,
          reason: `Priced at $${p.product.price} (exceeds budget), but otherwise matches your preference for ${p.product.name.split(" ")[0]}.`
        })),
        summary: `We couldn't find products strictly under your budget, but here are some options that closely match your criteria.`
      };
    }

    return {
      recommendations: [],
      summary: "No matches found for your query. Try searching for general terms like 'phone', 'laptop', 'headphones', or setting a different budget."
    };
  }

  const recommendations = topRecommendations.map(item => {
    let reasonText = "";
    if (item.reasons.length > 0) {
      reasonText = `Recommended because it ${item.reasons.join(", and ")}.`;
    } else {
      reasonText = `Matches features described in: "${item.product.description.substring(0, 60)}..."`;
    }
    return {
      productId: item.product.id,
      reason: reasonText
    };
  });

  let budgetText = budgetLimit !== null ? ` under $${budgetLimit}` : "";
  let summary = `Found ${recommendations.length} product${recommendations.length > 1 ? "s" : ""} matching "${query}"${budgetText}.`;

  return {
    recommendations,
    summary
  };
}
