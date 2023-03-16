const form = document.querySelector(".comment-form");
const comments = document.querySelector(".comments-list");

const addComment = (name, date, text) => {
  const newComment = document.createElement("li");
  newComment.classList.add("comment");

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const userDate = dateFormat(date);
  const today = new Date();

  if (
    userDate.getDate() === today.getDate() &&
    userDate.getMonth() === today.getMonth() &&
    userDate.getFullYear() === today.getFullYear()
  )
    date = "Сегодня";

  if (
    userDate.getDate() === today.getDate() - 1 &&
    userDate.getMonth() === today.getMonth() &&
    userDate.getFullYear() === today.getFullYear()
  )
    date = "Вчера";

  newComment.innerHTML = `
  <div class="comment-field">
  <div class="comment-section">
    <p>${date}, ${time}</p>
    <p>Имя пользователя: ${name}</p>
    <p>${text}</p>
    </div>
  </div>
  <div class="comment-trash-like">
  <p>0</p>
      <button class="like">
        <div class="img">
          <img src="./img/like-icon.svg" alt="like">
        </div>
      </button>
      <button class="trash">
        <div class="img">
          <img src="./img/trash-icon.svg" alt="delete">
        </div>
      </button>
      
    </div>
    
      
   
`;
  return newComment;
};

const clearForm = () => {
  form.name.value = "";
  form.date.value = "";
  form.text.value = "";
};

const handleOnSubmit = (e) => {
  e.preventDefault();

  const name = form.name.value;
  const date = form.date.value || new Date().toLocaleDateString("af-ZA");
  const text = form.text.value;

  clearForm();

  const newComment = addComment(name, date, text);

  comments.prepend(newComment);
};

const dateFormat = (date) => {
  const [year, month, day] = date.split("-");

  return new Date(year, month - 1, day);
};

const handleClick = (e) => {
  const likeBtn = e.target.closest(".like");
  const deleteBtn = e.target.closest(".trash");

  if (!likeBtn && !deleteBtn) return;

  if (deleteBtn) {
    deleteBtn.closest(".comment").remove();
  }

  if (likeBtn) {
    const count = likeBtn.previousElementSibling;
    count.innerHTML = likeBtn.classList.contains("liked")
      ? Number(count.textContent) - 1
      : Number(count.textContent) + 1;

    likeBtn.classList.toggle("liked");
  }
};
form.onsubmit = handleOnSubmit;
form.text.onkeydown = (e) => {
  if (e.key === "Enter") handleOnSubmit(e);
};

comments.onclick = handleClick;
