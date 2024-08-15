const dialog = document.getElementById('myDialog')
const dialogCloser = dialog.querySelector('.closeDialogBtn')

function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget
  const isClickedOnBackDrop = target === dialog
  if (isClickedOnBackDrop) {
    close()
    restartGame()
  }
}

function openModalAndLockScroll() {
  dialog.showModal()
  document.body.classList.add('scroll-lock')
}

function returnScroll() {
  document.body.classList.remove('scroll-lock')
}

function close() {
  dialog.close()
  returnScroll()
}

dialog.addEventListener('click', closeOnBackDropClick)
dialog.addEventListener('cancel', (event) => {
  returnScroll()
});
dialogCloser.addEventListener('click', (event) => {
  event.stopPropagation()
  close()
})


function updateScoreInDialog() {
    document.querySelector("#myDialog #score").textContent = score;
  }
  
  dialogCloser.addEventListener('click', (event) => {
    event.stopPropagation();
    close();
    restartGame(); 
  });
  
