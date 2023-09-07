const API = 'https://free-football-soccer-videos.p.rapidapi.com/';

const content = null || document.getElementById('content');

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '79cacfd239mshd910912d2a496e6p18ab10jsn8448463a827b',
    'X-RapidAPI-Host': 'free-football-soccer-videos.p.rapidapi.com'
  }
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);
    let view = '';

    videos.forEach(video => {
      const videoTitle = video.title;
      const videoEmbedCode = video.embed;
      const videoUrl = video.url;
      const videoThumbnail = video.thumbnail;
      const videoDate = new Date(video.date).toLocaleDateString();
      const side1Name = video.side1.name;
      const side1Url = video.side1.url;
      const side2Name = video.side2.name;
      const side2Url = video.side2.url;
      const competitionName = video.competition.name;
      const competitionUrl = video.competition.url;

      view += `
        <div class="group relative">
          <div class="object-cover w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${videoThumbnail}" alt="${videoTitle}" class="w-full">
          </div>
          <div class="mt-4">
            <h3 class="text-sm text-gray-700">${videoTitle}</h3>
            <p>Date: ${videoDate}</p>
            <p>Competition: <a href="${competitionUrl}" target="_blank">${competitionName}</a></p>
            <p>Teams: <a href="${side1Url}" target="_blank">${side1Name}</a> vs <a href="${side2Url}" target="_blank">${side2Name}</a></p>
            <div class="video-embed">${videoEmbedCode}</div>
            <p>Watch the full video <a href="${videoUrl}" target="_blank">here</a></p>
          </div>
        </div>
      `;
    });

    content.innerHTML = view;

    
  } catch (error) {
    console.log(error);
  }
})();

