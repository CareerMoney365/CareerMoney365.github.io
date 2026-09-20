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

        const selectedCategory =
            document.getElementById("cat").value;

        filterPosts(searchText, selectedCategory);

    });

}


// Category Filter
const categorySelect = document.getElementById("cat");

if (categorySelect) {

    categorySelect.addEventListener("change", function () {

        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        filterPosts(searchText, this.value);

    });

}


// Filter Posts
function filterPosts(searchText, selectedCategory) {

    let filteredPosts = posts.filter(post => {

        const matchesSearch =
            (post.title || "").toLowerCase().includes(searchText) ||
            (post.excerpt || "").toLowerCase().includes(searchText) ||
            (post.category || "").toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            post.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    showPosts(filteredPosts);

}


// Footer Year
const yearElement = document.getElementById("y");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// Start Blog
loadPosts();
