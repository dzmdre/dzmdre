require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const quote = await (
        await fetch("https://quoteslate.vercel.app/api/quotes/random?tags=knowledge")
    ).json();

    console.log(quote);

    const readme = readmeTemplate
        .replace("{quote}", quote.quote)
        .replace("{quote_author}", `- ${quote.author}`)

    await fs.writeFile("README.md", readme);
}

main();