let likeCount = 0;
let dislikeCount = 0;

function handleLike() {
  likeCount++;
  updateLikeCount();
}

function handleDislike() {
  dislikeCount++;
  updateDislikeCount();
}

function updateLikeCount() {
  const likeCountElement = document.getElementById('like-count');
  likeCountElement.textContent = `Like: ${likeCount}`;
}

function updateDislikeCount() {
  const dislikeCountElement = document.getElementById('dislike-count');
  dislikeCountElement.textContent = `Dislike: ${dislikeCount}`;
}
 

function toggleContent(event) {
    const content = event.target.nextElementSibling;
    content.classList.toggle('expanded');
  }