// CareerMoney365 Blog System

let posts = [];


// Load Posts
async function loadPosts() {

    try {

        const response = await fetch("assests/posts/posts.json");

        if (!response.ok) {
            throw new Error("Posts data could not be loaded");
        }

        posts = await response.json();

        showPosts(posts);
        loadCategories(posts);

    } catch (error) {

        console.error("Blog Error:", error);

        const container = document.getElementById("allPosts");

        if (container) {

            container.innerHTML = `
                <div class="post">
                    <h3>Blog temporarily unavailable</h3>
                    <p>Posts load नहीं हो पाए। कृपया थोड़ी देर बाद फिर कोशिश करें।</p>
                </div>
            `;

        }

    }

}


// Create Blog Card
function createPostCard(post) {

    return `

        <article class="post">

            <div class="post-content">

                <div class="post-meta">
                    ${post.category || "General"}
                    ${post.date ? " • " + post.date : ""}
                </div>

                <h2>${post.title}</h2>

                <p>
                    ${post.excerpt || ""}
                </p>

                <a href="${post.file}" class="read-more">
                    Read More →
                </a>

            </div>

        </article>

    `;

}


// Show Posts
function showPosts(list) {

    const container = document.getElementById("allPosts");

    if (!container) return;


    if (!list.length) {

        container.innerHTML = `

            <div class="post">

                <h3>No posts found</h3>

                <p>
                    इस category में अभी कोई article उपलब्ध नहीं है।
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = list
        .map(createPostCard)
        .join("");

}


// Load Categories
function loadCategories(list) {

    const categorySelect = document.getElementById("cat");

    if (!categorySelect) return;


    const categories = [
        ...new Set(
            list
                .map(post => post.category)
                .filter(Boolean)
        )
    ];


    categorySelect.innerHTML = `

        <option value="all">
            All Categories
        </option>

        ${categories
            .map(category => `
                <option value="${category}">
                    ${category}
                </option>
            `)
            .join("")}

    `;

}


// Search
const searchInput = document.getElementById("q");


if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = this.value
            .toLowerCase()
            .trim();


        const filteredPosts = posts.filter(post => {

            return (

                (post.title || "")
                    .toLowerCase()
                    .includes(searchText)

                ||

                (post.excerpt || "")
                    .toLowerCase()
                    .includes(searchText)

                ||

                (post.category || "")
                    .toLowerCase()
                    .includes(searchText)

            );

        });


        showPosts(filteredPosts);

    });

}


// Category Filter
const categorySelect = document.getElementById("cat");


if (categorySelect) {

    categorySelect.addEventListener("change", function () {

        const selectedCategory = this.value;


        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


        let filteredPosts = posts;


        // Category filter
        if (selectedCategory !== "all") {

            filteredPosts = filteredPosts.filter(
                post => post.category === selectedCategory
            );

        }


        // Search filter
        if (searchText) {

            filteredPosts = filteredPosts.filter(post => {

                return (

                    (post.title || "")
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    (post.excerpt || "")
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    (post.category || "")
                        .toLowerCase()
                        .includes(searchText)

                );

            });

        }


        showPosts(filteredPosts);

    });

}


// Footer Year
const yearElement = document.getElementById("y");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// Start Blog
loadPosts();
    return `
        <article class="post">

            ${post.image ? `
                <img 
                    src="${post.image}" 
                    alt="${post.title}"
                    loading="lazy"
                >
            ` : ""}

            <div class="post-content">

                <div class="post-meta">
                    ${post.category || "General"}
                    ${post.date ? " • " + post.date : ""}
                </div>

                <h2>${post.title}</h2>

                <p>
                    ${post.description || ""}
                </p>

                <a href="${post.link}" class="read-more">
                    Read More →
                </a>

            </div>

        </article>
    `;
}


// Show Posts
function showPosts(list) {

    const container = document.getElementById("allPosts");

    if (!container) return;

    if (!list.length) {

        container.innerHTML = `
            <div class="post">
                <h3>No posts found</h3>
                <p>इस category में अभी कोई article उपलब्ध नहीं है।</p>
            </div>
        `;

        return;
    }

    container.innerHTML = list
        .map(createPostCard)
        .join("");
}


// Load Categories
function loadCategories(list) {

    const categorySelect = document.getElementById("cat");

    if (!categorySelect) return;

    const categories = [
        ...new Set(
            list
                .map(post => post.category)
                .filter(Boolean)
        )
    ];

    categorySelect.innerHTML = `
        <option value="all">All Categories</option>
        ${categories
            .map(category => `
                <option value="${category}">
                    ${category}
                </option>
            `)
            .join("")}
    `;
}


// Search
const searchInput = document.getElementById("q");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = this.value
            .toLowerCase()
            .trim();

        const filteredPosts = posts.filter(post => {

            return (
                (post.title || "").toLowerCase().includes(searchText) ||
                (post.description || "").toLowerCase().includes(searchText) ||
                (post.category || "").toLowerCase().includes(searchText)
            );

        });

        showPosts(filteredPosts);

    });

}


// Category Filter
const categorySelect = document.getElementById("cat");

if (categorySelect) {

    categorySelect.addEventListener("change", function () {

        const selectedCategory = this.value;

        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        let filteredPosts = posts;

        if (selectedCategory !== "all") {

            filteredPosts = filteredPosts.filter(
                post => post.category === selectedCategory
            );

        }

        if (searchText) {

            filteredPosts = filteredPosts.filter(post => {

                return (
                    (post.title || "").toLowerCase().includes(searchText) ||
                    (post.description || "").toLowerCase().includes(searchText) ||
                    (post.category || "").toLowerCase().includes(searchText)
                );

            });

        }

        showPosts(filteredPosts);

    });

}


// Footer Year
const yearElement = document.getElementById("y");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// Start Blog
loadPosts();    </a>
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
