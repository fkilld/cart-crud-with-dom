document.addEventListener('DOMContentLoaded', function () {
  const cart = []

  const cartItemsContainer = document.getElementById('cart-items')
  // const catItemsContainer = document.querySelector('#cart-items')
  const totalAmountElement = document.getElementById('total-amount')

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', function () {
      const product = this.parentElement
      const productId = product.getAttribute('data-id')
      const productName = product.getAttribute('data-name')
      const productPrice = parseFloat(product.getAttribute('data-price'))

      addTocart(productId, productName, productPrice)
      renderCart()
    })
  })
  function addTocart(id, name, price) {
    const existingPrice = cart.find(function (item) {
      return item.id === id
    })

    if (existingPrice) {
      existingPrice.quantity += 1
    } else {
      cart.push({ id, name, price, quantity: 1 })
    }
  }
  function renderCart() {
    cartItemsContainer.innerHTML = ''
    let totalAmount = 0

    cart.forEach(function (item) {
      const li = document.createElement('li')
      li.textContent = `${item.name} x $${item.price} x ${item.quantity}`
      li.appendChild(createRemoveButton(item.id))
      cartItemsContainer.appendChild(li)
      totalAmount += item.price * item.quantity
    })
    totalAmountElement.textContent = totalAmount.toFixed(2)
  }

  function createRemoveButton(id) {
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'azad'
    deleteButton.addEventListener('click', function () {
      removeFromCart(id)
      renderCart()
    })
    return deleteButton
  }
  function removeFromCart(id) {
    const itemIndex = cart.findIndex(function (item) {
      return item.id === id
    })
    if (itemIndex > -1) {
      cart.splice(itemIndex, 1)
    }
  }
})
