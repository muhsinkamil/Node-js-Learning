const searchInput = document.querySelector(".search-input")
const submitButton = document.querySelector(".submit-btn")

submitButton.addEventListener("click", (e) => {
  e.preventDefault()
  console.log(searchInput.value)
})
