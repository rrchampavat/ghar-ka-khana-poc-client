module.exports = {
  "**/*.(ts|tsx|js)": (filenames) => {
    // Filter out config files that cause parsing errors
    const filteredFiles = filenames.filter(
      (file) => !file.includes("vite.config.ts") && !file.includes("env.d.ts")
    );
    if (filteredFiles.length === 0) {
      return [];
    }
    return [
      //   `npx prettier --write ${filteredFiles.join(" ")}`,
      `npx eslint ${filteredFiles.join(" ")} --ext ts --ext tsx --ext js --ext jsx`,
      `npx prettier --check ${filteredFiles.join(" ")}`
      // `pnpm run test`
    ];
  },

  "**/*.(md|json|yaml|cjs|html|css|yml)": (filenames) =>
    `npx prettier --write ${filenames.join(" ")}`
};
