const customPrompt = (options: any, action: any) => {
  // window.confirm(message)
  const container = document.createElement('div')
  container.id = 'prompt'
  container.className =
    'absolute z-50 left-0 top-0 flex w-full h-full bg-black/50  justify-center items-center pb-40 px-2'

  // and give it some content
  const newContent = document.createElement('div')
  newContent.className =
    'bg-slate-900 rounded-md text-gray-200 modal py-3 px-5 w-96 text-center text-xl  font-semibold shadow-lg'
  newContent.textContent = options.title

  const actionText = document.createElement('p')
  actionText.className = 'text-base font-normal mt-2'
  actionText.textContent = options.body

  const buttonContainer = document.createElement('div')
  buttonContainer.className = 'block flex justify-between mt-10 mb-1 text-base'

  const confirmButton = document.createElement('button')
  confirmButton.className =
    'px-2 py-1 rounded  border-2 border-red-400 text-red-400 font-semibold hover:bg-red-400 hover:text-white tracking-wide w-24'
  confirmButton.textContent = options.confirm

  // Confirm Event
  confirmButton.onclick = (e) => {
    container.remove()
    action()
  }

  buttonContainer.append(confirmButton)

  const cancelButton = document.createElement('button')
  cancelButton.className =
    'px-2 py-1 bg-purple-500 rounded  font-semibold hover:bg-purple-400 tracking-wide w-24'
  cancelButton.textContent = options.cancel
  // Cancel Event
  cancelButton.onclick = (e) => {
    container.remove()
  }

  buttonContainer.append(cancelButton)
  newContent.append(actionText)
  newContent.append(buttonContainer)

  container.appendChild(newContent)

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById('div1')
  document.body.insertBefore(container, currentDiv)
}

export default customPrompt
