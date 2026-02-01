function toggleMenu(){
  document.getElementById("nav").classList.toggle("show");
}

document.getElementById("year").innerText = new Date().getFullYear();

function searchPosts(){
  const input = document.getElementById("searchInput").value.toLowerCase();
  const posts = document.querySelectorAll(".post-card");

  posts.forEach(post=>{
    const text = post.innerText.toLowerCase();
    post.style.display = text.includes(input) ? "block" : "none";
  });
}
