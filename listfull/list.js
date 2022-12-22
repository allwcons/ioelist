let p_list = document.querySelectorAll("p")

p_list.forEach(p => {
  p.onclick = (e) => {
    console.log(1)
    let ul = document.querySelectorAll("ul.opened")
    ul.classList.remove("opened")
    p.nextSibling.classList.add("opened")
  }
})
