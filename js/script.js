const loadAiTools = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAiTools(data));
};
const displayAiTools = (data) => {
  // console.log(data);
  const tools = data.data.tools;
  console.log(tools);

  // get all ai tools container element
  const allAiToolsContainer = document.getElementById("all-ai-tool-container");

  tools.forEach((tool) => {
    const toolContainer = document.createElement("div");
    toolContainer.classList.add('card', 'bg-base-100', 'border');
    toolContainer.innerHTML = `
        <figure>
          <img
            src="${tool.image}"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="font-semibold text-2xl">Features</h2>
          <ol class="list-decimal list-inside">
            <li>this is a feature</li>
            <li>this is a feature</li>
            <li>this is a feature</li>
          </ol>
          <hr class="my-3"/>
          <h2 class="card-title text-3xl">${tool.name}</h2>
          <div>
            <p>
              <span>${tool.published_in}</span>
            </p>
            <button class="btn btn-circle">&rightarrow;</button>
          </div>
        </div>
        `;

        allAiToolsContainer.appendChild(toolContainer)
  });
};
loadAiTools();
