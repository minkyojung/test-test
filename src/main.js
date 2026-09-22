const stays = [
  {
    id: "seoul-hanok",
    title: "고즈넉한 한옥 스테이",
    location: "서울, 종로구",
    price: 185000,
    rating: 4.92,
    description: "북촌 골목 가까이에서 한옥의 고요함을 즐길 수 있는 숙소입니다.",
    amenities: ["조식", "에어컨", "무료 Wi-Fi", "마당"],
    capacity: 2,
    availableDates: ["2025-06-14", "2025-06-15", "2025-06-21"],
    image:
      "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "jeju-ocean",
    title: "바다를 마주한 제주 하우스",
    location: "제주, 애월읍",
    price: 220000,
    rating: 4.88,
    description: "제주 바다와 노을을 바라보며 여유로운 휴식을 누리는 집입니다.",
    amenities: ["바다 전망", "주방", "무료 주차", "세탁기"],
    capacity: 4,
    availableDates: ["2025-06-15", "2025-06-22", "2025-07-05"],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "gangneung-cabin",
    title: "숲속의 아늑한 캐빈",
    location: "강원, 강릉시",
    price: 145000,
    rating: 4.79,
    description: "나무 향이 가득한 숲속에서 조용히 쉬어갈 수 있는 작은 캐빈입니다.",
    amenities: ["벽난로", "바비큐", "무료 Wi-Fi", "반려동물 동반 가능"],
    capacity: 3,
    availableDates: ["2025-06-14", "2025-06-22", "2025-07-05"],
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "busan-loft",
    title: "도시 전망의 모던 로프트",
    location: "부산, 해운대구",
    price: 168000,
    rating: 4.85,
    description: "해운대의 도시 풍경과 가까운 해변 산책을 함께 즐길 수 있는 로프트입니다.",
    amenities: ["도시 전망", "헬스장", "주방", "업무 공간"],
    capacity: 4,
    availableDates: ["2025-06-14", "2025-06-21", "2025-07-05"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
];

const listingResults = document.querySelector("#listing-results");
const listingsSection = document.querySelector(".listings");
const detailSection = document.querySelector("#stay-detail");
const detailContent = document.querySelector("#detail-content");
const searchForm = document.querySelector(".search__form");
const queryInput = searchForm.elements.query;
const dateInput = searchForm.elements.date;
const guestsInput = searchForm.elements.guests;
const filters = { query: "", date: "", guests: "" };

function formatPrice(price) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

function createStayCard(stay) {
  const card = document.createElement("article");
  card.className = "stay-card";

  const selectButton = document.createElement("button");
  selectButton.className = "stay-card__select";
  selectButton.type = "button";
  selectButton.setAttribute("aria-label", `${stay.title} 상세 정보 보기`);
  selectButton.addEventListener("click", () => selectStay(stay.id));

  const image = document.createElement("img");
  image.className = "stay-card__image";
  image.src = stay.image;
  image.alt = `${stay.location}의 ${stay.title}`;

  const content = document.createElement("div");
  content.className = "stay-card__content";

  const location = document.createElement("p");
  location.className = "stay-card__location";
  location.textContent = stay.location;

  const title = document.createElement("h3");
  title.textContent = stay.title;

  const details = document.createElement("p");
  details.className = "stay-card__details";
  details.textContent = `₩${formatPrice(stay.price)} / 박 · ★ ${stay.rating}`;

  content.append(location, title, details);
  selectButton.append(image, content);
  card.append(selectButton);
  return card;
}

function filterStays({ query, date, guests }) {
  const searchTerms = query.trim().toLocaleLowerCase();
  const guestCount = Number(guests);

  return stays.filter((stay) => {
    const searchableText = [stay.title, stay.location, stay.description]
      .join(" ")
      .toLocaleLowerCase();
    const matchesQuery = !searchTerms || searchableText.includes(searchTerms);
    const matchesDate = !date || stay.availableDates.includes(date);
    const matchesGuests = !guestCount || stay.capacity >= guestCount;

    return matchesQuery && matchesDate && matchesGuests;
  });
}

function renderListings(listings) {
  listingResults.replaceChildren();

  if (listings.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "listing-empty";
    emptyMessage.textContent = "조건에 맞는 숙소가 없습니다. 검색 조건을 바꿔보세요.";
    listingResults.append(emptyMessage);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "stay-grid";
  listings.forEach((stay) => grid.append(createStayCard(stay)));
  listingResults.append(grid);
}

function createBackButton() {
  const button = document.createElement("button");
  button.className = "detail__back";
  button.type = "button";
  button.textContent = "← 목록으로 돌아가기";
  button.addEventListener("click", showListings);
  return button;
}

function renderDetail(stayId) {
  detailContent.replaceChildren();
  listingsSection.hidden = true;
  detailSection.hidden = false;

  const stay = stays.find((item) => item.id === stayId);
  if (!stay) {
    const message = document.createElement("p");
    message.className = "detail__missing";
    message.textContent = "요청한 숙소를 찾을 수 없습니다.";
    detailContent.append(message, createBackButton());
    return;
  }

  const image = document.createElement("img");
  image.className = "detail__image";
  image.src = stay.image;
  image.alt = `${stay.location}의 ${stay.title}`;

  const location = document.createElement("p");
  location.className = "detail__location";
  location.textContent = stay.location;

  const title = document.createElement("h3");
  title.className = "detail__title";
  title.textContent = stay.title;

  const summary = document.createElement("p");
  summary.className = "detail__summary";
  summary.textContent = `₩${formatPrice(stay.price)} / 박 · ★ ${stay.rating} · 최대 ${stay.capacity}명`;

  const description = document.createElement("p");
  description.textContent = stay.description;

  const amenitiesTitle = document.createElement("h4");
  amenitiesTitle.textContent = "편의 시설";

  const amenities = document.createElement("ul");
  amenities.className = "detail__amenities";
  stay.amenities.forEach((amenity) => {
    const item = document.createElement("li");
    item.textContent = amenity;
    amenities.append(item);
  });

  detailContent.append(
    createBackButton(),
    image,
    location,
    title,
    summary,
    description,
    amenitiesTitle,
    amenities,
  );
}

function showListings() {
  if (window.location.hash) {
    window.location.hash = "";
    return;
  }

  detailSection.hidden = true;
  listingsSection.hidden = false;
}

function selectStay(id) {
  window.location.hash = `stay/${encodeURIComponent(id)}`;
}

function updateViewFromHash() {
  const match = window.location.hash.match(/^#stay\/(.+)$/);
  if (match) {
    renderDetail(decodeURIComponent(match[1]));
    return;
  }

  detailSection.hidden = true;
  listingsSection.hidden = false;
}

function updateListings() {
  filters.query = queryInput.value;
  filters.date = dateInput.value;
  filters.guests = guestsInput.value;
  renderListings(filterStays(filters));
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateListings();
});

queryInput.addEventListener("input", updateListings);
dateInput.addEventListener("change", updateListings);
guestsInput.addEventListener("change", updateListings);
searchForm.addEventListener("reset", () => {
  window.requestAnimationFrame(updateListings);
});
window.addEventListener("hashchange", updateViewFromHash);

updateListings();
updateViewFromHash();
