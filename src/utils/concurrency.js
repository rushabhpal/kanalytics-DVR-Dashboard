// Optimized runWithLimit
async function runWithLimit(limit, items, taskFn) {
  const results = [];
  let idx = 0;

  // Dynamic worker: always pick next available task
  async function worker() {
    while (true) {
      const current = idx++;
      if (current >= items.length) break;

      try {
        results[current] = await taskFn(items[current], current);
      } catch (err) {
        results[current] = null;
        console.error("Task failed:", err.message);
      }
    }
  }

  // Start exactly 'limit' workers in parallel
  const workers = Array.from({ length: limit }, () => worker());
  await Promise.all(workers);

  return results; // no need to filter Boolean, keeps nulls if any
}

module.exports = { runWithLimit };
