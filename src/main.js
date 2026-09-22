const stays = [
  {
    id: "seoul-hanok",
    title: "고즈넉한 한옥 스테이",
    location: "서울, 종로구",
    price: 185000,
    rating: 4.92,
    image:
      "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "jeju-ocean",
    title: "바다를 마주한 제주 하우스",
    location: "제주, 애월읍",
    price: 220000,
    rating: 4.88,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "gangneung-cabin",
    title: "숲속의 아늑한 캐빈",
    location: "강원, 강릉시",
    price: 145000,
    rating: 4.79,
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "busan-loft",
    title: "도시 전망의 모던 로프트",
    location: "부산, 해운대구",
    price: 168000,
    rating: 4.85,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
];

const listingResults = document.querySelector("#listing-results");

function formatPrice(price) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

function createStayCard(stay) {
  const card = document.createElement("article");
  card.className = "stay-card";

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
  card.append(image, content);
  return card;
}

function renderListings(listings) {
  listingResults.replaceChildren();

  if (listings.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "listing-empty";
    emptyMessage.textContent = "현재 표시할 숙소가 없습니다.";
    listingResults.append(emptyMessage);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "stay-grid";
  listings.forEach((stay) => grid.append(createStayCard(stay)));
  listingResults.append(grid);
}

renderListings(stays);
