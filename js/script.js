const loadAiTools = (isSortbyDateClicked) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayAiTools(data, isSortbyDateClicked));
};
const displayAiTools = (data, isSortbyDateClicked) => {
  // console.log(data);
  const tools = data.data.tools;
  console.log(tools);

  // get all ai tools container element
  const allAiToolsContainer = document.getElementById("all-ai-tool-container");

  allAiToolsContainer.innerHTML = '';

  // let's make the sort by date button workable 
  const compare = (a,b) =>{
    const date1 = new Date(a?.published_in).getTime()
    const date2 = new Date(b?.published_in).getTime()
    if(new Date(a?.published_in).getTime() < new Date(b?.published_in).getTime()){
      return -1;
    }else if(new Date(a?.published_in).getTime() > new Date(b?.published_in).getTime()){
      return 1;
    }else{
      return 0;
    }
  }
  if(isSortbyDateClicked){
    tools.sort(compare);
  }

  tools.forEach((tool) => {
    // console.log(tool);

    const toolContainer = document.createElement("div");
    toolContainer.classList.add("card", "bg-base-100", "border");

    toolContainer.innerHTML = `
        <figure>
          <img
            src="${tool?.image}"
            alt="${tool.name}"
          />
        </figure>
        <div class="card-body">
          <h2 class="font-semibold text-2xl">Features</h2>
          <ol id="features-container" class="list-decimal list-inside">
            ${tool.features.map((feature) => `<li>${feature}</li>`).join("")}

          </ol>
          <hr class="my-3"/>
          <h2 class="card-title text-3xl">${tool.name}</h2>
          <div class="flex items-center">
            <p>
              <span>${tool.published_in}</span>
            </p>
            <button onclick="handleDetailedView('${
              tool.id
            }')" class="btn btn-circle">&rightarrow;</button>
          </div>
        </div>
        `;

    allAiToolsContainer.appendChild(toolContainer);
  });
};

// handle detailed view of AI with showing modal
const handleDetailedView = async (aiToolId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${aiToolId}`
  );
  const data = await res.json();
  const singleToolData = data.data;
  console.log(singleToolData);

  // console.log(singleToolData.features);
  let features = [];
  for (let feature in singleToolData.features) {
    // console.log(singleToolData.features[feature]);
    features.push(singleToolData.features[feature]);
  }
  // console.log(features);
  const singleToolModalId = document.getElementById("single_tool_modal");
  const singleToolDetailsContainer = document.getElementById(
    "single-tool-details-container"
  );
  singleToolDetailsContainer.innerHTML = `
  <div>
    <p class="font-bold text-xl">${singleToolData?.description}</p>
    <div class="flex gap-3 mt-4">
      ${singleToolData?.pricing
        ?.map(
          (pricePlan) =>
            `<div class="p-4 bg-base-200 rounded-lg text-center"><p>${
              pricePlan?.plan ? pricePlan.plan : "no found"
            }</p><p>${
              pricePlan?.price ? pricePlan.price : "no found"
            }</p></div>`
        )
        .join("")}
    </div>
    <div class="flex mt-5">
      <div>
        <h2 class="font-semibold text-2xl mb-3">Features</h2>
        <ul class="list-disc list-inside pl-4">
          ${features
            .map((feature) => `<li>${feature.feature_name}</li>`)
            .join("")}
        </ul>
      </div>
      <div>
        <h2 class="font-semibold text-2xl mb-3">Integrations</h2>
        <ul class="list-disc list-inside pl-4">
          ${singleToolData?.integrations?.map(integrated => `<li>${integrated}</li>`).join('') || 'No data Found'}
        </ul>
      </div>
    </div>
  </div>
  <div>
    <img src="${singleToolData?.image_link?.[0]}" alt="${
    singleToolData.tool_name
  }"/>
    <div class="text-center mt-3 space-y-3">
      ${singleToolData?.input_output_examples?.map(inputOutput => `<div><p class="font-bold text-xl">${inputOutput?.input ? inputOutput.input : 'Can you give any example?'}</p><p>${inputOutput?.output ? inputOutput.output : 'No! Not Yet! Take a break!!!'}</p></div>`).join('') || `<div><p class="font-bold text-xl">'Can you give any example?'</p><p>'No! Not Yet! Take a break!!!'</p></div>`}
    </div>
  </div>
  
  `;

  singleToolModalId.showModal();
};

// handle sort by date 
const handleSortByDate = () =>{
  loadAiTools(true)
}

loadAiTools();
