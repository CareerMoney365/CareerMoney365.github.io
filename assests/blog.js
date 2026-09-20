const posts = [
  {
    title: "Financial Freedom क्यों ज़रूरी है? जानिए ऐसे कारण कि क्यों Financial Freedom हर इंसान के लिए ज़रूरी है",
    category: "Money",
    date: "2026-09-20",
    image: "assests/feat.jpg",
    description: "Financial Freedom क्या है, क्यों ज़रूरी है और इसे हासिल करने के practical तरीके जानिए।",
    link: "my-first-blog.html"
  }
];

const postsContainer = document.getElementById("allPosts");
const searchInput = document.getElementById("q");
const categorySelect = document.getElementById("cat");

function createPostCard(post) {

  const card = document.createElement("article");

  card.className = "card";

  card.innerHTML = `
    <img src="${post.image}" alt="${post.title}">

    <h3>${post.title}</h3>

    <p>
      ${post.description}
    </p>

    <p style="font-size:13px;color:var(--muted);">
      ${post.category} • ${post.date}
    </p>

    <a class="readbtn" href="${post.link}">
      Read More
    </a>
  `;

  return card;
}


function showPosts() {

  const searchText =
    searchInput.value.toLowerCase().trim();

  const selectedCategory =
    categorySelect.value;

  postsContainer.innerHTML = "";

  const filteredPosts = posts.filter(post => {

    const matchesSearch =
      post.title.toLowerCase().includes(searchText) ||
      post.description.toLowerCase().includes(searchText) ||
      post.category.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      post.category === selectedCategory;

    return matchesSearch && matchesCategory;

  });


  if (filteredPosts.length === 0) {

    postsContainer.innerHTML = `
      <div class="post" style="grid-column:1/-1;text-align:center;">
        <h2>No posts found</h2>
        <p>
          Search ko change karke dobara try kijiye.
        </p>
      </div>
    `;

    return;
  }


  filteredPosts.forEach(post => {

    postsContainer.appendChild(
      createPostCard(post)
    );

  });

}


function loadCategories() {

  const categories = [
    ...new Set(posts.map(post => post.category))
  ];

  categories.forEach(category => {

    const option =
      document.createElement("option");

    option.value = category;
    option.textContent = category;

    categorySelect.appendChild(option);

  });

}


searchInput.addEventListener(
  "input",
  showPosts
);

categorySelect.addEventListener(
  "change",
  showPosts
);


loadCategories();
showPosts();


const yearElement =
  document.getElementById("y");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}
