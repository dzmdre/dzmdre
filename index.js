require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const office_quote = await (
        await fetch("https://api.quotable.io/random")
    ).json();

    console.log(office_quote);

    const readme = readmeTemplate
        .replace("{office_quote}", office_quote.content)
        .replace("{office_character}", `- ${office_quote.author}`)

    await fs.writeFile("README.md", readme);
}

main();