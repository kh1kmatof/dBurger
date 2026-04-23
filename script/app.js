let menu = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: "images/products/burger-1.png",
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: "images/products/burger-2.png",
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: "images/products/burger-3.png",
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: "images/products/burger-4.png",
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

let burgerBtns = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn = document.querySelector('.wrapper__navbar-btn'),
    cartlist = document.querySelector('.wrapper__navbar-basket'),
    cartClose = document.querySelector('.wrapper__navbar-close'),
    cartAmount = document.querySelector('.warapper__navbar-count'),
    cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    cartListItem = document.querySelector(".wrapper__navbar-checklist")

cartBtn.onclick = () => cartlist.classList.add("active")
cartClose.onclick = () => cartlist.classList.remove("active")

burgerBtns.forEach(btn => {
    btn.onclick = () => addAmount(btn)
})

function addAmount(btn) {
    let parent = btn.closest(".wrapper__list-card")
    let id = parent.getAttribute("id")
    menu[id].amount++
    basket()
}

function basket() {
    let carts = []
    cartListItem.innerHTML = ""

    for (let key in menu) {
        let burger = menu[key]
        let productBurger = document.querySelector(`#${key}`)
        let productCount = productBurger.querySelector(".wrapper__list-count")

        if (burger.amount > 0) {
            carts.push(burger)

            productCount.classList.add("active")
            productCount.innerHTML = burger.amount

            // 🔥 SAVATGA QO‘SHISH
            cartListItem.innerHTML += `
                <div class="nav_item">
                    <div class="nav_item_left">
                        <img class="nav_item-image" src="${burger.img}">
                        <div class="nav_item_info">
                            <h3>${burger.name}</h3>
                            <p>${burger.totalSum} сум</p>
                        </div>
                    </div>
                    <div class="nav_item_right">
                        ${burger.amount > 1
                    ? `<button onclick="changeAmount('${key}', -1)" class="nav_item-btn">-</button>`
                    : `<button onclick="deleteProduct('${key}')" class="nav_item-btn delete">×</button>`
                }
                        <span class="nav_item-count">${burger.amount}</span>
                        <button onclick="changeAmount('${key}', 1)" class="nav_item-btn">+</button>
                    </div>
                </div>
            `
        } else {
            productCount.classList.remove("active")
            productCount.innerHTML = ""
        }
    }

    cartAmount.innerHTML = totalAmount()
    cartAmount.classList.toggle("active", totalAmount() > 0)

    cartTotalPrice.innerHTML = totalPrice() + " сум"
}

function changeAmount(id, value) {
    menu[id].amount += value

    if (menu[id].amount < 0) {
        menu[id].amount = 0
    }

    basket()
}

function totalAmount() {
    let total = 0
    for (let key in menu) {
        total += menu[key].amount
    }
    return total
}

function totalPrice() {
    let total = 0
    for (let key in menu) {
        total += menu[key].totalSum
    }
    return total
}

function deleteProduct(id) {
    menu[id].amount = 0
    basket()
}

let orderBtn = document.querySelector('.wrapper__navbar-bottom')

orderBtn.addEventListener('click', function () {
    if (totalAmount() === 0) {
        alert("Savat bo'sh ❌")
        return
    }

    alert(`Zakaz qabul qilindi ✅\nJami: ${totalPrice()} сум`)
    
    // Savatni tozalash
    for (let key in menu) {
        menu[key].amount = 0
    }

    basket()
})