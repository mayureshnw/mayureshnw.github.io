const renderMermaidDiagrams = () => {
    if (!window.mermaid) {
        console.error("Mermaid runtime was not available for diagram rendering.");
        return;
    }

    const mermaidBlocks = Array.from(document.querySelectorAll("pre > code.language-mermaid"));
    if (mermaidBlocks.length === 0) {
        return;
    }

    mermaidBlocks.forEach((codeBlock) => {
        const pre = codeBlock.parentElement;
        if (!pre) {
            return;
        }

        const container = document.createElement("div");
        container.className = "mermaid mermaid-diagram";
        container.textContent = codeBlock.textContent.trim();

        pre.replaceWith(container);
    });

    window.mermaid.initialize({
        startOnLoad: false,
        theme: "neutral",
        securityLevel: "strict",
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        flowchart: {
            htmlLabels: false,
            useMaxWidth: true
        }
    });

    window.mermaid.run({
        querySelector: ".mermaid-diagram"
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMermaidDiagrams, { once: true });
} else {
    renderMermaidDiagrams();
}
